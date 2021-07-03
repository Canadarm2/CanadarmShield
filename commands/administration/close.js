const {MessageEmbed} = require('discord.js')
const command = require('../../utils/command')

class close extends command {
    constructor(client){
        super(client, {
            name: 'close',
            category: 'administration',
            guildOnly: true,
            description: 'permet de fermer un ticket',
            syntax: 'aucune'
        })
    }
    async run(message){
        if(!message.guild.id === '681653195793235981')return message.reply('cette commande ne peut être utilisé que dans le serveur de support')
        if(!message.channel.name.startsWith('ticket-'))return message.reply('Tu n\'as pas la permition de faire ça!')
        const user = this.client.users.cache.get(message.channel.topic)
        user.send(`🔒 Votre ticket vient d'être fermé par ${message.author.username}.`)
        message.channel.delete()
        message.guild.channels.cache.get('765186767556575253').send(`${message.author.username} a fermé le ticket de ${user.toString()}`)
    }
}
module.exports = close