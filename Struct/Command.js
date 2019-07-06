class Command {
    constructor(client, {
        name = null,
        description = "No description.",
        example = new Array(),
        ownerOnly = false,
        usage = "No usage provided.",
        enabled = true,
        location = null,
        aliases = new Array(),
        clientPermissions = new Array(),
    }) {
        this.client = client;
        this.conf = { ownerOnly, enabled, aliases, location, clientPermissions};
        this.help = { name, description, usage, example};
    }
}
module.exports = Command
