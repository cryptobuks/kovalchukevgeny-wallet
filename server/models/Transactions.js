import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    title     : { type: String },
    text      : { type: String, required: true },
    money     : { type: Number, required: true },
    category  : { type: String },
    createdAt : { type: Date }
});

mongoose.model('Transaction', TransactionSchema);
