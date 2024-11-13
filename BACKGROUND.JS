chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    chrome.storage.local.get(["reloadCount"], (data) => {
      let reloadCount = data.reloadCount || 0;
      reloadCount++;

      if (reloadCount === 3) {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["content.js"]
        });
        reloadCount = 0;
      }

      chrome.storage.local.set({ reloadCount });
    });
  }
});
