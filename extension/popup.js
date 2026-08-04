// extension/popup.js

let extractedData = null;

document.addEventListener('DOMContentLoaded', async () => {
  const platformBadge = document.getElementById('platform-badge');
  const difficultyBadge = document.getElementById('difficulty-badge');
  const languageBadge = document.getElementById('language-badge');
  const problemName = document.getElementById('problem-name');
  const topicInput = document.getElementById('topic-input');
  const codeInput = document.getElementById('code-input');
  const pushBtn = document.getElementById('push-btn');
  const statusMsg = document.getElementById('status-message');

  // Character count element
  const charCountEl = document.createElement('div');
  charCountEl.className = 'char-count';
  charCountEl.innerText = '0 characters';
  codeInput.parentNode.insertBefore(charCountEl, codeInput.nextSibling);

  // Tags container
  const tagsContainer = document.createElement('div');
  tagsContainer.className = 'tags-container';
  topicInput.parentNode.insertBefore(tagsContainer, topicInput.nextSibling);

  // Read data
  chrome.storage.local.get(['pushkar_data'], (result) => {
    if (result.pushkar_data) {
      extractedData = result.pushkar_data;
      
      platformBadge.innerText = extractedData.platform || 'Unknown';
      
      difficultyBadge.innerText = extractedData.difficulty || 'N/A';
      difficultyBadge.className = 'badge diff-badge ' + (extractedData.difficulty ? extractedData.difficulty.toLowerCase() : '');
      
      languageBadge.innerText = extractedData.language || 'N/A';
      
      const numStr = extractedData.problemNumber ? `${extractedData.problemNumber}. ` : '';
      problemName.innerText = numStr + (extractedData.problemName || 'Unknown Problem');
      
      topicInput.value = extractedData.topic || '';

      // Render tags
      if (extractedData.allTags && extractedData.allTags.length > 0) {
        extractedData.allTags.forEach(tag => {
          const chip = document.createElement('span');
          chip.className = 'tag-chip' + (tag === extractedData.topic ? ' active' : '');
          chip.innerText = tag;
          chip.addEventListener('click', () => {
            topicInput.value = tag;
            document.querySelectorAll('.tag-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
          });
          tagsContainer.appendChild(chip);
        });
      }
    } else {
      showStatus("No problem detected. Open a problem page first.", "error");
    }
  });

  // Code textarea auto-detect language on input
  codeInput.addEventListener('input', () => {
    const code = codeInput.value;
    charCountEl.innerText = `${code.length} characters`;

    if (code.length > 0 && extractedData) {
      const firstLine = code.split('\n')[0].trim();
      if (firstLine.startsWith('def ')) extractedData.language = 'Python';
      else if (firstLine.startsWith('class ') && code.includes('public static void main')) extractedData.language = 'Java';
      else if (firstLine.startsWith('function') || firstLine.startsWith('const ') || firstLine.startsWith('let ')) extractedData.language = 'JavaScript';
      else if (firstLine.includes('#include')) extractedData.language = 'C++';
      
      languageBadge.innerText = extractedData.language || 'N/A';
    }
  });

  // Push Button
  pushBtn.addEventListener('click', async () => {
    if (!extractedData) {
      showStatus("No data to push.", "error");
      return;
    }

    const code = codeInput.value.trim();
    const topic = topicInput.value.trim();

    let hasError = false;

    if (!code) {
      shakeElement(codeInput);
      showStatus("Please paste your solution code first!", "error");
      hasError = true;
    }

    if (!topic) {
      shakeElement(topicInput);
      if (!hasError) showStatus("Please select or enter a topic!", "error");
      hasError = true;
    }

    if (hasError) return;

    extractedData.code = code;
    extractedData.topic = topic;

    pushBtn.innerText = "PUSHING... ⚡";
    pushBtn.disabled = true;
    statusMsg.classList.add('hidden');

    try {
      const response = await fetch('http://localhost:3000/push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(extractedData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        showStatus("Pushed successfully ⚡", "success");
        setTimeout(() => {
          codeInput.value = '';
          charCountEl.innerText = '0 characters';
        }, 2000);
      } else {
        showStatus(result.error || "Failed to push.", "error");
      }
    } catch (e) {
      showStatus("PUSHkar server not running! Start it with: npm start", "error");
    } finally {
      pushBtn.innerText = "PUSH TO GITHUB ⚡";
      pushBtn.disabled = false;
    }
  });

  function showStatus(message, type) {
    statusMsg.innerText = message;
    statusMsg.className = `status ${type}`;
    statusMsg.classList.remove('hidden');
  }

  function shakeElement(el) {
    el.classList.add('shake');
    setTimeout(() => el.classList.remove('shake'), 500);
  }
});
