import { IKeyPress, ModeSetup, Log } from './protocol';

export * from './protocol';

export interface HelperMethods {
	log: Log;
	paint(key: string, value: any): string;
}

interface BaseModeState {
	short: { first: boolean };
}

export type ModeState = { [M in ViewMode]: M extends keyof BaseModeState ? BaseModeState[M] : {} };

export type Payload<M extends ViewMode> = ModeSetup[M] & ModeState[M];

export type ViewMode = keyof ModeSetup;

export interface ViewFnParams<M extends ViewMode = ViewMode> {
	keyPress: IKeyPress;
	payload: Payload<M>;
	help: HelperMethods;
}

export type ViewFn<M extends ViewMode = ViewMode> = (params: ViewFnParams<M>) => void;
