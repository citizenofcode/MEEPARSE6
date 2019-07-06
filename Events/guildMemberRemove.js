module.exports = async (client) => {
    client.user.setActivity(`with ${client.users.size} members | tl.help`)
}