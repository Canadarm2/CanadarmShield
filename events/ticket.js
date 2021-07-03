const Discord = require('discord.js'),
{db} = require('../index')

module.exports = class {
    constructor(client){
        this.client=client
    }
    async run(message){
    const guild = this.client.guilds.cache.get('681653195793235981')
        if(!guild.members.cache.get(message.author.id))return message.reply('Tu ne peux pas ouvrir de ticket, car tu n\'es pas membre du serveur de support. Si tu veux le rejoindre, voici le lien: \https://discord.gg/WmTb4FkdpK')
            guild.channels.cache.filter(c => c.name.startsWith('ticket-')).forEach(async channel => {
                if(channel.topic === message.author.id){
                    if(message.content&&message.attachments.size>0){
                        return channel.send(`${message.content}`, {files: [message.attachments.last().attachment]})
                    }
                    if(!message.content){
                        return channel.send({files: [message.attachments.last().attachment]})
                    }
                    else channel.send(`${message.author.username} a dit: ${message.content}`)
                }
            })
                if(!guild.channels.cache.find(c => c.topic === message.author.id)){
                    const tc = await guild.channels.create(`ticket-${message.author.username}`, {
                        topic: message.author.id,
                        parent: '756310842684735628',
                        permissionOverwrites: [{
                                id: guild.id,
                                deny: 'VIEW_CHANNEL',
                            }, {
                                id: '756258205843062885',
                                allow: 'VIEW_CHANNEL',
                            }, {
                                id: '756284013928513623',
                                allow: 'VIEW_CHANNEL',
                            },{
                                id: '756333619823247361',
                                allow: 'VIEW_CHANNEL',
                            },
                        ],
                    })
                    if(message.content&&message.attachments.size > 0){
                        return tc.send(`${message.content}`, {files: [message.attachments.last().attachment]})
                    }
                    if(!message.content){
                        return tc.send({files: [message.attachments.last().attachment]})
                    }
                    else tc.send(`${message.author.username} a dit: ${message.content}`)
                }
}
}