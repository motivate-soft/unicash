const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const userService = require('./user.service');

// routes
router.post('/authenticate', authenticateSchema, authenticate);
router.post('/register', registerSchema, register);
router.get('/verify', getVerify);
router.post('/forgotPasswordToConfirmEmail', forgotPasswordToConfirmEmailSchema, forgotPasswordToConfirmEmail);
router.post('/forgotPassword', forgotPasswordSchema, forgotPassword);
router.get('/', authorize(), getAll);
router.get('/current', authorize(), getCurrent);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(), updateSchema, update);
router.put('/updatePassword/:id', authorize(), updatePasswordSchema, updatePassword);
router.delete('/:id', authorize(), _delete);

module.exports = router;

function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => res.json(user))
        .catch(next);
}

function registerSchema(req, res, next) {
    const schema = Joi.object({
        fullName: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().min(6).required()
    });
    validateRequest(req, next, schema);
}

function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({ status: true, message: 'Registration successful.' }))
        .catch(next);
}

function forgotPasswordToConfirmEmailSchema(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function forgotPasswordToConfirmEmail(req, res, next) {
    userService.forgotPasswordToConfirmEmail(req.body)
        .then(user => res.json(user))
        .catch(next);
}

function forgotPasswordSchema(req, res, next) {
    const schema = Joi.object({
        code: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

function forgotPassword(req, res, next) {
    userService.forgotPassword(req.body)
        .then(user => res.json(user))
        .catch(next);
}

function getVerify(req, res, next) {
    if (req.query.email && req.query.verifyCode && req.query.password) {
        userService.getByEmail(req.query.email)
            .then(async user => {
                if (user && user.verifyCode == req.query.verifyCode) {
                    if (!user.emailVerified) {
                        user.emailVerified = true;
                        await user.save();
                    }
                    res.json({message: "Verification successful."})
                } else {
                    throw "Verification code is incorrect."
                }
            })
            .catch(next);
    } else {
        throw 'Invald request'
    }
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function getCurrent(req, res, next) {
    res.json(req.user);
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        fullName: Joi.string().empty(''),
        email: Joi.string().empty(''),
        address: Joi.string().empty(''),
        birthday: Joi.string().empty(''),
        is2FA: Joi.boolean().empty(''),
        password: Joi.string().min(6).empty('')
    });
    validateRequest(req, next, schema);
}

function updatePasswordSchema(req, res, next) {
    const schema = Joi.object({
        oldPassword: Joi.string().empty(''),
        password: Joi.string().empty('')
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(user => res.json(user))
        .catch(next);
}

function updatePassword(req, res, next) {
    userService.updatePassword(req.params.id, req.body)
        .then(user => {
            res.json(user)
        })
        .catch(next);
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({ message: 'User deleted successfully' }))
        .catch(next);
}