const command = require('../../utils/command')

class repeate extends command{
  constructor(client){
    super(client, {
   name: 'repeate',
   category: 'music',
   guildOnly: true,
   description: 'permet de faire jouer la musique en cours en boucle',
   syntax: 'aucune'
    })
  }
  run(message, args) {
    const player = this.client.manager.get(message.guild.id);
    if (!player) return message.reply("there is no player for this guild.");

    const { channel } = message.member.voice;
    
    if (!channel) return message.reply("you need to join a voice channel.");
    if (channel.id !== player.voiceChannel) return message.reply("you're not in the same voice channel.");
    
    if (args.length && /queue/i.test(args[0])) {
      player.setQueueRepeat(!player.queueRepeat);
      const queueRepeat = player.queueRepeat ? "enabled" : "disabled";
      return message.reply(`${queueRepeat} queue repeat.`);
    }

    player.setTrackRepeat(!player.trackRepeat);
    const trackRepeat = player.trackRepeat ? "enabled" : "disabled";
    return message.reply(`${trackRepeat} track repeat.`);
  }
  }
  module.exports = repeate