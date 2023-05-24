import {
	IToggleTimeTrack,
	IToggleTimeTrackDate,
	IToggleTimeTrackTags,
	IToggleTimeTrackApi,
} from './timeTrack/schema';
import * as timetrack from './timeTrack/index';

export declare namespace Toggl {
	export type TimeTrack = IToggleTimeTrack;
	export namespace timeTrack {
		export type Api = IToggleTimeTrackApi;
		export type Date = IToggleTimeTrackDate;
		export type Tags = IToggleTimeTrackTags;
	}
}

export const Toggl = {
	timetrack,
};
