type Await<T> = T extends Promise<infer P> ? P : Await<T>;

export const loadKeyCodeMapping = async () => {
	if (process.platform === 'darwin') {
		return (await import('./macos')).default;
	}
	return (await import('./win')).default;
};

type AllKeys = Await<ReturnType<typeof loadKeyCodeMapping>>[keyof Await<
	ReturnType<typeof loadKeyCodeMapping>
>];

export type Keys = AllKeys['key'];

export default loadKeyCodeMapping;
