import "./config";
import minimist from 'minimist';
import iohook from 'iohook';
import * as service from './services'
import * as api from './apis';
import chalk from "chalk";

const argv = minimist(process.argv.slice(2));

function keyMap() {
	console.log(`Starting in [ ${chalk.red('key.map')} ] mode`)
	service.KeyTest.shortMode = argv.s;
	service.KeyTest.init();
	console.log(`Initializing [ ${chalk.blue('iohook')} ]`);
	iohook.start();
}

function clickUp([key]: string[]) {
	console.log(`Starting in [ ${chalk.green('clickUp.' + key)} ] mode`)
	switch (key) {
		case 'teams': {
			api.ClickUp.teams.listMyTeams()
			break;
		}
		case 'test': {
			// api.ClickUp.timeTrack.setBillable()
			break;
		}
	}
}

function _default() {
	console.log(`Starting in [ ${chalk.green('listen')} ] mode`)
	service.InactivityDetector.init();
	service.Macros.init();
	console.log(`Initializing [ ${chalk.blue('iohook')} ]`);
	iohook.start();
}

const execute = (() => {
	if (argv._.includes('key.map')) {
		return keyMap
	} else if (argv._.includes('clickUp')) {
		return () => clickUp(argv._.slice(1))
	} else {
		return _default
	}
})();

execute()