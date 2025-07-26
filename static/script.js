document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("send-button").addEventListener("click", async function sendMessage() {
    const input = document.getElementById("user-input");
    const message = input.value.trim();
    if (!message) return;

    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += <p><strong>You:</strong> ${message}</p>;
    input.value = "";

    try {
      const response = await fetch("/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
      });

      const data = await response.json();
      chatBox.innerHTML += <p><strong>Bot:</strong> ${data.reply}</p>;
    } catch (error) {
      chatBox.innerHTML += <p><strong>Error:</strong> Something went wrong.</p>;
    }
  });
});