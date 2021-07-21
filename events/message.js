const Discord = require('discord.js')
const {db} = require('../index.js')

module.exports = class {
    constructor(client){
        this.client=client
    }
    run(message){
    if (message.type !== 'DEFAULT' || message.author.bot) return
    if(message.channel.type === 'dm')this.client.emit("ticket", message)
    else db.query(`select * from guilds where gid = ${message.guild.id}`, async(err, req) => {
        if(err)throw err
        if(message.channel.name.startsWith('vérification-')&&message.channel.topic===message.author.id)this.client.emit('captcha', message)
        if(message.channel.name.startsWith('ticket-')){
            const user = this.client.users.cache.get(message.channel.topic)
            if(message.content&&message.attachments.size > 0){
                return user.send(`${message.content}`, {files: [message.attachments.last().attachment]})
            }
            if(!message.content){
                return user.send({files: [message.attachments.last().attachment]})
            }
            else user.send(message.content)
        }
        if(message.guild.id==='681653195793235981'&&message.channel.id==='838916928919699466'){
            await (await Promise.all(['✅', '❌', '🔒'].map(r => message.react(r))))
        }
    if(message.content === "corona")message.channel.send('Coronavirus!')

    const args = message.content.trim().split(/ +/g)
    const commandName = args.shift().toLowerCase()
        const prefix = req[0].prefix
    if (!commandName.startsWith(prefix)) return
    const command = this.client.commands.get(commandName.slice(prefix.length))
    if (!command)return message.channel.send('Cette commande n\'existe pas!').then(m => m.delete({timeout:5e3}))
    if (command.delete) message.delete().catch(O_o => { });
    if (command.disable) {
        message.delete().catch(O_o => { });

        return message.channel.send(`La commande ${command.name} a été désactivée.`)
    }
	if (command.guildOnly && message.channel.type === 'dm') return message.channel.send('Cette commande ne peut \être utilisée que dans un serveur.')

    command.run(message, args)
    })
}
}