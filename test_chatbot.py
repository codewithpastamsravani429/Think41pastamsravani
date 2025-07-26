import requests

# Base URL of your Flask app
BASE_URL = "http://127.0.0.1:5000"

# Step 1: Send a message
send_data = {
    "sender": "Sravani",
    "message": "Hello! This is my first chatbot message."
}

send_response = requests.post(f"{BASE_URL}/send", json=send_data)
print("Send Response:", send_response.status_code, send_response.json())

# Step 2: Get the latest messages
get_response = requests.get(f"{BASE_URL}/messages")
print("Messages:")
for msg in get_response.json():
    print(msg)