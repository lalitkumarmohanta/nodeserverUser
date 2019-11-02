const express = require('express');
const router = express.Router();
const User = require('../models/User');
const mongoseHelper = require('../helper/mongooes');
const jwt = require('jsonwebtoken');
const config = require('../config/dev')

router.post('/auth', (req, res) => {
    let { email, password } = req.body;
    if (!password || !email) {
        return res.status(404).send({ error: [{ title: 'Data Missing', detail: "please provide email and password!" }] });
    }
    User.findOne({ email }, (err, user) => {
        if (err) {
            return res.status(404).send({ errors: mongoseHelper.normalizeErrors(err.errors) });
        };
        if (!user) {
            return res.status(404).send({ error: [{ title: 'Invlid User', detail: "User Does not exist!" }] });
        }
        if (user.comparePassword(password)) {
            const token = jwt.sign({
                userId: user.id,
                username: user.username
            }, config.SECRET, { expiresIn: '1h' });
            res.json(token);
        } else {
            return res.status(404).send({ error: [{ title: 'Invlid input', detail: "User name and password are invalid!!" }] });

        }

    })
});

router.post('/register', (req, res) => {
    let { username, email, password, passwordConfirmation } = req.body;
    if (!username || !email) {
        return res.status(404).send({ error: [{ title: 'user error', detail: "please provide a user name and email!" }] });
    }
    if (password != passwordConfirmation) {
        return res.status(404).send({ error: [{ title: 'Password MissMatch', detail: "Password and Confirm password shold match!" }] });
    }
    User.findOne({ email }, (err, exituser) => {
        if (err) {
            return res.status(404).send({ errors: mongoseHelper.normalizeErrors(err.errors) });
        };
        if (exituser) {
            return res.status(404).send({ error: [{ title: 'exited User', detail: "user is laredy exit!" }] });
        }
        const user = new User({
            username,
            email,
            password
        })
        user.save(err => {
            if (err) {
                res.status(404).send({ errors: mongoseHelper.normalizeErrors(err.errors) });
            };
            return res.send({ "resistred": true })

        })
    })
})

module.exports = router;