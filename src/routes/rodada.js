const permissao = require('../middlewares/permissoes');
const variables = require('../../config/variables');
const controllerCriarRodada = require('../controllers/administrador/rodadas/criarRodada');
const controllerRemoverRodada = require('../controllers/administrador/rodadas/deletarRodada');
const controllerRodadas = require('../controllers/administrador/rodadas/listarRodadas');
const controllerAtualizarRodadas = require('../controllers/administrador/rodadas/atualizarRodadas');
const controllerRodadasAbertas = require('../controllers/usuario/rodadas/controlladorRodadasAbertas');
const controllerBuscarRodada = require('../controllers/usuario/rodadas/controlladorBuscarRodada');

module.exports = (application) => {
    /* Administrador */
    application.post(`${variables.base}/administrador/rodadas`, permissao.administrador, (req, res) => {controllerCriarRodada.cadastrarRodada(req, res)});
    application.delete(`${variables.base}/administrador/rodadas`, permissao.administrador, (req, res) => {controllerRemoverRodada.removerRodada(req, res)});
    application.get(`${variables.base}/administrador/rodadas/:token`, permissao.administrador, (req, res) => {controllerRodadas.listarRodadas(req, res)});
    application.put(`${variables.base}/administrador/rodadas`, permissao.administrador, (req, res) => {controllerAtualizarRodadas.atualizarRodada(req, res)});
    
    /* Administrador */
    application.get(`${variables.base}/usuario/rodadas/abertas/:token`, permissao.usuario, (req, res) => {controllerRodadasAbertas.obterRodadasAbertas(req, res)});
    
    application.get(`${variables.base}/usuario/rodadas/:idRodada/:token`, permissao.usuario, (req, res) => {controllerBuscarRodada.obterRodada(req, res)});
};