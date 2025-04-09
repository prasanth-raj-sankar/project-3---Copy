const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categories_model = new Schema({
    type: { type: String, default: "Investment" },
    color: { type: String, default: "rgb(255, 99, 132)" }
});

const transaction_model = new Schema({
    name: { type: String, default: "Anonymous" },
    type: { type: String, default: "Investment" },
    amount: { type: Number },
    date: { type: Date, default: Date.now } // ✅ Corrected default date
});

const Categories = mongoose.model('categories', categories_model);
const Transaction = mongoose.model('transactions', transaction_model);

exports.default = Transaction;
module.exports= {
    Categories,
    Transaction
}





// const mongoose = require('mongoose')

// const Schema = mongoose.Schema;

// const categories_model = new Schema({
//     type:{type:String, default:"Investment"},
//     color:{type:String, default:"rgb(255, 99, 132)"}
// })

// const transaction_model = new Schema({
//     name:{type:String ,default:"Anonymous"},
//     type:{type:String, default:"Inverstment"},
//     amount:{type:Number},
//     // data:{type:Data, default:Data.now}
//     date: { type: Date, default: () => Date.now() } 
// })

// const Categories = mongoose.model('categories',categories_model)
// const Transaction = mongoose.model('transaction',transaction_model);


// exports.default = Transaction;
// module.exports= {
//     Categories,
//     Transaction
// }



// // Corrected Exports
// module.exports = {
//     Categories,
//     Transaction
// };