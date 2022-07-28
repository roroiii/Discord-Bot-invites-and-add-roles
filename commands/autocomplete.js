const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('autocomplete')
    .setDescription('Test command to show how autocomplete should be set up')
    .addStringOption((option) => option.setName('name').setDescription('Name of something').setAutocomplete(true)),
  async execute(interaction) {
    const focusedOption = interaction.options.getFocused(true);
    let choices;

    if (focusedOption.name === 'name') {
      choices = ['faq', 'install', 'collection', 'promise', 'debug'];
    }

    if (focusedOption.name === 'theme') {
      choices = ['halloween', 'christmas', 'summer'];
    }

    const filtered = choices.filter((choice) => choice.startsWith(focusedOption.value));
    await interaction.respond(filtered.map((choice) => ({ name: choice, value: choice })));
  },
};
