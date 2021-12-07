const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const roles = {
    values: ['admin', 'user'],
    message: '{VALUE} no es un rol valido'
}

const userSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'En necesario el nombre']
    },

    pass: {
        type: String,
        required: [true, 'En necesaria la constraseña']
    },

    email: {
        type: String,
        unique: true
    },

    rol: {
        type: String,
        required: [true, 'Es necesario el rol'],
        enum: roles
    }
});

//Ocultar contraseña
userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();
    delete userObject.pass;
    return userObject;
}

userSchema.plugin(uniqueValidator, { message: '{PATH} ya exite, intente con otro' });
module.exports = model('Usuario', userSchema);