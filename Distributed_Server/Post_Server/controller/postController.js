const { Posts } = require('../models/postModel');
// const { Notifications } = require('../models/notificationModel');
// const { Users } = require('../models/userModel');
const multer = require('multer');
const Minio = require('minio');
const axios = require("axios");
const asyncHandler = require("express-async-handler");

const upload = multer({
    dest: './public/images', fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only images are allowed!'));
        }
    },
});





const minioClient = new Minio.Client({
    endPoint: 'host.docker.internal',
    port: 9000,
    useSSL: false,
    accessKey: "TJSMINojolVyUzZ5SkPY",
    secretKey: "QQ8do1NdUR2ZB5I8R35X3G6Eukp5ffzDclZ0rksu"
});


async function uploadToMinio(file) {
    const bucketName = "linked-in";
    console.log("upload e ki dhuke?");
    console.log(file);
    const objectKey = Date.now() + ' ' + file.originalname;
    const metaData = {
        'Content-Type': file.mimetype,
    }


    await minioClient.fPutObject(bucketName, objectKey, file.path, metaData, (err, etag) => {
        if (err) {
            console.log(err);
            return null;
        }
    });
    console.log(objectKey);
    return objectKey;
}

async function postNotification(_username, _newPost) {
    const notification = "New post from " + _username;
        try{

            
            const response = await axios.post("http://host.docker.internal/createNotification", {
                notification: notification,
                newPost: _newPost
            });
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    

}

const uploadImage = asyncHandler(async (req, res) => {
    upload.single('image')(req, res, async (err) => {
        console.log("file: ", req.file);
        if (err) {
            return res.status(500).json({ error: 'Error uploading the image.' });
        }

        let _imageId = null;

        if (req.file) {
            _imageId = await uploadToMinio(req.file);
        }

        if (!_imageId) {
            return res.status(400).json({ error: 'No file uploaded.', url: _imageId });
        }

        return res.status(200).json({ message: 'File uploaded successfully.', url: _imageId });
    });

});


const createPost = async (req, res) => {
    console.log(req.file);
    const content = req.body.content;
    const _user = req.user;
    const imageUrl = req.body.imageUrl;

        let newPost = await Posts.create({
            content: content,
            _userId: _user.id,
            _userName: _user.userName,
            _imageId: imageUrl
        })
        console.log(newPost);
        await postNotification(_user.userName, newPost);
        res.json({ message: "Post created successfully" });
    
}

const getPosts = async (req, res) => {
        console.log("Get korte pare?");
        const allPosts = await Posts.find();
        res.json(allPosts);
    
};

const getOnePost = async (req, res) => {
    const _postId = req.params.postId;
    console.log(_postId);
        const post = await Posts.findOne({
            _id: _postId
        });
        console.log(post);
        res.json(post);
}
module.exports = {
    createPost,
    getPosts,
    uploadImage,
    minioClient,
    getOnePost,
}