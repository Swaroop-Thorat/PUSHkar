
function extractLeetCode() {
  let data = { platform: "LeetCode", problemNumber: "", problemName: "", topic: "", allTags: [], difficulty: "", language: "", problemStatement: "" };
  try {
    if (!data.problemName) {
      const pageTitle = document.title;
      const titleMatch = pageTitle.match(/^(.+?)\s*-\s*LeetCode/i);
      if (titleMatch) data.problemName = titleMatch[1].trim();
    }

    const titleElement = document.querySelector('[data-cy="question-title"]') || document.querySelector('div.text-title-large a') || document.querySelector('.text-title-large');
    if (titleElement) {
      const fullTitle = titleElement.innerText.trim();
      const match = fullTitle.match(/^(\d+)\.\s+(.*)$/);
      if (match) {
        data.problemNumber = match[1];
        data.problemName = match[2];
      } else {
        data.problemName = fullTitle;
      }
    }
    if (!data.problemNumber) {
      const pathParts = window.location.pathname.split('/');
      if (pathParts.includes('problems')) {
        const idx = pathParts.indexOf('problems');
        if (pathParts[idx+1] && pathParts[idx+1] !== 'submissions') {
          data.problemName = data.problemName || pathParts[idx+1].split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        }
      }
    }

    const easy = document.querySelector('div.text-difficulty-easy');
    const medium = document.querySelector('div.text-difficulty-medium');
    const hard = document.querySelector('div.text-difficulty-hard');
    if (easy) data.difficulty = "Easy";
    else if (medium) data.difficulty = "Medium";
    else if (hard) data.difficulty = "Hard";

    const tagElements = document.querySelectorAll('a.topic-tag, div.topic-tag__9sdH, a[href^="/tag/"]');
    tagElements.forEach(tag => data.allTags.push(tag.innerText.trim()));
    if (data.allTags.length > 0) data.topic = data.allTags[0];

    const langBtn = document.querySelector('button.rounded.items-center, div[id^="headlessui-listbox-button"]');
    if (langBtn) data.language = langBtn.innerText.trim();

    const statement = document.querySelector('div.elfjS, div[data-track-load="description_content"]');
    if (statement) data.problemStatement = statement.innerText.trim();
  } catch (e) {
    console.error("PUSHkar Error (LeetCode):", e);
  }
  return data;
}

function extractGeeksForGeeks() {
  let data = { platform: "GeeksforGeeks", problemNumber: "GFG", problemName: "", topic: "", allTags: [], difficulty: "", language: "", problemStatement: "" };
  try {
    const titleEl = document.querySelector('h1.problems-heading, h3');
    if (titleEl) data.problemName = titleEl.innerText.trim();

    if (!data.problemName) {
      const pageTitle = document.title;
      const titleMatch = pageTitle.match(/^(.+?)\s*\|\s*GeeksforGeeks/i) || pageTitle.match(/^(.+?)\s*-\s*GeeksforGeeks/i);
      if (titleMatch) data.problemName = titleMatch[1].trim();
    }

    if (!data.problemName) {
      const pathParts = window.location.pathname.split('/');
      if (pathParts.includes('problems')) {
        const idx = pathParts.indexOf('problems');
        if (pathParts[idx+1] && pathParts[idx+1] !== 'submissions') {
          data.problemName = pathParts[idx+1].split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        }
      }
    }

    const diffEl = document.querySelector('.difficulty-block, span[class*="difficulty"]');
    if (diffEl) data.difficulty = diffEl.innerText.trim();

    const tagEls = document.querySelectorAll('.problems_tag_label__A4Ism');
    tagEls.forEach(tag => {
      if (tag.href && tag.href.includes('/explore?category')) {
        data.allTags.push(tag.innerText.trim());
      }
    });
    if (data.allTags.length > 0) data.topic = data.allTags[0];

    const langSelect = document.querySelector('.divider.text, .language-selector, .monaco-editor');
    if (langSelect) data.language = langSelect.innerText.trim();

    const statement = document.querySelector('.problems-body, .problem-statement, div[class*="problem_content"]');
    if (statement) data.problemStatement = statement.innerText.trim();
  } catch (e) {
    console.error("PUSHkar Error (GFG):", e);
  }
  return data;
}

