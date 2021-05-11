import { readFileSync, writeFileSync } from 'fs';

class Filer {
	private _require = (pathname: string) => {
		return JSON.parse(readFileSync(`./src/${pathname}`, { encoding: 'utf-8' }));
	};

	public require = (pathname: string, fallback?: string) => {
		try {
			return this._require(pathname);
		} catch {
			const fb = fallback ?? pathname.replace(/^(.+)(\.\w+$)/, '$1.example$2');
			return this._require(fb);
		}
	};

	public update = (pathname: string, value: any): void => {
		const v = typeof value === 'string' ? value : JSON.stringify(value, null, '\t');
		writeFileSync(`./src/${pathname}`, v, { encoding: 'utf-8' });
	};
}

export default new Filer();
