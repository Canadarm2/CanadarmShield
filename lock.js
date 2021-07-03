const db = require('quick.db')

module.exports = {
    run: (message, args) => {
        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.')
        const channel = message.mentions.channels.first() || message.channel
        if (db.includes(`guilds_${message.guild.id}.lockedChannels.${channel.id}`)) return message.channel.send('Ce salon est déjà vérrouillé.')
        db.push(`guilds_${message.guild.id}.lockedChannels`, channel.id)
        message.channel.send('Ce salon a été verrouillé !')
    },
    name: 'lock',
    guildOnly: true
}