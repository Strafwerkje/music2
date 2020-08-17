const discord = require("discord.js");
const ytdl = require("ytdl-core");

module.exports.run = async (bot, message, args) => {
  message.delete()
  if(!message.member.voice.channel) return message.reply("connecteer met een spraak kanaal");

if(message.guild.me.voice.channel) return message.channel.send("sorry de bot is al verbonden")

if(!args[0]) return message.reply("gelieven een Url mee tegeven");

var vaidate = await ytdl.validateURL(args[0]);
if(!vaidate) return message.channel.send("sorry gelieven een **juiste** url op te geven. ");

var info = await ytdl.getInfo(args[0]);

var options = {seek: 5, volume: 1}; 


var channelJoin = message.member.voice.channel.join()
  .then(voiceChannel => {

    var stream = ytdl(args[0], {filter: 'audioonly'});
    var dispatcher = voiceChannel.play(stream, options);

  }).catch(console.error);
  var songLength = info.videoDetails.lengthSeconds / 60
  var embed = new discord.MessageEmbed()
  .setTitle("Uw muziekje word succesvol afgespeeld.")
  .setColor("#ddf602")
  .addField(`**Titel:**`, info.videoDetails.title)
  .addField(`**Artiest:**`,  info.videoDetails.author.name)
  .addField(`**Time:**`, `_${songLength.toFixed(2)}_ minutes`)
  .addField(`**Requester:**`,  message.author  )
  return message.channel.send(embed);


}
module.exports.help = {
  name: "play",
  description: "doet de bot en Muziekje afspelen."
}