

module.exports = class command {
    constructor(client, {
        name=null,
        category=null,
        guildOnly=false,
        Delete=false,
disable=false,
        description=null,
        syntax=null
    }) {
        this.client=client
        this.config={name, category, guildOnly, Delete, disable}
        this.help={description, syntax}
    }
}