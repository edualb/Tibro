const tibroconfig = require("./tibroconfig.json");
const discord = require("discord.js");
const bot = new discord.Client({disableEveryone: true});

bot.on("ready", async () => {
    bot.user.setActivity("Ragnarok Online");
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    let prefix = tibroconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(cmd === `${prefix}hello`) {
        return message.channel.send("Hello!");
    }
});


bot.login(tibroconfig.token);