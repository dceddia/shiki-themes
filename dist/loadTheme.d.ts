import { IRawTheme, IRawThemeSetting } from 'vscode-textmate';
/**
 * @param themePath Absolute path to theme.json / theme.tmTheme
 */
export declare function loadTheme(themePath: string): IShikiTheme;
export interface IShikiTheme extends IRawTheme {
    /**
     * @description theme name
     */
    name?: string;
    /**
     * tokenColors of the theme file
     */
    settings: IRawThemeSetting[];
    /**
     * @description text background color
     */
    bg: string;
    /**
     * @description text foreground color
     */
    fg: string;
    /**
     * @description relative path of included theme
     */
    include?: string;
}
