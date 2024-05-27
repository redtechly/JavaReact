const socket = io();
let username;

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("chatform");
    const input = document.querySelector('input[type="text"]'); // Update selector
    const fileInput = document.querySelector('input[type="file"]'); // Update selector
    const messages = document.getElementById("messages");

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const reader = new FileReader();
        const file = fileInput.files[0];

        if (!file && !input.value) {
            alert("Please enter a message");
            return;
        }

        if (file) {
            reader.readAsDataURL(file);
            reader.onload = () => {
                socket.emit("chat message", {
                    Author: username,
                    Content: input.value,
                    image: reader.result
                });
                input.value = "";
                fileInput.value = ""; // Clear file input after submission
            };
        } else {

            socket.emit("chat message", {
                Author: username,
                Content: input.value,
                image: null
            });
            input.value = "";
        }
    });

    if (localStorage.getItem('username')) {
        username = localStorage.getItem('username');
        socket.emit("username", username);
    } else {
        Swal.fire({
            title: "Please enter your name",
            input: 'text',
            inputLabel: "Username",
            inputPlaceholder: "Enter your name",
            allowOutsideClick: false,
            inputValidator: (value) => {
                if (!value) {
                    return "You need to enter a username";
                }
            },
            confirmButtonText: "Enter Chat",
            showLoaderOnConfirm: true,
            preConfirm: (usernameInput) => {
                username = usernameInput;
                socket.emit("username", username);
                localStorage.setItem("username", username);
            }
        });
    }
});

function scrollToBottom() {
    const messageList = document.getElementById('messages');
    messageList.scrollTop = messageList.scrollHeight;
}

socket.on("userJoined", (username) => {
    console.log(username);
    const item = document.createElement('li');
    item.classList.add('chat-message');
    item.innerHTML = `<span class='chat-username'>${username}</span> has joined the chat room`;
    document.getElementById('messages').appendChild(item); // Use document.getElementById instead of variable
    scrollToBottom();
});

socket.on("user left", (data) => {
    console.log(data);
    console.log("user left" + data);
    const item = document.createElement('li');
    item.classList.add('chat-message');
    item.innerHTML = `<span class='chat-username'>${data}</span> has left the chat room`;
    document.getElementById('messages').appendChild(item); // Use document.getElementById instead of variable
    scrollToBottom();
});

socket.on('chat message', (msg) => {
    console.log(msg);

    const item = document.createElement('li');
    item.classList.add('chat-message');
    item.innerHTML = `<span class='chat-username'>${msg.Author}</span>: ${msg.Content}`;
    if (msg.image) {
        const img = document.createElement("img");
        img.src = msg.image;
        img.classList.add('image');
        item.appendChild(img);
    }
    document.getElementById('messages').appendChild(item); // Use document.getElementById instead of variable
    scrollToBottom();
});
