const apiCalls = require('./commands/sheetCalls.js');
const Discord = require('discord.js');

module.exports = {
  name: 'sheet',
  description: 'Base command for character sheet stuff.',
  cooldown: 5,
  data: {},
  async execute(message, args) {
    const author = message.author.id;
    const baseArg = args.shift().toLowerCase();
    const guild = message.guild;

    // =============
    // %sheet create
    // =============

    if (baseArg === 'create') {
      const createResponse = apiCalls.create(author)
      if (createResponse.error) {
        message.channel.send(createResponse.error);
      } else {
        message.channel.send(createResponse.reply);
      }
    }
  }
}