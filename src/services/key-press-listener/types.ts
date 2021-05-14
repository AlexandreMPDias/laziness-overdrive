import { iohook } from 'iohook';
import { Keys } from '../../config/keycode-mapping';

export type Key = Keys;

export interface IKeyPress<K extends Key = Key> {
	readonly key: K;
	readonly label: string;
	readonly keycode: number;
	readonly rawcode: number;
}

export interface IKeyPressEvent {
	readonly downKeys: Key[];
}

export interface IUnknownKeyPress {
	readonly keycode: number;
	readonly rawcode: number;
	readonly shiftKey?: boolean;
	readonly altKey?: boolean;
	readonly ctrlKey?: boolean;
	readonly metaKey?: boolean;
	readonly type: any;
}

export type DirtyListener = typeof iohook;
