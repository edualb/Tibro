const tibroconfig = require("./tibroconfig.json");
const discord = require("discord.js");
const ops = require('../buscaMonstros.js');
const { createCanvas, loadImage } = require('canvas')
const jimp = require('jimp');
const fs = require("fs");

const bot = new discord.Client({disableEveryone: true});

bot.on("ready", async () => {
    bot.user.setActivity("Ragnarok Online");
});

bot.on("message", async message => {
    let prefix = tibroconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    if(cmd === `${prefix}mobt`) {
        msgEmbededServidor(message, 0, args);
    } else if(cmd === `${prefix}mobv`) {
        msgEmbededServidor(message, 1, args);
    }
});

bot.login(tibroconfig.token);

function msgEmbededServidor(message, servidor, nomeMonstro) {
    let colorEmbeded = 0xFFA200;
    if (servidor == 1) colorEmbeded = 0x00BECA;
    ops.buscaLinks(ops.formataMsgBusca(nomeMonstro), servidor).then(async function(links) {
        for (const link of links) {
          await ops.buscaDetalhesMstr(link.url)
          .then(async function(monstro) {
            criaPastaImg();
            await carregaImg(monstro.img, "./img/monstro.png");
            carregaImgDrops(monstro.drops);
            const attachment = new discord.Attachment('./img/monstro.png', 'monstro.png');
            const embed = new discord.RichEmbed()
                .setTitle(monstro.nome)
                .setColor(colorEmbeded)
                .attachFiles([attachment])
                .setThumbnail('attachment://monstro.png')
            embed.fields = [
                {
                    name: "*Características*", 
                    value: `**HP:** ${monstro.atributosCaracteristicas.hp}\n**Ataque:** ${monstro.atributosCaracteristicas.ataque}\n` + 
                            `**Alcance:** ${monstro.atributosCaracteristicas.alcance}\n**Precisão:** ${monstro.atributosCaracteristicas.precisao}\n` + 
                            `**Esquiva:** ${monstro.atributosCaracteristicas.esquiva}`,
                    inline: true
                },
                {
                    name: "*Informações*", 
                    value: `**Nível:** ${monstro.informacoes.nivel}\n**Raça:** ${monstro.informacoes.raca}\n**Propriedade:** ${monstro.informacoes.propriedade}\n` +
                            `**Tamanho:** ${monstro.informacoes.tamanho}\n**Exp Base:** ${monstro.informacoes.expBase}\n**Exp Classe:** ${monstro.informacoes.expClasse}`,
                    inline: true
                },
                {
                    name: "*Resistências e Fraquezas*", 
                    value: `**Neutro:** ${monstro.fraquezasEResistencias.neutro}\xa0\xa0\xa0\xa0\xa0\xa0\xa0**Água:** ${monstro.fraquezasEResistencias.agua}\n` + 
                            `**Terra:** ${monstro.fraquezasEResistencias.terra}\xa0\xa0\xa0\xa0\xa0\xa0\xa0**Fogo:** ${monstro.fraquezasEResistencias.fogo}\n` + 
                            `**Vento:** ${monstro.fraquezasEResistencias.vento}\xa0\xa0\xa0\xa0\xa0\xa0\xa0**Veneno:** ${monstro.fraquezasEResistencias.veneno}\n` + 
                            `**Sagrado:** ${monstro.fraquezasEResistencias.sagrado}\xa0\xa0\xa0\xa0\xa0\xa0\xa0**Sombrio:** ${monstro.fraquezasEResistencias.sombrio}\n` + 
                            `**Fantasma:** ${monstro.fraquezasEResistencias.fantasma}\xa0\xa0\xa0\xa0\xa0\xa0\xa0**Maldito:** ${monstro.fraquezasEResistencias.maldito}\n`,
                        },
            ]
            return message.channel.send(embed);
            }, err => console.log("Error:" + err)
          ).catch(e => console.log("Error:" + e));
        }
      }, err => console.log("Error:" + err)
    ).catch(e => console.log("Error:" + e));
}

async function carregaImg(url, path) {
    var canvas = createCanvas(200, 200, "png");
    var ctx = canvas.getContext("2d");
    await loadImage(url).then((image) => {
        ctx.drawImage(image, 0, 0, 150, 150)
    });
    var buf = canvas.toBuffer();
    fs.writeFileSync(path, buf);
    if (path.slice(0, 16) === './img/drops/drop') removeWhiteBackground(path);
}

function criaPastaImg() {
    if (!fs.existsSync('./img')) fs.mkdirSync('./img');
    if (!fs.existsSync('./img/drops')) fs.mkdirSync('./img/drops');
}

//TODO: Quando chegar os Drops, vamos precisar limpar.
async function carregaImgDrops(monstroDrops) {
    let i = 0;
    if (monstroDrops) {
        let drops = await monstroDrops.map((element) => {
            return element.img;
        });
        drops.forEach(img => {
            carregaImg(img, './img/drops/drop'+i+'.png');
            i++;
        });
        i = 0;
    }
}

function removeWhiteBackground(path) {
    jimp.read(path).then(image => {
        const targetColor = {r: 255, g: 255, b: 255, a: 255};  // Color you want to replace
        const replaceColor = {r: 0, g: 0, b: 0, a: 0};  // Color you want to replace with
        const colorDistance = (c1, c2) => Math.sqrt(Math.pow(c1.r - c2.r, 2) + Math.pow(c1.g - c2.g, 2) + Math.pow(c1.b - c2.b, 2) + Math.pow(c1.a - c2.a, 2));  // Distance between two colors
        const threshold = 32;  // Replace colors under this threshold. The smaller the number, the more specific it is.
        image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
            const thisColor = {
                r: image.bitmap.data[idx + 0],
                g: image.bitmap.data[idx + 1],
                b: image.bitmap.data[idx + 2],
                a: image.bitmap.data[idx + 3]
            };
            if(colorDistance(targetColor, thisColor) <= threshold) {
                image.bitmap.data[idx + 0] = replaceColor.r;
                image.bitmap.data[idx + 1] = replaceColor.g;
                image.bitmap.data[idx + 2] = replaceColor.b;
                image.bitmap.data[idx + 3] = replaceColor.a;
            }
        })
        .scale(0.25);
        image.write(path);
    });
}