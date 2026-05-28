const express = require('express');
const UsuariosController = require('../controllers/usuariosController');

const router = express.Router();
let ctrl = new UsuariosController();

router.get('/', ctrl.listarView);
router.get('/listar', ctrl.listarUsuarios);
router.get('/criar', ctrl.criarView);
router.get('/alterar/:id', ctrl.alterarView);
router.post('/criar', ctrl.gravarUsuario);
router.post('/excluir', ctrl.deletarUsuario);
router.post('/alterar', ctrl.alterarUsuario);
module.exports = router;