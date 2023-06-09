const { response, request } = require('express');
const { validationResult } = require('express-validator');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const validarCampos = (req = request, res = response, next) => {
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errores.mapped(),
    });
  }

  next();
};

const validarEmail = async (req = request, res = response, next) => {
  const { email } = req.body;
  let emailSearch = email;

  if (req.headers['emailUsuarioDB']) {
    emailSearch = req.headers['emailUsuarioDB'];
  }

  const existeEmail = await Usuario.findOne({ emailSearch });

  if (existeEmail) {
    return res.status(400).json({
      ok: false,
      msg: `El correo ${email} ya está registrado`,
    });
  }

  next();
};

const encriptarPassword = (req = request, res = response, next) => {
  const salt = bcrypt.genSaltSync();
  req.body.password = bcrypt.hashSync(req.body.password, salt);

  next();
};

const existeUsuarioById = async (req = request, res = response, next) => {
  const uid = req.params.id;

  const usuarioDB = await Usuario.findById(uid);

  if (!usuarioDB) {
    return res.status(404).json({
      ok: false,
      msg: 'No existe un usuario por ese id',
    });
  }

  if (usuarioDB.email !== req.body.email) {
    req.headers['emailUsuarioDB'] = usuarioDB.email;
  }

  next();
};

module.exports = {
  validarCampos,
  validarEmail,
  encriptarPassword,
  existeUsuarioById,
};
