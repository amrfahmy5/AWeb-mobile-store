
var product_db=require('../model/product_db');

const product = (req, res, next)=> {
    product_db.find({},(error,result)=>{
      if(error)
        console.log(error)
      else
        {
          //console.log(result)
          res.render('index',{'products':result,check:req.isAuthenticated()})
        }
    })
  }
const card_add = (req,res,next)=>{

  const cardId=req.user._id;
  const price = parseInt(req.params.price,10);
  const product = {
      id:req.params.id,
      price:req.params.price
  }
  card_db.findById(cardId,(error,card)=>{
      if(error)
          console.log(error);
      else if(!card)
      {
          const Card = new card_db({
             _id: cardId,
             totalPrice:price,
             productSelection:[product]
          });

          Card.save((error,result)=>{
              if(error)
                 console.log(error);
              else
                  console.log(result)
          })
      }
      else
      {
          
          var index=-1;
          console.log(index);
          for(var i=0;i<card.productSelection.length;i++)
          {
              console.log(card.productSelection[i].id , req.params.id);
              if(card.productSelection[i].id===req.params.id)
                  {
                      index=i;
               
                  }
          }
          console.log(index);
          if(index==-1)
          {
              card.productSelection.push(product);
              card.totalQuantity=card.totalQuantity +1;
              card.totalPrice=card.totalPrice+price;
              card_db.updateOne({_id:card._id},{$set :card},(error,finalres)=>{
                  if(error)
                      console.log("error in update");
                  else
                      console.log(finalres);
              })
          }
          else
              console.log("have product with this name")
      }
  })

}
  module.exports={
      product:product,
      card_add:card_add
  }