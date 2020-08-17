const discord = require("discord.js");
const botConfig = require("./botconfig.json");

const fs = require("fs");

const client = new discord.Client();
client.commands = new discord.Collection();

client.login(process.env.token);

fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log("Kon de files niet vinden!");
        return;
    }

    jsFiles.forEach((f, i) => {
        var fileGet = require(`./commands/${f}`);
        console.log(`De file ${f} is geladen!`);

        client.commands.set(fileGet.help.name, fileGet);
    })

})

client.on("guildMemberAdd" , member => {


 var role = member.guild.roles.cache.get(`718891817776578611`);

  if(!role) return;

  member.roles.add(role);

  var channel = member.guild.channels.cache.get(`718494392528273542`);

  if(!channel) return;

var joinEmbed = new discord.MessageEmbed()
    .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
    .setDescription(`hoi ${member.user.username}, welkom op de server`)
    .setColor("#0099ff")
    .setFooter("gebruiker gejoind")
    .setTimestamp()

    channel.send(joinEmbed);

})
client.on("guildMemberRemove" , member => {

   
     var channel = member.guild.channels.cache.get(`718494392528273542`);
   
     if(!channel) return;
   
   var leaveEmbed = new discord.MessageEmbed()
       .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
       .setDescription(`dat is jammer hopen dat je nog terug komt ${member.user.username},`)
       .setColor("#FF0000")
       .setFooter("gebruiker geleave")
       .setTimestamp()
   
       channel.send(leaveEmbed);
   
   })
client.on("ready", async() => {

    console.log(`${client.user.username} is online!`);
    client.user.setActivity(`your mus!c`, {type: "LISTENING"});

});
client.on("message", async message => {

    if (message.author.bot) return;

    if (message.channel.type === "dm") return;

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    var arguments = messageArray.slice(1);

    var commands = client.commands.get(command.slice(prefix.length));

    if (!message.content.startsWith(prefix)) return;

    if (commands) commands.run(client, message, arguments);

var randomXp = Math.floor(Math.random(1) * 15) +1;

console.log(randomXp);
});