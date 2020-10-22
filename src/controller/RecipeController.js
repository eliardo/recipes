const RecipePuppy = require('../models/RecipePuppy');

class RecipeController {
    
    recipePuppyController(req, res, next){
        const recipePuppy = new RecipePuppy();

        var query = recipePuppy.handleQuery(req);
        if(!query){
            var error = new Error("Verifique sua requisição!");
            error.status = 400;
            next(error);
            return;
        }

        var resolvePromise = recipePuppy.getRecipePuppy(query.toString());
        //success call API recipePuppy
        resolvePromise.then((response)=>{

            if(response.results && response.results.length > 0){
                // need find a gif to the results
                res.status(200).send(response);
            }else{
                //no results
                res.status(200).send({
                    "keywords": query,
                    "recipes": []
                    }
                );
            }
        });
        
        //error call API recipePuppy
        resolvePromise.catch((error)=>{
            if(!error.status){
                error.status = 503;
                error.message = "Serviço temporariamente indisponivel";
            }
            next(error);
            return;
        });
    }
}

module.exports = RecipeController; 