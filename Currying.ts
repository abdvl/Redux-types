type Unshift<T> = T extends [infer K, ...infer U] ? U : unknown;
type Head<T> = T extends [infer K, ...infer U] ? K : unknown;

type Curried<T, R> = T extends Array<any>
  ? T["length"] extends 1
    ? (args: Head<T>) => R
    : (args: Head<T>) => Curried<Unshift<T>, R>
  : never;

declare function Currying<T extends unknown[], R>(
  fn: (...args: T) => R
): Curried<T, R>;
