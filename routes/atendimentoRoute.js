
const express = require('express');
const router = express.Router();
const AtendimentoController = require('../controllers/atendimentoController');
const AtendimentoServicoController = require('../controllers/atendimentoServicoController');

const atendimentoController = new AtendimentoController();
const atendimentoServicoController = new AtendimentoServicoController

router.get('/cadastrar', atendimentoController.registerView);
router.get('/buscarVeiculo', atendimentoController.buscaVeculos);
router.get('/listar', atendimentoServicoController.listarView);
router.get('/listarDados', atendimentoServicoController.listar);
router.post('/cadastrar', atendimentoController.register);

module.exports = router;