/*
    Autor: Rodrigo Azevedo
*/
const mongoose = require('mongoose');
const Questao = mongoose.model('Questao');
const returns = require('../../../util/returns');
const httpCodes = require('../../../util/httpCodes');
const responses = require('../../../util/responses');
// const genericDAO = require('../../../util/genericDAO');
const utilToken = require('../../../util/token');
const controllerCategoria = require('../categoriasQuestoes/listaCategoria');

exports.listarQuestoes = async (req, res) => {

	let lista_categorias = await controllerCategoria.listarCategorias(req, res);
	let lista_questoes = [];

	if(req.query.categoria){
		lista_questoes = await Questao.find({categoria: req.query.categoria}).populate('categoria').populate('usuario').limit(30).exec();
	}
	else {
		lista_questoes = await Questao.find({}).populate('categoria').populate('usuario').limit(30).exec()
	}

    // Chamando a query diretamente no return para não sobrecarregar memória
    return res.status(httpCodes.get('OK')).json({status: true, 
    	msg:responses.getValue('dadosListados'), 
    	questoes: lista_questoes,
    	categorias: lista_categorias});
}
