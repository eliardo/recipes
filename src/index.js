const app = require('./app');
if(process.env.NODE_ENV !== 'production'){
  const dotenv = require("dotenv");
  dotenv.config();
}

var port = process.env.PORT || 3000;

app.set('port', port);
app.listen(port, () => {
    console.log('Starting app at port ' + port);
});