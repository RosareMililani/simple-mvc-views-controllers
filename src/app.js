const path = require('path');
const express = require('express');
const compression = require('compression');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const router = require('./router.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const app = express();

app.use('/assets', express.static(path.resolve(`${__dirname}/../client/`)));
app.use(compression());

//added
app.use(bodyParser.urlencoded({extended:true})); // x-www-form-encoded & value=true&number=10

app.set('view engine','handlerbars');
app.set('views',`${__dirname}/../views`);

app.use(favicon(`${__dirname}/../client/img/favicon.png`));

app.use(cookieParser());

router(app);

app.listen(port,(err)=>{
  if(err){
    throw err;
  }
  console.log(`Listening on port ${port}`);
});
