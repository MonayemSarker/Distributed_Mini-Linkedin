const postController = require('../controller/postController')
const express = require('express');
const router = express.Router();
const authentication = require('../middleware/authentication');

router.post('/create',authentication, postController.createPost)
// router.post('/create/:id', postController.createPost)
// router.get('/get', authentication, postController.getPosts)
router.get('/get', authentication, postController.getPosts)
// router.get('/getOne/:postId', postController.getOnePost);
router.post('/upload', postController.uploadImage);

module.exports = router