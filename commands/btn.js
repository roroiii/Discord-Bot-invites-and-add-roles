const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('btn').setDescription('Replies with pp btn!'),
  async execute(interaction) {
    const row = new MessageActionRow().addComponents(
      new MessageButton().setCustomId('primary').setLabel('Primary').setStyle('PRIMARY')
    );

    const embed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('I am Title')
      .setURL('https://discord.js.org')
      .setDescription('Some description here.');

    await interaction.reply({ content: 'Button!', ephemeral: true, embeds: [embed], components: [row] });
  },
};
