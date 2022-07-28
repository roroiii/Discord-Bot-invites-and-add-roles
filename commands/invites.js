const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('invites').setDescription('Replies with Pong!'),
  async execute(interaction) {
    try {
      const invites = await interaction.member.guild.invites.fetch();
      const codeUses = [];
      invites.each((inv) =>
        codeUses.push({ username: inv.inviter.username, userId: inv.inviterId, invites: inv.uses })
      );
      console.log(codeUses);

      // const embed = new MessageEmbed()
      //   .setColor('#0099ff')
      //   .setTitle('Some title')
      //   .setURL('https://discord.js.org/')
      //   .setDescription('Some description here');

      for (let i = 0; i < codeUses.length; ++i) {
        if (codeUses[i].userId === interaction.member.user.id) {
          // await interaction.reply(`You've invited ${codeUses[i].invites} member to the server!`);
          await interaction.reply({
            content: `You've invited ${codeUses[i].invites} member to the server!`,
            ephemeral: true,
            // embeds: [embed],
          });
        }
      }
    } catch (error) {
      console.log(error);
      await interaction.reply(`error`);
    }
  },
};
