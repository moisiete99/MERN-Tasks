const express = require("express");
const morgan = require("morgan");
const app = express();

//settings
app.set('port', process.env.PORT || 3000)

//middlewares
app.use(morgan('dev'))

//routes

//static files

//starting the server
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
