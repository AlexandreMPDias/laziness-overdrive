import { Importer, Log } from '../../../helpers';
import { Command } from '../../../helpers/command';
import { parseTaskId } from './parse-task-id';
import chalk from 'chalk';

export default new Command({
	command: '<value>',
	description: 'Start a timer',
	name: 'start',
	depth: 2,
})
	.positional('value', {
		type: 'string',
		demandOption: true,
		description: 'TaskId or ClickUp task url',
	})
	.withHandle(async ({ value }) => {
		Log.starting.mode(`timer.start`);
		const { apis } = await Importer.import('apis');
		const { id } = parseTaskId(value);

		const getMetadata = Log.runner('toggl.metadata.get', () => apis.Toggl.metadata.get());
		const getTaskId = Log.runner('clickUp.task.get', () => apis.ClickUp.task.get(id));

		const [metadata, task] = await Promise.all([getMetadata.handle(), getTaskId.handle()]);

		const timerName = `${task.name} - #${id}`;

		console.log(`Starting [ ${chalk.cyan(timerName)} ]`);

		const createTogglTimer = Log.runner('toggl.timer.start', () =>
			apis.Toggl.timeEntries.create(
				{
					description: timerName,
					tag: 'task',
				},
				metadata
			)
		);
		const startClickUpTimer = Log.runner('clickup.timer.start', () =>
			apis.ClickUp.timeTrack.startForTask(task)
		);

		await createTogglTimer.handle();
		await startClickUpTimer.handle();
	});
