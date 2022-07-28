const { SlashCommandBuilder } = require('@discordjs/builders');
const { Tags } = require('../database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('addtag')
    .setDescription('add tag!')
    .addStringOption((option) => option.setName('name').setDescription('Enter a name'))
    .addStringOption((option) => option.setName('description').setDescription('Enter some string')),
  async execute(interaction) {
    const tagName = interaction.options.getString('name');
    const tagDescription = interaction.options.getString('description');

    try {
      // equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
      const tag = await Tags.create({
        name: tagName,
        description: tagDescription,
        username: interaction.user.username,
      });

      return interaction.reply(`Tag ${tag.name} added.`);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return interaction.reply('That tag already exists.');
      }
      console.log(error);
      return interaction.reply('Something went wrong with adding a tag.');
    }

    await interaction.reply({ content: 'addTag!', ephemeral: true, embeds: [embed], components: [row] });
  },
};
