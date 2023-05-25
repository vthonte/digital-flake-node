var express = require('express');
var router = express.Router();
var config = process.env;
var userService = require('../services/user.service');
var auth = require("../middleware/auth");
// routes

router.post('/register', register);
router.post('/login', login);
router.post('/', auth, getAll);
router.post('/:_id', auth, getById);
router.put('/', auth, update);
router.delete('/:_id', auth, _delete);
// router.post('/count', count);
// router.post('/findOne', findOne)
module.exports = router;


function register(req, res) {

    if (req?.body?.email) {
        req.body.username = req?.body?.email;
    } else {
        return res.json({ message: "Please provide email address" });
    }

    if (req?.body?.username
        && req?.body?.password
        && req?.body?.password === req?.body?.confirmPassword) {
        userService.create(req.body)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (err) {
                console.log(err);
                res.status(400).send(err);
            });
    } else {
        res.status(400).json({ message: "Please enter correct data" });
        return;
    }
    return;
}



function login(req, res) {

    if (req?.body?.password && req.body?.username) {
        userService.login(req.body)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (err) {
                console.log(err);
                res.status(400).send(err);
            });
    } else {
        res.status(400).json({ message: "Please enter correct data" });
        return;
    }
    return;
}





function getAll(req, res) {

    userService.getAll(req.body)
        .then(function (data) {
            res.json(data);
        })
        .catch(function (err) {
            console.log(err);
            res.status(400).send(err);
        });

    return;
}


function update(req, res) {

    userService.update(req.body)
        .then(function (data) {
            res.json(data);
        })
        .catch(function (err) {
            console.log(err);
            res.status(400).send(err);
        });

    return;
}


function _delete(req, res) {

    userService._delete(req.body)
        .then(function (data) {
            res.json(data);
        })
        .catch(function (err) {
            console.log(err);
            res.status(400).send(err);
        });

    return;
}


function getById(req, res) {

    if (!req?.body?.id) {
        return res.json({ message: "Not Found" });
    } else {
        userService.getById(req.body)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (err) {
                console.log(err);
                res.status(400).send(err);
            });
    }

    return;
}