const express = require('express');
const app = express();

const mainRoute = require('./routes/main-routes');

// morgan release logs of requests at dev enviroment
const morgan = require('morgan');
app.use(morgan('dev'));

// CORS and options requests
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
    if(req.method == "OPTIONS"){
        res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
        return res.status(200).json({});
    }
    next();
});

app.use('/recipes', mainRoute);

// route called no exist
app.use((req, res, next) => {
    const error = new Error('Verifique a rota digitada. Essa rota não está mapeada em nosso serviço.');
    error.status = 404;
    next(error);
});

// just send errors at response
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;