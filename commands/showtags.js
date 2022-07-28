const { SlashCommandBuilder } = require('@discordjs/builders');
const { Tags } = require('../database');

module.exports = {
  data: new SlashCommandBuilder().setName('showtags').setDescription('show tags!'),
  async execute(interaction) {
    const tagList = await Tags.findAll({ attributes: ['name'] });
    const tagString = tagList.map((t) => t.name).join(', ') || 'No tags set.';

    return interaction.reply(`List of tags: ${tagString}`);
  },
};
