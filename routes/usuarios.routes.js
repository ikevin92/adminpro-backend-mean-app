/*
    Ruta: /api/usuarios
*/
const { Router } = require('express');
const { body } = require('express-validator');
const {
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  borrarUsuario,
} = require('../controllers/usuarios.controller');
const {
  validarCampos,
  validarEmail,
  encriptarPassword,
  existeUsuarioById,
} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.get('/', validarJWT, getUsuarios);
router.post(
  '/',
  [
    body('nombre', 'El nombre es obligatorio').not().isEmpty(),
    body('password', 'El password es obligatorio').not().isEmpty(),
    body('email', 'El email es obligatorio').isEmail(),
    validarCampos,
    validarEmail,
    encriptarPassword,
  ],

  crearUsuario,
);
router.put(
  '/:id',
  [
    validarJWT,
    body('nombre', 'El nombre es obligatorio').not().isEmpty(),
    body('email', 'El email es obligatorio').isEmail(),
    body('role', 'El role es obligatorio').not().isEmpty(),
    validarCampos,
    existeUsuarioById,
    validarEmail,
  ],
  actualizarUsuario,
);
router.delete('/:id', validarJWT, existeUsuarioById, borrarUsuario);

module.exports = router;
