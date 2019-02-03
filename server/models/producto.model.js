const mongoose = require('mongoose');

let esquema = mongoose.Schema;

let Producto = new esquema({
    nombre: { type: String, required: [true, 'el nombre es nesesario'] },
    descripcion: { type: String },
    precio: { type: Number, required: [true, 'el precio es obligatorio'] },
    color: { type: String },
    imagen: { type: esquema.Types.ObjectId, ref: 'Imagen' },
    categoria: { type: esquema.Types.ObjectId, ref: 'Categoria', required: [true, 'El codigo de la categoria es nesesario'] },
    estado: { type: Boolean, default: true }
});

module.exports = mongoose.model('Producto', Producto);