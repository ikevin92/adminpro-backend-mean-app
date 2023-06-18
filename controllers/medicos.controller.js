const { response, request } = require('express');

const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const getMedicos = async (req = request, res = response) => {
  const medicos = await Medico.find()
    .populate('usuario', 'nombre img')
    .populate('hospital', 'nombre img');

  res.json({
    ok: true,
    medicos,
  });
};

const crearMedico = async (req = request, res = response) => {
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

const actualizarMedico = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.uid;

  try {
    const medico = await Medico.findById(id);

    if (!medico) {
      return res.status(404).json({
        ok: true,
        msg: 'Medico no encontrado por id',
      });
    }

    const cambiosMedico = {
      ...req.body,
      usuario: uid,
    };

    const medicoActualizado = await Medico.findByIdAndUpdate(
      id,
      cambiosMedico,
      { new: true },
    );

    res.json({
      ok: true,
      medico: medicoActualizado,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};

const borrarMedico = async (req, res = response) => {
  const id = req.params.id;

  try {
    const existeHospital = await Hospital.findById(req.body.hospital);

    if (!existeHospital) {
      return res.status(400).json({
        ok: false,
        msg: 'No existe el hospital por favor valide',
      });
    }

    const medico = await Medico.findById(id);

    if (!medico) {
      return res.status(404).json({
        ok: true,
        msg: 'Medico no encontrado por id',
      });
    }

    await Medico.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: 'Médico borrado',
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};

module.exports = {
  actualizarMedico,
  borrarMedico,
  crearMedico,
  getMedicos,
};
