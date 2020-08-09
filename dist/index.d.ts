import { IShikiTheme } from './loadTheme';
import { TTheme } from './types';
export * from './types';
export declare const materialThemes: string[];
export declare const niceThemes: string[];
export declare function getTheme(t: TTheme): IShikiTheme;
export { loadTheme, IShikiTheme } from './loadTheme';
