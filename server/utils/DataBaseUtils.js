import mongoose from "mongoose";

import config from './../../etc/config.json';

import './../models/Transactions';

const Transaction = mongoose.model('Transaction');

export function setUpConnection() {
  mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
}

export function listTransactions(id) {
  return Transaction.find();
}

export function createTransaction(data) {
  const Transaction = new Note({
      title: data.title,
      text: data.text,
      money: data.money,
      category: data.category,
      createdAt: new Date()
  });

  return transaction.save();
}

export function deleteTransaction(id) {
  return Transaction.findById(id).remove();
}
