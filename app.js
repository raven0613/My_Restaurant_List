const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
require('./config/mongoose');
const routes = require('./routes');

const port = 3000;


app.engine('handlebars' , exphbs.engine({ defaultLayout : 'main' }));
app.set('view engine' , 'handlebars');


app.use(express.static('public'));
app.use(routes);



app.listen(port , () => {
  console.log('server is starting with port ' + port);
});