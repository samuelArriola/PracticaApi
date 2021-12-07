const PersonaModel = require('../model/persona');
const bcript = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async(req, res) => {
    const { nombre, pass } = req.body;

    try {
        const nombreDb = await PersonaModel.findOne({ nombre: nombre })
        if (!nombreDb) {
            return res.status(400).json({
                ok: false,
                msm: 'Nombre de usuario no existe en la base de datos'
            });
        }

        const passbd = bcript.compareSync(pass, nombreDb.pass);
        if (!passbd) {
            return res.status(400).json({
                ok: false,
                msm: 'Contraseña de usuario incorrecta',
                pass: nombreDb.pass
            });
        }

        const token = jwt.sign({
            usuario: nombreDb.id
        }, process.env.SEEN, { expiresIn: process.env.TIME })


        res.status(200).json({
            ok: true,
            token
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            error
        });
    }
}


module.exports = {
    login
}