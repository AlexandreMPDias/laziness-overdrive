export { IKeyPress } from '../types';

export interface KeyIteratorEventCallback {
	start: () => void;
	end: () => void;
	'on-step': (payload: KeyIteratorEvent) => void;
}

export interface KeyIteratorEvent {
	key: string;
	name: string;
	step: number;
}
