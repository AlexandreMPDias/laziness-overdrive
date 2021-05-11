type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;

export type ImportDeclaration = Record<string, () => Promise<any>>;

export type ImportedObject<
  D extends ImportDeclaration,
  Keys extends keyof D
> = {
  [K in Keys]: Awaited<ReturnType<D[K]>>;
};
