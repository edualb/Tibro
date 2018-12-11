const rp = require('request-promise');
const cheerio = require('cheerio')

const urlThor = 'https://playragnarokonlinebr.com/database/thor/monstros?page=1&nome=',
  urlDetalhesThor = 'https://playragnarokonlinebr.com/database/thor/',
  urlValhalla = 'https://playragnarokonlinebr.com/database/valhalla/monstros?page=1&nome=',
  urlDetalhesValhalla = 'https://playragnarokonlinebr.com/database/valhalla/';
const monstros = [];
const links = [];

// Exemplo de busca do monstro Poring no servidor Thor
buscaLinksDetalhes("abelha", 0)
  .then(
    function() {
      links.forEach(element => {
        buscaDetalhesDoMonstro(element.url);
      });
    }, err => console.log("Error:" + err)
  ).catch(e => console.log("Error:" + e));
// (Vamos utilizar no Discord)

async function buscaLinksDetalhes(nome , servidor) { // Servidor: 0 = Thor, 1 = Valhalla
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

async function buscaDetalhesDoMonstro(url) {
  let informacoes, fraquezasEResistencias,atributosCaracteristicas, atributosBuild, drops;
  await rp(url, function(err, res, body) {
    if (err) console.log("Error:" + err);
    var $ = cheerio.load(body);
    let nome = $('#itemDescription').find('h1').text();
    let img = $('.col-xs-10 #hidden img').attr('src');
    buscaInformacoesDoMonstro(url).then(function(result) {
      informacoes = result;
      buscaResistenciasEFraquezasDoMonstro(url).then(function(result) {
        fraquezasEResistencias = result;
        buscaAtributosCaracteristicasDoMonstro(url).then(function(result) {
          atributosCaracteristicas = result;
          buscaAtributosBuildDoMonstro(url).then(function(result) {
            atributosBuild = result;
            buscaDropsDoMonstro(url).then(function(result){

            }).catch(e => console.log(e));
          }).catch(e => console.log(e));
        }).catch(e => console.log(e));
      }).catch(e => console.log(e));
    }).catch(e => console.log(e));
  });
  /*let monstro = Object.create({
    nome: nomeMonstro,
    link: url
  })*/
  //monstros.push(monstro);
}

async function buscaInformacoesDoMonstro(url) {
  var informacaoNivel, informacaoRaca, informacaoPropriedade, informacaoTamanho, informacaoExpBase, informacaoExpClasse;
  await rp(url, function(err, res, body) {
    if (err) console.log("Error:" + err);
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
    });
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

async function buscaResistenciasEFraquezasDoMonstro(url) {
  var RFNeutro, RFTerra, RFVento, RFSagrado, RFFantasma, RFAgua, RFFogo, RFVeneno, RFSombrio, RFMaldito;
  await rp(url, function(err, res, body) {
    if (err) console.log("Error:" + err);
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
    });
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

async function buscaAtributosCaracteristicasDoMonstro(url) {
  var atributoHP, atributoAtaque, atributoAlcance, atributoPrecisao, atributoEsquiva;
  await rp(url, function(err, res, body) {
    if (err) console.log("Error:" + err);
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
    });
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

async function buscaAtributosBuildDoMonstro(url) {
  var atributoDEF, atributoVIT, atributoDEFM, atributoINT, atributoFOR, atributoDES, atributoAGI, atributoSOR;
  await rp(url, function(err, res, body) {
    if (err) console.log("Error:" + err);
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
    });
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

async function buscaDropsDoMonstro(url) {
  var drop, preco, img, nome;
  await rp(url, function(err, res, body) {
    if (err) console.log("Error:" + err);
    var $ = cheerio.load(body);
    //console.log($(this).find('.itens .show img').attr('src'));
    let array = $('#slider-result ul li').map(function() {
      nomeItem = $(this).find('.show h5').text().trim();

      return {nome: nomeItem};
    }).toArray();
    array.forEach(element => {
      console.log(element.nome);
    });
    /*AtributosCaracteristicasDoMonstro = Object.create({
      hp: atributoHP,
      ataque: atributoAtaque,
      alcance: atributoAlcance,
      precisão: atributoPrecisao,
      esquiva: atributoEsquiva
    })*/
  });
  //return AtributosCaracteristicasDoMonstro;
}
