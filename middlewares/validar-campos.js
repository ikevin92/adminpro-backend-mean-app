const { response, request } = require('express');
const { validationResult } = require('express-validator');
const Usuario = require('../models/usuario');

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
  const existeEmail = await Usuario.findOne({ email });

  if (existeEmail) {
    return res.status(400).json({
      ok: false,
      msg: `El correo ${email} ya está registrado`,
    });
  }

  next();
};

module.exports = {
  validarCampos,
  validarEmail,
};
