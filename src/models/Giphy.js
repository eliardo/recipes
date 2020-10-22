const request = require("request");

class Giphy {

    handleGiphy(results){
        var self = this;
        var arrayOfPromises = [];
        return new Promise((resolve, reject) => {
            results.forEach(element =>
                arrayOfPromises.push( 
                    self.getGiphy(element.title).then(link =>{element["gif"] = link;})
                )
            );
            Promise.all(arrayOfPromises).then(()=>{
                resolve(results);
            })
            .catch((error) => reject(error));
        });
    }

    //it's responsible to request data from giphy api
    getGiphy(title){        
        return new Promise((resolve, reject) => {
            try {
                request({
                    url: "https://api.giphy.com/v1/gifs/search?api_key=JTmF4BUePF8A17vHn0c4q5eCeedJoWTD&limit=1&offset=0&rating=g&lang=en&q=" + title,
                    method: 'GET',
                }, function (error, response, body) {
                    if (error) {
                        reject(error);
                    } else {
                        var body = JSON.parse(response.body)
                        resolve(body.data[0].embed_url);
                    }
                });
            }
            catch (error) {
                console.error("Giphy.getGiphy ERROR: " + error);
                reject(error);
            }
        });
    }
}

module.exports = Giphy; 