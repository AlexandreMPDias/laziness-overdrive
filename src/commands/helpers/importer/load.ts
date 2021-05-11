import { ImportDeclaration, ImportedObject } from './types';

export class ImporterAdapter<Declaration extends ImportDeclaration> {
	constructor(private readonly imports: Declaration) {}

	import = async <K extends keyof Declaration>(
		...keys: K[]
	): Promise<ImportedObject<Declaration, K>> => {
		const output: any = {};

		const importPromises = keys.map(async key => {
			output[key] = await this.imports[key]();
		});

		await Promise.all(importPromises);

		return output;
	};
}
