export interface IKeyMetadata {
	readonly keycode: number;
	readonly rawcode: number;
	readonly shift: boolean;
	readonly alt: boolean;
	readonly ctrl: boolean;
	readonly meta: boolean;
	readonly fn: boolean;
}
