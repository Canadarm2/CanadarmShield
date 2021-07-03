const Discord = require('discord.js'),
{db} = require('../../index.js'),
fs = require('fs'),
command = require('../../utils/command')

class help extends command {
    constructor(client){
        super(client, {
            name: 'help',
            category: 'utility',
            guildOnly: false,
            delete: true,
            disable: false,
                description: 'Cette commande permet d\'avoir de l\'aide.',
                syntax: '<commande>'
        
        })
    }
    run(message, args) {
    db.query(`select * from guilds where gid = ${message.guild.id}`, (err, req) => {
        if(err)throw err
        let prefix = req[0].prefix
if(!args.length){
    const cl = fs.readdirSync('./commands')
    const embed = new Discord.MessageEmbed()
    .setTitle(`Voici la liste des commandes. Pour afficher l'aide d'une commande, faites ${prefix}help <commande>\n\nLe préfix du bot est ${prefix}`)
    for (const c of cl){
 embed.addField(`${c}:`, `${this.client.commands.filter(cat => cat.config.category === c.toLowerCase() && cat.help).map(cmd => cmd.config.name).join(', ')||'Aucune commande n\'est actuellement installé dans cette catégorie.'}`)
    }
    return message.channel.send(embed)
}
else{
const command = this.client.commands.get(args[0].toLowerCase())
if(!command||!command.help)return message.reply('Cette commande n\'existe pas.')
message.channel.send(new Discord.MessageEmbed()
.setDescription(`**Commande : ${command.config.name}**\n\n${command.help.description}\n\nSyntaxe : \`${prefix}${command.config.name}${command.help.syntax ? ` ${command.help.syntax}` : ''}\``))
}
    })
    }
    }
    module.exports = help