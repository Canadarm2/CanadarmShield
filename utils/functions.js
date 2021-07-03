module.exports = client => {
    client.resolve = async input => {
        const mentionRegex = /<@!?(\d{17,19})>/g;
        const idRegex = /\d{17,19}/g;
        const tagRegex = /.{3,32}#[0-9]{4}/g;
      
        let user = null, id = null;
        if (input.match(mentionRegex)) id = input.replace(/[<@!>]/g, '');
        else if (input.match(idRegex)) id = input;
        else if (input.match(tagRegex)) {
            user = client.users.cache.find(u => u.tag === input);
        }
        if (id) {
            user = client.users.fetch(id).catch(() => {});
        }
        return user;
      }
}