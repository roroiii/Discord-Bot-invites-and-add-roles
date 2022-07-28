module.exports = {
  name: 'messageReactionAdd',
  execute(reaction, user) {
    const member = reaction.message.guild.members.cache.get(user.id);

    try {
      const iam = '1001371243389399041';
      console.log(reaction.message.id === iam);
      if (reaction.message.id === iam) {
        switch (reaction.emoji.name) {
          case '🎨':
            member.roles.add('1001062055610167317');
            break;
          case '💫':
            member.roles.add('1001063628901978144');
            break;
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
};
