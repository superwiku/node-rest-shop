const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) =>{
    res.status(200).json({
        message : 'dari get order request'
    });
});

router.get('/:productID', (req, res, next) =>{
   const id = req.params.productID;
   if(id ==='spesial'){
       res.status(200).json({
           message : 'anda menemukan ID order spesial',
           id : id
       });
   }else{
       res.status(200).json({
           message : 'ini ID orderbiasa',
           id : id
       });
   }
});

router.post('/', (req, res, next) =>{
    const order = {
        productID : req.body.productID,
        quantity : req.body.quantity
    };
    res.status(200).json({
        message : 'dari post order request',
        createdOrder : order
    });
});

module.exports=router;