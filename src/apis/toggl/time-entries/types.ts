export interface ITimeTrackCreateBody {
	/**
	 * Whether the time entry is marked as billable.
	 * @default false
	 */
	readonly billable?: boolean;

	/**
	 * Must be provided when creating a time entry and should identify the service/application used to create it.
	 */
	readonly created_with?: string;

	/**
	 * Time entry description.
	 */
	readonly description?: string;

	/**
	 * Time entry duration. For running entries, it should be negative (preferably -1).
	 */
	readonly duration?: number;

	/**
	 * @deprecated: Used to create a time entry with a duration but without a stop time. This parameter can be ignored.
	 */
	readonly duronly?: boolean;

	/**
	 * Project ID
	 * @deprecated legacy field
	 */
	readonly pid?: number;

	/**
	 * Project ID.
	 */
	readonly project_id?: number;

	/**
	 * Start time in UTC, required for creation. Format: 2006-01-02T15:04:05Z
	 */
	readonly start: string;

	/**
	 * If provided during creation, the date part will take precedence over the date part of "start". Format: 2006-11-07
	 */
	readonly start_date?: string;

	/**
	 * Stop time in UTC. Can be omitted if it's still running or created with "duration".
	 * If "stop" and "duration" are provided, values must be consistent (start + duration == stop).
	 */
	readonly stop?: string;

	/**
	 * Can be "add" or "delete". Used when updating an existing time entry.
	 */
	readonly tag_action?: string;

	/**
	 * IDs of tags to add/remove.
	 */
	readonly tag_ids?: number[];

	/**
	 * Names of tags to add/remove. If a name does not exist as a tag, one will be created automatically.
	 */
	readonly tags?: string[];

	/**
	 * Task ID.
	 */
	readonly task_id?: number;

	/**
	 * Task ID
	 * @deprecated legacy field
	 */
	readonly tid?: number;

	/**
	 * Time Entry creator ID
	 * @deprecated legacy field
	 */
	readonly uid?: number;

	/**
	 * Time Entry creator ID. If omitted, it will use the requester user ID.
	 */
	readonly user_id?: number;

	/**
	 * Workspace ID
	 * @deprecated legacy field
	 */
	readonly wid?: number;

	/**
	 * Workspace ID (required).
	 */
	readonly workspace_id: number;
}