function extractCodeforces() {
  let data = { platform: "Codeforces", problemNumber: "", problemName: "", topic: "", allTags: [], difficulty: "N/A", language: "", problemStatement: "" };
  try {
    const titleEl = document.querySelector('div.title');
    if (titleEl) {
      const fullTitle = titleEl.innerText.trim();
      const match = fullTitle.match(/^([A-Z0-9]+)\.\s+(.*)$/);
      if (match) {
        data.problemNumber = match[1];
        data.problemName = match[2];
      } else {
        data.problemName = fullTitle;
      }
    }

    if (!data.problemNumber) {
      const match = window.location.pathname.match(
        /\/(?:problemset\/problem|contest|gym)\/(\d+)(?:\/problem|\/problems|\/submission)?(?:\/([A-Z0-9]+))?/i
      );
      if (match && match[1]) {
        data.problemNumber = match[1] + (match[2] || '');
      }
    }

    if (!data.problemName) {
      const pageTitle = document.title;
      const titleMatch = pageTitle.match(/^(.+?)\s*-\s*Codeforces/i);
      if (titleMatch) data.problemName = titleMatch[1].trim();
    }

    const tagEls = document.querySelectorAll('span.tag-box');
    tagEls.forEach(tag => data.allTags.push(tag.innerText.trim()));
    if (data.allTags.length > 0) data.topic = data.allTags[0];

    const langSelect = document.querySelector('select[name="programTypeId"] option:checked') || document.querySelector('td:nth-child(4)');
    if (langSelect) data.language = langSelect.innerText.trim();

    const statement = document.querySelector('div.problem-statement');
    if (statement) data.problemStatement = statement.innerText.trim();
  } catch (e) {
    console.error("PUSHkar Error (Codeforces):", e);
  }
  return data;
}

function extractCodeChef() {
  let data = { platform: "CodeChef", problemNumber: "", problemName: "", topic: "", allTags: [], difficulty: "", language: "", problemStatement: "" };
  try {
    const titleEl = document.querySelector('h1.problem-title, h1');
    if (titleEl) data.problemName = titleEl.innerText.trim();

    if (!data.problemName) {
      const pageTitle = document.title;
      const titleMatch = pageTitle.match(/^(.+?)\s*\|\s*CodeChef/i);
      if (titleMatch) data.problemName = titleMatch[1].trim();
    }

    const urlParts = window.location.pathname.split('/');
    if (urlParts.includes('problems')) {
      const idx = urlParts.indexOf('problems');
      if (urlParts[idx+1]) {
        data.problemNumber = urlParts[idx+1];
        if (!data.problemName) data.problemName = data.problemNumber;
      }
    } else if (urlParts[1] === 'submit') {
      data.problemNumber = urlParts[2] || '';
      if (!data.problemName) data.problemName = data.problemNumber;
    }

    const diffEl = document.querySelector('.difficulty-badge, span[class*="difficulty"]');
    if (diffEl) data.difficulty = diffEl.innerText.trim();

    const tagEls = document.querySelectorAll('.tags-section a, .tags a');
    tagEls.forEach(tag => data.allTags.push(tag.innerText.trim()));
    if (data.allTags.length > 0) data.topic = data.allTags[0];

    const langEl = document.querySelector('.language-selector .selected, .select2-selection__rendered');
    if (langEl) data.language = langEl.innerText.trim();

    const statement = document.querySelector('div.problem-statement, #problem-statement');
    if (statement) data.problemStatement = statement.innerText.trim();
  } catch (e) {
    console.error("PUSHkar Error (CodeChef):", e);
  }
  return data;
}

