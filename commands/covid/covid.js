const fetch = require('node-fetch'),
{MessageEmbed} = require('discord.js'),
command = require('../../utils/command')

class covid extends command{
    constructor(client){
        super(client, {
            name: 'covid',
            category: 'covid',
            guildOnly: true,
            description: 'permet d\'avoir des informations sur les cas de covid',
            syntax: '<pays>'
        })
    }
    async run(message, args) {
        let pays = args[0]
        if(!pays)return message.reply('Vous devez indiquer un pays.')
        await fetch(`https://covid19.mathdro.id/api/countries/${pays}`).then(response => response.json()).then(data => {
            let confirmed = data.confirmed.value
            let death = data.deaths.value
            let recovered = data.recovered.value
            const embed = new MessageEmbed()
            .setTitle('Information sur le coronavirus')
            .addField(`Total de cas confirmés: `, confirmed, true)
            .addField('Nombre de morts: ', death, true)
            .addField('Nombre de personnes rétablies: ', recovered, true)
            message.channel.send(embed)
        })
    }
    }
    module.exports = covid