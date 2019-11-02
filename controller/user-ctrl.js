const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/dev')
const mongoseHelper = require('../helper/mongooes');




exports.authMiddleWare = function (req, res, next) {
    const token = req.headers.authorization;
    if (token) {
        const user = parseToken(token);
        User.findById(user.userId, (err, user) => {
            if (err) {
                return res.status(404).send({ errors: mongoseHelper.normalizeErrors(err.errors) });
            };
            if (user) {
                res.locals.user = user;
                next();
            } else {
                return res.status(404).send({ error: [{ title: 'Not authorised', detail: "login to get access!" }] });
            }
        });
    } else {
        return res.status(404).send({ error: [{ title: 'Not authorised', detail: "login to get access!" }] });

    }
};
function parseToken(token) {
    return jwt.verify(token.split(' ')[1], config.SECRET)
}