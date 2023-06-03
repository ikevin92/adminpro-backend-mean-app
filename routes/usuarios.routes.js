/*
    Ruta: /api/usuarios
*/
const { Router } = require('express');
const {
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  borrarUsuario,
} = require('../controllers/usuarios.controller');
const router = Router();

router.get('/', getUsuarios);
router.post('/', crearUsuario);
router.put('/:id', actualizarUsuario);
router.delete('/:id', borrarUsuario);

module.exports = router;
