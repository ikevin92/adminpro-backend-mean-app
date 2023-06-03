const { response, request } = require('express');
const Usuario = require('../models/usuario');

const getUsuarios = async (req = request, res = response) => {
  res.json({
    ok: true,
    usuarios: [],
  });
};

const crearUsuario = async (req = request, res = response) => {
  console.log(req.body);
  const { body } = req;

  const { email, password, nombre } = body;

  const usuario = new Usuario(body);
  await usuario.save();

  res.json({
    ok: true,
    usuario,
  });
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
