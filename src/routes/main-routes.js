const express = require('express');
const route = express.Router();

const RecipeController = require('../controller/RecipeController');

route.get('/', (req, res, next) => {    
    const recipeController = new RecipeController();
    recipeController.recipePuppyController(req, res, next);
});

module.exports = route;