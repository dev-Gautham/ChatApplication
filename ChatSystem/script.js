// script.js
document.addEventListener('DOMContentLoaded', function() {
    const messagesContainer = document.getElementById('messages');
    const usernameInput = document.getElementById('username');
    const messageInput = document.getElementById('message');
    const sendButton = document.getElementById('send-button');

    // Load messages from localStorage when the page loads
    loadMessages();

    sendButton.addEventListener('click', function() {
        const username = usernameInput.value.trim();
        const message = messageInput.value.trim();

        if (username && message) {
            const chatMessage = {
                username: username,
                message: message,
                timestamp: new Date().toISOString()
            };

            // Save message to localStorage
            saveMessage(chatMessage);
            displayMessage(chatMessage);

            // Clear the message input
            messageInput.value = '';
            messageInput.focus();
        } else {
            alert('Please enter both your name and a message.');
        }
    });

    function saveMessage(chatMessage) {
        const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
        messages.push(chatMessage);
        localStorage.setItem('chatMessages', JSON.stringify(messages));
    }

    function loadMessages() {
        const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
        messages.forEach(displayMessage);
    }

    function displayMessage(chatMessage) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        messageElement.innerHTML = `<span class="username">${chatMessage.username}:</span> ${chatMessage.message}`;
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to the bottom
    }
});