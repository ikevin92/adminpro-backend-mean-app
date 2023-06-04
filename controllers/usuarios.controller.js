const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');

const getUsuarios = async (req = request, res = response) => {
  const usuarios = await Usuario.find();

  res.json({
    ok: true,
    usuarios,
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
  res.json({
    ok: true,
    msg: 'actualizando usuario',
  });
};

const borrarUsuario = async (req = request, res = response) => {
  res.json({
    ok: true,
    msg: 'borrando usuario',
  });
};

module.exports = {
  actualizarUsuario,
  borrarUsuario,
  crearUsuario,
  getUsuarios,
};
