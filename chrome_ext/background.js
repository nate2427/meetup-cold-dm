chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "start") {
    // Start the process with the first URL
    processUrl(request.links[0], request.message, request.links, 0);
  }
});

function processUrl(url, message, urls, index) {
  // Open the URL in a new tab
  chrome.tabs.create({ url: url.link }, (tab) => {
    // Wait for the tab to finish loading
    chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
      if (info.status === "complete" && tabId === tab.id) {
        // Remove the listener now that the tab has finished loading
        chrome.tabs.onUpdated.removeListener(listener);

        // Input the data
        chrome.scripting
          .executeScript({
            target: { tabId: tab.id },
            function: (message) => {
              // Function to check for the textarea and add the text
              function addTextToTextarea() {
                // Find the textarea by its id
                var textarea = document.getElementById("messaging-new-convo");

                // If the textarea exists, add the text and stop checking
                if (textarea) {
                  textarea.value = message;
                  // remove the disable from the button
                  const sendButton =
                    document.getElementById("messaging-new-send");
                  sendButton.disabled = false;
                  sendButton.click();
                }
              }

              // Check for the textarea every 500 milliseconds
              var checkTextareaInterval = setInterval(addTextToTextarea, 500);
            },
            args: [message],
          })
          .then(() => {
            // Close the tab after a delay to allow the script to execute
            setTimeout(() => {
              chrome.tabs.remove(tab.id);

              // Process the next URL, if any
              if (index + 1 < urls.length) {
                processUrl(urls[index + 1], message, urls, index + 1);
              }
            }, 1000); // Adjust the delay as needed
          });
      }
    });
  });
}

function createInputDataFunction(message) {
  return function () {
    var textarea = document.getElementById("messaging-new-convo");
    if (textarea) {
      textarea.value = message;
    }
  };
}
