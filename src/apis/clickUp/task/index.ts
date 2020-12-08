import chalk from "chalk";
import ClickUpApi from "../utils/request";
import models from "../../../models";

const api = ClickUpApi.instance("", (response) => response.data);

class ClickUpTaskConstructor {
	create = async (
		list_id: string,
		body: ClickUp.Task.Request
	): Promise<void> => {
		return api.post(`list/${list_id}/task`, body);
	};

	get = async (taskId: string) => {
		return api.get(`task/${taskId}`);
	}
}

const ClickUpTimeTrack = new ClickUpTaskConstructor();

export default ClickUpTimeTrack;
