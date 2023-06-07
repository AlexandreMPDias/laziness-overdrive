import chalk from 'chalk';
import { Requester } from '../../../services/utils/Requester';

const api = new Requester({
	baseUrl: 'https://api.clickup.com/api/v2/',
	headers: {
		Authorization: process.env.CLICKUP_TOKEN,
	},
});

export interface IClickUpTeam {
	readonly id: string;
	readonly name: string;

	readonly members: {
		user: {
			id: number;
			username: string;
			email: string;
		};
	}[];
}

class ClickUpTeamConstructor {
	listMyTeams = async () => {
		const response = await api.get('team');

		if (response.status === 200) {
			const teams = response.data.teams;
			console.log(`Your ${chalk.red('teams')}:`);
			teams.forEach((team, index) => {
				console.log(`Team [ ${chalk.green(index + 1)} ]`);
				console.log(`\tid:${' '.repeat(5)}${chalk.red(team.id)}`);
				console.log(`\tmembers: `);
				console.log(team.members);

				// const members = [...team.members].sort((a, b) => {
				// 	if (a.user.username >= b.user.username) {
				// 		return 1;
				// 	}
				// 	return -1;
				// });

				// members.forEach(mem => {
				// 	const name = mem.user.username;
				// 	if (name) {
				// 		const memberId = String(mem.user.id);
				// 		console.log(
				// 			`\t${' '.repeat(5)}[ ${chalk.blue(memberId.padEnd(7, ' '))} ] ${
				// 				mem.user.username
				// 			}`
				// 		);
				// 	}
				// });
			});
		}
	};

	getMyTeams = async (): Promise<IClickUpTeam[]> => {
		const response = await api.get<{ teams: IClickUpTeam[] }>('team');
		const teams = response.data.teams;
		return teams.map((team, index) => {
			const members = [...team.members].sort((a, b) => {
				if (a.user.username >= b.user.username) {
					return 1;
				}
				return -1;
			});

			return {
				id: team.id,
				name: team.name,
				members: [],
				// members: members.map(member => ({
				// 	user: {
				// 		id: member.user.id,
				// 		email: member.user.email,
				// 		username: member.user.username,
				// 	},
				// })),
			};
		});
	};
}

const ClickUpTeam = new ClickUpTeamConstructor();

export default ClickUpTeam;
