import axios from 'axios';

export default {
    listTransactions() {
        return axios.get(`http://localhost:3000/transactions`);
    },

    createTransaction(data) {
        return axios.post(`http://localhost:3000/transactions`, data);
    },

    deleteTransaction(transactionId) {
        return axios.delete(`http://localhost:3000/transactions/${transactionId}`);
    }
};
