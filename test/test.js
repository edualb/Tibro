const ops = require('../buscaMonstros.js');
const assert = require('assert');
const monstro = require('./monstro.json');

// not the best solution, it should resolve the promise first,
describe('test monster details', async () => {
    const url = "https://playragnarokonlinebr.com/database/thor/monstros/detalhes/poporing";
    let monstroDetalhes
    describe('test data monster details is not empty', () => {
        it('monster should not be empty', () => {
            return ops.buscaDetalhesMstr(url)
                .then((data) => {
                    monstroDetalhes = data;
                    assert(data != null, "monster is empty");
                }
            )
        })
        it('monster should have name', () => {
            return assert(monstroDetalhes.nome != null, 'monster have a name');
        });
        it('monster should have link', () => {
            return assert(monstroDetalhes.link != null, 'monster have a link');
        });
        it('monster should have img', () => {
            return assert(monstroDetalhes.img != null, 'monster have a image');
        });
        it('monster should have information', () => {
            return assert(monstroDetalhes.informacoes !== null, 'monster have an information');
        });
        it('monster should have weakness and resistances', () => {
            return assert(monstroDetalhes.fraquezasEResistencias !== null, 'monster have a weakness and resistances');
        });
        it('monster should have features attributes', () => {
            return assert(monstroDetalhes.atributosCaracteristicas !== null, 'monster have a features attributes');
        });
        it('monster should have drops', () => {
            return assert(monstroDetalhes.drops !== null, 'monster have a drops');
        });
    })
    describe('test data monster details with all objects attributes', () => {
        it('comparison of monster name should be correct', () => {
            return assert.equal(monstroDetalhes.nome, monstro.nome);
        });
        it('comparison of monster link should be correct', () => {
            return assert.equal(monstroDetalhes.link, monstro.link);
        });
        it('comparison of monster img should be correct', () => {
            return assert.equal(monstroDetalhes.img, monstro.img);
        });
        it('comparison of monster information should be correct', () => {
            return assert.deepEqual(monstroDetalhes.informacoes, monstro.informacoes);
        });
        it('comparison of monster weakness and resistances should be correct', () => {
            return assert.deepEqual(monstroDetalhes.fraquezasEResistencias, monstro.fraquezasEResistencias);
        });
        it('comparison of monster features attributes should be correct', () => {
            return assert.deepEqual(monstroDetalhes.atributosCaracteristicas, monstro.atributosCaracteristicas);
        });
        it('comparison of monster drops should be correct', () => {
            return assert.deepEqual(monstroDetalhes.drops, monstro.drops);
        });
    })
});