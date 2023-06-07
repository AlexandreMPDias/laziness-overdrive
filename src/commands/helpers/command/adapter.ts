import yargs, { Argv, InferredOptionType, Options, PositionalOptions } from 'yargs';
import { hideBin } from 'yargs/helpers';
import { ChangeArgv } from './types.js';

type CommandInput<Name extends string = string> = {
	name: Name;
	command?: string;
	description: string;
	depth: number;
	useCommand: boolean;
	handle?(argv: any): any;
};

export abstract class BaseCommandAdapter<T = {}, Name extends string = string> {
	protected builders: Array<ChangeArgv<any, any>> = [];
	protected optionValues: Array<InferredOptionType<Options>> = [];
	protected positionalValues: Array<InferredOptionType<PositionalOptions>> = [];
	protected readonly input: CommandInput<Name>;
	protected abstract update<A>(change: ChangeArgv<T, A>): any;

	constructor(input: Partial<CommandInput<Name>>) {
		this.input = {
			name: 'n/a' as any,
			depth: 0,
			description: '',
			useCommand: false,
			...input,
		};
	}

	private getArgv = () => {
		const { depth } = this.input;
		const argv = Array.from(hideBin(process.argv));
		const argvFinal: Array<string> = [];

		for (let i = depth; i < argv.length; i++) {
			argvFinal.push(argv[i]!);
		}
		return argvFinal;
	};

	private getInitialYargs = (): Argv<{}> => {
		const { description, name } = this.input;
		const argv = this.getArgv();

		const y = yargs(argv).strictCommands();
		if (name) {
			this.update(y => y.scriptName(name));
		}
		const command = ['$0', this.input.command].filter(Boolean).join(' ');
		return y.command(command, description);
	};

	protected compose = (): Argv<T> => {
		if (this.positionalValues.length !== 0) {
			this.update(y => y.demandCommand(1));
		}
		const argv = this.getInitialYargs();
		return this.mergeBuilder(argv);
	};

	private mergeBuilder = (argv: Argv<{}>): Argv<T> => {
		return this.builders.reduce((y, update) => update(y), argv as Argv<T>);
	};
}
