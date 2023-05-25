var express = require('express');
var router = express.Router();
var config = process.env;
var categoryService = require('../services/category.service');
var auth = require("../middleware/auth");
// routes

router.post('/register', auth, register);
router.post('/', auth, getAll);
router.post('/:id', auth, getById);
router.put('/', auth, update);
router.delete('/:id', auth, _delete);
// router.post('/count', count);
// router.post('/findOne', findOne)
module.exports = router;


function register(req, res) {
    if (req?.body?.id == null || req?.body?.id == undefined) {
        categoryService.create(req.body)
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

    categoryService.getAll(req.body)
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

    categoryService.update(req.body)
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
    req.body.id = req.params.id;

    categoryService._delete(req.body)
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
        categoryService.getById(req.body)
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