const apiCalls = require('./ApiCalls/sheetCalls.js');
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
      console.log('test');
      const createResponse = await apiCalls.create(author)
      console.log(createResponse);
      if (createResponse.error) {
        message.channel.send(createResponse.error);
      } else {
        message.channel.send(createResponse.reply);
      }
    }
  }
}