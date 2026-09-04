
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "showBadge") {
    chrome.action.setBadgeText({ 
      text: "✓",
      tabId: sender.tab.id 
    });
    chrome.action.setBadgeBackgroundColor({ 
      color: "#4ADE80",
      tabId: sender.tab.id
    });

    setTimeout(() => {
      chrome.action.setBadgeText({ text: "", tabId: sender.tab.id });
    }, 300000);
  }
});
