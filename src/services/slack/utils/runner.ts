import { spawn, SpawnOptionsWithoutStdio } from 'child_process';
import chalk from 'chalk';


class SlackRunner {

	// private defaultCmd: string[];

	// constructor() {
	// 	const cmd = `.slackCli -t ${process.env.SLACK_TOKEN}`
	// 	this.defaultCmd = this.parseCmd(cmd);
	// }

	

	// public run = (command: string, options: SpawnOptionsWithoutStdio = {}): Promise<void> => {
	// 	return new Promise((resolve, reject) => {
	// 		console.log(`[]: ${chalk.cyan(command)}`);
	// 		const args = this.defaultCmd.concat(this.parseCmd(command));
	// 		const cp = spawn('yarn', args, {  stdio:'pipe', shell: true,  ...options });
	// 		cp.stderr.setEncoding('utf8')
	// 		cp.stdout.setEncoding('utf8');
	// 		cp.stdout.on('data', c => {
	// 			if(!c.match(/(yarn)|(Done in)/) && c !== '$ slackCli\n') {
	// 				console.log(c)

	// 			}
	// 		})
	// 		cp.on('close', (code) => {
	// 			if(code !== 0) {
	// 				reject(`\n\t${chalk.redBright(`Invalid exit code of [${code}]`)}`);
	// 			}
	// 			resolve();
	// 		});
	// 		cp.on('error', reject);
	// 	})
	// }

	// /**
	//  * Source Code found at:
	//  * https://stackoverflow.com/a/43788399/7050326
	//  * @param text 
	//  */
	// private parseCmd = (text: string): string[] => {
	// 	const re = /^"[^"]*"$/; // Check if argument is surrounded with double-quotes
	// 	const re2 = /^([^"]|[^"].*?[^"])$/; // Check if argument is NOT surrounded with double-quotes
	  
	// 	let arr: string[] = [];
	// 	let argPart: string = null;
	  
	// 	text && text.split(" ").forEach(function(arg) {
	// 	  if ((re.test(arg) || re2.test(arg)) && !argPart) {
	// 		arr.push(arg);
	// 	  } else {
	// 		argPart = argPart ? argPart + " " + arg : arg;
	// 		// If part is complete (ends with a double quote), we can add it to the array
	// 		if (/"$/.test(argPart)) {
	// 		  arr.push(argPart);
	// 		  argPart = null;
	// 		}
	// 	  }
	// 	});
	  
	// 	return arr;
	//   }
}

export default new SlackRunner();