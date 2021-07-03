const Discord = require('discord.js'),
{accept, deny, close} = require('../config.json')

module.exports = class {
    constructor(client){
        this.client=client
    }
    async run(reaction, user){
    if(user.bot)return
    if(reaction.partial)await reaction.fetch()
    if(reaction.message.guild.id==='681653195793235981'&&reaction.message.channel.id==='838916928919699466'){
    let msgs = 1
    const fw = (m) => m.author.id === user.id
    const channel = reaction.message.guild.channels.cache.get('839276606861344769')
    const roles = reaction.message.guild.member(user).roles.cache
    const is_staff = roles.has('756333619823247361')||roles.has('756258205843062885')
    switch(reaction._emoji.name){
        case '✅':
if(!is_staff)return
            channel.send('Quel commentaire souhaitez-vous ajouter pour la suggestion de '+reaction.message.author.username+'?')
            msgs++
            const msg1 = (await channel.awaitMessages(fw, {max: 1})).first().content
            msgs++
            reaction.message.author.send(`Votre suggestion a été accepté par ${user.username}!\n\nCommentaire: ${msg1}`).catch(e => channel.send(`${reaction.message.author.username} a fermé ses DMS`).then(m => m.delete({timeout: 5000})))
            reaction.message.delete()
            channel.bulkDelete(Number(msgs))
            msgs=1
            break
            case deny:
            if(!is_staff)return
            channel.send('Pour quelle raison souhaitez-vous refuser la suggestion de '+reaction.message.author.username+'?'); msgs++
            const msg2 = (await channel.awaitMessages(fw, {max: 1})).first().content; msgs++
            channel.bulkDelete(Number(msgs))
            msgs=1
            channel.send(`J'ai bien refusé la suggestion de ${reaction.message.author.username}`).then(m => m.delete({timeout:5000}))
            reaction.message.author.send(`Désolé, mais votre suggestion a été refusé pour la raison suivante: ${msg2}`).catch(e => channel.send(`${reaction.message.author.username} a fermé ses DMS`).then(m => m.delete({timeout: 5000})))
            reaction.message.delete()
            break
            case close:
                if(user.id !== reaction.message.author.id)return
                const log = this.client.channels.cache.get('765186767556575253')
                log.send(`Malheureusement, ${reaction.message.author.username} a décidé de supprimer sa suggestion! \:cry:`)
                reaction.message.delete()
                user.send('Vous avez bien supprimé votre suggestion!').catch(e => channel.send(`${reaction.message.author.username} a fermé ses DMS`).then(m => m.delete({timeout: 5000})))
                break
    }
}
}
}