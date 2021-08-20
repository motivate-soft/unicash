import { authHeader } from '../_helpers';

const serverURL = 'http://localhost:4000';

export const paymentService = {
    addPaymentmethod,
    getPaymentMethodsById,
    updatePaymentmethod,
    deletePaymentmethod,
    getConversionPrice,
    // Transction
    createTransaction,
    getTransactionById,
    getMyAllTransaction,
    getTransactions
};

function addPaymentmethod(payment) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(payment)
    };

    return fetch(`${serverURL}/payment/addPaymentmethod`, requestOptions).then(handleResponse);
}

function updatePaymentmethod(id, payment) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(payment)
    };

    return fetch(`${serverURL}/payment/updatePaymentmethod/${id}`, requestOptions).then(handleResponse);
}

function deletePaymentmethod(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${serverURL}/payment/paymentmethod/${id}`, requestOptions).then(handleResponse);
}

function getPaymentMethodsById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${serverURL}/payment/paymentmethod/${id}`, requestOptions).then(handleResponse);
}

function getConversionPrice(symbol) {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`${serverURL}/payment/getConversionPrice?symbol=${symbol}`, requestOptions).then(handleResponse);
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

//////////////////////// Transaction /////////////////////////
function createTransaction(transaction) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(transaction)
    };

    return fetch(`${serverURL}/payment/createTransaction`, requestOptions).then(handleResponse);
}
function getMyAllTransaction(userId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${serverURL}/payment/getAllTransactions/${userId}`, requestOptions).then(handleResponse);
}

function getTransactions() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${serverURL}/payment/getTransactions`, requestOptions).then(handleResponse);
}

function getTransactionById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${serverURL}/payment/getTransaction/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}