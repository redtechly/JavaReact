const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:3030", // Your React frontend URL
    methods: ["GET", "POST"]
  }
});
const mongoose = require('mongoose');
const multer = require('multer');
const Tesseract = require('tesseract.js');
const cors = require('cors');

// Enable CORS
app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

const Mongo_db = "mongodb+srv://hazem:1234@cluster0.7enpft6.mongodb.net/";

mongoose.connect(Mongo_db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((conn) => {
        console.log(`database connected ${conn.connection.host}`);
    }).catch((err) => {
        console.log(err);
    });

const MessagesSchema = new mongoose.Schema({
    Author: String,
    Content: String,
    image: String
});

const Messages = mongoose.model('Messages', MessagesSchema);

io.on('connection', (socket) => {
    console.log('new client is connecting');

    socket.on('username', (username) => {
        console.log("the logged username is " + username);
        socket.username = username;
        io.emit("userJoined", username);
    });

    socket.on('chat message', async (msg) => {
        if (msg.image) {
            try {
                const result = await Tesseract.recognize(
                    msg.image,
                    'eng',
                    { logger: m => console.log(m) }
                );
                msg.Content = result.data.text.trim();
            } catch (error) {
                console.error('Error extracting text from image:', error);
            }
        }
        const message = new Messages({
            Author: msg.Author,
            Content: msg.Content,
            image: msg.image
        });

        message.save()
            .then(() => {
                io.emit("chat message", msg);
            })
            .catch((err) => {
                console.log(err);
            });
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        io.emit("user left", socket.username);
    });
});

app.use(express.static('public'));

http.listen(5000, () => {
    console.log('listening on *:5000');
});
