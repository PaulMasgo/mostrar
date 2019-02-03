const { Router } = require('express');
const path = require('path');
const router = Router();
const Categoria = require('../models/categoria.models');


router.get('/categoria', (req, res) => {
    Categoria.find()
        .exec((err, categorias) => {
            if (err) {
                res.json(err)
            } else {
                res.json(categorias)
            };
        });
});

router.get('/categoria/:id', (req, res) => {
    let id = req.params.id;
    Categoria.findOne({ _id: id }, (err, usuario) => {
        if (err) {
            res.json(err)
        } else {
            res.json(usuario)
        }
    });
});

router.post('/categoria', (req, res) => {

    let contenido = req.body;

    let categoria = new Categoria({
        nombre: contenido.nombre,
        descripcion: contenido.descripcion
    });

    categoria.save((err, usuario) => {
        if (err) {
            res.jason(err);
        } else {
            res.json(usuario);
        };
    });
});


router.put('/categoria/:id', (req, res) => {
    let id = req.params.id;
    let contenido = req.body;

    let categoria = {
        nombre: contenido.nombre,
        descripcion: contenido.descripcion,

    }


    Categoria.findByIdAndUpdate({ _id: id }, categoria, { new: true }, (err, usuario) => {
        if (err) {
            res.json(err)
        } else {
            res.json(usuario)
        }
    });
});


module.exports = router;