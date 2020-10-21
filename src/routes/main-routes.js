const express = require('express');
const route = express.Router();

const RecipeController = require('../controller/RecipeController');

route.get('/', (req, res, next) => {
    const controller = new RecipeController();
    var resolvePromise = controller.getRecipePuppy(req, res);
    
    resolvePromise.then((response)=>{
        res.status(200).send(response);
    });

    resolvePromise.catch((error)=>{
        if(!error.status){
            error.status = 503
            error.message = "Serviço temporariamente indisponivel"
        }
        next(error);
    });
});

module.exports = route;