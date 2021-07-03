const command = require('../../utils/command')

class skip extends command {
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

      if (!player.queue.current) return message.reply("there is no music playing.")

      const { title } = player.queue.current;

      player.stop();
      return message.reply(`${title} was skipped.`)
    }
  }
  module.exports = skip