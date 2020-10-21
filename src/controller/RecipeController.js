const request = require("request");

class RecipeController {
    getRecipePuppy(req, res){
        return new Promise((resolve, reject) => {
            try {
                request({
                    url: "http://www.recipepuppy.com/api/?i=onions,garlic",
                    method: 'GET',
                }, function (error, response, body) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(JSON.parse(response.body));
                    }
                });
            }
            catch (error) {
                console.error("RecipeController.getRecipePuppy ERROR: " + error);
                reject(error);
            }
        });
    }
}

module.exports = RecipeController; 