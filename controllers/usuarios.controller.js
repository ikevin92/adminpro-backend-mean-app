const { response, request } = require('express');
const Usuario = require('../models/usuario');

const getUsuarios = async (req = request, res = response) => {
  const desde = Number(req.query.desde) ?? 0;

  const [usuarios, total] = await Promise.all([
    Usuario.find({}, 'nombre email role google img').skip(desde).limit(5),

    Usuario.countDocuments(),
  ]);

  res.json({
    ok: true,
    usuarios,
    total,
  });
};

const crearUsuario = async(req= request, res = response) => {

    const { email, password } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });

        if ( existeEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        const usuario = new Usuario( req.body );

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );


        // Guardar usuario
        await usuario.save();

        // Generar el TOKEN - JWT
        const token = await generarJWT( usuario.id );


        res.json({
            ok: true,
            usuario,
            token
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }



const actualizarUsuario = async (req = request, res = response) => {
  try {
    // Actualizaciones
    const { password, google, email, ...campos } = req.body;

    campos.email = email;
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      req.params.id,
      campos,
      {
        new: true,
      },
    );

    res.json({
      ok: true,
      usuario: usuarioActualizado,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado... revisar logs',
    });
  }
};

const borrarUsuario = async (req = request, res = response) => {
  try {
    const uid = req.params.id;
    await Usuario.findByIdAndDelete(uid);

    res.json({
      ok: true,
      msg: 'Usuario eliminado',
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado... revisar logs',
    });
  }
};

module.exports = {
  actualizarUsuario,
  borrarUsuario,
  crearUsuario,
  getUsuarios,
};
