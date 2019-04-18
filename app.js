const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const productRoutes = require('./api/routes/product');
const orderRoutes = require('./api/routes/order');

mongoose.connect('mongodb://node-shop:'+ process.env.MONGO_ATLAS_PW +
'@node-rest-shop-shard-00-00-bhyzy.mongodb.net:27017,node-rest-shop-shard-00-01-bhyzy.mongodb.net:27017,node-rest-shop-shard-00-02-bhyzy.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-shop-shard-0&authSource=admin&retryWrites=true',{
     useNewUrlParser : true
})

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept,Authorization");
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Method','POST,PUT,PATCH,GET,DELETE');
        return res.status(200).json({});
    }
    next();
});



app.use('/product', productRoutes);
app.use('/order' , orderRoutes);


app.use((req, res, next) =>{
    const error = new Error('rute tidak ditemukan');
    error.status = 404;
    next(error);
})

app.use((error,req,res,next) =>{
    res.status(error.status || 500);
    res.json({
        error :{
            message : error.message
        }
    })
})

module.exports = app;