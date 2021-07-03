const command = require('../../utils/command')
class invite extends command {
	constructor(client){
		super(client, {
			name: 'invite',
		description: 'Affiche le lien d\'invitation du bot.',
		syntax: 'Aucune'

		})
	}
	run(message) {
		message.channel.send('Le lien d\'invitation du bot est: https://discord.com/api/oauth2/authorize?client_id=767704581144182794&permissions=8&scope=bot')
		}
	}
	module.exports = invite