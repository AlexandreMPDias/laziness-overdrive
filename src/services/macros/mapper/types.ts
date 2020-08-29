import keyMapping from '../../../../key.map.json';

export type Key = keyof typeof keyMapping


export interface IKeyPress {
	shiftKey?: boolean,
	altKey?: boolean,
	ctrlKey?: boolean,
	metaKey?: boolean,
	keycode: number,
	rawcode: number,
}