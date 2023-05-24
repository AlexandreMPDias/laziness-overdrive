import { IToggleTimeTrack, IToggleTimeTrackApi, IToggleTimeTrackDate } from './schema';

const parseDate = (rawDate: string): IToggleTimeTrackDate => {
	return {
		value: new Date(rawDate),
		raw: rawDate,
	};
};

export const init = (time: IToggleTimeTrackApi): IToggleTimeTrack => {
	const { description, user_id, duration, id, project_id, task_id, workspace_id } = time;

	return {
		description,
		duration,
		id,
		project_id,
		task_id,
		workspace_id,
		updatedAt: parseDate(time.at),
		start: parseDate(time.start),
		stop: parseDate(time.stop),
		tags: time.tags || [],
		user_id: user_id,
		api: time,
	};
};

export const TAGS = [
	'external meetings',
	'external messaging',
	'internal meetings',
	'internal messaging',
	'management software',
	'required',
	'review',
	'task',
];
