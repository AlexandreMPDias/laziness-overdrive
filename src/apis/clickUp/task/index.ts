import ClickUpApi from '../utils/request';
import { Requester } from '../../../services/utils/Requester';

const api = new Requester({
	baseUrl: 'https://api.clickup.com/api/v2/',
	headers: {
		Authorization: process.env.CLICKUP_TOKEN,
	},
});

interface IClickUpTask {
	id: string;
	custom_id: string;
	name: string;
	text_content: string;
	description: string;
	status: {
		status: string;
		color: string;
		orderindex: number;
		type: string;
	};
	orderindex: string;
	date_created: string;
	date_updated: string;
	date_closed: string;
	creator: {
		id: number;
		username: string;
		color: string;
		profilePicture: string;
	};
	assignees: string[];
	checklists: string[];
	tags: string[];
	parent: string;

	priority: string;
	due_date: string;
	start_date: string;
	time_estimate: string;
	time_spent: string;
	team_id: string;
	custom_fields: any[]; // You can replace `any` with a more specific type if available
	list: {
		name: string;
		id: string;
	};
	project: {
		id: string;
		name: string;
		hidden: boolean;
		access: boolean;
	};
	folder: {
		id: string;
		name: string;
		hidden: boolean;
		access: boolean;
	};
	space: {
		id: string;
	};
	url: string;
}

class ClickUpTaskConstructor {
	create = async (list_id: string, body: ClickUp.Task.Request): Promise<void> => {
		await api.post(`list/${list_id}/task`, body);
	};

	get = async (taskId: string): Promise<IClickUpTask> => {
		const response = await api.get<IClickUpTask>(`task/${taskId}`);
		return response.data;
	};
}

const ClickUpTimeTrack = new ClickUpTaskConstructor();

export default ClickUpTimeTrack;
