import keyMapping from '../../../../keyMapping.json';
import { IKeyPress, Key } from './types'
const keys: [Key, IKeyPress][] = Object.entries(keyMapping) as any;
const keyKeys = ['keycode', 'rawcode', 'altKey', 'ctrlKey', 'metaKey', 'shiftKey'] as const;

class KeyMapper {
	public get = (keyPressed: IKeyPress): Key|null => {
		return keys.find(([_, values]) => {
			return (this.isSameKey(values,keyPressed));
		})?.[0] ?? null;
	}

	private isSameValue = (key1: IKeyPress, key2: IKeyPress, keyKey: keyof IKeyPress): boolean => {
		const v1 = key1[keyKey] ?? false;
		const v2 = key2[keyKey] ?? false;
		return v1 === v2
	}

	private isSameKey = (key1: IKeyPress, key2: IKeyPress) => {
		return keyKeys.every(keyKey => this.isSameValue(key1, key2, keyKey));
	}

}

export * from './types'
export default new KeyMapper;