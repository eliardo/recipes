# recipes
Serviço recebe entre 1 e 3 ingredientes por parâmetro e realiza busca de receitas na APIs http://www.recipepuppy.com/about/api/
obtendo o nome da receita, ingredientes e link, também realiza a busca de um gif para a receita na https://developers.giphy.com/docs/

Disponível via GET na rota /recipes o request deve ser realizado passando o(s) ingredientes via parâmetro na URL e devem ser separados por vírgula, veja o exemplo onde onion e garlic são ingredientes passados para a chamada:
localhost:3000/recipes?i=onions,garlic

Para a utilização das APIs Giphy é necessário criar uma api key, você pode criar a sua api key no site https://developers.giphy.com/docs/api/#quick-start-guide
Após criar a api key, você deve configurar a váriavel de ambiente GIPHY_API_KEY do arquivo .env de nosso serviço.



# request
GET - http://{HOST}/recipes/?i={ingredient_1},{ingredient_2}

# response

{
    "keywords": [
        "garlic",
        "onions"
    ],
    "recipes": [
        {
            "title": "Roasted Garlic Grilling Sauce",
            "ingredients": [
                "garlic",
                "onions",
                "hot sauce"
            ],
            "link": "http://www.kraftfoods.com/kf/recipes/roasted-garlic-grilling-sauce-56344.aspx",
            "gif": "https://giphy.com/embed/3ohhwsYY5GLfMpJeyA"
        },
        {
            "title": "Steamed Mussels I",
            "ingredients": [
                "garlic",
                "mussels",
                "onions"
            ],
            "link": "http://allrecipes.com/Recipe/Steamed-Mussels-I/Detail.aspx",
            "gif": "https://giphy.com/embed/Id6YwO3gZMmZMQdZJF"
        }
        ...
    ]
}
