const { SlashCommandBuilder } = require('@discordjs/builders');
const { ssBossRole, superRole } = require('../data/roleIdData');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('searchroleinvites')
    .setDescription('Replies with invites!')
    .addUserOption((option) => option.setName('target').setDescription('Select a user')),
  async execute(interaction) {
    try {
      const invites = await interaction.member.guild.invites.fetch();
      const user = interaction.options.getUser('target');
      const codeUses = [];
      invites.each((inv) =>
        codeUses.push({
          username: inv.inviter.username,
          userId: inv.inviterId,
          invites: inv.uses,
        })
      );
      const memberRoles = interaction.member._roles;

      if (memberRoles.length === 0) {
        return interaction.reply({ content: `You do not have permission`, ephemeral: true });
      }

      if (memberRoles.some((role) => role === ssBossRole)) {
        const targetMember = interaction.options.getMember('target');
        for (let i = 0; i < codeUses.length; ++i) {
          if (codeUses[i].userId === user.id && targetMember.roles.cache.some((role) => role.id === superRole)) {
            return interaction.reply({
              content: `<@${user.id}> is super超級貴冰🌧️ and invited ${codeUses[i].invites} member to the server!`,
              ephemeral: true,
            });
          }
        }
        return interaction.reply({ content: `<@${user.id}> is not super超級貴冰🌧️!`, ephemeral: true });
      }
      await interaction.reply({ content: `You do not have permission`, ephemeral: true });
    } catch (error) {
      console.log(error);
      await interaction.reply(`error`);
    }
  },
};
