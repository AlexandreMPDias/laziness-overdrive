import { Importer, Log } from '../../../helpers';
import { Command } from '../../../helpers/command';

export default new Command({
	description: 'Stop any timer',
	name: 'stop',
	depth: 2,
}).withHandle(async () => {
	Log.starting.mode(`timer.stop`);
	const { apis } = await Importer.import('apis');

	await apis.Toggl.timeEntries.stop();
	await apis.ClickUp.timeTrack.stop();
});
