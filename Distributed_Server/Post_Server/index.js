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


const routerPost = require('./routes/postRoute.js')
app.use('/post', routerPost);

// const port = process.env.PORT

mongoose.connect("mongodb://post_db:27017/postDB").then((result) => {
    app.listen(8082, () => {
        console.log("Server is running on port 8082");
    })
})




app.get('/post', (req, res) => {
    console.log(8082)
    res.json({ message: 'Hello' })
})
