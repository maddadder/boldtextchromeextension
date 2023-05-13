document.addEventListener("DOMContentLoaded", () => {
    const toggleSwitch = document.getElementById("toggleSwitch");
  
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "getStatus" }, (response) => {
        toggleSwitch.checked = response.status;
      });
    });
  
    toggleSwitch.addEventListener("change", () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "toggle" });
      });
    });
  });