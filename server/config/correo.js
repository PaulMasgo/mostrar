let jade = require('jade');
let nodemailer = require('nodemailer');
const path = require('path');

let transporteer = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'cresspotiendas@gmail.com',
        pass: 'modular2018'
    }
});

let enviarmensaje = (para, asunto, contenido, next) => {
    let correoOpciones = {
        from: 'cresspotiendas@gmail.com',
        to: para,
        subject: asunto,
        html: contenido
    };
    transporteer.sendMail(correoOpciones, next);
}

exports.enviarCorreo = (data, para) => {
    // let template = process.cwd() + '../resources/verificacion.jade';
    // Leer el archivo no formato jade/pug
    const compiledFunction = jade.compileFile(path.resolve(__dirname, './resources/verificacion.jade'));
    let html = compiledFunction({ username: data.username, code: data.code });

    enviarmensaje(para, 'verficacion de usuario', html, (err, resp) => {
        if (err) {
            console.log('ERROR!');
            return
        } {
            console.log('Correo Enviado');
        }
    });
}