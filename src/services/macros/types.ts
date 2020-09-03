export interface MacroCommandDeclaration {
	setPresence: {
		cmd: 'slack.update.user.presence',
		args: {
			presence: 'auto' | 'away'
		}
	},
	setStatus : {
		cmd: 'slack.update.user.status',
		args: {
			text: string,
			emoji: string,
			expiration: number,
		} | 'sextou'
	}
}

export type SingleMacroCommand = MacroCommandDeclaration[keyof MacroCommandDeclaration];

export interface MacroCommandRegistration {
	key: string,
	actions: SingleMacroCommand[]
}

export type MacroCommand = MacroCommandRegistration[]