var express = require('express');
var router = express.Router();
const product_controller =require('../controller/product_controller')

const card_db = require('../model/card_db')
/* GET home page. */
router.get('/', product_controller.product);




router.get('/buy/:id/:price',product_controller.card_add);


module.exports = router;


