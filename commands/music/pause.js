const command = require('../../utils/command')

class pause extends command{
  constructor(client){
    super(client, {
      name: 'pause',
      category: 'music',
      guildOnly: true,
        description: 'permet de mettre en pause une musique',
        syntax: 'aucune'
    
    })
  }
  run(message) {
    const player = thisclient.manager.get(message.guild.id);
    if (!player) return message.reply("there is no player for this guild.");

    const { channel } = message.member.voice;
    
    if (!channel) return message.reply("you need to join a voice channel.");
    if (channel.id !== player.voiceChannel) return message.reply("you're not in the same voice channel.");
    if (player.paused) return message.reply("the player is already paused.");

    player.pause(true);
    return message.reply("paused the player.");
  }
  }
  module.exports=pause