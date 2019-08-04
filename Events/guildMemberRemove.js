module.exports = async (client) => {
	client.user.setActivity(`with ${client.users.size} members | ${client.config.prefix}help`);
};
