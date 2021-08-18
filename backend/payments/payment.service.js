const db = require('_helpers/db');

module.exports = {
    createPaymentmethod,
    getPaymentMethods
};

async function createPaymentmethod(params) {
    // validate
    if (await db.Paymentmethod.findOne({ where: { userId: params.userId, selectedCurrency: params.selectedCurrency } })) {
        throw '"' + params.name + '" is already added by you';
    }

    await db.Paymentmethod.create(params);
}

async function getPaymentMethods(userId) {
    return await getPaymentMethodsByUserId(userId);
}


async function getPaymentMethodsByUserId(userId) {
    const paymentmethods = await db.Paymentmethod.findAll({ where: { userId: userId }});
    if (!paymentmethods) throw 'NO PAYMENT METHOD YET';
    return paymentmethods;
}