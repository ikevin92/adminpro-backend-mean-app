/*
    Medicos
    ruta: '/api/medico'
*/
const { Router } = require('express');
const { body } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico,
} = require('../controllers/medicos.controller');

const router = Router();

router.get('/', getMedicos);

router.post(
  '/',
  [
    validarJWT,
    body('nombre', 'El nombre del médico es necesario').not().isEmpty(),
    body('hospital', 'El hospital id debe de ser válido').isMongoId(),
    validarCampos,
  ],
  crearMedico,
);

router.put(
  '/:id',
  [
    validarJWT,
    check('nombre', 'El nombre del médico es necesario').not().isEmpty(),
    check('hospital', 'El hospital id debe de ser válido').isMongoId(),
    validarCampos,
  ],
  actualizarMedico,
);

router.delete('/:id', validarJWT, borrarMedico);

module.exports = router;
