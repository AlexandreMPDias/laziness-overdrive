import { readFileSync } from 'fs';

class Filer {

	private _require = (pathname: string) => {
		return JSON.parse(readFileSync(`./src/${pathname}`, { encoding: 'utf-8' }));
	}

	public require = (pathname: string, fallback?: string) => {
		try {
			return this._require(pathname);
		} catch {
			const fb = fallback ?? pathname.replace(/^(.+)(\.\w+$)/, '$1.example$2');
			return this._require(fb);
		}
	}

}

export default new Filer();