import { Chalk, ChalkFunction, Color as ChalkColor, Modifiers } from 'chalk';

export type ColorFn = ChalkFunction;
export type ColorKeys = Extract<typeof ChalkColor, string>;
export type ColorModifiers = Extract<typeof Modifiers, string>;

export type Color = ColorFn | ColorKeys | ColorModifiers;

export type Paint = Chalk;
