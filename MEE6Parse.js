module.exports = (msg) => {
    if (msg.author.id != "159985870458322944") return;
    const options = msg.client.config.levelOptions;
    const message = options.message.replace("{player}", "<@!?(\\d+)>").replace("{level}", "(\\d+)", "g")
    const regex = new RegExp(message)
    if (!msg.content.match(regex)) return;
    const matches = msg.content.match(regex)
    const user = msg.guild.members.get(matches[1])
    const level = matches[2]
    if (!user) return;
    const levels = options.levels
    const array = Object.keys(levels)
    if (array.includes(level)) user.addRole(levels[level])
    array.forEach(value => {
        if (level >= parseInt(value) && !user.roles.some(r => r.id === levels[value])) user.addRole(levels[value])
    })
}
