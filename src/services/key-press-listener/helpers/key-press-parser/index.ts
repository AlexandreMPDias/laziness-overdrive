import { IKeyPressParser } from '../../protocols/helpers';
import { IKeyPress, IUnknownKeyPress, Key } from '../../types';

export class KeyPressParserAdapter implements IKeyPressParser {
	private readonly mapperList: Record<Key, IKeyPress>;

	constructor(private readonly mapper: Record<number, IKeyPress>) {
		this.mapperList = {} as any;
		Object.values(this.mapper).forEach(keyPress => {
			this.mapperList[keyPress.key] = keyPress;
		});
	}

	key = (key: Key): IKeyPress | null => {
		return this.mapperList[key] || null;
	};

	keyPress = (keyPress: IUnknownKeyPress): IKeyPress | null => {
		return this.mapper[keyPress.keycode] || null;
	};
}
