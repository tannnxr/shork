import {
	ChatInputCommandInteraction,
	GuildMember,
	PermissionFlagsBits,
	SlashCommandBuilder,
} from "discord.js";
import { LogType, Logger } from "../../utils/logging";
import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

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
		password: process.env.DB_PASSWORD || 'popcornpanties236P!',
		host: process.env.DB_HOST || 'localhost',
		database: process.env.DB_NAME || 'shork_db',
	});
}

export default {
	data: new SlashCommandBuilder()
		.setName("ban")
		.setDescription("Ban a user.")
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
		.addMentionableOption(option =>
			option
				.setName("user")
				.setDescription("The user to ban.")
				.setRequired(true)
		)
		.addStringOption(option =>
			option
				.setName("reason")
				.setDescription("The reason you're banning the user for")
				.setRequired(true)
		),

	async execute(interaction: ChatInputCommandInteraction) {
	}
};
