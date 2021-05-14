import { IKeyPressMatcher, IKeyPressParser } from '../../protocols/helpers';
import { IKeyPress, Key } from '../../types';

export class KeyPressMatcherAdapter implements IKeyPressMatcher {
	constructor(private readonly parser: IKeyPressParser) {}

	private resolveKey = (key: IKeyPress | Key): IKeyPress | null => {
		return typeof key === 'string' ? this.parser.key(key) : key;
	};

	isSameKey = (leftKey: IKeyPress | Key, rightKey: IKeyPress | Key): boolean => {
		const left = this.resolveKey(leftKey);
		const right = this.resolveKey(rightKey);

		if (!left || !right) {
			return false;
		}

		return left.keycode === right.keycode;
	};

	isSameSequence = (
		leftSequence: Array<IKeyPress | Key>,
		rightSequence: Array<IKeyPress | Key>
	): boolean => {
		return leftSequence.some(left => rightSequence.some(right => this.isSameKey(left, right)));
	};
}
