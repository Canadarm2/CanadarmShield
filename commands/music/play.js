const Discord = require('discord.js')
const command=require('../../utils/command')
class play extends command{
  constructor(client){
    super(client, {
      name: 'play',
    
      category: 'music',
      guildOnly: true,
        description: 'permet de lancer une musique',
        syntax: '<lien youtube>'
  
    })
  }
    async run(message, args) {
    if (!message.member.voice.channel) return message.reply("Vous devez rejoindre un salon vocale.");
    if(!args[0])return message.channel.send('j\'ai besoin d\'un therme à rechercher ou d\'un lien youtube!')
    const search = args.join(" ");
    let res;

    try {
      // Search for tracks using a query or url, using a query searches youtube automatically and the track requester object
      res = await this.client.manager.search(search, message.author);
      // Check the load type as this command is not that advanced for basics
      if (res.loadType === "LOAD_FAILED") throw res.exception;
      else if (res.loadType === "PLAYLIST_LOADED") throw { message: "Playlists are not supported with this command." };
    } catch (err) {
      return message.reply(`there was an error while searching: ${err.message}`);
    }

    // Create the player 
    const player = this.client.manager.create({
      guild: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
    });
  
    if(!player.voice)player.connect();
    player.queue.add(res.tracks[0]);
  
    // Checks if the client should play the track if it's the first one added
    if (!player.playing && !player.paused && !player.queue.size) player.play()

    return message.reply(`enqueuing ${res.tracks[0].title}.`);
    }
    }
    module.exports = play