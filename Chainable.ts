type Chainable<Options = {}> = {
  option<K extends string, V>(
    key: K,
    value: V
  ): Chainable<Options & { [S in K]: V }>;
  get(): Options;
};
