export interface MacroCommandDeclaration {
	setPresence: {
		cmd: 'slack.update.user.presence';
		args: {
			presence: 'auto' | 'away';
		};
	};
	setStatus: {
		cmd: 'slack.update.user.status';
		args:
			| {
					text: string;
					emoji: string;
					expiration: number;
			  }
			| 'sextou';
	};
	resumeLastTask: {
		cmd: 'clickUp.task.resume';
		args: {};
	};
	stopRunningTask: {
		cmd: 'clickUp.task.stop';
		args: {};
	};
}

export type SingleMacroCommand = MacroCommandDeclaration[keyof MacroCommandDeclaration];

export interface MacroCommandRegistration {
	keys: string[];
	actions: SingleMacroCommand[];
}

export type MacroCommand = MacroCommandRegistration[];
