const tibroconfig = require("./tibroconfig.json");
const discord = require("discord.js");
const ops = require('../buscaMonstros.js');
const bot = new discord.Client({disableEveryone: true});

bot.on("ready", async () => {
    bot.se
    bot.user.setActivity("Ragnarok Online");
});

bot.on("message", async message => {
    let prefix = tibroconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(cmd === `${prefix}mobt`) {
        ops.buscaLinks(ops.formataMsgBusca(args), 0).then(async function(links) {
            for (const link of links) {
              await ops.buscaDetalhesMstr(link.url)
              .then(function(monstro) {
                const embed = new discord.RichEmbed()
                    .setTitle(monstro.nome)
                    .setColor(0xFFA200)
                    .setDescription('montar mensagem')
                return message.channel.send(embed);
                }, err => console.log("Error:" + err)
              ).catch(e => console.log("Error:" + e));
            }
          }, err => console.log("Error:" + err)
        ).catch(e => console.log("Error:" + e));
    }
});

bot.login(tibroconfig.token);