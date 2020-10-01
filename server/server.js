const express = require('express');
const mongoose = require('mongoose');
const note = require('./models/note');
const app = express();

const API_PORT = process.env.port || 8080

app.use(express.json())


const dbPath = 'mongodb+srv://mern-app-comment-videos:CzvQDQLUpo2E9FXx@cluster0.dt6l0.mongodb.net/you_note?retryWrites=true&w=majority'; //paste in path/link from mongo db

mongoose.connect(dbPath, {
    dbName: 'you_note',
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connected to the DB.")
}).catch((err) => console.log("Error connecting to the database"))




app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`))