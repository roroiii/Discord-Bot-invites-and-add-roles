const { messageId, role1, role2 } = require('../data/roleIdData.json');

module.exports = {
  name: 'messageReactionAdd',
  execute(reaction, user) {
    const member = reaction.message.guild.members.cache.get(user.id);

    try {
      if (reaction.message.id === messageId) {
        switch (reaction.emoji.name) {
          case '🎨':
            member.roles.add(role1);
            break;
          case '💫':
            member.roles.add(role2);
            break;
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
};
