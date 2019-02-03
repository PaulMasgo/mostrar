const { Router } = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const uuid = require('uuid/v4');
const Imagen = require('../models/imagen.model');
const Producto = require('../models/producto.model')

const router = Router();


const storageImagen = multer.diskStorage({
    destination: path.join(__dirname, '../../uploads/productos'),
    filename: (req, file, cb, filename) => {
        cb(null, uuid() + path.extname(file.originalname));
    }
});


//********* Mostrar imagenes ****************/

router.get('/img/:tipo/:id', (req, res) => {
    let tipo = req.params.tipo;
    let id = req.params.id;

    let pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${id}`)

    if (fs.existsSync(pathImagen)) {
        res.sendFile(pathImagen);
    } else {
        res.send('imagen no econtrada');
    }

});


//******************** Guardar Imagen **************************** */
router.post('/img', multer({ storage: storageImagen }).single('image'), (req, res) => {
    if (req.file) {
        let image = req.file;
        res.send(image.filename)
    } else {
        res.send('No se pudo subir')
    }
});

router.post('/img/producto', (req, res) => {
    let contenido = req.body;

    let imagen = new Imagen({
        principal: contenido.principal,
        lado1: contenido.lado1,
        lado2: contenido.lado2
    });

    imagen.save((err, imagen) => {
        if (err) {
            res.json({
                ok: false,
                error: err
            });
        } else {
            res.json({
                ok: true,
                imagen: imagen
            });
        };
    });

});

//**************** Guardando Imagen en el producto ****************  */
router.put('/img/producto/:id', (req, res) => {
    let id = req.params.id;
    let contenido = req.body;
    console.log(contenido.imagen);
    Producto.findOneAndUpdate({ _id: id }, { imagen: contenido.imagen }, { new: true }, (err, product) => {
        if (err) {
            res.json({ err })
        } else {

            res.json(product)
        }
    })

})



module.exports = router;