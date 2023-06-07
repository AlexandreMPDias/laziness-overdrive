import {
	IToggleTimeTrack,
	IToggleTimeTrackDate,
	IToggleTimeTrackTags,
	IToggleTimeTrackApi,
} from './timeTrack/schema';
import { ITogglMetadata, ITogglProject, ITogglTag } from './metadata/schema';
import * as timetrack from './timeTrack/index';

export declare namespace Toggl {
	export type TimeTrack = IToggleTimeTrack;
	export namespace timeTrack {
		export type Api = IToggleTimeTrackApi;
		export type Date = IToggleTimeTrackDate;
		export type Tags = IToggleTimeTrackTags;
	}

	export type Metadata = ITogglMetadata;
	export type Project = ITogglProject;
	export type Tag = ITogglTag;
}

export const Toggl = {
	timetrack,
};
