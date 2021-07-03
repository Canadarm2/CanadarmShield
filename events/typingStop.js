module.exports = class {
    constructor(client){
        this.client=client
    }
    async run(channel, user){
    if(channel.type === 'dm')return
    if(channel.name.startsWith('ticket-')){
        const tc = await this.client.users.fetch(channel.topic),
        dm = await tc.createDM()
    if(!user.typing){
        dm.stopTyping(true)
    }
    else return
}
}
}