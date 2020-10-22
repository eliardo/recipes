const RecipePuppy = require('../models/RecipePuppy');
const Giphy = require('../models/Giphy');


class RecipeController {
    
    recipePuppyController(req, res, next){
        const recipePuppy = new RecipePuppy();
        const giphy = new Giphy();

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
                var formattedRecipes = this.formatObjets(response.results);
                
                // find a gif to each result
                var giphyPromisse = giphy.handleGiphy(formattedRecipes);
                giphyPromisse.then(response =>{
                    res.status(200).send({
                        "keywords": query,
                        "recipes": response
                        }
                    );
                });
                giphyPromisse.catch(error =>{
                    this.serviceUnavailable(error, next);
                    return;
                });

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
            this.serviceUnavailable(error, next);
            return;
        });
    }

    formatObjets(results){
        var formattedRecipes = results.map( elem => {
            return {
                "title": elem.title,
                "ingredients": elem.ingredients.split(', '),
                "link": elem.href
            }
        });
        return formattedRecipes;
    }

    serviceUnavailable(error, next){
        if(!error.status){
            error.status = 503;
            error.message = "Serviço temporariamente indisponivel";
        }
        next(error);
        return;
    }
}

module.exports = RecipeController; 