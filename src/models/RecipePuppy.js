const request = require("request");

class RecipePuppy {
    /** Verify if there is query and sort that */
    handleQuery(req){
        if((!req.query || !req.query.i) || req.query.i.split(',').lenght > 3 ){
            return null;
        }
        var query = req.query.i;
        var params = query.split(',');
        params.sort();

        return params;
    }

    //it's responsible to request data to recipe puppy
    getRecipePuppy(query){        
        return new Promise((resolve, reject) => {
            try {
                request({
                    url: "http://www.recipepuppy.com/api/?i=" + query,
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
                console.error("RecipePuppy.getRecipePuppy ERROR: " + error);
                reject(error);
            }
        });
    }
}

module.exports = RecipePuppy; 