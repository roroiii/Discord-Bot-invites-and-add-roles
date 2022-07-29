const Sequelize = require('sequelize');
const { InvitesInfo } = require('../database');

module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    InvitesInfo.sync();

    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
};
