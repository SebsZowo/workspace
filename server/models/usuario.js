const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ["ADMIN","USER"],
    message: '{VALUE} no es un rol válido'
}
let Schema = mongoose.Schema;

let usuarioSchema = new Schema({

    nombre: {
        type: String,
        required: [true, 'Por favor escribe un nombre'],
    },

    email: {
        type: String,
        unique: true,
        required: [true, "Por favor, ingresa un correo"],
    },

    password: {
        type: String,
        required: [true, "Ingresa una contraseña"],
    },

    role:{
        type: String,
        default: 'USER',
        required: [true],
        enum: rolesValidos,
    },
});

//Eliminar la key password del objeto que se retorna al crearlo
usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

usuarioSchema.plugin(uniqueValidator, {
    message: '{PATH} debe ser único'
})

module.exports = mongoose.model('Usuario',usuarioSchema)