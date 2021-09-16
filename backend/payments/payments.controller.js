const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize');
const admin = require('_middleware/admin');
const paymentService = require('./payment.service');
const request = require('request');
const userService = require('../users/user.service');

const querystring = require('querystring');
const http = require('http');

router.get('/getConversionPrice', getConversionPrice);
router.get('/getTransactions', getTransactions);
router.post('/addPaymentmethod', authorize(), createPaymentMethod);
router.put('/updatePaymentmethod/:id', authorize(), updatePaymentMethod);
router.get('/paymentmethod/:id', authorize(), getPaymentMethodsById);
router.delete('/paymentmethod/:id', authorize(), deletePaymentmethod);
// Transction
router.post('/createTransaction', authorize(), createTransaction);
router.get('/getTransaction/:id', authorize(), getTransactionById)
router.get('/getAllTransactions/:userId', authorize(), getAllTransactionsByUserId)
router.get('/getTotalAmountPerDay', authorize(), getTotalAmountPerDay)
router.post('/postETHDetect', authorize(), postETHDetect);
router.post('/postOtherDetect', authorize(), postOtherDetect);
router.post('/postUSDTDetect', authorize(), postUSDTDetect);

// Admin
router.get('/getAllTransactionsForAdmin', admin(), getAllTransactionsForAdmin);

module.exports = router;

function getConversionPrice(req, res, next) {
    if (req.query.symbol) {
        let symbolSigner = req.query.symbol;
        if (symbolSigner == 'USDTUSDT') symbolSigner = "USDCUSDT"
        request('https://api.binance.com/api/v3/ticker/price?symbol=' + symbolSigner, function (error, response, body) {
            if (error) {
                res.json({data: JSON.stringify({ symbol: symbolSigner, price: 4829.23 }), conversionRate: 50.01, status: true})
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
        .then(transactions => {
            transactions.forEach(async (transaction, index) => {
                const userName = await userService.getUsernameById(transaction.userId);
                transaction['userName'] = userName.slice(0, 5) + '***';
                if (index === transactions.length - 1) {
                    res.json(transactions)
                }
            });
        })
        .catch(next);
}

function getAllTransactionsForAdmin(req, res, next) {
    paymentService.getAllTransactions()
        .then(transactions => {
            transactions.forEach(async (transaction, index) => {
                const userName = await userService.getUsernameById(transaction.userId);
                transaction['userName'] = userName;
                if (index === transactions.length - 1) {
                    res.json(transactions)
                }
            });
        })
        .catch(next);
}

function getTotalAmountPerDay(req, res, next) {
    if (req.query.user && req.query.date) {
        const userId = req.query.user;
        const currDate = req.query.date;
        paymentService.getTotalAmountPerDay(userId, currDate).then(
         result => res.json({status: true, data: result})   
        ).catch(next)
    } else {
        throw 'Invalid request'
    }
}

function postETHDetect(req, res, next) {

    request.post(
        'http://194.233.77.30:8080/v1/ethbalance',
        { json: req.body },
        function (error, response, body) {
            if (!error && response.statusCode == 200) { // && response.statusCode == 200
                res.json(body)
            } else {
                res.json({error: true, message: response})
            }
        }
    );
}

function postUSDTDetect(req, res, next) {

    request.post(
        'http://194.233.77.30:8080/v1/tokenbalance',
        { json: req.body },
        function (error, response, body) {
            if (!error && response.statusCode == 200) { // && response.statusCode == 200
                res.json(body)
            } else {
                res.json({error: true, message: response})
            }
        }
    );
}

function postOtherDetect(req, res, next) {

    request.post(
        'http://194.233.77.30:8080/v1/tokenbalance',
        { json: req.body },
        function (error, response, body) {
            if (!error && response.statusCode == 200) { // && response.statusCode == 200
                res.json(body)
            } else {
                res.json({error: true, message: response})
            }
        }
    );
}