import mongoose from "mongoose";

import mongojs from "mongojs";

import config from './../../etc/config.json';

import './../models/Transactions';

const Transaction = mongoose.model('Transaction');

export function setUpConnection() {
  mongoose.connect('mongodb://YauhenKavalchuk:12177rq@ds139362.mlab.com:39362/ewallet');

  // Remove after cheking
  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() { console.log('ok-good'); });
}

export function listTransactions(id) {
  return Transaction.find();
}

export function createTransaction(data) {
  const transaction = new Transaction({
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
