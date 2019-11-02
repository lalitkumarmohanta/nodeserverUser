const express = require('express');
const router = express.Router();
const Rental = require('../models/Rental');
const UserCtrl = require('../controller/user-ctrl');

router.get('/goo', UserCtrl.authMiddleWare, (req, res) => {


    res.json({ "sgooo": true });
})

router.get('/', (req, res) => {
    Rental.find({}, (err, data) => {
        if (err) console.log(err);

        res.json(data);
    })
});

router.get('/:id', (req, res) => {
    const _id = req.params.id;
    Rental.findById(_id, (err, data) => {
        if (err) {
            res.status(404).send({ error: [{ title: 'rental error', detail: "couldn't found the rental" }] });
        };
        res.json(data);
    })
})

module.exports = router;