const { Notifications } = require('../models/notificationModel');




const getAll = async (req, res) => {
    console.log("I want to get all notifications");
        const sixHoursAgo = new Date();
        sixHoursAgo.setHours(sixHoursAgo.getHours() - 6);


        await Notifications.deleteMany({ createdAt: { $lt: sixHoursAgo } });

        const newNotifications = await Notifications.find();
        res.json(newNotifications);
}

const createN = async (req, res) => {
    const notification = req.body.notification;
    const newPost = req.body.newPost;

    await Notifications.create({
        notification: notification,
        _postId: newPost._id,
        _userName: newPost._userName
    })
    console.log(notification);
    res.json({ message: "Notification Sent successfully" });
}




module.exports = {
    getAll,
    createN,
}  
