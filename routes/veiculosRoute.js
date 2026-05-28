const express = require('express');
const VeiculoController = require('../controllers/veiculosController');


const router = express.Router();
let ctrl = new VeiculoController();

router.get('/listar', ctrl.listarView);
router.get('/cadastrar', ctrl.cadastrarView);
router.post('/cadastrar', ctrl.gravarVeiculo);
module.exports = router;