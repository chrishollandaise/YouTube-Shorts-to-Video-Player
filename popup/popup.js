const enabledCheckbox = document.getElementById("enabled");

chrome.runtime.sendMessage({ action: "getExtensionStatus" }, (response) => {
  enabledCheckbox.checked = response.extensionStatus;
});

enabledCheckbox.addEventListener("change", () => {
  chrome.runtime.sendMessage({
    action: "toggleExtension",
    enabled: enabledCheckbox.checked,
  });
});
