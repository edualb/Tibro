const ops = require('../buscaMonstros.js');
const assert = require('assert');
const monstro = require('./monstro.json');

// not the best solution, it should resolve the promise first,
// mount an object and then test each field
describe('tests', async () => {
    const url = "https://playragnarokonlinebr.com/database/thor/monstros/detalhes/poporing";
    describe('test monster details', () => {
        it('monster should not be empty', () => {
            return ops.buscaDetalhesMstr(url)
                .then((data) => {
                    assert(data != null, "monster is empty");
                }
            )
        })
        it('monster should have name', () => {
            return ops.buscaDetalhesMstr(url)
                .then((data) => {
                    assert.equal(data.nome, monstro.nome);
                }
            )
        });
        it('monster should have link', () => {
            return ops.buscaDetalhesMstr(url)
                .then((data) => {
                    assert.equal(data.link, monstro.link);
                }
            )
        });
        it('monster should have img', () => {
            return ops.buscaDetalhesMstr(url)
                .then((data) => {
                    assert.equal(data.img, monstro.img);
                }
            )
        });
        it('monster should have information', () => {
            return ops.buscaDetalhesMstr(url)
                .then((data) => {
                    assert.deepEqual(data.informacoes, monstro.informacoes);
                }
            )
        });
        it('monster should have weakness and resistances', () => {
            return ops.buscaDetalhesMstr(url)
                .then((data) => {
                    assert.deepEqual(data.fraquezasEResistencias, monstro.fraquezasEResistencias);
                }
            )
        });
        it('monster should have features attributes', () => {
            return ops.buscaDetalhesMstr(url)
                .then((data) => {
                    assert.deepEqual(data.atributosCaracteristicas, monstro.atributosCaracteristicas);
                }
            )
        });
    })
});