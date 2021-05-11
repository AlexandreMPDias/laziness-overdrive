import { IOHook } from 'iohook';
export { IKeyPress } from '../macros/mapper';
export type KeyboardEvent = { [K in keyof IOHook.IOHookEvent]: IOHook.IOHookEvent[K] };

export interface Constants {
	keys: string[];
	isControlKey: (key: string) => boolean;
	name: (key: string) => string;
}
