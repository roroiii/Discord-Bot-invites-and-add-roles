const Sequelize = require('sequelize');
const { Tags, InvitesInfo } = require('../database');

module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    Tags.sync();
    InvitesInfo.sync();

    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
};
