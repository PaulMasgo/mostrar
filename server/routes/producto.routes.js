const { Router } = require('express');
const router = Router();
const Producto = require('../models/producto.model');

router.get('/producto', (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    Producto.find({ estado: true })
        .skip(desde)
        .limit(12)
        .populate('categoria imagen')
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando productos',
                    error: err
                });
            } else {
                res.status(200).json({
                    ok: true,
                    Productos: productos,
                    Total: productos.length
                });
            };
        });
});


router.get('/producto/buscar/:params', (req, res) => {

    let letra = req.params.params;
    let regex = new RegExp(letra, 'i');

    Producto.find({ nombre: regex, estado: true })
        .populate('imagen categoria', )
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando productos',
                    error: err
                });
            } else {
                res.status(200).json({
                    ok: true,
                    Productos: productos,
                    Total: productos.length
                });
            };
        })
});


router.get('/producto/:id', (req, res) => {

    let id = req.params.id;
    Producto.findOne({ _id: id })
        .populate('imagen categoria', )
        .exec((err, producto) => {
            if (err) {
                res.json(err)
            } else {
                res.json(producto)
            }
        })

});

router.get('/producto/categoria/:categoria', (req, res) => {

    let categoriaElejida = req.params.categoria;
    Producto.find({ categoria: categoriaElejida })
        .populate('imagen categoria')
        .exec((err, producto) => {
            if (err) {
                res.json(err)
            } else {
                res.json(producto)
            }
        })

});

router.post('/producto', (req, res) => {
    let contenido = req.body;

    let producto = new Producto({
        nombre: contenido.nombre,
        descripcion: contenido.descripcion,
        precio: contenido.precio,
        imagen: contenido.imagen,
        color: contenido.color,
        categoria: contenido.categoria
    });

    producto.save((err, product) => {
        if (err) {
            res.json({
                ok: false,
                error: err
            });
        } else {
            res.json({
                ok: true,
                producto: product
            });
        };
    });

});


router.put('/producto/:id', (req, res) => {

    let id = req.params.id;
    let contenido = req.body;

    let producto = {
        nombre: contenido.nombre,
        descripcion: contenido.descripcion,
        precio: contenido.precio,
        cantidad: contenido.cantidad,
        categoria: contenido.categoria
    };

    Producto.findByIdAndUpdate({ _id: id }, producto, { new: true }, (err, usuario) => {
        if (err) {
            res.json(err);
        } else {
            res.json(usuario)
        }
    })
});

router.delete('/producto/:id', (req, res) => {
    let id = req.params.id;
    Producto.findByIdAndUpdate({ _id: id }, { estado: false }, { new: true }, (err, product) => {
        if (err) {
            res.json(err)
        } else {
            res.json(product);
        }
    });
});

module.exports = router;