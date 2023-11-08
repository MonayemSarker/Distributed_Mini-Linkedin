const { Users } = require('../models/userModel');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');


const jwtSecretKey = process.env.ACCESS_TOKEN_SECRET;

const signUp = async (req, res) => {
    const userName = req.body.userName;
    const userEmail = req.body.userEmail;
    const password = req.body.password;
    console.log(userEmail);
    console.log(userName);
    console.log(password);

        // bcrypt.hash(password, 5).then(async (hash) => {
        //     console.log("Tmi ki kaj korteso?")
        //     await Users.create(
        //         {
        //             userName: userName,
        //             userEmail: userEmail,
        //             password: hash
        //         }
        //     )
        //     res.json({ message: "Sign Up Successful" })
        // })

        await Users.create(
            {
                userName: userName,
                userEmail: userEmail,
                password: password
            }
        )

}

const getUser = async (req, res) => {
    const userEmail = req.body.userEmail;
        await Users.findOne({
            userEmail: userEmail
        }).then((user) => {
            console.log(user);
            res.json(user);
        })
}

const login = async (req, res) => {
    const userEmail = req.body.userEmail;
    const password = req.body.password;
    console.log(req.body);
        await Users.findOne({ userEmail: userEmail }).then((foundUSer) => {
            // bcrypt.compare(password, foundUSer.password).then((match) => {
                // if (!match) {
                console.log(foundUSer);
                if(password !== foundUSer.password) {
                    res.json({ message: "LogIn failed" });
                } else {
                    const user = {
                        userEmail: foundUSer.userEmail,
                        id: foundUSer.id,
                        userName: foundUSer.userName,
                    }
                    const accessToken = jwt.sign(user, jwtSecretKey);
                    console.log(accessToken);
                    res.status(200).json({
                        token: accessToken
                    })
                }
            })
        // })
}

module.exports = {
    signUp,
    login,
    getUser
}