declare namespace ClickUp {

	export interface Task {
		id: string;
		name: string;
		status: ClickUp.Task.Status;
		custom_type: unknown;
	}

	export interface User {
		id: number;
		username: string;
		email: string;
		color: string;
		initials: string;
		profilePicture: string;
	}

	export interface Tag {
		name: string;
		tag_bg: string;
		tag_fg: string;
		creator: number;
	}

	export interface TimeTrack {
		id: string;
		task?: ClickUp.Task;
		wid: string;
		user: ClickUp.User;
		billable: boolean;
		start: string;
		duration: number;
		description: string;
		tags: ClickUp.Tag[];
		source: string;
		at: string;
	}
}

declare namespace ClickUp.Task {
	export interface Status {
		status: ClickUp.Task.Status.Type, color: string, type: 'open', orderindex: number
	}
}

declare namespace ClickUp.Task.Status {
	export type Type = 'a fazer' | 'em andamento' | 'em espera' | 'code review' | 'concluido'
}

/**
 * If this file has no import/export statements (i.e. is a script)
 * convert it into a module by adding an empty export statement.
 *
 * [WARNING] Don't remove this. In case we remove the import in the future.
 */
export = ClickUp;
export as namespace ClickUp;