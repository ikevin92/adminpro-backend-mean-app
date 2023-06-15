/*
    Path: '/api/login'
*/
const { Router } = require('express');
const {
  login,
  googleSignIn,
  renewToken,
} = require('../controllers/auth.controller');
const { check, body } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post(
  '/',
  [
    body('email', 'El email es obligatorio').isEmail(),
    body('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  login,
);

router.post(
  '/google',
  [
    body('token', 'El token de google es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  googleSignIn,
);

router.get('/renew', validarJWT, renewToken);

module.exports = router;
