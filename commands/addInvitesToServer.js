const { SlashCommandBuilder } = require('@discordjs/builders');
const { InvitesInfo } = require('../database');

module.exports = {
  data: new SlashCommandBuilder().setName('addinvitestoserver').setDescription('add invites to server!'),
  async execute(interaction) {
    try {
      const invites = await interaction.member.guild.invites.fetch();
      const codeUses = [];
      invites.each((inv) =>
        codeUses.push({ username: inv.inviter.username, userId: inv.inviterId, invites: inv.uses })
      );

      const memberRoles = interaction.member._roles;
      const ssBossRole = '998846707179733052';

      if (memberRoles.length === 0) return interaction.reply(`You do not have permission`);
      console.log(memberRoles);
      memberRoles.some((role) => console.log(role));
      console.log(memberRoles.some((role) => role === ssBossRole));
      if (memberRoles.some((role) => role === ssBossRole)) {
        for (const i in codeUses.length) {
          const inviteInfo = await InvitesInfo.create({
            userId: codeUses[i].userId,
            username: codeUses[i].username,
            invites: codeUses[i].invites,
          });
        }
        return interaction.reply(`Invites all added.`);
      }
      return interaction.reply(`You do not have permission`);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return interaction.reply('That invites already exists.');
      }
      console.log(error);
      return interaction.reply('Something went wrong with adding a invites.');
    }

    await interaction.reply({ content: 'addInvites!', ephemeral: true });
  },
};
