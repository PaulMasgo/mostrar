const mongoose = require('mongoose');

let esquema = mongoose.Schema;

let Imagen = new esquema({
    principal: { type: String },
    lado1: { type: String },
    lado2: { type: String }
});

module.exports = mongoose.model('Imagen', Imagen);