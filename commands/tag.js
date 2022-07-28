const { SlashCommandBuilder } = require('@discordjs/builders');
const { Tags } = require('../database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('tag')
    .setDescription('get tag!')
    .addStringOption((option) => option.setName('name').setDescription('Enter a name')),
  async execute(interaction) {
    const tagName = interaction.options.getString('name');

    // equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
    const tag = await Tags.findOne({ where: { name: tagName } });

    if (tag) {
      // equivalent to: UPDATE tags SET usage_count = usage_count + 1 WHERE name = 'tagName';
      tag.increment('usage_count');
      return interaction.reply(tag.get('description'));
    }

    return interaction.reply(`Could not find tag: ${tagName}`);
  },
};
