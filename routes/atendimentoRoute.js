
const express = require('express');
const router = express.Router();
const AtendimentoController = require('../controllers/atendimentoController');

const atendimentoController = new AtendimentoController();

router.get('/listar', atendimentoController.list);
router.get('/cadastrar', atendimentoController.registerView);
router.get('/buscarVeiculo', atendimentoController.buscaVeculos);
router.post('/cadastrar', atendimentoController.register);

module.exports = router;