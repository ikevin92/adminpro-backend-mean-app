const { response } = require('express');

const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const getMedicos = async (req, res = response) => {
  const medicos = await Medico.find()
    .populate('usuario', 'nombre img')
    .populate('hospital', 'nombre img');

  res.json({
    ok: true,
    medicos,
  });
};

const crearMedico = async (req, res = response) => {
  const uid = req.uid;
  try {
    const existeHospital = await Hospital.findById(req.body.hospital);

    if (!existeHospital) {
      return res.status(400).json({
        ok: false,
        msg: 'No existe el hospital por favor valide',
      });
    }

    const medico = new Medico({
      usuario: uid,
      ...req.body,
    });

    const medicoDB = await medico.save();

    res.json({
      ok: true,
      medico: medicoDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};

const actualizarMedico = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'actualizarMedico',
  });
};

const borrarMedico = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'borrarMedico',
  });
};

module.exports = {
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico,
};
