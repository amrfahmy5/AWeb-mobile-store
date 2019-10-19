const mongoose =require('mongoose');
const product = require('../model/product_db');


mongoose.connect("mongodb://localhost/mobile-store",{ useUnifiedTopology: true , useNewUrlParser: true},(error)=>{
  if(error)
    console.log(error);
  else
    console.log("connecting...")
})


var x = {'name':0,'network':0,'launch':0,'body':0}
var product_arr = []
for(var i=0 ; i<6;i++)
{
    x.name=i;
    x.network=i;
    x.launch=i;
    x.body=i;
    product_arr.push(x);
}
for(var i=0 ; i<6;i++)
{
    const p = new product(product_arr[i]);
    p.save((error,result)=>{
        
        if(error)
            console.log(error)
        else
            console.log("added")
    })
}
mongoose.disconnect()