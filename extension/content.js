// extension/content.js

function extractLeetCode() {
  let data = { platform: "LeetCode", problemNumber: "", problemName: "", topic: "", allTags: [], difficulty: "", language: "", problemStatement: "" };
  try {
    // Try getting problem name from page title
    if (!data.problemName) {
      const pageTitle = document.title;
      // Format: "Rotate List - LeetCode"
      const titleMatch = pageTitle.match(/^(.+?)\s*-\s*LeetCode/i);
      if (titleMatch) {
        data.problemName = titleMatch[1].trim();
      }
    }

    // Try getting problem number from breadcrumb
    if (!data.problemNumber) {
      const breadcrumb = document.querySelector('a[href*="/problems/"]');
      if (breadcrumb) {
        const slug = breadcrumb.href.split('/problems/')[1]?.split('/')[0];
        if (slug) {
          // slug is already sanitized (rotate-list)
          // problem number not available here so leave empty
        }
      }
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
    
    const tagEls = document.querySelectorAll('.problem-tags a, .article-tags a');
    tagEls.forEach(tag => data.allTags.push(tag.innerText.trim()));
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
      const match = window.location.pathname.match(/\/(?:problemset\/problem|contest)\/(\d+)(?:\/problem|\/submission)?(?:\/([A-Z0-9]+))?/i);
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
    
    const langSelect = document.querySelector('select[name="programTypeId"] option:checked') || document.querySelector('td:nth-child(4)'); // Some submission pages show lang in table
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
    if (urlParts.length > 2 && (urlParts[1] === 'problems' || urlParts[1] === 'submit')) {
      data.problemNumber = urlParts[2];
      if (!data.problemName && data.problemNumber) {
         data.problemName = data.problemNumber;
      }
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
  }

  if (data && !data.problemName) {
    const title = document.title;
    // Remove platform suffix
    const cleaned = title
      .replace(/\s*[-|]\s*LeetCode\s*$/i, '')
      .replace(/\s*[-|]\s*GeeksforGeeks\s*$/i, '')
      .replace(/\s*[-|]\s*Codeforces\s*$/i, '')
      .replace(/\s*[-|]\s*CodeChef\s*$/i, '')
      .replace(/\s*[-|]\s*HackerRank\s*$/i, '')
      .trim();
    if (cleaned) data.problemName = cleaned;
  }

  if (data) {
    chrome.storage.local.set({ pushkar_data: data }, () => {
      console.log("PUSHkar: Data extracted ⚡");
    });
  }
}

// Initial extraction (with slight delay for JS rendered apps)
const initialDelay = location.href.includes('/submissions/') ? 2500 : 1500;
setTimeout(extractData, initialDelay);

// Re-run if URL changes (for SPAs)
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    const delay = location.href.includes('/submissions/') ? 2500 : 1500;
    setTimeout(extractData, delay);
  }
}).observe(document.body, { childList: true, subtree: true });
