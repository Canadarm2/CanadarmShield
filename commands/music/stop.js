const command = require('../../utils/command')

class stop extends command {
  constructor(client){
    super(client, {
      name: "skip",
    category: 'music',
    guildOnly: true,
      description: 'permet de sauter une musique',
      syntax: 'aucune'
  
    })
  }
  run(message) {
    const player = this.client.manager.get(message.guild.id);
    if (!player) return message.reply("there is no player for this guild.");

    const { channel } = message.member.voice;
    
    if (!channel) return message.reply("you need to join a voice channel.");
    if (channel.id !== player.voiceChannel) return message.reply("you're not in the same voice channel.");
    
    player.destroy();
    return message.reply("destroyed the player.");
  }
}
module.exports = stop