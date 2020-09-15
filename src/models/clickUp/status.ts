/**
 * Check if the Task's Status is an active status or not.
 * @param status 
 */
export function isActive(status: ClickUp.Task.Status) {
	return ['em andamento'].includes(status.status);
}