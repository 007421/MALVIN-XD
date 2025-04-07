


const { malvin } = require("../malvin");
const moment = require("moment");

let botStartTime = Date.now(); // Recording the start time of the bot
const ALIVE_IMG = "https://files.catbox.moe/7hqhsw.jpg"; // Make sure this URL is valid

malvin({
    pattern: "alive",
    desc: "Check if the bot is active.",
    category: "owner",
    react: "💡",
    filename: __filename
}, async (conn, mek, m, { reply, from }) => {
    try {
        const pushname = m.pushName || "User"; // Username or default value
        const currentTime = moment().format("HH:mm:ss");
        const currentDate = moment().format("dddd, MMMM Do YYYY");

        const runtimeMilliseconds = Date.now() - botStartTime;
        const runtimeSeconds = Math.floor((runtimeMilliseconds / 1000) % 60);
        const runtimeMinutes = Math.floor((runtimeMilliseconds / (1000 * 60)) % 60);
        const runtimeHours = Math.floor(runtimeMilliseconds / (1000 * 60 * 60));

        const formattedInfo = `
╭┄┄┄┄[*ᴍᴀʟᴠɪɴ xᴅ sᴛᴀᴛᴜs*]┄┄┄┄
┊
┊     Hi 🫵🏽 ${pushname}
┊
┊🕒 *ᴛɪᴍᴇ*: ${currentTime}
┊📅 *ᴅᴀᴛᴇ*: ${currentDate}
┊⏳ *ᴜᴘᴛɪᴍᴇ*: ${runtimeHours} hours, ${runtimeMinutes} minutes, ${runtimeSeconds} seconds
╰───────────────

> 🤖 *Status*: *Malvin is Alive and Ready!*

🎉 *Enjoy the Service!*
        `.trim();

        // Check if the image is defined
        if (!ALIVE_IMG || !ALIVE_IMG.startsWith("http")) {
            throw new Error("Invalid ALIVE_IMG URL. Please set a valid image URL.");
        }

        // Send the message with image and caption
        await conn.sendMessage(from, {
            image: { url: ALIVE_IMG }, // Check that the URL is valid
            caption: formattedInfo,
            contextInfo: { 
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363398430045533@newsletter',
                    newsletterName: '𝐌𝐀𝐋𝐕𝐈𝐍 𝐀𝐋𝐈𝐕𝐄',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (error) {
        console.error("Error in alive command: ", error);
        
        // Respond with error details 
        const errorMessage = `
❌ An error occurred while processing the alive command.
🛠 *Error Details*:
${error.message}

Please report this issue or try again later.
        `.trim();
        return reply(errorMessage);
    }
});