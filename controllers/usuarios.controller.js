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

const crearUsuario = async (req = request, res = response) => {
  try {
    const { body } = req;

    const usuario = new Usuario(body);
    await usuario.save();

    res.json({
      ok: true,
      usuario,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado... revisar logs',
    });
  }
};

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
