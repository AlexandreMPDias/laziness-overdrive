import chalk from 'chalk';
import axios from 'axios';

class ClickUpTeamConstructor {
	listMyTeams = async () => {
		const response = await axios.create({
			baseURL: `https://api.clickup.com/api/v2/team/`,
			timeout: 30000,
			headers: {
				Authorization: process.env.CLICKUP_TOKEN,
				'Content-Type': 'application/json; charset=utf-8',
			},
		}).get('');

		if (response.status === 200) {
			const teams = response.data.teams;
			console.log(`Your ${chalk.red('teams')}:`);
			teams.forEach((team, index) => {
				console.log(`Team [ ${chalk.green(index + 1)} ]`)
				console.log(`\tid:${' '.repeat(5)}${chalk.red(team.id)}`);
				console.log(`\tmembers: `);

				const members = [...team.members].sort((a, b) => {
					if (a.user.username >= b.user.username) {
						return 1;
					}
					return -1;
				})

				members.forEach(mem => {
					const name = mem.user.username
					if (name) {
						const memberId = String(mem.user.id)
						console.log(`\t${' '.repeat(5)}[ ${chalk.blue(memberId.padEnd(7, ' '))} ] ${mem.user.username}`)
					}
				})
			})
		}
	}
}

const ClickUpTeam = new ClickUpTeamConstructor()

export default ClickUpTeam;