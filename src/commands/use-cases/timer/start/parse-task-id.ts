type Output = {
	id: string;
	type: 'clickup-url' | 'taskId';
};

const TASK_ID_MATCH = /^([a-z0-9]{9})$/;
const CLICK_TASK_URL_MATCH = /^https:\/\/app\.clickup\.com\/t\/([a-z0-9]{9})$/;

export const parseTaskId = (value: string): Output => {
	if (value.match(CLICK_TASK_URL_MATCH)) {
		const id = value.replace(CLICK_TASK_URL_MATCH, '$1');
		return {
			id,
			type: 'clickup-url',
		};
	}
	if (value.match(TASK_ID_MATCH)) {
		return { id: value, type: 'taskId' };
	}
	throw new Error(`Unable to parse task-id [${value}]`);
};
