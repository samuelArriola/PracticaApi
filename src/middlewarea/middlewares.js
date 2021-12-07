const jwt = require('jsonwebtoken');
const PersonaModel = require('../model/persona');


const veriToke = (req, res, next) => {
    const token = req.get('token'); //req.get('token') para obtener informacion de los header
    jwt.verify(token, process.env.SEEN, (err, decoded) => {
        if (!token) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'no exite token para este usuario vuelva a logearse o ingrese el token'
                }
            });
        }


        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }

        //Esto es para no mandar toda la informacion por el token
        PersonaModel.findOne({ id: decoded.usuario }, (err, usuarioBD) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            if (!usuarioBD) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        menssage: 'Usuario no encontado'
                    }
                });
            }

            req.usuario = usuarioBD;
            next();
        })
    })
}

const veriToke2 = async(req, res, next) => {
    const token = req.get('token');
    try {
        if (!token) return res.json({ msm: 'no se ecncontro el token' });

        const { usuario } = jwt.verify(token, process.env.SEEN);
        const usuarioBD = await PersonaModel.findById(usuario);
        if (usuarioBD) return null;

        req.usuario = usuarioBD;
        next();
    } catch (error) {
        return res.status(500).json({
            estado: false,
            error
        })
    }

}

const isIssent = (req, res, next) => {
    const id = req.params.id || '';
    if (id === 'perra') {
        return res.status(400).json({
            estado: false,
            message: 'este nombre no es valido '
        })
    }

    next();
}

//se valida cuando el usuario envie parametros que no pueda modificar
const noPut = (req, res, next) => {
    const { email, pass } = req.body;
    if (email !== '' || pass !== '') {
        return res.status(400).json({
            estado: false,
            msm: 'Este usuario no tiene perimso para modificar el correo o  la contraseña'
        });
    }
    next()
}

module.exports = {
    isIssent,
    noPut,
    veriToke,
    veriToke2
}