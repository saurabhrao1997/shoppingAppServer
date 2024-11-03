var createError = require('http-errors');
const connection = require("./Modal/MongoDb")
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors")
require('dotenv').config()
const {setToken,verifyToken} = require("./Helper/jwtVerification")
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const productRouter = require('./routes/Procuduct');
const categoryRouter = require('./routes/Category');
const reviewRouter = require('./routes/Review');
const oderRouter = require('./routes/Oder');

var Meddleware = require("./Middleware/error")
var app = express();



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({origin:"*"}))
app.use((req,res,next)=>{
    req.user = null
    // console.log("headers",req.headers)
    if(!req.headers.authorization) return next()
        
        let token = req.headers.authorization.split("Bearer ")[1]
        let user = verifyToken(token)
         
        req.user = user;
           
      return  next()
   
        


   
   return next()
})
// app.use('/', indexRouter);
app.use('/api/v1', usersRouter);
app.use('/api/v1', loginRouter);    
app.use('/api/v1', productRouter);    
app.use('/api/v1', categoryRouter);    
app.use('/api/v1', reviewRouter);    
app.use('/api/v1', oderRouter);    


// catch 404 and forward to error handler


// error handler
app.use(Meddleware)

connection()
app.listen(process.env.PORT || 5000,()=>{
console.log(`server running on port 5000`)
})

module.exports = app;
