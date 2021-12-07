const PersonaModel = require('../model/persona');
const _ = require('underscore');
const bcrypt = require('bcrypt');

const getPersona = async(req, res) => {

    try {
        const personasDb = await PersonaModel.find();
        return res.status(200).json({
            ok: true,
            persona: req.usuario,
            personasDb,
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            error
        });
    }
}
const postPersona = async(req, res) => {
    const { nombre, pass, email, rol } = req.body;

    try {
        const personaModel = new PersonaModel({ nombre, pass: bcrypt.hashSync(pass, 11), email, rol });
        await personaModel.save();
        return res.json({
            ok: true,
            personaModel
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            error
        });
    }

}
const updatePersona = async(req, res) => {
    const id = req.params.id;
    const body = _.pick(req.body, ['nombre', 'rol']);
    try {
        const updatePersonaBD = await PersonaModel.findByIdAndUpdate(id, body, { new: true, runValidators: true, useFindAndModify: false })
        if (updatePersonaBD) {
            return res.status(200).json({
                ok: true,
                msm: 'Usuario editado correctamente',
                usuario: updatePersonaBD
            });
        } else {
            return res.status(400).json({
                estado: false,
                message: 'Upss el usuario no existe!!!!',
                updatePersonaBD
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            estado: false,
            error
        })

    }
}
const deletePersona = async(req, res) => {
    const { id } = req.params;

    try {
        const userDeleteBD = await PersonaModel.findByIdAndDelete(id);
        if (userDeleteBD) {
            return res.status(200).json({
                estado: true,
                message: 'Uusario borrado',
                userDeleteBD
            })
        } else {
            return res.status(400).json({
                estado: false,
                message: 'Upss el usuario no existe!!!!',
                userDeleteBD
            })
        }

    } catch (error) {
        return res.status(500).json({
            estado: false,
            error
        });
    }
}

module.exports = {
    getPersona,
    postPersona,
    updatePersona,
    deletePersona
}