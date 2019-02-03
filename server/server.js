const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const config = require('./config/config');

const app = express();


//cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")
    next();
});


//Configurando las peticiones 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ***********************   conectandose a mongoDB  **********************
mongoose.connect('mongodb://user06:123456a@ds141623.mlab.com:41623/cresspomen', { useNewUrlParser: true })
    .then(db => console.log('Connect to the database'))
    .catch(err => console.log(err))


// ***********************  Llamando a las Rutas  ***************************
app.use(require('./routes/index.routes'))
app.listen(config.puerto, () => {
    console.log('Server online in port', config.puerto);
})