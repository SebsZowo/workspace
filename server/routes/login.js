const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('./../models/usuario');
const app = express();

app.post('/login', function (req, res){
    let body = req.body;

    Usuario.findOne({ email: body.email }, (erro,usuarioDB)=>{
        if(erro){
            return res.status(500).json({
                ok: false,
                err: erro
            })
        }

        if(!usuarioDB) {
            return res.status(400).json({
                ok:false,
                err: {
                    message: "Usuario o contraseña incorrectos"
                }
            })
        }

        if(!bcrypt.compareSync(body.password, usuarioDB.password)){
            return res.status(400).json({
                ok:false,
                err: {
                    message: "Usuario o contraseña incorrectos"
                }
            });
        }

        let token = jwt.sign({
            usuario: usuarioDB,
        }, process.env.SEED_AUTENTICATION, {
            expiresIn: process.env.CADUCIDAD_TOKEN
        })

        res.json({
            ok: true,
            usuario: usuarioDB,
            token,
        })
    })

});

module.exports = app;