import {
	ChatInputCommandInteraction,
	GuildMember,
	PermissionFlagsBits,
	SlashCommandBuilder,
} from "discord.js";
import { LogType, Logger } from "../../utils/logging";
import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config({
	path: 'S:\\shork\\.env'
});

async function timeOutUser(member: GuildMember, time: number, reason: string) {
	await member.timeout(time * 60 * 1000, reason);
}

async function addWarnToRecord(
	db: mysql.Connection,
	mod: GuildMember,
	user: GuildMember,
	reason: string
) {
	const query = 'INSERT INTO mod_actions (userid, actiontype, moderatorid, reason) VALUES (?, ?, ?, ?)';
	const values = [user.user.id, 'warn', mod.user.id, reason];

	return new Promise((resolve, reject) => {
		db.query(query, values, (error, results) => {
			if (error) {
				return reject(error);
			}
			resolve(results);
		});
	});
}

function connectToDatabase() {
	return mysql.createConnection({
		user: process.env.DB_USER || 'root',
		password: process.env.SQL_PASSWORD,
		host: process.env.DB_HOST || 'localhost',
		database: process.env.DB_NAME || 'shork_db',
	});
}

export default {
	data: new SlashCommandBuilder()
		.setName("warn")
		.setDescription("Warn a user.")
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
		.addMentionableOption(option =>
			option
				.setName("user")
				.setDescription("The user to warn.")
				.setRequired(true)
		)
		.addStringOption(option =>
			option
				.setName("reason")
				.setDescription("The reason you're warning the user for")
				.setRequired(false)
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

	async execute(interaction: ChatInputCommandInteraction) {
		const logger = new Logger(__filename, LogType.DEBUG);

		const db = connectToDatabase();

		db.connect(err => {
			if (err) {
				logger.log(`Error connecting to the database: ${err.stack}`);
				if (interaction.isRepliable()) {
					interaction.reply(`Error connecting to the database.`);
				}
				return;
			}
			logger.log(`Connected to database with thread ID: ${db.threadId}`);
		});

		const options = interaction.options;
		const member = options.getMentionable("user") as GuildMember;
		const reason = options.getString("reason") || "No reason provided";

		try {
			await addWarnToRecord(db, interaction.member as GuildMember, member, reason);
			// await timeOutUser(member, 5, reason);

			if (interaction.isRepliable()) {
				interaction.reply(`${member.user.username} has been warned for ${reason}`);
			}
		} catch (error) {
			logger.log(`Error adding warning to record: ${error}`);
			if (interaction.isRepliable()) {
				interaction.reply(`There was an error warning ${member.user.username}. Please try again later.`);
			}
		} finally {
			db.end();
			logger.log('Exited db', LogType.DEBUG)
		}
	},
};
