const { Router } = require('express');
const Talla = require('../models/talla.models')
const router = Router();

//******* Agregar Nueva Talla *************

router.post('/talla', (req, res) => {
    let contenido = req.body

    let talla = new Talla({
        nombre: contenido.nombre,
        cantidad: contenido.cantidad,
        producto: contenido.producto
    })

    talla.save((err, talla) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El codigo no es el correcto',
                error: err
            });
        } else {
            res.status(200).json({
                ok: true,
                talla
            });
        };
    });
});


//*********** Listar Tallas de determinado Producto */

router.get('/talla/:id', (req, res) => {
    let id = req.params.id;

    Talla.find({ producto: id }, (err, tallas) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al obtener las tallas',
                error: err
            });
        } else {
            res.status(200).json({
                ok: true,
                tallas
            });
        };
    });
});

module.exports = router;