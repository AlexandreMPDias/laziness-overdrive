import { Filer } from '../../utils'; 

import * as types from '../types';

class MacroLoader {
	private commands: types.MacroCommand = [];

	public init = () => {
		this.commands = Filer.require('config/key.macros.json');
	}

	public getCommand = (key: string): types.SingleMacroCommand[] => {
		const registration =  this.commands.find(cmd => cmd.key === key);
		return registration?.actions || [];
	}

	
}

export default new MacroLoader()