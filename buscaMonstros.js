const rp = require('request-promise');
const cheerio = require('cheerio')

const urlThor = 'https://playragnarokonlinebr.com/database/thor/monstros?page=1&nome=',
  urlDetalhesThor = 'https://playragnarokonlinebr.com/database/thor/',
  urlValhalla = 'https://playragnarokonlinebr.com/database/valhalla/monstros?page=1&nome=',
  urlDetalhesValhalla = 'https://playragnarokonlinebr.com/database/valhalla/';
const links = [];

// Exemplo de busca do monstro Poring no servidor Thor
buscaLinks("poring", 0)
  .then(
    function() {
      links.forEach(function(element) {
        buscaDetalhesMstr(element.url)
          .then(async function(monstro) {
              console.log(monstro.nome); //Aqui vai editar a mensagem do discord para cada monstro.
            }, err => console.log("Error:" + err)
          ).catch(e => console.log("Error:" + e));
      });
    }, err => console.log("Error:" + err)
  ).catch(e => console.log("Error:" + e));
// (Vamos utilizar no Discord)

async function buscaLinks(nome , servidor) { // Servidor: 0 = Thor, 1 = Valhalla
  let url = urlThor;
  let urlDetalhes =  urlDetalhesThor;
  if (servidor == 1) {
    url = urlValhalla;
    urlDetalhes = urlDetalhesValhalla;
  }
  await rp(url + nome, function(err, res, body) {
    if (err) console.log("Error:" + err);
    let $ = cheerio.load(body);
    $('.monstros a').each(function() {
      let urlComplementoDetalhes = $(this).attr('href')
      let link = Object.create({url: urlDetalhes + urlComplementoDetalhes});
      links.push(link);
    })
  });
}

async function buscaDetalhesMstr(url) {
  var nomeMonstro, imgMonstro;
  await rp(url, function(err, res, body) {
    console.log(url);
    if (err) console.log("Error:" + err);
    var $ = cheerio.load(body);
    nomeMonstro = $('#itemDescription').find('h1').text();
    imgMonstro = $('.col-xs-10 #hidden img').attr('src');
    monstro = Object.create({
      nome: nomeMonstro,
      link: url,
      img: imgMonstro,
      informacoes: buscaInformacoesDoMonstro(body),
      fraquezasEResistencias: buscaResEFraqMstr(body),
      atributosCaracteristicas: buscaAtrCaracMstr(body),
      atributosBuild: buscaAtribsBuildMstr(body),
      drops: buscaDropsDoMonstro(body)
    });
  });
  return monstro
}

function buscaInformacoesDoMonstro(body) {
  var informacaoNivel, informacaoRaca, informacaoPropriedade, informacaoTamanho, informacaoExpBase, informacaoExpClasse;
  var $ = cheerio.load(body);
  let array = $('#informacoes-list li').map(function() {
    return $(this).text().trim();
  }).toArray();
  array.forEach(function(element, index) {
    switch(index) {
      case 1:
        informacaoNivel = parseInt(element);
        break;
      case 3:
        informacaoRaca = element;
        break;
      case 5:
        informacaoPropriedade = element;
        break;
      case 7:
        informacaoTamanho = element;
        break;
      case 9:
        informacaoExpBase = parseFloat(element);
        break;
      case 11:
        informacaoExpClasse = parseFloat(element);
        break;
      default:
        break;
    }
    informacoesMonstro = Object.create({
      nivel: informacaoNivel,
      raca: informacaoRaca,
      propriedade: informacaoPropriedade,
      tamanho: informacaoTamanho,
      expBase: informacaoExpBase,
      expClasse: informacaoExpClasse
    })
  });
  return informacoesMonstro;
}

function buscaResEFraqMstr(body) {
  var RFNeutro, RFTerra, RFVento, RFSagrado, RFFantasma, RFAgua, RFFogo, RFVeneno, RFSombrio, RFMaldito;
  var $ = cheerio.load(body);
  let array = $('#property li').map(function() {
    return $(this).text().trim();
  }).toArray();
  array.forEach(function(element, index) {
    switch(index) {
      case 1:
        RFNeutro = element;
        break;
      case 3:
        RFAgua = element;
        break;
      case 5:
        RFTerra = element;
        break;
      case 7:
        RFFogo = element;
        break;
      case 9:
        RFVento = element;
        break;
      case 11:
        RFVeneno = element;
        break;
      case 13:
        RFSagrado = element;
        break;
      case 15:
        RFSombrio = element;
        break;
      case 17:
        RFFantasma = element;
        break;
      case 19:
        RFMaldito = element;
        break;
      default:
        break;
    }
    FraquezasEResistenciasMonstro = Object.create({
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
    })
  });
  return FraquezasEResistenciasMonstro;
}

function buscaAtrCaracMstr(body) {
  var atributoHP, atributoAtaque, atributoAlcance, atributoPrecisao, atributoEsquiva;
  var $ = cheerio.load(body);
  let array = $('#two-flexbox .information .list li').map(function() {
    return $(this).text().trim();
  }).toArray();
  array.forEach(function(element, index) {
    switch(index) {
      case 1:
        atributoHP = element;
        break;
      case 3:
        atributoAtaque = element;
        break;
      case 5:
        atributoAlcance = element;
        break;
      case 7:
        atributoPrecisao = element;
        break;
      case 9:
        atributoEsquiva = element;
        break;
      default:
        break;
    }
    AtributosCaracteristicasDoMonstro = Object.create({
      hp: atributoHP,
      ataque: atributoAtaque,
      alcance: atributoAlcance,
      precisão: atributoPrecisao,
      esquiva: atributoEsquiva
    })
  });
  return AtributosCaracteristicasDoMonstro;
}

function buscaAtribsBuildMstr(body) {
  var atributoDEF, atributoVIT, atributoDEFM, atributoINT, atributoFOR, atributoDES, atributoAGI, atributoSOR;
  var $ = cheerio.load(body);
  let array = $('#two-flexbox #flex-outside .flex-4 li').map(function() {
    return $(this).text().trim();
  }).toArray();
  array.forEach(function(element, index) {
    switch(index) {
      case 1:
        atributoDEF = element;
        break;
      case 3:
        atributoVIT = element;
        break;
      case 5:
        atributoDEFM = element;
        break;
      case 7:
        atributoINT = element;
        break;
      case 9:
        atributoFOR = element;
        break;
      case 11:
        atributoDES = element;
        break;
      case 13:
        atributoAGI = element;
        break;
      case 15:
        atributoSOR = element;
        break;
      default:
        break;
    }
    AtributosBuildDoMonstro = Object.create({
      def: atributoDEF,
      vit: atributoVIT,
      defm: atributoDEFM,
      int: atributoINT,
      for: atributoFOR,
      des: atributoDES,
      agi: atributoAGI,
      sor: atributoSOR,
    })
  });
  return AtributosBuildDoMonstro;
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

export { buscaAtribsBuildMstr, buscaAtrCaracMstr, buscaResEFraqMstr, buscaLinks, buscaDetalhesMstr };