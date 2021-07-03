const Discord = require('discord.js'),
{db}=require('./index')

module.exports = {
    run: async(message, args, client) => {
        if(!args[0])return message.reply('j\'ai d\'une mention d\'un utilisateur pour le débanni.')
        if(!message.member.hasPermission('BAN_MEMBERS'))return message.channel.send('Hey! Tu n\'a pas la permition de faire ça! La prochaine fois, une arraignée viendra te manger!')
        const member = await client.resolve(args[0])
        if(!member)return message.channel.send('Je ne trouve pas cette utilisateur.')
        message.guild.fetchBans().then(bans => {
            let user = bans.find(b => b.user.id===member.id)
            if(!user)return message.channel.send('L\'utilisateur que vous avez mentioné n\'est pas banni.')
            message.guild.members.unban(member.id)
            
            message.channel.send('J\'ai débanni l\'utilisateur que vous avez mentioné!')
        })
    },
    name: 'unban',
    category: 'moderation',
    guildOnly: true,
    delete: false,
    help: {
        description: 'permet de débannir un utilisateur',
        syntax: '<mention>'
    }
}