const apiCalls = require('./ApiCalls/groupCalls')
const Discord = require('discord.js');

module.exports = {
  name: 'group',
  description: 'base command for managing group actions',
  usage: 'description, delete, create, add, info',
  args: true,
  data: [],
  cooldown: 5,
  async execute(message, args, prefix) {
    const author = message.author.id;
    const baseArg = args.shift().toLowerCase();
    // =============
    // %group create
    // =============
    if (baseArg === 'create') {
      args = args.join(' ');
      const newGroupData = await apiCalls.create(args, author);
      console.log(newGroupData);

      if (newGroupData.error) {
        message.reply(newGroupData.error);
      } else {
        message.reply(`The group name you have selected is: **${args}**! a DM has just been sent to you with the command you need to run to add PCs to your group!`)

        this.data.push('To add Player Characters to your group, run the command:');
        this.data.push(`${prefix}group add <@mention of user>`);
        this.data.push('To add a description to your group, use the command:');
        this.data.push(`${prefix}group description <description goes here>`)

        return message.author.send(this.data, {
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
      const deletedData = await apiCalls.delete(author);

      if (deletedData.error) {
        return message.reply(deletedData.error)
      } else {
        return message.reply(deletedData.reply);
      }
      // ==================
      // %group description
      // ==================
    } else if (baseArg === 'description') {
      args = args.join(' ');
      const descriptionResponse = await apiCalls.updateDescription(author, args);

      if (descriptionResponse.error) {
        return message.reply(descriptionResponse.error);
      } else {
        return message.reply(descriptionResponse.reply);
      }
      // ===========
      // %group info
      // ===========
    } else if (baseArg === 'info') {
      if (args[0].toLowerCase() === 'pc') {
        const pcGroupResponse = await apiCalls.showByPc(author);
        this.data = pcGroupResponse.playerCharacters.map((member) => {
          return message.guild.members.cache.get(member.id).displayName
        })
        if (this.data.length > 0) {
          this.data = this.data.join(', ')
        } else {
          this.data = 'No player characters at the moment :('
        }
        if (pcGroupResponse.error) {
          message.reply(pcGroupResponse.error);
        } else {
          const replyEmbed = await new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(pcGroupResponse.title)
            .setAuthor(message.guild.members.cache.get(pcGroupResponse.dungeonMaster).displayName)
            .setDescription(pcGroupResponse.description)
            .addFields({
              name: 'Player Characters',
              value: this.data
            })
          return message.channel.send(replyEmbed);
        }
      } else if (args[0].toLowerCase() === 'dm') {
        const dmGroupResponse = await apiCalls.showByDm(author)
        this.data = dmGroupResponse.playerCharacters.map((member) => {
          return message.guild.members.cache.get(member.playerId).displayName
        })
        if (this.data.length > 0) {
          this.data = this.data.join(', ')
        } else {
          this.data = 'No player characters at the moment :('
        }
        if (dmGroupResponse.error) {
          message.reply(dmGroupResponse.error);
        } else {
          const replyEmbed = await new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(dmGroupResponse.title)
            .setAuthor(message.guild.members.cache.get(dmGroupResponse.dungeonMaster).displayName)
            .setDescription(dmGroupResponse.description)
            .addFields({
              name: 'Player Characters',
              value: this.data
            })
          return message.channel.send(replyEmbed);
        }
      } else {
        return message.channel.send(`This command accepts an argument of \`pc\` to show the group you are a part of **or** \`dm\` to show the group you own.`);
      }
      // ==========
      // %group add
      // ==========
    } else if (baseArg === 'add') {
      try {
      if (message.mentions.users.first().id) {
        const playerId = message.mentions.users.first().id;
        const addPlayerResponse = await apiCalls.updatePlayers(author, playerId);
        return message.channel.send(addPlayerResponse);
      }
      } catch (error) {
        return message.channel.send('The argument for that command must be an @ mention of another user in the channel!');
      }
    }
  }
}