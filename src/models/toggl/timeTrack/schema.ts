export interface IToggleTimeTrackApi {
	readonly id: number;
	readonly workspace_id: number;
	readonly project_id: number;
	readonly task_id: number | null;
	readonly start: string;
	readonly stop: string;
	readonly duration: number;
	readonly description: string;
	readonly tags?: IToggleTimeTrackTags[];
	readonly tag_ids?: number[];
	readonly duronly: boolean;
	readonly at: string;
	readonly server_deleted_at: string | null;
	readonly user_id: number;
}

export interface IToggleTimeTrackDate {
	readonly value: Date;
	readonly raw: string;
}

export interface IToggleTimeTrack {
	readonly id: number;
	readonly task_id: number | null;
	readonly workspace_id: number;
	readonly project_id: number;
	readonly start: IToggleTimeTrackDate;
	readonly stop: IToggleTimeTrackDate;
	readonly updatedAt: IToggleTimeTrackDate;
	readonly duration: number;
	readonly description: string;
	readonly tags: readonly IToggleTimeTrackTags[];
	readonly api: IToggleTimeTrackApi;
	readonly user_id: number;
}

export type IToggleTimeTrackTags =
	| 'task'
	| `${'internal' | 'external'} ${'meetings' | 'messaging'}`;
