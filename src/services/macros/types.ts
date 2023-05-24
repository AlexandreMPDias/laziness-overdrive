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
		cmd: 'timer.task.resume';
		args: {
			provider?: 'clickUp' | 'toggl';
		};
	};
	stopRunningTask: {
		cmd: 'timer.task.stop';
		args: {
			provider?: 'clickUp' | 'toggl';
		};
	};
	toggleTimer: {
		cmd: 'timer.toggle';
		args: {};
	};
}

export type SingleMacroCommand = MacroCommandDeclaration[keyof MacroCommandDeclaration];

export interface MacroCommandRegistration {
	keys: string[];
	actions: SingleMacroCommand[];
}

export type MacroCommand = MacroCommandRegistration[];
