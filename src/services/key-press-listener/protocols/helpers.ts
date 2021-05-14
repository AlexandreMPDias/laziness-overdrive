import { IKeyPress, IUnknownKeyPress, Key } from '../types';

export interface IKeyPressMatcher {
	isSameKey(leftKey: IKeyPress | Key, rightKey: IKeyPress | Key): boolean;

	isSameSequence(
		leftSequence: Array<IKeyPress | Key>,
		rightSequence: Array<IKeyPress | Key>
	): boolean;
}

export interface IKeyPressParser {
	key(key: Key): IKeyPress | null;

	keyPress(keyPress: IUnknownKeyPress): IKeyPress | null;
}
