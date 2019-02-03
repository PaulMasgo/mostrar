const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let tipoValidos = {
    values: ['admin', 'cliente', 'gerente'],
    message: '{VALUE} no es un tipo valido'
}

let esquema = mongoose.Schema;
let usuarioEsquema = new esquema({
    nombre: { type: String, required: [true, 'El nombre es nesesario'] },
    correo: { type: String, unique: true, required: [true, 'El correo es nesesario'] },
    password: { type: String, required: [true, 'La contraseña no puede quedar vacia'] },
    telefono: { type: String },
    imagen: { type: String },
    codigoRegistro: { type: String },
    google: { type: Boolean, default: false },
    tipo: { type: String, default: 'cliente', enum: tipoValidos },
    estado: { type: String, default: 'confirmar' }
});

usuarioEsquema.plugin(uniqueValidator, { message: ' el {PATH} ya existe' });

module.exports = mongoose.model('usuario', usuarioEsquema);