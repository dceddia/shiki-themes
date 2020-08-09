"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTheme = exports.niceThemes = exports.materialThemes = void 0;
var fs = require("fs");
var path = require("path");
var loadTheme_1 = require("./loadTheme");
__exportStar(require("./types"), exports);
var vscThemes = [
    'abyss',
    'dark_plus',
    'dark_vs',
    'hc_black',
    'kimbie_dark',
    'light_plus',
    'light_vs',
    'monokai',
    'monokai_dimmed',
    'quietlight',
    'red',
    'solarized_dark',
    'solarized_light'
];
exports.materialThemes = [
    'Material-Theme-Darker-High-Contrast',
    'Material-Theme-Darker',
    'Material-Theme-Default-High-Contrast',
    'Material-Theme-Default',
    'Material-Theme-Lighter-High-Contrast',
    'Material-Theme-Lighter',
    'Material-Theme-Ocean-High-Contrast',
    'Material-Theme-Ocean',
    'Material-Theme-Palenight-High-Contrast',
    'Material-Theme-Palenight'
];
exports.niceThemes = ['nord', 'min-light', 'min-dark', 'white', 'white-night', 'zeit'];
function mapF(subdir) {
    return function (n) {
        var p = fs.existsSync(path.resolve(__dirname, "../data/" + subdir + "/" + n + ".json"))
            ? path.resolve(__dirname, "../data/" + subdir + "/" + n + ".json")
            : path.resolve(__dirname, "../data/" + subdir + "/" + n + ".tmTheme");
        return loadTheme_1.loadTheme(p);
    };
}
function getTheme(t) {
    if (vscThemes.includes(t)) {
        return mapF('vscode')(t);
    }
    if (exports.materialThemes.includes(t)) {
        return mapF('material')(t);
    }
    if (exports.niceThemes.includes(t)) {
        return mapF('nice')(t);
    }
    throw Error("No theme " + t + " found");
}
exports.getTheme = getTheme;
var loadTheme_2 = require("./loadTheme");
Object.defineProperty(exports, "loadTheme", { enumerable: true, get: function () { return loadTheme_2.loadTheme; } });
