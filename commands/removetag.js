const { SlashCommandBuilder } = require('@discordjs/builders');
const { Tags } = require('../database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('removetag')
    .setDescription('remove tags!')
    .addStringOption((option) => option.setName('name').setDescription('Enter a name')),
  async execute(interaction) {
    // equivalent to: DELETE from tags WHERE name = ?;
    const tagName = interaction.options.getString('name');
    const rowCount = await Tags.destroy({ where: { name: tagName } });

    if (!rowCount) return interaction.reply('That tag did not exist.');

    return interaction.reply('Tag deleted.');
  },
};
