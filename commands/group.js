const apiCalls = require('./ApiCalls/groupCalls')
const prefix = '%';

module.exports = {
  name: 'group',
  description: 'base command for managing group actions',
  usage: 'description, delete, create, addmember',
  args: true,
  cooldown: 5,
  async execute(message, args) {
    const baseArg = args.shift().toLowerCase();
    // =============
    // %group create
    // =============
    if (baseArg === 'create') {
      const data = []
      args = args.join(' ');
      author = message.author.id;
      const newGroupData = await apiCalls.create(args, author);
      console.log(newGroupData);

      if (newGroupData.error) {
        message.reply(newGroupData.error);
      } else {
        message.reply(`The group name you have selected is: **${args}**! a DM has just been sent to you with the command you need to run to add PCs to your group!`)

        data.push('To add Player Characters to your group, run the command:');
        data.push(`${prefix}group add <@mention of user>`);
        data.push('To add a description to your group, use the command:');
        data.push(`${prefix}group description <description goes here>`)

        return message.author.send(data, {
            split: true
          })
          .catch(error => {
            console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
            message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
          });
      }
      // =============
      // %group delete
      // =============
    } else if (baseArg === 'delete') {
      const author = message.author.id;
      const deletedData = await apiCalls.delete(author);

      if (deletedData.error) {
        return message.reply(deletedData.error)
      } else {
        return message.reply(deletedData.reply);
      }
    }
  }
}