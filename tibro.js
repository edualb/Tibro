const discord = require("discord.js");
const buscaMstr = require('./buscaMonstros.js');
const trataImg = require('./trataImg.js');

const bot = new discord.Client({disableEveryone: true});

bot.on("ready", async () => {
    console.log('Tibro está online.');
    bot.user.setActivity("Ragnarok Online");
});

bot.on("message", async message => {
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    if(cmd === `!mobt`) msgEmbededServidor(message, 0, args);
    else if(cmd === `!mobv`) msgEmbededServidor(message, 1, args);
    else if(cmd === `!help` || cmd === `!h`) msgLibEmbed(message);
});

bot.login(process.env.TOKEN);

function msgEmbededServidor(message, servidor, nomeMonstro) {
    colorEmbeded = servidor === 1 ? 0xFFA200 : 0x00BECA;
    buscaMstr.buscaLinks(buscaMstr.formataMsgBusca(nomeMonstro), servidor).then(async function(links) {
        for (const link of links) {
          await buscaMstr.buscaDetalhesMstr(link.url)
          .then(async function(monstro) {
            const attachment = new discord.Attachment(await trataImg.bufferImg(monstro.img), 'monstro.png');
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
                    name: "*Drops*", 
                    value: `*${monstro.nome}:*\n${monstro.drops.map((drop) => `**${drop.nome}**\n\xa0\xa0\xa0\xa0\ ${drop.dropChance}\xa0\xa0\xa0\xa0\ ${drop.preco}`.trim()).join('\n')}`,
                    inline: true
                },
                {
                    name: "*Resistências e Fraquezas*", 
                    value: `**Neutro:** ${monstro.fraquezasEResistencias.neutro}\xa0\xa0\xa0\xa0\xa0\xa0\xa0**Água:** ${monstro.fraquezasEResistencias.agua}\n` + 
                            `**Terra:** ${monstro.fraquezasEResistencias.terra}\xa0\xa0\xa0\xa0\xa0\xa0\xa0**Fogo:** ${monstro.fraquezasEResistencias.fogo}\n` + 
                            `**Vento:** ${monstro.fraquezasEResistencias.vento}\xa0\xa0\xa0\xa0\xa0\xa0\xa0**Veneno:** ${monstro.fraquezasEResistencias.veneno}\n` + 
                            `**Sagrado:** ${monstro.fraquezasEResistencias.sagrado}\xa0\xa0\xa0\xa0\xa0\xa0\xa0**Sombrio:** ${monstro.fraquezasEResistencias.sombrio}\n` + 
                            `**Fantasma:** ${monstro.fraquezasEResistencias.fantasma}\xa0\xa0\xa0\xa0\xa0\xa0\xa0**Maldito:** ${monstro.fraquezasEResistencias.maldito}\n`,
                    inline: true
                },
            ]
            return message.channel.send(embed);
            }, err => console.log("Error:" + err)
          ).catch(e => console.log("Error:" + e));
        }
      }, err => console.log("Error:" + err)
    ).catch(e => console.log("Error:" + e));
}

function msgLibEmbed(message) {
    const embed = new discord.RichEmbed()
        .setTitle('Biblioteca de comandos:')
        .setColor(0x0000FF);
    embed.fields = 
    [
        {
            name: "*!mobt #NomeDoMonstro*",
            value: `► Pesquisa os detalhes do monstro #NomeDoMonstro no servidor Thor.`
        },
        {
            name: "*!mobv #NomeDoMonstro*",
            value: `► Pesquisa os detalhes do monstro #NomeDoMonstro no servidor Valhalla.`
        }
    ]
    return message.channel.send(embed);
}