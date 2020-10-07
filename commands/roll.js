const d20 = require('d20');

module.exports = {
  name: 'roll',
  description: 'Base command for all of your dice rolling needs.',
  usage: '%roll (roll you want to make)',
  cooldown: 5,
  execute(message, args) {
    return message.channel.send(d20.verboseRoll(args[0]));
  }
}