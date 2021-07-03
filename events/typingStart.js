module.exports = class {
    constructor(client){
        this.client=client
    }
    async run(channel, user){
    if(channel.type==='dm')return
    if(channel.name.startsWith('ticket-')){
    const ticketCreator = await this.client.users.fetch(channel.topic)
    const dm = await ticketCreator.createDM()
    dm.startTyping()
    this.client.emit("typingStop", channel, user)
    }
}
}