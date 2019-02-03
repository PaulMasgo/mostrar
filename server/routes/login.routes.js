const { Router } = require('express');
const bcrypt = require('bcryptjs');


const router = Router();
const Usuario = require('../models/usuario.models')

router.post('/login', (req, res) => {

    let contenido = req.body;
    Usuario.findOne({ correo: contenido.correo }, (err, usuario) => {
        if (err) {
            return res.status(200).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                error: err
            });
        }

        if (!usuario) {
            return res.status(200).json({
                ok: false,
                mensaje: 'Correo no existe',
                error: err
            });
        }
        if (!bcrypt.compareSync(contenido.password, usuario.password)) {
            return res.status(200).json({
                ok: false,
                mensaje: 'Contraseña no existe',
                error: err
            });
        } else {
            usuario.password = '********************';
            res.status(200).json({
                ok: true,
                usuario: usuario,
                id: usuario._id
            });
        };
    })
});

module.exports = router;