function extractHackerRank() {
  let data = { platform: "HackerRank", problemNumber: "", problemName: "", topic: "", allTags: [], difficulty: "", language: "", problemStatement: "" };
  try {
    const titleEl = document.querySelector('h1.ui-icon-label, h1.challenge-title');
    if (titleEl) data.problemName = titleEl.innerText.trim();

    if (!data.problemName) {
      const pageTitle = document.title;
      const titleMatch = pageTitle.match(/^(.+?)\s*\|\s*HackerRank/i) || pageTitle.match(/^(.+?)\s*-\s*HackerRank/i);
      if (titleMatch) data.problemName = titleMatch[1].trim();
    }

    const urlParts = window.location.pathname.split('/');
    if (urlParts.includes('challenges')) {
      const idx = urlParts.indexOf('challenges');
      if (urlParts[idx+1] && urlParts[idx+1] !== 'submissions') {
        data.problemNumber = urlParts[idx+1];
        if (!data.problemName) {
          data.problemName = data.problemNumber.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        }
      }
    }

    const diffEl = document.querySelector('div.difficulty-block, span.difficulty');
    if (diffEl) data.difficulty = diffEl.innerText.trim();

    const tagEls = document.querySelectorAll('.challenge-tags a, .tag-container a');
    tagEls.forEach(tag => data.allTags.push(tag.innerText.trim()));
    if (data.allTags.length > 0) data.topic = data.allTags[0];

    const langEl = document.querySelector('.select2-selection__rendered, .lang-select, .language-selector');
    if (langEl) data.language = langEl.innerText.trim();

    const statement = document.querySelector('div.challenge-body-html');
    if (statement) data.problemStatement = statement.innerText.trim();
  } catch (e) {
    console.error("PUSHkar Error (HackerRank):", e);
  }
  return data;
}

function extractAtCoder() {
  let data = { platform: "AtCoder", problemNumber: "", problemName: "", topic: "", allTags: [], difficulty: "N/A", language: "", problemStatement: "" };
  try {
    const titleEl = document.querySelector('h2, span.h2');
    if (titleEl) {
      const fullTitle = titleEl.innerText.trim();
      const match = fullTitle.match(/^([A-Z0-9]+)\s*-\s*(.*)$/);
      if (match) {
        data.problemNumber = match[1];
        data.problemName = match[2].trim();
      } else {
        data.problemName = fullTitle;
      }
    }

    if (!data.problemName) {
      const pageTitle = document.title;
      const titleMatch = pageTitle.match(/^(.+?)\s*-\s*AtCoder/i);
      if (titleMatch) data.problemName = titleMatch[1].trim();
    }

    if (!data.problemNumber) {
      const urlParts = window.location.pathname.split('/');
      if (urlParts.includes('tasks')) {
        const idx = urlParts.indexOf('tasks');
        if (urlParts[idx+1]) data.problemNumber = urlParts[idx+1].toUpperCase();
      }
    }

    const langEl = document.querySelector('select[name="language_id"] option:checked, #select-lang option:checked');
    if (langEl) data.language = langEl.innerText.trim();

    const statement = document.querySelector('#task-statement, .lang-ja, .problem-statement');
    if (statement) data.problemStatement = statement.innerText.trim().substring(0, 2000);
  } catch (e) {
    console.error("PUSHkar Error (AtCoder):", e);
  }
  return data;
}

function extractSPOJ() {
  let data = { platform: "SPOJ", problemNumber: "", problemName: "", topic: "", allTags: [], difficulty: "N/A", language: "", problemStatement: "" };
  try {
    const titleEl = document.querySelector('h2.title, h1.title, #problem-name, h2');
    if (titleEl) data.problemName = titleEl.innerText.trim();

    if (!data.problemName) {
      const pageTitle = document.title;
      const titleMatch = pageTitle.match(/^(.+?)\s*-\s*SPOJ/i) || pageTitle.match(/^SPOJ.com\s*-\s*Problem\s*(.+)/i);
      if (titleMatch) data.problemName = titleMatch[1].trim();
    }

    if (!data.problemNumber) {
      const urlParts = window.location.pathname.split('/');
      if (urlParts.includes('problems')) {
        const idx = urlParts.indexOf('problems');
        if (urlParts[idx+1]) data.problemNumber = urlParts[idx+1].toUpperCase();
      }
    }

    const langEl = document.querySelector('select#lang option:checked, select[name="lang"] option:checked');
    if (langEl) data.language = langEl.innerText.trim();

    const statement = document.querySelector('#problem-body, .problem-body, #prob');
    if (statement) data.problemStatement = statement.innerText.trim().substring(0, 2000);
  } catch (e) {
    console.error("PUSHkar Error (SPOJ):", e);
  }
  return data;
}

