import Bluebird from 'bluebird';

Bluebird.config({
	cancellation: true,
	monitoring: true,
})

global.Promise = Bluebird as any;