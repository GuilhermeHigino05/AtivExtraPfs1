const express = require('express');
const ServicoController = require('../controllers/servicosController');

const router = express.Router();
let ctrl = new ServicoController();
router.get('/listar', ctrl.listarView);
module.exports = router;