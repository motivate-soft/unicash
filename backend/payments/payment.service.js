const db = require('_helpers/db');

module.exports = {
    createPaymentmethod,
    updatePaymentmethod,
    getPaymentMethods
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