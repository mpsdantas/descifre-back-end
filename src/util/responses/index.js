const Enum = require('enum');

const responses = new Enum({
    'erroCriarUsuario': "Problema ao criar usuario.",
    'problemaInterno': "O sistema apresentou um erro de processamento interno.",
    "usuarioCriado": "Usuário criado com sucesso.",
    "usuarioInvalido": "Usuário ou senha inválidos."
});
module.exports = responses;