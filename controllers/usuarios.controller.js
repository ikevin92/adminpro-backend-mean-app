const { response } = require('express');

const getUsuarios = async (req, res = response, next) => {};

const crearUsuario = async (req, res = response, next) => {};

const actualizarUsuario = async (req, res = response, next) => {};

const borrarUsuario = async (req, res = response, next) => {};

module.exports = {
  actualizarUsuario,
  borrarUsuario,
  crearUsuario,
  getUsuarios,
};
