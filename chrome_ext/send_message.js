function sendMessageHandler(message, linksDictList) {
  // Send a message to the background script to start the process
  chrome.runtime.sendMessage({
    action: "start",
    message: message,
    links: linksDictList,
  });
}

function loadLinks() {
  const filenameInput = document.getElementById("filename-upload");
  const filename = filenameInput.value.trim();
  if (filename) {
    fetch("http://127.0.0.1:5000/get_links", {
      method: "POST",
      body: JSON.stringify({ filename: filename }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((linksDictList) => {
        const linksLabel = document.createElement("label");
        linksLabel.innerHTML = `Links loaded: ${linksDictList.length}`;
        document.body.appendChild(linksLabel);

        const messageTextarea = document.createElement("textarea");
        const sendButton = document.createElement("button");

        messageTextarea.placeholder = "Enter your message";
        sendButton.innerHTML = "Send message";

        sendButton.addEventListener("click", () => {
          const message = messageTextarea.value.trim();
          if (message) {
            console.log("Sending message:", message);
            sendMessageHandler(message, linksDictList.slice(0, 2));
          } else {
            console.alert("Please enter a message before sending.");
          }
        });

        const body = document.body;
        body.appendChild(messageTextarea);
        body.appendChild(sendButton);
      })
      .catch((error) => console.error(error));
  } else {
    console.log("Please enter a filename before getting links.");
  }
}

const getLinksButton = document.querySelector("button");
getLinksButton.addEventListener("click", loadLinks);
