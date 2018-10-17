const mongoose = require('mongoose');
const Rodada = mongoose.model('Rodada');
const schedule = require('node-schedule');
const addHours = (date, hours) => {
    return new Date(date.getTime() + hours * 60 * 60000);
};
exports.criarRodada = async () => {
    var rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = [0, new schedule.Range(0, 6)];
    rule.hour = 0;
    rule.minute = 0;

    schedule.scheduleJob(rule, function () {
        let dataAtual = new Date();
        let dataFinalizacaoRodadaManha = addHours(dataAtual, 12);
        let dataFinalizacaoRodadaTarde = addHours(dataAtual, 18);
        let dataFinalizacaoRodadaNoite = addHours(dataAtual, 24);

        let rodadaManha = new Rodada({
            titulo: `Rodada da manhã ${dataAtual.toLocaleDateString()}`,
            dataAbertura: dataAtual,
            dataFinalizacao: dataFinalizacaoRodadaManha,
            duracao: 1,
            premiacao: 10,
            jogadores: [],
            ganhadores: [{
                porcentagemPremio: 50
            },
            {
                porcentagemPremio: 30
            },
            {
                porcentagemPremio: 20
            }],
            taxa_entrada: 0
        });
        let rodadaTarde = new Rodada({
            titulo: `Rodada da tarde ${dataAtual.toLocaleDateString()}`,
            dataAbertura: dataFinalizacaoRodadaManha,
            dataFinalizacao: dataFinalizacaoRodadaTarde,
            duracao: 1,
            premiacao: 10,
            jogadores: [],
            ganhadores: [{
                porcentagemPremio: 50
            },
            {
                porcentagemPremio: 30
            },
            {
                porcentagemPremio: 20
            }],
            taxa_entrada: 0
        });
        let rodadaNoite = new Rodada({
            titulo: `Rodada da Noite ${dataAtual.toLocaleDateString()}`,
            dataAbertura: dataFinalizacaoRodadaTarde,
            dataFinalizacao: dataFinalizacaoRodadaNoite,
            duracao: 1,
            premiacao: 10,
            jogadores: [],
            ganhadores: [{
                porcentagemPremio: 50
            },
            {
                porcentagemPremio: 30
            },
            {
                porcentagemPremio: 20
            }],
            taxa_entrada: 0
        });

        let arrayRodadas = [rodadaManha, rodadaTarde, rodadaNoite];

        Rodada.insertMany(arrayRodadas, (err, docs) => {
            console.log("Rodadas iniciadas.")
        });
    });
}