function extractCode360() {
  let data = { platform: "Code360", problemNumber: "", problemName: "", topic: "", allTags: [], difficulty: "", language: "", problemStatement: "" };
  try {
    const titleEl = document.querySelector('h1, h2.problem-title, div[class*="problem-title"]');
    if (titleEl) data.problemName = titleEl.innerText.trim();

    if (!data.problemName) {
      const pageTitle = document.title;
      const titleMatch = pageTitle.match(/^(.+?)\s*[\|-]\s*(?:Code360|Naukri|CodingNinjas)/i);
      if (titleMatch) data.problemName = titleMatch[1].trim();
    }

    if (!data.problemName) {
      const urlParts = window.location.pathname.split('/');
      if (urlParts.includes('problems')) {
        const idx = urlParts.indexOf('problems');
        if (urlParts[idx+1]) {
          data.problemName = urlParts[idx+1].split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        }
      }
    }

    const diffEl = document.querySelector('span[class*="difficulty"], div[class*="difficulty"]');
    if (diffEl) data.difficulty = diffEl.innerText.trim();

    const tagEls = document.querySelectorAll('div[class*="tag"] a, span[class*="topic"]');
    tagEls.forEach(tag => data.allTags.push(tag.innerText.trim()));
    if (data.allTags.length > 0) data.topic = data.allTags[0];

    const langEl = document.querySelector('div[class*="language"] button, span[class*="lang"]');
    if (langEl) data.language = langEl.innerText.trim();

    const statement = document.querySelector('div[class*="problem-statement"], div[class*="description"]');
    if (statement) data.problemStatement = statement.innerText.trim().substring(0, 2000);
  } catch (e) {
    console.error("PUSHkar Error (Code360):", e);
  }
  return data;
}

function extractCSES() {
  let data = { platform: "CSES", problemNumber: "", problemName: "", topic: "", allTags: [], difficulty: "N/A", language: "", problemStatement: "" };
  try {
    const titleEl = document.querySelector('h1');
    if (titleEl) data.problemName = titleEl.innerText.trim();

    if (!data.problemName) {
      const pageTitle = document.title;
      const titleMatch = pageTitle.match(/^(.+?)\s*-\s*CSES/i);
      if (titleMatch) data.problemName = titleMatch[1].trim();
    }

    const urlParts = window.location.pathname.split('/');
    if (urlParts.includes('task')) {
      const idx = urlParts.indexOf('task');
      if (urlParts[idx+1]) data.problemNumber = urlParts[idx+1];
    }

    const langEl = document.querySelector('select[name="lang"] option:checked');
    if (langEl) data.language = langEl.innerText.trim();

    const statement = document.querySelector('.content, div.task');
    if (statement) data.problemStatement = statement.innerText.trim().substring(0, 2000);
  } catch (e) {
    console.error("PUSHkar Error (CSES):", e);
  }
  return data;
}

function extractData() {
  const hostname = window.location.hostname;
  let data = null;

  if (hostname.includes("leetcode.com")) {
    data = extractLeetCode();
  } else if (hostname.includes("geeksforgeeks.org")) {
    data = extractGeeksForGeeks();
  } else if (hostname.includes("codeforces.com")) {
    data = extractCodeforces();
  } else if (hostname.includes("codechef.com")) {
    data = extractCodeChef();
  } else if (hostname.includes("hackerrank.com")) {
    data = extractHackerRank();
  } else if (hostname.includes("atcoder.jp")) {
    data = extractAtCoder();
  } else if (hostname.includes("spoj.com")) {
    data = extractSPOJ();
  } else if (hostname.includes("naukri.com")) {
    data = extractCode360();
  } else if (hostname.includes("cses.fi")) {
    data = extractCSES();
  }

  if (data) {
    chrome.storage.local.set({ pushkar_data: data }, () => {
      console.log("PUSHkar: Data extracted ⚡");
    });
  }
}

const initialDelay = location.href.includes('/submissions/') ? 2500 : 1500;
setTimeout(extractData, initialDelay);

