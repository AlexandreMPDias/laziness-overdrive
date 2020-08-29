import "./config";
import minimist from 'minimist';
import iohook from 'iohook';
import * as service from './services'
import chalk from "chalk";

const argv = minimist(process.argv.slice(2));

if(argv._.includes('key.map')) {
	console.log(`Initializing [${chalk.red('key.map')}] mode`)
	service.KeyTest.shortMode = argv.s;
	service.KeyTest.init();
} else {
	console.log(`Initializing [${chalk.red('listen')}] mode`)
	service.InactivityDetector.init();
	service.Macros.init();
}
iohook.start();