document.addEventListener('DOMContentLoaded', loadChatHistory);
document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function loadChatHistory() {
    const chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
    chatHistory.forEach(message => {
        addMessage(message.text, message.sender, message.timestamp, false);
    });
}

function saveMessageToHistory(text, sender, timestamp) {
    const chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
    chatHistory.push({ text, sender, timestamp });
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
}

function sendMessage() {
    const userInput = document.getElementById('user-input').value.trim();
    if (userInput) {
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        addMessage(userInput, 'user', timestamp, true);
        document.getElementById('user-input').value = '';
        setTimeout(() => {
            botResponse(userInput);
        }, 500);
    }
}

function addMessage(text, sender, timestamp, saveToHistory) {
    const chatBox = document.getElementById('chat-box');

    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}`;

    const avatarElement = document.createElement('div');
    avatarElement.className = 'avatar';
    avatarElement.style.backgroundImage = sender === 'user' ? 'url(user-avatar.png)' : 'url(bot-avatar.png)';

    const textElement = document.createElement('div');
    textElement.className = 'text';
    textElement.innerText = text;

    const timestampElement = document.createElement('div');
    timestampElement.className = 'timestamp';
    timestampElement.innerText = timestamp;

    messageElement.appendChild(avatarElement);
    messageElement.appendChild(textElement);

    const messageContainer = document.createElement('div');
    messageContainer.appendChild(messageElement);
    messageContainer.appendChild(timestampElement);

    chatBox.appendChild(messageContainer);

    chatBox.scrollTop = chatBox.scrollHeight;

    if (saveToHistory) {
        saveMessageToHistory(text, sender, timestamp);
    }
}

function botResponse(userInput) {
    const responses = {
        'hello': 'Hi there!',
        'how are you?': 'I am a bot, so I am always good!',
        'what is your name?': 'I am Robo Doctor',
        'i am not feeling well.': 'What is your symptoms?Please Provide details!',
        'my temp is high': 'Ohh seems like fever. tell me more?',
        'body is paining': 'chances are high you are suffering from fever',
        'tell me solution': 'Take Paracetamol with antibiotics',
        'Ohh thanks buddy': 'Always greatfull for you',
    };
    const response = responses[userInput.toLowerCase()] || "I'm not sure how to respond to that.";
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    addMessage(response, 'bot', timestamp, true);
}

