import { Key, IKeyPress } from '../types';

export namespace IKeyPressListener {
	export type RegisterCallback = (event: IKeyPress) => void;
}

export interface IKeyPressListener {
	start(): void;
	register(key: Key | Key[], callback: IKeyPressListener.RegisterCallback): void;
}
