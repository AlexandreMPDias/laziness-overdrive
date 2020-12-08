import chalk from "chalk";
import ClickUpApi from "../utils/request";
import models from "../../../models";

const api = ClickUpApi.instance(
	`team/${process.env.CLICKUP_TEAM_ID}/time_entries/`,
	(response) => response.data.data
);

class ClickUpTimeTrackConstructor {
	/**
	 * Start a Time Track
	 *
	 * @param {ClickUp.TimeTrack | null} timeTrack the timeTrack to start, if this parameter
	 * is not set, the most recent timeTrack is used.
	 *
	 * @return {Promise<void>} a promise that resolves when the timeTrack is started
	 * or the request fails.
	 */
	start = async (timeTrack: ClickUp.TimeTrack | null = null): Promise<void> => {
		await api.post("stop");
		const selectedTimeTrack =
			timeTrack || (await this.getMostRecentTimeEntry());

		if (selectedTimeTrack) {
			this.logTimeTrack(selectedTimeTrack, "starting");
			if (!selectedTimeTrack.billable) {
				const nextTimeTrack: ClickUp.TimeTrack = {
					...selectedTimeTrack,
					billable: true,
				};
				await api.put(selectedTimeTrack.id, nextTimeTrack);
			}
			await api.post(`start/${selectedTimeTrack.id}`);
		}
	};

	/**
	 * Stop the currently running Time Track
	 *
	 * @return {Promise<void>} a promise that resolves when the timeTrack is stopped
	 * or the request fails.
	 */
	stop = async (): Promise<void> => {
		const selectedTimeTrack = await api.get(`current`);
		if (selectedTimeTrack) {
			this.logTimeTrack(selectedTimeTrack, "stopping");
			await api.post("stop");
		}
	};

	/**
	 * Prints a message related to a timeTrack (shows the timeTrack's humanFriendly's id)
	 *
	 * @param {ClickUp.TimeTrack} timeTrack
	 * @param {string} message
	 *
	 * @return {void}
	 */
	private logTimeTrack = (
		timeTrack: ClickUp.TimeTrack,
		message: string
	): void => {
		const id = models.clickUp.timeTrack.getHumanFriendlyId(timeTrack);
		console.log(`[ ${chalk.cyan(id)} ]: ${message}`);
	};

	/**
	 * Get the most recent timeTrack entry in the last 30 days.
	 *
	 * [WARNING] Does not include the currently running timeTrack
	 *
	 * @param {void}
	 *
	 * @return {Promise<ClickUp.TimeTrack>}
	 */
	private getMostRecentTimeEntry = async (): Promise<ClickUp.TimeTrack> => {
		return this.sortTimeTracks(await api.get(""))[0];
	};

	/**
	 * Sort an array of time tracks, placing the last created timeTrack first.
	 *
	 * @param {ClickUp.TimeTrack[]} timeTracks
	 *
	 * @return {ClickUp.TimeTrack[]} returns a copy of the array, not modifying it.
	 */
	private sortTimeTracks = (
		timeTracks: ClickUp.TimeTrack[]
	): ClickUp.TimeTrack[] => {
		const timeEntries: ClickUp.TimeTrack[] = [...timeTracks];
		timeEntries.sort((t1, t2) => {
			if (t1.start > t2.start) {
				return -1;
			}
			if (t1.start === t2.start) {
				return 0;
			}
			return 1;
		});
		return timeEntries;
	};
}

const ClickUpTimeTrack = new ClickUpTimeTrackConstructor();

export default ClickUpTimeTrack;
