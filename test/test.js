const ops = require('../utilitários/buscaMonstros.js');
const assert = require('assert');
const monstro = require('./monstro.json');

// not the best solution, it should resolve the promise first,
describe('test monster details', async () => {
    const url = "https://playragnarokonlinebr.com/database/thor/monstros/detalhes/poporing";
    let monstroDetalhes;
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
            return assert(monstroDetalhes.nome != null, 'monster need a name');
        });
        it('monster should have link', () => {
            return assert(monstroDetalhes.link != null, 'monster need a link');
        });
        it('monster should have img', () => {
            return assert(monstroDetalhes.img != null, 'monster need a image');
        });
        it('monster should have information', () => {
            return assert(monstroDetalhes.informacoes !== null, 'monster need an information');
        });
        it('monster should have weakness and resistances', () => {
            return assert(monstroDetalhes.fraquezasEResistencias !== null, 'monster need a weakness and resistances');
        });
        it('monster should have features attributes', () => {
            return assert(monstroDetalhes.atributosCaracteristicas !== null, 'monster need a features attributes');
        });
        it('monster should have drops', () => {
            return assert(monstroDetalhes.drops !== null, 'monster needs drops');
        });
    });
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
    });
});
describe('test links', async () => {
    const linkThor = [{url: "https://playragnarokonlinebr.com/database/thor/monstros/detalhes/mistress"}];
    const linkValhalla = [{url: "https://playragnarokonlinebr.com/database/valhalla/monstros/detalhes/mistress"}];
    let linksThor, linksValhalla;
    describe('test data links is not empty', () => {
        it('links Thor should not be empty', () => {
            return ops.buscaLinks("abelha", 0)
                .then((data) => {
                    linksThor = data;
                    assert(data != null, "links Thor is empty");
                }
            )
        })
        it('links Valhalla should not be empty', () => {
            return ops.buscaLinks("abelha", 1)
                .then((data) => {
                    linksValhalla = data;
                    assert(data != null, "links Valhalla is empty");
                }
            )
        })
        it('links Thor should have url', () => {
            return assert(linksThor.url !== null, 'Thor need a url');
        });
        it('links Valhalla should have url ', () => {
            return assert(linksValhalla.url !== null, 'Valhalla need a url');
        });
    });
    describe('test of data links url attribute of Thor and Valhalla server should be correct', () => {
        it('comparison of link url Thor server should be correct', () => {
            return assert.deepEqual(linksThor.url, linkThor.url);
        });
        it('comparison of link url Valhalla server should be correct', () => {
            return assert.deepEqual(linksValhalla.url, linkValhalla.url);
        });
    });
});