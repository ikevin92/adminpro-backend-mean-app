/*
    ruta: api/uploads/
*/
const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const { param } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
  fileUpload,
  retornaImagen,
} = require('../controllers/uploads.controller');

const router = Router();

router.use(expressFileUpload());
router.put(
  '/:tipo/:id',
  [validarJWT, param('id', 'No es un id valido').isMongoId()],
  fileUpload,
);
router.get('/:tipo/:foto', retornaImagen);

module.exports = router;