function detectSubmission() {
  const hostname = window.location.hostname;

  if (hostname.includes("leetcode.com")) {
    const submitBtn = document.querySelector('button[data-e2e-locator="console-submit-button"]');
    if (submitBtn && !submitBtn.dataset.pushkarListening) {
      submitBtn.dataset.pushkarListening = "true";
      submitBtn.addEventListener("click", () => {
        setTimeout(() => { extractData(); chrome.runtime.sendMessage({ action: "showBadge" }); }, 3000);
      });
    }
  }

  if (hostname.includes("geeksforgeeks.org")) {
    const submitBtn = document.querySelector('button.submit-btn, button[class*="submit"]');
    if (submitBtn && !submitBtn.dataset.pushkarListening) {
      submitBtn.dataset.pushkarListening = "true";
      submitBtn.addEventListener("click", () => {
        setTimeout(() => { extractData(); chrome.runtime.sendMessage({ action: "showBadge" }); }, 3000);
      });
    }
  }

  if (hostname.includes("codeforces.com")) {
    const submitBtn = document.querySelector('input[value="Submit"], button.submit');
    if (submitBtn && !submitBtn.dataset.pushkarListening) {
      submitBtn.dataset.pushkarListening = "true";
      submitBtn.addEventListener("click", () => {
        setTimeout(() => { extractData(); chrome.runtime.sendMessage({ action: "showBadge" }); }, 3000);
      });
    }
  }

  if (hostname.includes("codechef.com")) {
    const submitBtn = document.querySelector('button[type="submit"], button.submit-button');
    if (submitBtn && !submitBtn.dataset.pushkarListening) {
      submitBtn.dataset.pushkarListening = "true";
      submitBtn.addEventListener("click", () => {
        setTimeout(() => { extractData(); chrome.runtime.sendMessage({ action: "showBadge" }); }, 3000);
      });
    }
  }

  if (hostname.includes("hackerrank.com")) {
    const submitBtn = document.querySelector('button.hr-monaco-submit, button[data-attr="submit"]');
    if (submitBtn && !submitBtn.dataset.pushkarListening) {
      submitBtn.dataset.pushkarListening = "true";
      submitBtn.addEventListener("click", () => {
        setTimeout(() => { extractData(); chrome.runtime.sendMessage({ action: "showBadge" }); }, 3000);
      });
    }
  }

  if (hostname.includes("atcoder.jp")) {
    const submitBtn = document.querySelector('button[type="submit"], input[type="submit"]');
    if (submitBtn && !submitBtn.dataset.pushkarListening) {
      submitBtn.dataset.pushkarListening = "true";
      submitBtn.addEventListener("click", () => {
        setTimeout(() => { extractData(); chrome.runtime.sendMessage({ action: "showBadge" }); }, 3000);
      });
    }
  }

  if (hostname.includes("spoj.com")) {
    const submitBtn = document.querySelector('input[type="submit"], button[type="submit"]');
    if (submitBtn && !submitBtn.dataset.pushkarListening) {
      submitBtn.dataset.pushkarListening = "true";
      submitBtn.addEventListener("click", () => {
        setTimeout(() => { extractData(); chrome.runtime.sendMessage({ action: "showBadge" }); }, 3000);
      });
    }
  }

  if (hostname.includes("naukri.com")) {
    const submitBtn = document.querySelector('button[class*="submit"], button[class*="run"]');
    if (submitBtn && !submitBtn.dataset.pushkarListening) {
      submitBtn.dataset.pushkarListening = "true";
      submitBtn.addEventListener("click", () => {
        setTimeout(() => { extractData(); chrome.runtime.sendMessage({ action: "showBadge" }); }, 3000);
      });
    }
  }

  if (hostname.includes("cses.fi")) {
    const submitBtn = document.querySelector('input[type="submit"], button[type="submit"]');
    if (submitBtn && !submitBtn.dataset.pushkarListening) {
      submitBtn.dataset.pushkarListening = "true";
      submitBtn.addEventListener("click", () => {
        setTimeout(() => { extractData(); chrome.runtime.sendMessage({ action: "showBadge" }); }, 3000);
      });
    }
  }
}

setTimeout(detectSubmission, 2000);

let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    const delay = location.href.includes('/submissions/') ? 2500 : 1500;
    setTimeout(extractData, delay);
    setTimeout(detectSubmission, delay + 500);
  }
}).observe(document.body, { childList: true, subtree: true });