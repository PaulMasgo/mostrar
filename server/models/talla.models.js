const mongoose = require('mongoose');

let esquema = mongoose.Schema;

let Talla = new esquema({
    nombre: { type: String, required: [true, 'El nombre es nesesario'] },
    cantidad: { type: Number, default: 1 },
    producto: { type: esquema.Types.ObjectId, ref: 'Producto', required: [true, 'El producto es nesesario'] }
});

module.exports = mongoose.model('Talla', Talla);