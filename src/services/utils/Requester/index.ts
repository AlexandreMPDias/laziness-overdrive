import axios, { AxiosInstance, AxiosResponse } from 'axios';
import chalk from 'chalk';

export interface Response<D = any> {
	data: D;
	statusCode: number;
}

export interface IRequesterOptions {
	uri?: string;
	baseUrl: string;
	headers?: Record<string, string>;
}

export class Requester<RD = any> {
	private axios: AxiosInstance;

	constructor(public readonly options: IRequesterOptions) {
		this.axios = axios.create({
			baseURL: options.baseUrl,
			timeout: 30000,
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				...options.headers,
			},
		});
	}

	public post = async <D = RD>(url: string = '', data?: object) => {
		return await this.attempt<D>(url, () => this.axios.post(url, data));
	};

	public put = async <D = RD>(url: string = '', data?: object) => {
		return await this.attempt<D>(url, () => this.axios.put(url, data));
	};

	public get = async <D = RD>(url: string = '') => {
		return await this.attempt<D>(url, () => this.axios.get(url));
	};

	public patch = async <D = RD>(url: string = '', data?: object) => {
		return await this.attempt<D>(url, () => this.axios.patch(url, data));
	};

	public instance = <D = RD>(uri: string) => {
		return new Requester<D>({
			...this.options,
			uri: this.joinPaths(this.options.uri, uri),
			baseUrl: this.joinPaths(this.options.baseUrl, uri),
		});
	};

	private attempt = async <D = RD>(url: string, request: () => Promise<AxiosResponse<D>>) => {
		try {
			return await request();
		} catch (err) {
			console.log(err.response);
			console.log(
				chalk.redBright(`Request on url [${this.joinPaths(this.options.uri, url)}] failed.`)
			);
			process.exit(1);
		}
	};

	private joinPaths = (base: string = '', uri: string = '') => {
		if (!base && !uri) return '';
		uri = uri.replace(/^\/(.+)$/, '$1');
		const join = base.endsWith('/') ? '' : '/';
		return `${base}${join}${uri}`;
	};
}
