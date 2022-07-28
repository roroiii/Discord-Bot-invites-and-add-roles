const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('searchinvites')
    .setDescription('Replies with invites!')
    .addUserOption((option) => option.setName('target').setDescription('Select a user')),
  async execute(interaction) {
    try {
      const invites = await interaction.member.guild.invites.fetch();
      const user = interaction.options.getUser('target');
      const codeUses = [];
      invites.each((inv) =>
        codeUses.push({ username: inv.inviter.username, userId: inv.inviterId, invites: inv.uses })
      );

      for (let i = 0; i < codeUses.length; ++i) {
        if (codeUses[i].userId === user.id) {
          await interaction.reply(`<@${user.id}> is invited ${codeUses[i].invites} member to the server!`);
          return;
        }
      }
      await interaction.reply(`<@${user.id}> is not invited member to the server!`);
    } catch (error) {
      console.log(error);
      await interaction.reply(`error`);
    }
  },
};
