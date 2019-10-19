const mongoose = require('mongoose');

const card_db = mongoose.Schema({
    _id:{
        type:String,
        require:true
    },
    totalPrice:{
        type:Number,
        require:true
    },
    totalQuantity:{
        type:Number,
        require:true
    },
    productSelection:{
        type:[],
        require:true
    }
})

module.exports=mongoose.model('card_db',card_db);