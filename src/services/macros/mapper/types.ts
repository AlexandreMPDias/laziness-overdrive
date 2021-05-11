export interface IKey {
	keycode: number;
	rawcode: number;
}
export interface IKeyPress extends IKey {
	shiftKey?: boolean;
	altKey?: boolean;
	ctrlKey?: boolean;
	metaKey?: boolean;
}
