import { Importer, Log } from '../../helpers';
import { Command } from '../../helpers/command';

const KEYS = ['teams', 'test'] as const;

export default new Command({
	command: '<key>',
	description: 'Run clickup commands',
	name: 'clickup',
	depth: 1,
})
	.positional('key', {
		choices: KEYS,
		demandOption: true,
		description: 'subcommand to execute',
	})
	.withHandle(async ({ key }) => {
		Log.starting.mode(`clickUp.${key}`);
		const { apis } = await Importer.import('apis');

		return {
			teams: () => apis.ClickUp.teams.listMyTeams(),
			test: () => apis.ClickUp.teams.listMyTeams(),
		}[key]();
	});
