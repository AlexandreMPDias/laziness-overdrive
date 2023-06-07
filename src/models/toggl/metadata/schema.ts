export interface ITogglMetadata {
	readonly workspaceId: number;
	readonly tags: ITogglTag[];
	readonly userId: number;
	readonly projects: ITogglProject[];
}

export interface ITogglProject {
	readonly name: string;
	readonly id: string | number;
}

export interface ITogglTag {
	readonly name: string;
	readonly id: number;
}
