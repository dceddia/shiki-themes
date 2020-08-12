"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadTheme = void 0;
var fs = require("fs");
var path = require("path");
var plist_1 = require("./plist");
var JSON5 = require("json5");
function loadJSONTheme(themePath) {
    var fileContents = fs.readFileSync(themePath, 'utf-8');
    return JSON5.parse(fileContents);
}
function loadPListTheme(themePath) {
    var fileContents = fs.readFileSync(themePath, 'utf-8');
    return plist_1.parse(fileContents);
}
function toShikiTheme(rawTheme) {
    var shikiTheme = __assign(__assign({}, rawTheme), { bg: getThemeBg(rawTheme), fg: getThemeFg(rawTheme) });
    if (rawTheme.include) {
        shikiTheme.include = rawTheme.include;
    }
    if (rawTheme.tokenColors) {
        shikiTheme.settings = rawTheme.tokenColors;
    }
    return shikiTheme;
}
/**
 * @param themePath Absolute path to theme.json / theme.tmTheme
 */
function loadTheme(themePath) {
    var theme;
    if (/\.json$/.test(themePath)) {
        theme = loadJSONTheme(themePath);
    }
    else {
        theme = loadPListTheme(themePath);
    }
    var shikiTheme = toShikiTheme(theme);
    if (shikiTheme.include) {
        var includedThemePath = path.resolve(themePath, '..', shikiTheme.include);
        var includedTheme = loadTheme(includedThemePath);
        if (includedTheme.settings) {
            shikiTheme.settings = shikiTheme.settings.concat(includedTheme.settings);
        }
        if (includedTheme.bg && !shikiTheme.bg) {
            shikiTheme.bg = includedTheme.bg;
        }
        if (includedTheme.fg && !shikiTheme.fg) {
            shikiTheme.fg = includedTheme.fg;
        }
    }
    return shikiTheme;
}
exports.loadTheme = loadTheme;
function getThemeBg(theme) {
    if (theme.colors && theme.colors['editor.background']) {
        return theme.colors['editor.background'];
    }
    var settings = theme.settings ? theme.settings : theme.tokenColors;
    var globalSetting = settings.find(function (s) {
        return !s.name && !s.scope;
    });
    return globalSetting ? globalSetting.settings.background : null;
}
function getThemeFg(theme) {
    if (theme.colors && theme.colors['editor.foreground']) {
        return theme.colors['editor.foreground'];
    }
    var settings = theme.settings ? theme.settings : theme.tokenColors;
    var globalSetting = settings.find(function (s) {
        return !s.name && !s.scope;
    });
    return globalSetting ? globalSetting.settings.foreground : null;
}
