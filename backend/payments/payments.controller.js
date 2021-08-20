const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const paymentService = require('./payment.service');
const request = require('request');

router.get('/getConversionPrice', getConversionPrice);
router.get('/getTransactions', getTransactions)
router.post('/addPaymentmethod', authorize(), createPaymentMethod);
router.put('/updatePaymentmethod/:id', authorize(), updatePaymentMethod);
router.get('/paymentmethod/:id', authorize(), getPaymentMethodsById);
router.delete('/paymentmethod/:id', authorize(), deletePaymentmethod);
// Transction
router.post('/createTransaction', authorize(), createTransaction);
router.get('/getTransaction/:id', authorize(), getTransactionById)
router.get('/getAllTransactions/:userId', authorize(), getAllTransactionsByUserId)

module.exports = router;

function getConversionPrice(req, res, next) {
    if (req.query.symbol) {
        request('https://api.binance.com/api/v3/ticker/price?symbol=' + req.query.symbol, function (error, response, body) {
            if (error) {
                res.json({data: JSON.stringify({ symbol: req.query.symbol, price: 4829.23 }), conversionRate: 50.01, status: true})
            }
            if (response && response.statusCode) {
                request('http://apilayer.net/api/live?access_key=bfd1a4b361f51a8d1109f6fed1485c57&currencies=PHP&source=USD&format=1', function (error_, response_, body_) {
                    if (error_) {
                        res.json({data: body, conversionRate: 50.01, status: true})
                    }
                    if (response_ && response_.statusCode) {
                        try {
                            const price = JSON.parse(body_)['quotes']['USDPHP'];
                            res.json({data: body, conversionRate: price, status: true})   
                        } catch (error) {
                            res.json({data: body, conversionRate: 50.01, status: true})
                        }
                    }
                });
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
function getTransactionById(req, res, next) {
    paymentService.getTransactionById(req.params.id)
        .then(transaction => res.json(transaction))
        .catch(next);
}

function getAllTransactionsByUserId(req, res, next) {
    paymentService.getAllTransactionsByUserId(req.params.userId)
        .then(transaction => res.json(transaction))
        .catch(next);
}

function getTransactions(req, res, next) {
    paymentService.getTransactions()
        .then(transaction => res.json(transaction))
        .catch(next);
}