interface IOHookEvent {
	type: string;
	keychar?: number;
	keycode?: number;
	rawcode?: number;
	button?: number;
	clicks?: number;
	x?: number;
	y?: number;
}

export { IKeyPress } from '../macros/mapper';
export type KeyboardEvent = { [K in keyof IOHookEvent]: IOHookEvent[K] };

export interface Constants {
	keys: string[];
	isControlKey: (key: string) => boolean;
	name: (key: string) => string;
}
