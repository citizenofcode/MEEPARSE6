const Discord = require('discord.js')

module.exports = async client => {
    console.log(`Logged into Discord as ${client.user.tag}.`);
    const dt = new Date()
    let hours = dt.getHours() > 12 ? dt.getHours() - 12 : dt.getHours();
    let time = dt.getHours() > 12 ? "PM" : "AM";
    const full = hours + ":" + (dt.getMinutes() >= 10 ? dt.getMinutes() : `0${dt.getMinutes()}`) + ":" + (dt.getSeconds() >= 10 ? dt.getSeconds() : `0${dt.getSeconds()}`) + " " + time;
    client.channels.get("596769965760053272").send(new Discord.RichEmbed().setColor("GREEN").setTitle(`[${full}] - Bot is ready.`).setTimestamp())
    client.user.setActivity(`with ${client.users.size} members | tl.help`)
}