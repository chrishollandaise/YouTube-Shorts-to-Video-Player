const enabledCheckbox = document.getElementById("enabled");

enabledCheckbox.addEventListener("change", () => {
  chrome.runtime.sendMessage({ enabled: enabledCheckbox.checked });
});
