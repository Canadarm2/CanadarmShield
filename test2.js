        if(req[0].captcha==='off')return
        else {
        let numbers=[]
        for(let i=1; i===10; i++){
            numbers.push(Math.floor(Math.random()*9+1))
        }
const gtts=new tts(numbers.join(', '), 'fr')
gtts.save('./voice.mp3', (error) => {
    if(error)throw error
})
db.query('INSERT INTO captchas (userId, guildId, value) VALUES (?, ?, ?)', [member.id, member.guild.id, numbers.join("")], (error)=> {
    if(error)throw error
})
const channel = await member.guild.channels.create(`vérification-${member.username}`, {
    type: 'text',
    topic: member.id,
    permissionOverwrites: [
        {
            id: member.id,
            allow: 'VIEW_CHANNEL'
        }, {
            id: member.guild.id,
            deny: 'VIEW_CHANNEL'
        }
    ]
})
channel.send(`Bonjour et bienvenu ${member}!\n\nPour pouvoir accéder à la totalité du serveur, veuillez écouter attentivement ce fichier audio et entrer les chiffres que vous entendez.\n\nAttention! Les chiffres doivent être entré dans l'ordre dans le quel vous l'entendez!\n\nVous pouvez à tout moment réécouter le fichier si vous voulez vous rappeler des chiffres.\n\nMerci et bon défi!`, {
    files: [{
        attachment: './voice.mp3',
        name: 'captcha.mp3'
    }]
})
        }