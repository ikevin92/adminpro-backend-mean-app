/*
    Ruta: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
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
const router = Router();

router.get('/', getUsuarios);
router.post(
  '/',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos,
    validarEmail,
    encriptarPassword,
  ],

  crearUsuario,
);
router.put(
  '/:id',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('role', 'El role es obligatorio').not().isEmpty(),
    validarCampos,
    existeUsuarioById,
    validarEmail,
  ],
  actualizarUsuario,
);
router.delete('/:id', borrarUsuario);

module.exports = router;
