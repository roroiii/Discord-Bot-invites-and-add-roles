const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

// events
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// commands
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.log(error);
    await interaction.reply({ content: 'There was an error while executing this command!' });
  }
});

client.on('interactionCreate', (interaction) => {
  if (!interaction.isButton()) return;
  console.log(interaction);

  const filter = (i) => i.customId === 'primary' && i.user.id === '122157285790187530';

  const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

  collector.on('collect', async (i) => {
    await i.update({ content: 'A button was clicked!', components: [] });
  });

  collector.on('end', (collected) => console.log(`Collected ${collected.size} items`));
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isSelectMenu()) return;

  if (interaction.customId === 'select') {
    await interaction.update({ content: 'Something was selected!', components: [] });
  }
});

client.on('interactionCreate', (interaction) => {
  if (!interaction.isAutocomplete()) return;
});

client.on('messageReactionAdd', (reaction, user) => {
  console.log('a reaction has been added');
});

// test

const guildInvites = new Map();

client.on('inviteCreate', async (invite) => {
  const invites = await invite.guild.invites.fetch();

  const codeUses = new Map();
  invites.each((inv) => codeUses.set(inv.code, inv.uses));

  guildInvites.set(invite.guild.id, codeUses);
});

// client.once('ready', () => {
//   client.guilds.cache.forEach((guild) => {
//     guild.invites
//       .fetch()
//       .then((invites) => {
//         console.log('INVITES CACHED');
//         const codeUses = [];
//         invites.each((inv) =>
//           codeUses.push({ username: inv.inviter.username, userId: inv.inviterId, invites: inv.uses })
//         );

//         guildInvites.set(guild.id, codeUses);
//       })
//       .catch((err) => {
//         console.log('OnReady Error:', err);
//       });
//   });
// });

// client.on('guildMemberAdd', async (member) => {
//   member.send('Welcome!');
//   const cachedInvites = guildInvites.get(member.guild.id);
//   const newInvites = await member.guild.invites.fetch();
//   console.log({ cachedInvites, newInvites });
//   try {
//     const usedInvite = newInvites.find((inv) => cachedInvites.get(inv.code) < inv.uses);
//     console.log('Cached', [...cachedInvites.keys()]);
//     console.log(
//       'New',
//       [...newInvites.values()].map((inv) => inv.code)
//     );
//     console.log('Used', usedInvite);
//     console.log(`The code ${usedInvite.code} was just used by ${member.user.username}.`);
//   } catch (err) {
//     console.log('OnGuildMemberAdd Error:', err);
//   }

//   newInvites.each((inv) => cachedInvites.set(inv.code, inv.uses));
//   guildInvites.set(member.guild.id, cachedInvites);
// });

client.login(token);
