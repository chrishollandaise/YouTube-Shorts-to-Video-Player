let enabled = true;

chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  if (enabled) {
    if (details.url.startsWith("https://www.youtube.com/shorts/")) {
      console.log("Web Navigation - Opened a YouTube Short");
      const shortId = getShortId(details.url);
      redirectToVideoPlayer(details.tabId, shortId);
    }
  } else {
    console.log("No redirection since extension is disabled");
  }
});

//If the YouTube short is opened within the same window, the tab is not navigated.
//Only the URL changes, therefore, we have to listen to that too
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (enabled) {
    if (
      changeInfo.url &&
      changeInfo.url.startsWith("https://www.youtube.com/shorts/")
    ) {
      console.log("Tab updated - Opened a YouTube Short");
      const shortId = getShortId(changeInfo.url);
      redirectToVideoPlayer(tabId, shortId);
    }
  } else {
    console.log("No redirection since extension is disabled");
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "toggleExtension") {
    enabled = message.enabled;
    console.log("Extension is ", enabled ? "enabled" : "disabled");
  } else if (message.action === "getExtensionStatus") {
    sendResponse({ extensionStatus: enabled });
  }
});

function getShortId(url) {
  const shortId = url.split("/").pop().split("?")[0];
  console.log("Short ID: " + shortId);
  return shortId;
}

function redirectToVideoPlayer(tabId, shortId) {
  console.log("Redirecting to Video Player");
  chrome.tabs.update(tabId, {
    url: "https://www.youtube.com/watch?v=" + shortId,
  });
}
