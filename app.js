const express = require('express');
const session = require('express-session');
const usePassport = require('./config/passport');

const app = express();
const exphbs = require('express-handlebars');
require('./config/mongoose');
const routes = require('./routes');
const methodOverride = require('method-override')

const port = 3000;



app.engine('handlebars' , exphbs.engine({ defaultLayout : 'main' }));
app.set('view engine' , 'handlebars');


app.use(session({
  secret: 'MyRestaurantSecret',
  resave: false,
  saveUninitialized: true
}));
usePassport(app);

app.use(express.static('public'));
app.use(express.urlencoded({ extended : true }));
app.use(methodOverride('_method'));
app.use(routes);



app.listen(port , () => {
  console.log('server is starting with port ' + port);
});