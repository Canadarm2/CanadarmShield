const command = require('../../utils/command')

class resume extends command{
  constructor(client){
    super(client, {
      name: "resume",
      category: 'music',
      guildOnly: true,
      description: 'permet de reprendre une musique',
      syntax: 'aucune'
    })
  }
  run(message) {
    const player = this.client.manager.get(message.guild.id);
    if (!player) return message.reply("there is no player for this guild.");

    const { channel } = message.member.voice;
    
    if (!channel) return message.reply("you need to join a voice channel.");
    if (channel.id !== player.voiceChannel) return message.reply("you're not in the same voice channel.");
    if (!player.paused) return message.reply("the player is already resumed.");

    player.pause(false);
    return message.reply("resumed the player.");
  }
    }
    module.exports = resume