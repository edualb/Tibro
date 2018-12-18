const rp = require('request-promise');
const cheerio = require('cheerio')

const urlThor = 'https://playragnarokonlinebr.com/database/thor/monstros?page=1&nome=',
  urlDetalhesThor = 'https://playragnarokonlinebr.com/database/thor/',
  urlValhalla = 'https://playragnarokonlinebr.com/database/valhalla/monstros?page=1&nome=',
  urlDetalhesValhalla = 'https://playragnarokonlinebr.com/database/valhalla/';

// Exemplo de busca do monstro Poring no servidor Thor
buscaLinks("poring", 0).then(async function(links) {
  for (const link of links) {
    await buscaDetalhesMstr(link.url)
    .then(function(monstro) {
        console.log(monstro.nome); //Aqui vai editar a mensagem do discord para cada monstro.
      }, err => console.log("Error:" + err)
    ).catch(e => console.log("Error:" + e));
  }
}, err => console.log("Error:" + err)
).catch(e => console.log("Error:" + e));
// (Vamos utilizar no Discord)

async function buscaLinks(nome , servidor) { // Servidor: 0 = Thor, 1 = Valhalla
  let url = urlThor;
  let urlDetalhes =  urlDetalhesThor;
  let links = [];
  if (servidor == 1) {
    url = urlValhalla;
    urlDetalhes = urlDetalhesValhalla;
  }
  await rp(url + nome, function(err, res, body) {
    if (err) console.log("Error:" + err);
    let $ = cheerio.load(body);
    $('.monstros a').each(function() {
      let urlComplementoDetalhes = $(this).attr('href')
      links.push({url: urlDetalhes + urlComplementoDetalhes});
    })
  });
  return links;
}

async function buscaDetalhesMstr(url) {
  monstro = {};
  await rp(url, function(err, res, body) {
    if (err) console.log("Error:" + err);
    var $ = cheerio.load(body);
    nomeMonstro = $('#itemDescription').find('h1').text();
    imgMonstro = $('.col-xs-10 #hidden img').attr('src');
    monstro = {
      nome: nomeMonstro,
      link: url,
      img: imgMonstro,
      informacoes: buscaInformacoesDoMonstro(body),
      fraquezasEResistencias: buscaResEFraqMstr(body),
      atributosCaracteristicas: buscaAtrCaracMstr(body),
      atributosBuild: buscaAtribsBuildMstr(body),
      drops: buscaDropsDoMonstro(body)
    };
  });
  return monstro;
}

function buscaInformacoesDoMonstro(body) {
  var informacaoNivel, informacaoRaca, informacaoPropriedade, informacaoTamanho, informacaoExpBase, informacaoExpClasse;
  var $ = cheerio.load(body);
  $('#informacoes-list').map(function() {
    informacaoNivel = $(this).find('li').eq(1).text().trim();
    informacaoRaca = $(this).find('li').eq(3).text().trim();
    informacaoPropriedade = $(this).find('li').eq(5).text().trim();
    informacaoTamanho = $(this).find('li').eq(7).text().trim();
    informacaoExpBase = $(this).find('li').eq(9).text().trim();
    informacaoExpClasse = $(this).find('li').eq(11).text().trim();
  });
  return {
    nivel: informacaoNivel,
    raca: informacaoRaca,
    propriedade: informacaoPropriedade,
    tamanho: informacaoTamanho,
    expBase: informacaoExpBase,
    expClasse: informacaoExpClasse
  };
}

function buscaResEFraqMstr(body) {
  var RFNeutro, RFTerra, RFVento, RFSagrado, RFFantasma, RFAgua, RFFogo, RFVeneno, RFSombrio, RFMaldito;
  var $ = cheerio.load(body);
  $('#property').map(function() {
    RFNeutro = $(this).find('li').eq(1).text().trim();
    RFAgua = $(this).find('li').eq(3).text().trim();
    RFTerra = $(this).find('li').eq(5).text().trim();
    RFFogo = $(this).find('li').eq(7).text().trim();
    RFVento = $(this).find('li').eq(9).text().trim();
    RFVeneno = $(this).find('li').eq(11).text().trim();
    RFSagrado = $(this).find('li').eq(13).text().trim();
    RFSombrio = $(this).find('li').eq(15).text().trim();
    RFFantasma = $(this).find('li').eq(17).text().trim();
    RFMaldito = $(this).find('li').eq(19).text().trim();
  });
  return {
    neutro: RFNeutro,
    terra: RFTerra,
    vento: RFVento,
    sagrado: RFSagrado,
    fantasma: RFFantasma,
    agua: RFAgua,
    fogo: RFFogo,
    veneno: RFVeneno,
    sombrio: RFSombrio,
    maldito: RFMaldito,
  };
}

function buscaAtrCaracMstr(body) {
  var atributoHP, atributoAtaque, atributoAlcance, atributoPrecisao, atributoEsquiva;
  var $ = cheerio.load(body);
  $('#two-flexbox .information .list').map(function() {
    atributoHP = $(this).find('li').eq(1).text().trim();
    atributoAtaque = $(this).find('li').eq(3).text().trim();
    atributoAlcance = $(this).find('li').eq(5).text().trim();
    atributoPrecisao = $(this).find('li').eq(7).text().trim();
    atributoEsquiva = $(this).find('li').eq(9).text().trim();
  });
  return {
    hp: atributoHP,
    ataque: atributoAtaque,
    alcance: atributoAlcance,
    precisão: atributoPrecisao,
    esquiva: atributoEsquiva
  };
}

function buscaAtribsBuildMstr(body) {
  var atributoDEF, atributoVIT, atributoDEFM, atributoINT, atributoFOR, atributoDES, atributoAGI, atributoSOR;
  var $ = cheerio.load(body);
  $('#two-flexbox #flex-outside ul').map(function() {
    atributoDEF = $(this).find('li').eq(1).text().trim();
    atributoVIT = $(this).find('li').eq(3).text().trim();
    atributoDEFM = $(this).find('li').eq(5).text().trim();
    atributoINT = $(this).find('li').eq(7).text().trim();
    atributoFOR = $(this).find('li').eq(9).text().trim();
    atributoDES = $(this).find('li').eq(11).text().trim();
    atributoAGI = $(this).find('li').eq(13).text().trim();
    atributoSOR = $(this).find('li').eq(15).text().trim();
  });
  return {
    def: atributoDEF,
    vit: atributoVIT,
    defm: atributoDEFM,
    int: atributoINT,
    for: atributoFOR,
    des: atributoDES,
    agi: atributoAGI,
    sor: atributoSOR,
  };
}

function buscaDropsDoMonstro(body) {
  let drops
  var $ = cheerio.load(body);
  drops = $('#slider-result ul li').map(function() {
    nomeItem = $(this).find('.show h5').text().trim();
    urlItem = $(this).find('img').attr('src');
    dropItem = $(this).find('label').eq(1).text().trim();
    precoItem = $(this).find('label').eq(2).text().trim();
    return {nome: nomeItem, img: urlItem, dropChance: dropItem, preco: precoItem};
  }).toArray();
  return drops;
}

module.exports = { buscaAtribsBuildMstr, buscaAtrCaracMstr, buscaResEFraqMstr, buscaLinks, buscaDetalhesMstr };