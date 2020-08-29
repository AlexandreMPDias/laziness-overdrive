import axios, { AxiosInstance } from 'axios';
import chalk from 'chalk';


export class SlackRequestClass {

	private axios: AxiosInstance = axios.create({
		baseURL: 'https://slack.com/api/',
		timeout: 30000,
		headers: {
			Authorization: `Bearer ${process.env.SLACK_OAUTH}`,
			'Content-Type': 'application/json; charset=utf-8',
			'X-Slack-User': process.env.SLACK_MEMBER_ID
		},
	})

	public post = (url: string, data: object) => {
		return this.attempt(url, () => this.axios.post(url, data));
	}

	public get = (url: string) => {
		return this.attempt(url, () => this.axios.get(url));
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

export default new SlackRequestClass();