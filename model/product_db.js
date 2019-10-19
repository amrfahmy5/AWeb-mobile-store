
const Mongoose = require('mongoose')

var product =Mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    network:{
        type:String,
        require:true,
    },
    launch:{
        type:String,
        require:true,
    },
    body:{
        type:String,
        require:true,
    },
})

module.exports=Mongoose.model('product',product)