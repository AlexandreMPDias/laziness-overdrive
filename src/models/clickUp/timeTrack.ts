/**
 * Get a human friendly identification for a timeTrack.
 * 
 * @param {ClickUp.TimeTrack} timeTrack
 * 
 * @return {string}
 */
export function getHumanFriendlyId(timeTrack: ClickUp.TimeTrack): string {
	if (timeTrack.task) {
		return timeTrack.task.name;
	}
	if (timeTrack.description) {
		return timeTrack.description;
	}
	const tagsName = timeTrack.tags.map(t => t.name)
	if (tagsName.includes('revisão')) {
		return 'Code Review';
	}
	if (tagsName.length > 0) {
		return tagsName.join(', ');
	}
	return 'Unnammed';
}
