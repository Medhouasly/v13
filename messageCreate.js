const { PREFIX } = require('../JSON/config.json');

module.exports = {
    name: 'messageCreate',
    execute(message, client) {
        if (!message.content.startsWith(PREFIX) || message.author.bot) return;
        const args = message.content.slice(PREFIX.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();
        try {
            let commandFiles = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
            if (!commandFiles) return;
            commandFiles.execute(client, message, args)
        } catch (error) {
            console.error(error);
            message.reply('there was an error trying to execute that command!');
        }
    },
};