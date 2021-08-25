const db = require('_helpers/db');
const config = require('config.json');
const { param } = require('./payments.controller');
const userService = require('../users/user.service');
const sgMail = require('@sendgrid/mail');

module.exports = {
    createPaymentmethod,
    updatePaymentmethod,
    getPaymentMethods,
    deletePaymentMethod,
    getConversionBetweenUSDPHP,
    
    createTransaction,
    getTransactionById,
    getAllTransactionsByUserId,
    getTransactions
};

async function createPaymentmethod(params) {
    // validate
    if (await db.Paymentmethod.findOne({ where: { userId: params.userId, selectedCurrency: params.selectedCurrency } })) {
        throw '"' + params.name + '" is already added by you';
    }

    await db.Paymentmethod.create(params);
}

async function updatePaymentmethod(id, params) {
    const paymentMethod = await getPaymentMethod(id);
    Object.assign(paymentMethod, params);
    await paymentMethod.save();

    return paymentMethod.get();
}

async function getPaymentMethods(userId) {
    return await getPaymentMethodsByUserId(userId);
}

async function getPaymentMethod(id) {
    const paymentMethod = await db.Paymentmethod.findByPk(id);
    if (!paymentMethod) throw 'Payment method not found';
    return paymentMethod;
}

async function getPaymentMethodsByUserId(userId) {
    const paymentmethods = await db.Paymentmethod.findAll({ where: { userId: userId }});
    if (!paymentmethods) throw 'NO PAYMENT METHOD YET';
    return paymentmethods;
}

async function deletePaymentMethod(id) {
    const paymentMethod = await getPaymentMethod(id);
    await paymentMethod.destroy();
}

async function getConversionBetweenUSDPHP() {
    const conversionRate = await db.Conversion.findOne({ where: { fromCurrency: "USD", toCurrency: "PHP" }});
    if (!conversionRate) return 50.01;
    return conversionRate.rate;
}

///////////////////////////////////// Transaction ////////////////////////////////////
async function createTransaction(params) {
    const orderId = randomOrderId();
    params['orderId'] = orderId;
    const newTransaction = await db.Transaction.create(params);
    sgMail.setApiKey(config.mail.sendgrid_api);
    const user = await userService.getById(params.userId)

    let htmlContent = '<html>'
                        +'<head>'
                        +'<title>Unicash Team</title>'
                        +'<style>'
                        +'  * {'
                            +'      font-family: Arial, Helvetica, sans-serif;'
                            +'}'
                            +'</style>'
                            +'</head>'
                        +'<body aria-readonly="false">'
                        +'<h3>Dear '+params.fullName+',</h3>'
                        
                        
                        +'<h4>Thank you for signing up to use Unicash. A secure and trusted exchange service that will serve your transaction needs.</h4>'
                        
                        +'<h4>Here is your exchange transaction information, and it is currently processing.</h4>'
                        
                        +'<div style="display: flex;"><h4 style="width: 140px;">You send:</h4> <h3 style="font-weight: 800;">'+params.sendAmount + ' ' + params.from +'</h3></div>'
                        +'<div style="display: flex;margin-top: -35px"><h4 style="width: 140px;">You received:</h4> <h3 style="font-weight: 800;">'+params.amount+' PHP '+params.to+'</h3></div>'
                        '<div style="display: flex;margin-top: -35px"><h4 style="width: 140px;">Order Id:</h4> <h3 style="font-weight: 800;">'+orderId+'</h3></div>'
                        +'<div style="display: flex;margin-top: -35px"><h4 style="width: 140px;">Status:</h4> <h3 style="font-weight: 800;">'+params.status+'</h3></div>'
                        
                        +'<h4>We will send you email transaction information once completed.</h4>'
                        
                        +'<h4>Having trouble in your transaction? Please send us email support at <a href="email:'+config.mail.from+'">'+config.mail.from+'</a></h4>'
                        
                        +'<h3>Unicash Team</h3>'
                        +'</html>'
    if (params.status === 'Completed') 
            htmlContent = '<html>'
                        +'<head>'
                        +'<title>Unicash Team</title>'
                        +'<style>'
                        +'  * {'
                            +'      font-family: Arial, Helvetica, sans-serif;'
                            +'}'
                            +'</style>'
                            +'</head>'
                        +'<body aria-readonly="false">'
                        +'<h3>Dear '+params.fullName+',</h3>'
                        
                        
                        +'<h4>Thank you for signing up to use Unicash. A secure and trusted exchange service that will serve your transaction needs.</h4>'
                        
                        +'<h4>Here is your exchange transaction information, and it is currently processing.</h4>'
                        
                        +'<div style="display: flex;"><h4 style="width: 140px;">You send:</h4> <h3 style="font-weight: 800;">'+params.sendAmount + ' ' + params.from +'</h3></div>'
                        +'<div style="display: flex;margin-top: -35px"><h4 style="width: 140px;">You received:</h4> <h3 style="font-weight: 800;">'+params.amount+' PHP '+params.to+'</h3></div>'
                        '<div style="display: flex;margin-top: -35px"><h4 style="width: 140px;">Order Id:</h4> <h3 style="font-weight: 800;">'+orderId+'</h3></div>'
                        +'<div style="display: flex;margin-top: -35px"><h4 style="width: 140px;">Status:</h4> <h3 style="font-weight: 800;">'+params.status+'</h3></div>'
                        
                        +'<h4>Please give us a feedback <a href="https://www.unicash.ph/feedback">https://www.unicash.ph/feedback</a></h4>'
                        
                        +'<h4>Having trouble in your transaction? Please send us email support at <a href="email:'+config.mail.from+'">'+config.mail.from+'</a></h4>'
                        
                        +'<h3>Unicash Team</h3>'
                        +'</html>'
        
    const msg = {
        to: user.email,
        from: config.mail.from,
        subject: 'Welcome to Unicash',
        text: 'Transaction',
        html: htmlContent
      };

    //if (params.status === 'Processing' || params.status === 'Completed')
    sgMail
        .send(msg)
        .then(() => {}, error => {
            console.error(error);

            if (error.response) {
            console.error(error.response.body)
            }
        });

    return newTransaction;
}
async function getTransactionById(id) {
    return await getTransaction(id);
}
async function getAllTransactionsByUserId(id) {
    const transactions = await db.Transaction.findAll({ order: [['id', 'DESC']], where: { userId: id }});
    if (!transactions) throw 'NO TRANSACTION';
    return transactions;
}
async function getTransactions() { // Limited 5
    const transactions = await db.Transaction.findAll({ limit: 5, order: [['id', 'DESC']]});
    if (!transactions) throw 'NO TRANSACTION';

    let result = [];
    transactions.forEach((transaction, index) => {
        result.push({
            ...transaction.dataValues,
            userName: "unknown"
        })
    });
    return result;
}
async function getTransaction(id) {
    const transaction = await db.Transaction.findByPk(id);
    if (!transaction) throw 'Transaction not found';
    return transaction;
}

function randomOrderId() {
    var length = 6;
    var charset = "0123456789";
    var retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }