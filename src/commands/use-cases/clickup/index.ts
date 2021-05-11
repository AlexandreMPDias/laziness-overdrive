import { Importer, Log } from '../../helpers';

async function __teams() {
	const { apis } = await Importer.import('apis');
	apis.ClickUp.teams.listMyTeams();
}

async function __test() {
	const { apis } = await Importer.import('apis');
	apis.ClickUp.teams.listMyTeams();
}

const commands = {
	teams: __teams,
	test: __test,
};

export function clickUp(key: keyof typeof commands) {
	Log.starting.mode(`clickUp.${key}`);

	const command = commands[key];

	return command();
}
