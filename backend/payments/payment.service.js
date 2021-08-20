const db = require('_helpers/db');

module.exports = {
    createPaymentmethod,
    updatePaymentmethod,
    getPaymentMethods,
    deletePaymentMethod,
    getConversionBetweenUSDPHP,
    
    createTransaction,
    getTransactionById,
    getAllTransactionsByUserId
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
    return await db.Transaction.create(params);
}
async function getTransactionById(id) {
    return await getTransaction(id);
}
async function getAllTransactionsByUserId(id) {
    const transactions = await db.Transaction.findAll({ where: { userId: id }});
    if (!transactions) throw 'NO TRANSACTION';
    return transactions;
}
async function getTransaction(id) {
    const transaction = await db.Transaction.findByPk(id);
    if (!transaction) throw 'Transaction not found';
    return transaction;
}