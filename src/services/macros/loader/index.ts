import { Filer } from '../../utils';
import { Key } from '../../../models/keyboard/key';
import * as types from '../types';

const sameArrayOfStrings = (arr1: string[], arr2: string[]): boolean => {
	return arr1.every(a => arr2.includes(a));
};
class MacroLoader {
	private commands: types.MacroCommand = [];

	public init = () => {
		this.commands = Filer.require('config/key.macros.json');
		this.commands.forEach(cmd => {
			const valid = !!cmd.keys;
			if (!valid) {
				throw new Error(`Unable to parse macro: [ ${cmd} ]`);
			}
		});
	};

	public getCommand = (keys: Key[]): types.SingleMacroCommand[] => {
		const validKeys = keys.map(key => key.name).filter(Boolean);

		const registration = this.commands.find(cmd => sameArrayOfStrings(cmd.keys, validKeys));

		return registration?.actions || [];
	};
}

export default new MacroLoader();
