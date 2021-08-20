const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const paymentService = require('./payment.service');
const request = require('request');

router.get('/getConversionPrice', getConversionPrice);
router.post('/addPaymentmethod', authorize(), createPaymentMethod);
router.put('/updatePaymentmethod/:id', authorize(), updatePaymentMethod);
router.get('/paymentmethod/:id', authorize(), getPaymentMethodsById);
router.delete('/paymentmethod/:id', authorize(), deletePaymentmethod);
// Transction
router.post('/createTransaction', authorize(), createTransaction);

module.exports = router;

function getConversionPrice(req, res, next) {
    if (req.query.symbol) {
        request('https://api.binance.com/api/v3/ticker/price?symbol=' + req.query.symbol, function (error, response, body) {
            if (error) {
                throw 'Failed: ' + error
            }
            if (response && response.statusCode) {
                paymentService.getConversionBetweenUSDPHP()
                .then(price => res.json({data: body, conversionRate: price, status: true}))
                .catch(next);
            }
        });
    } else {
        throw 'Invald request'
    }
}

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

//////////////////////// Transaction /////////////////////////
function createTransaction(req, res, next) {
    paymentService.createTransaction(req.body)
        .then(transaction => res.json({ status: true, data: transaction, message: 'Added successfully' }))
        .catch(next);
}
