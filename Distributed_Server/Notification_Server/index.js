const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');;
const bodyParser = require('body-parser');
// const { minIoClient } = require('./controller/postController');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());



const routerNotification = require('./routes/notificationRoute.js')
app.use('/notification', routerNotification);

// const port = process.env.PORT

mongoose.connect("mongodb://notification_db:27017/notificationDB").then((result) => {
    app.listen(8083, () => {
        console.log("Server is running on port 8083");
    })
})




app.get('/', (req, res) => {
    console.log(port)
    res.json({ message: 'Hello' })
})
