import axios, { AxiosInstance } from 'axios';
import chalk from 'chalk';

type ResponseResolver = (response: any) => any

export class ClickUpRequestClass {

	private axios: AxiosInstance;
	private responseResolver?: ResponseResolver;

	constructor(baseUrl: string = '', responseResolver?: ResponseResolver) {
		this.axios = axios.create({
			baseURL: `https://api.clickup.com/api/v2/team/${process.env.CLICKUP_TEAM_ID}/${baseUrl}`,
			timeout: 30000,
			headers: {
				Authorization: process.env.CLICKUP_TOKEN,
				'Content-Type': 'application/json; charset=utf-8',
			},
		});
		this.responseResolver = responseResolver;
	}

	public post = async (url: string, data?: object) => {
		const response = await this.attempt(url, () => this.axios.post(url, data));
		return this.responseResolver ? this.responseResolver(response) : response;
	}

	public put = async (url: string, data?: object) => {
		const response = await this.attempt(url, () => this.axios.put(url, data));
		return this.responseResolver ? this.responseResolver(response) : response;
	}

	public get = async (url: string) => {
		const response = await this.attempt(url, () => this.axios.get(url));
		return this.responseResolver ? this.responseResolver(response) : response;
	}
	public instance = (baseUrl: string, responseResolver?: ResponseResolver) => {
		return new ClickUpRequestClass(baseUrl, responseResolver);
	}

	private attempt = (url: string, request: (() => Promise<any>)) => {
		try {
			return request();
		} catch (err) {
			console.log(chalk.redBright(`Request on url [${url}] failed.`));
			console.log(err)
			process.exit(1);
		}
	}
}

export default new ClickUpRequestClass();