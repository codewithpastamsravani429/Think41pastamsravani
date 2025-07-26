async function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value;

  if (!message.trim()) return;

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
    chatBox.innerHTML += <p><strong>Error:</strong> Could not reach server.</p>;
  }
}