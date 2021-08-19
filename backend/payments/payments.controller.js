const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const paymentService = require('./payment.service');

router.post('/addPaymentmethod', authorize(), createPaymentMethod);
router.put('/updatePaymentmethod/:id', authorize(), updatePaymentMethod);
router.get('/paymentmethod/:id', authorize(), getPaymentMethodsById);
router.delete('/paymentmethod/:id', authorize(), deletePaymentmethod);

module.exports = router;

function createPaymentMethodSchema(req, res, next) {
    const schema = Joi.object({
        userId: Joi.number().required(),
        selectedCurrency: Joi.number().required(),
        name: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function createPaymentMethod(req, res, next) {
    paymentService.createPaymentmethod(req.body)
        .then(() => res.json({ status: true, message: 'Added successfully' }))
        .catch(next);
}

function updatePaymentMethod(req, res, next) {
    paymentService.updatePaymentmethod(req.params.id, req.body)
        .then(paymentMethod => res.json(paymentMethod))
        .catch(next);
}

function getPaymentMethodsById(req, res, next) {
    paymentService.getPaymentMethods(req.params.id)
        .then(paymentMethods => res.json(paymentMethods))
        .catch(next);
}

function deletePaymentmethod(req, res, next) {
    paymentService.deletePaymentMethod(req.params.id)
        .then(() => res.json({ message: 'Payment method deleted successfully' }))
        .catch(next);
}