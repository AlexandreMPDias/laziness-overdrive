import {
	Arguments,
	InferredOptionType,
	InferredOptionTypes,
	Options,
	PositionalOptions,
} from 'yargs';
import { CamelCaseKey, ChangeArgv, CommandLike } from './types.js';
import { BaseCommandAdapter } from './adapter.js';
export type { CommandLike };

export class Command<T = {}, Name extends string = string>
	extends BaseCommandAdapter<T, Name>
	implements CommandLike
{
	protected update = <A>(change: ChangeArgv<T, A>): Command<A, Name> => {
		this.builders.push(change);
		return this as any;
	};

	positional = <K extends string, O extends PositionalOptions>(
		key: K,
		opt: O
	): Command<T & { [key in K]: InferredOptionType<O> }, Name> => {
		this.positionalValues.push({ ...opt, key });
		return this.update(y => y.positional(key, opt));
	};

	options = <O extends { [key: string]: Options }>(
		options: O
	): Command<Omit<T, keyof O> & InferredOptionTypes<O>, Name> => {
		this.optionValues.push(Object.values(options));
		return this.update(y => y.options(options));
	};

	parse = (): {
		[key in keyof Arguments<T> as key | CamelCaseKey<key>]: Arguments<T>[key];
	} => {
		const { argv } = this.compose();
		return argv as any;
	};

	execute = async (): Promise<any> => {
		const { argv } = this.compose();
		await this.input.handle?.(argv);
	};

	public withHandle = (handle: (argv: Arguments<T>) => any) => {
		this.input.handle = handle;
		return this;
	};

	public get name(): Name {
		return this.input.name;
	}
}
