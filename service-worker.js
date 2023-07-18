let enabled = true;

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.url &&
    changeInfo.url.startsWith("https://www.youtube.com/shorts/")
  ) {
    console.log("Opened a YouTube Short");
    const shortId = changeInfo.url.split("/").pop().split("?")[0];
    console.log("Short ID: " + shortId);
    if (enabled) {
      console.log("Redirecting to Video Player");
      chrome.tabs.update(tabId, {
        url: "https://www.youtube.com/watch?v=" + shortId,
      });
    } else {
      console.log("No redirection since disabled");
    }
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.enabled) {
    console.log("Extension is enabled");
  } else {
    console.log("Extension is disabled");
  }
  enabled = message.enabled;
});
