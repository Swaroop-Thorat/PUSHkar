// extension/background.js

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "showBadge") {
    // Show green badge on extension icon
    chrome.action.setBadgeText({ 
      text: "✓",
      tabId: sender.tab.id 
    });
    chrome.action.setBadgeBackgroundColor({ 
      color: "#4ADE80",
      tabId: sender.tab.id
    });

    // Clear badge after 5 minutes
    setTimeout(() => {
      chrome.action.setBadgeText({ 
        text: "",
        tabId: sender.tab.id 
      });
    }, 300000);
  }
});

// Clear badge when popup opens
chrome.action.onClicked.addListener((tab) => {
  chrome.action.setBadgeText({ 
    text: "",
    tabId: tab.id 
  });
});
