# mee6-parse
Parses MEE6 (the Discord Bot)'s level-up messages to give roles based on levels.
## How does this work?
The code is pretty intuitive, it's based on the fact that MEE6 by default sends level-up messages when... well, you level up. This bot parses that message to get information about the user and level, and then uses that information to take actions on it.
## Selfhosting
This bot is pretty friendly for selfhosting. I recommend [Glitch](glitch.me) for the simplest experience.
1. Create Discord application, invite bot to server.
2. Fill out config.json with the necessary values.
3. Install required packages. 
4. Run `node index.js`.

¯\\\_(ツ)\_/¯ Doesn't get simpler then that.
