import { TogglRequest } from '../utils/request';
import { toggl } from '../../../models';
import { ITimeTrackCreateBody } from './types';
import chalk from 'chalk';

const api = TogglRequest.instance('/me/time_entries');
const workspaceApi = (workspaceId: number) => {
	return TogglRequest.instance(`/workspaces/${workspaceId}/time_entries`);
};

class TogglTimeEntriesLoad {
	getLast = async (
		filter?: (timeTrack: toggl.TimeTrack) => boolean
	): Promise<toggl.TimeTrack | null> => {
		const out = await api.get<any[]>();
		if (out.data.length === 0) return null;
		const tracks = out.data.map(toggl.timetrack.init);
		const filtered = filter ? tracks.filter(filter) : tracks;
		if (filtered.length === 0) return null;
		return filtered
			.sort((t1, t2) => {
				if (t1.stop && t2.stop) {
					return t1.stop > t2.stop ? 1 : -1;
				}
				return 0;
			})
			.pop();
	};

	getLastOfTask = () => {
		return this.getLast(time => time.tags.includes('task'));
	};

	current = async () => {
		const { data } = await api.get<toggl.timeTrack.Api>('/current');
		if (!data) {
			return null;
		}
		return toggl.timetrack.init(data);
	};

	toggleLastOfTask = async () => {
		const current = await this.current();
		if (current) {
			return await this.stop(current);
		}
		return this.start();
	};

	stop = async (team?: toggl.TimeTrack): Promise<boolean> => {
		if (!team) team = await this.current();
		if (!team) return false;
		const { workspace_id, id } = team;
		const { data } = await workspaceApi(workspace_id).patch<toggl.timeTrack.Api>(`/${id}/stop`);
		console.log(`stopped: [ ${chalk.cyan(data.description)} ]`);
		return true;
	};

	start = async (time?: toggl.TimeTrack): Promise<boolean> => {
		if (time) return this.startWithTime(time);
		const last = await this.getLastOfTask();
		if (!last) return false;
		return this.startWithTime(last);
	};

	private startWithTime = async (time: toggl.TimeTrack) => {
		const body: ITimeTrackCreateBody = {
			start: new Date().toISOString(),
			duration: -1,
			description: time.description,
			created_with: 'laziness',
			tags: Array.from(time.tags),
			tag_ids: time.api.tag_ids,
			user_id: time.user_id,
			workspace_id: time.workspace_id,
			project_id: time.project_id,
		};
		await workspaceApi(time.workspace_id).post('', body);
		console.log(`started: [ ${chalk.cyan(body.description)} ]`);
		return true;
	};
}

const TogglTimeEntries = new TogglTimeEntriesLoad();

export default TogglTimeEntries;
