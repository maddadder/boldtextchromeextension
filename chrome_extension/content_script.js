function boldText(node) {
    const regex = /(\b[a-zA-Z]{1,3}\b|\b[a-zA-Z]{4,7}\b|\b[a-zA-Z]{8,}\b)/g;
    const newText = node.textContent.replace(regex, (word) => {
      /*
      const length = word.length;
      let boldLength;
  
      if (length <= 3) {
        boldLength = 1;
      } else if (length <= 5) {
        boldLength = 3;
      } else if (length <= 7) {
        boldLength = 5;
      } else {
        boldLength = 7;
      }
  
      const boldPart = word.slice(0, boldLength);
      const remainingPart = word.slice(boldLength);
      */
      return `<span style="font-size: x-large;font-family:'comic sans ms';">${word}</span>`;
    });
  
    const newNode = document.createElement("span");
    newNode.innerHTML = newText;
  
    node.replaceWith(newNode);
  }
  
  function processNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      boldText(node);
    } else {
      for (const child of node.childNodes) {
        processNode(child);
      }
    }
  }
  
  let isEnabled = false;
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "toggle") {
      isEnabled = !isEnabled;
      if (isEnabled) {
        processNode(document.body);
      } else {
        location.reload();
      }
    } else if (request.action === "getStatus") {
      sendResponse({ status: isEnabled });
    }
  });