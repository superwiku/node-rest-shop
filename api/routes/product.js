const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const mongoose = require('mongoose');

router.get('/', (req, res, next) =>{
   Product.find()
   .exec()
   .then(docs =>{
       console.log(docs);
       if(docs.length >= 0){
            res.status(200).json(docs);
       }else{
           res.status(404).json({
               message : 'data kosong'
           });
       }
       
   })
   .catch(err =>{
       console.log(err);
       res.status(500).json({
           error : err
       });
   });
});

router.get('/:productID', (req, res, next) =>{
   const id = req.params.productID;
   Product.findById(id)
   .exec()
   .then(doc => {
       console.log(doc);
       if(doc!= null){
           res.status(200).json(doc);
       }else{
           res.status(404).json({
               message : 'data dengan id '+id+' tidak ada'
           });
       }
       
   })
   .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        })       
    });
});

router.post('/', (req, res, next) =>{    
     const product = new Product({
        _id : new mongoose.Types.ObjectId(),
        name : req.body.name,
        price : req.body.price
    });
    
    product.save()
    .then(result =>{
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err =>console.log(err));

    res.status(200).json({
        message : 'dari post product request',
        createdProduct : product
    });
});

router.delete('/:productID',(req, res, next) =>{
    var id = req.params.productID;
    Product.remove({
        _id : id
    })
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(500).json({
            error : err
        });
    });
    
});

module.exports=router;