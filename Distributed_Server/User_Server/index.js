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

const routerUser = require('./routes/userRoute.js')
app.use('/user', routerUser);

const port = process.env.PORT

mongoose.connect("mongodb://user_db:27017/userDB").then((result) => {
    app.listen(8081, () => {
        console.log("Server is running on port " + port);
    })
})




app.get('/', (req, res) => {
    // console.log(port)
    res.json({ message: 'Hello' })
})
