const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { db } = require('../models/user.model');
const userRoutes = require('../routes/user.routes');

module.exports = {
    register: (req, res) => {
        console.log(req.body);

        const userReg = new User(req.body);

        userReg.save()
        .then(() => {
            res.json({ message: "Successfully Registered", user: userReg })
        })
        .catch((err) => {
            res.status(400).json(err);
        })
    },

    update: (req, res) => {

        const id = req.params.id;

        const order = req.body;

        User.findByIdAndUpdate(id, order, {
            new: true,
            runValidators: true, 
        })
        .then((item) => {

            res.json(item);
        })
        .catch((err) => {
            console.log("error found in update");
            console.log(err);
            res.json(err);
        });
        
    },


    favorite: (req, res) => {

        const id = req.params.id;
        const favorite = req.body;

        User.findByIdAndUpdate(id, {}, {
            new: true,
            runValidators: true, 
        })
        .then(
            User.findByIdAndUpdate(id, favorite, {
                new: true,
                runValidators: true, 
            })
            .then((item) => {

                res.json(item);
            })
            .catch((err) => {
                console.log("error found in favorite");
                console.log(err);
                res.json(err);
            })
        );
    },



    login: (req, res) => {


        User.findOne( { email: req.body.email } )
        .then((userRecord) => {
            if(userRecord === null) {
            res.status(400).json({ message: "Invalid login attempt 1"});
            } else {

            bcrypt.compare(req.body.password, userRecord.password)
                .then((passwordIsValid) => {
                if(passwordIsValid) {
                    console.log("pw is valid");
                    res.cookie(
                    "usertoken",
                    jwt.sign(
                        {
                        _id: userRecord._id,
                        firstName: userRecord.firstName,

                        },
                        "secret"),
                    {
                        httpOnly: true,
                        expires: new Date(Date.now() + 900000000),
                    }
                    )
                    .json({
                    message: "Successfully logged in!",
                    userLoggedIn: {
                        userName: `${userRecord.firstName} ${userRecord.lastName}`,
                    },
                    id: userRecord._id
                    })
                } else {

                    res.status(400).json({ message: "Invalid login attempt 2"});
                }
                })
                .catch(err => {
                console.log(err);
                res.status(400).json({ message: "Invalid login attempt 3"});
                })
            }
        })
        .catch(err => {
            res.status(400).json({ message: "Invalid login attempt 4"});
        })
    },

    logout: (req, res) => {
        res.clearCookie("usertoken");
        res.json({ message: "usertoken cookie cleared" });
    },

    getLoggedInUser(req, res) {
        const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true });


        console.log("herrrrr: " +decodedJWT.payload._id)
        User.findById(decodedJWT.payload._id)
            .then(user => res.json(user))
            .catch(err => res.json(err));
    },

    getOne: (req, res) => {


        User.findById( req.params.id )
        .then((document) => {

            res.json(document);
        })
        .catch((err) => {
            console.log("error found in getOne");
            console.log(err);
            res.json(err);
        });
    },

}