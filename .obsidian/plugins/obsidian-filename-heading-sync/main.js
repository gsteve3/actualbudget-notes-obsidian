'use strict';

var obsidian = require('obsidian');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function isExcalidraw(app, f) {
    if (f.extension === 'excalidraw' || /.*\.excalidraw\.md$/g.test(f.path)) {
        return true;
    }
    var fileCache = app.metadataCache.getFileCache(f);
    return (!!(fileCache === null || fileCache === void 0 ? void 0 : fileCache.frontmatter) && !!fileCache.frontmatter['excalidraw-plugin']);
}
function isExcluded(app, f) {
    if (isExcalidraw(app, f)) {
        return true;
    }
    return false;
}

var stockIllegalSymbols = /[\\/:|#^[\]]/g;
var DEFAULT_SETTINGS = {
    userIllegalSymbols: [],
    ignoredFiles: {},
    ignoreRegex: '',
    useFileOpenHook: true,
};
var FilenameHeadingSyncPlugin = /** @class */ (function (_super) {
    __extends(FilenameHeadingSyncPlugin, _super);
    function FilenameHeadingSyncPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FilenameHeadingSyncPlugin.prototype.onload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadSettings()];
                    case 1:
                        _a.sent();
                        this.registerEvent(this.app.vault.on('rename', function (file, oldPath) {
                            return _this.handleSyncFilenameToHeading(file, oldPath);
                        }));
                        this.registerEvent(this.app.vault.on('modify', function (file) { return _this.handleSyncHeadingToFile(file); }));
                        this.registerEvent(this.app.workspace.on('file-open', function (file) {
                            if (_this.settings.useFileOpenHook) {
                                return _this.handleSyncFilenameToHeading(file, file.path);
                            }
                        }));
                        this.addSettingTab(new FilenameHeadingSyncSettingTab(this.app, this));
                        this.addCommand({
                            id: 'page-heading-sync-ignore-file',
                            name: 'Ignore current file',
                            checkCallback: function (checking) {
                                var leaf = _this.app.workspace.activeLeaf;
                                if (leaf) {
                                    if (!checking) {
                                        _this.settings.ignoredFiles[_this.app.workspace.getActiveFile().path] = null;
                                        _this.saveSettings();
                                    }
                                    return true;
                                }
                                return false;
                            },
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    FilenameHeadingSyncPlugin.prototype.fileIsIgnored = function (activeFile, path) {
        // check exclusions
        if (isExcluded(this.app, activeFile)) {
            return true;
        }
        // check manual ignore
        if (this.settings.ignoredFiles[path] !== undefined) {
            return true;
        }
        // check regex
        try {
            if (this.settings.ignoreRegex === '') {
                return;
            }
            var reg = new RegExp(this.settings.ignoreRegex);
            return reg.exec(path) !== null;
        }
        catch (_a) { }
        return false;
    };
    /**
     * Renames the file with the first heading found
     *
     * @param      {TAbstractFile}  file    The file
     */
    FilenameHeadingSyncPlugin.prototype.handleSyncHeadingToFile = function (file) {
        var _this = this;
        if (!(file instanceof obsidian.TFile)) {
            return;
        }
        if (file.extension !== 'md') {
            // just bail
            return;
        }
        // if currently opened file is not the same as the one that fired the event, skip
        // this is to make sure other events don't trigger this plugin
        if (this.app.workspace.getActiveFile() !== file) {
            return;
        }
        // if ignored, just bail
        if (this.fileIsIgnored(file, file.path)) {
            return;
        }
        this.app.vault.read(file).then(function (data) {
            var lines = data.split('\n');
            var start = _this.findNoteStart(lines);
            var heading = _this.findHeading(lines, start);
            if (heading === null)
                return; // no heading found, nothing to do here
            var sanitizedHeading = _this.sanitizeHeading(heading.text);
            if (sanitizedHeading.length > 0 &&
                _this.sanitizeHeading(file.basename) !== sanitizedHeading) {
                var newPath = file.parent.path + "/" + sanitizedHeading + ".md";
                _this.app.fileManager.renameFile(file, newPath);
            }
        });
    };
    /**
     * Syncs the current filename to the first heading
     * Finds the first heading of the file, then replaces it with the filename
     *
     * @param      {TAbstractFile}  file     The file that fired the event
     * @param      {string}         oldPath  The old path
     */
    FilenameHeadingSyncPlugin.prototype.handleSyncFilenameToHeading = function (file, oldPath) {
        var _this = this;
        if (!(file instanceof obsidian.TFile)) {
            return;
        }
        if (file.extension !== 'md') {
            // just bail
            return;
        }
        // if oldpath is ignored, hook in and update the new filepath to be ignored instead
        if (this.fileIsIgnored(file, oldPath.trim())) {
            // if filename didn't change, just bail, nothing to do here
            if (file.path === oldPath) {
                return;
            }
            // If filepath changed and the file was in the ignore list before,
            // remove it from the list and add the new one instead
            if (this.settings.ignoredFiles[oldPath]) {
                delete this.settings.ignoredFiles[oldPath];
                this.settings.ignoredFiles[file.path] = null;
                this.saveSettings();
            }
            return;
        }
        var sanitizedHeading = this.sanitizeHeading(file.basename);
        this.app.vault.read(file).then(function (data) {
            var lines = data.split('\n');
            var start = _this.findNoteStart(lines);
            var heading = _this.findHeading(lines, start);
            if (heading !== null) {
                if (_this.sanitizeHeading(heading.text) !== sanitizedHeading) {
                    _this.replaceLineInFile(file, lines, heading.lineNumber, "# " + sanitizedHeading);
                }
            }
            else
                _this.insertLineInFile(file, lines, start, "# " + sanitizedHeading);
        });
    };
    /**
     * Finds the start of the note file, excluding frontmatter
     *
     * @param {string[]} fileLines array of the file's contents, line by line
     * @returns {number} zero-based index of the starting line of the note
     */
    FilenameHeadingSyncPlugin.prototype.findNoteStart = function (fileLines) {
        // check for frontmatter by checking if first line is a divider ('---')
        if (fileLines[0] === '---') {
            // find end of frontmatter
            // if no end is found, then it isn't really frontmatter and function will end up returning 0
            for (var i = 1; i < fileLines.length; i++) {
                if (fileLines[i] === '---') {
                    // end of frontmatter found, next line is start of note
                    return i + 1;
                }
            }
        }
        return 0;
    };
    /**
     * Finds the first heading of the note file
     *
     * @param {string[]} fileLines array of the file's contents, line by line
     * @param {number} startLine zero-based index of the starting line of the note
     * @returns {LinePointer | null} LinePointer to heading or null if no heading found
     */
    FilenameHeadingSyncPlugin.prototype.findHeading = function (fileLines, startLine) {
        for (var i = startLine; i < fileLines.length; i++) {
            if (fileLines[i].startsWith('# ')) {
                return {
                    lineNumber: i,
                    text: fileLines[i].substring(2),
                };
            }
        }
        return null; // no heading found
    };
    FilenameHeadingSyncPlugin.prototype.sanitizeHeading = function (text) {
        // stockIllegalSymbols is a regExp object, but userIllegalSymbols is a list of strings and therefore they are handled separately.
        text = text.replace(stockIllegalSymbols, '');
        this.settings.userIllegalSymbols.forEach(function (symbol) {
            text = text.replace(symbol, '');
        });
        return text.trim();
    };
    /**
     * Modifies the file by replacing a particular line with new text.
     *
     * The function will add a newline character at the end of the replaced line.
     *
     * If the `lineNumber` parameter is higher than the index of the last line of the file
     * the function will add a newline character to the current last line and append a new
     * line at the end of the file with the new text (essentially a new last line).
     *
     * @param {TFile} file the file to modify
     * @param {string[]} fileLines array of the file's contents, line by line
     * @param {number} lineNumber zero-based index of the line to replace
     * @param {string} text the new text
     */
    FilenameHeadingSyncPlugin.prototype.replaceLineInFile = function (file, fileLines, lineNumber, text) {
        if (lineNumber >= fileLines.length) {
            fileLines.push(text + '\n');
        }
        else {
            fileLines[lineNumber] = text;
        }
        var data = fileLines.join('\n');
        this.app.vault.modify(file, data);
    };
    /**
     * Modifies the file by inserting a line with specified text.
     *
     * The function will add a newline character at the end of the inserted line.
     *
     * @param {TFile} file the file to modify
     * @param {string[]} fileLines array of the file's contents, line by line
     * @param {number} lineNumber zero-based index of where the line should be inserted
     * @param {string} text the text that the line shall contain
     */
    FilenameHeadingSyncPlugin.prototype.insertLineInFile = function (file, fileLines, lineNumber, text) {
        if (lineNumber >= fileLines.length) {
            fileLines.push(text + '\n');
        }
        else {
            fileLines.splice(lineNumber, 0, text);
        }
        var data = fileLines.join('\n');
        this.app.vault.modify(file, data);
    };
    FilenameHeadingSyncPlugin.prototype.loadSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = this;
                        _c = (_b = Object).assign;
                        _d = [{}, DEFAULT_SETTINGS];
                        return [4 /*yield*/, this.loadData()];
                    case 1:
                        _a.settings = _c.apply(_b, _d.concat([_e.sent()]));
                        return [2 /*return*/];
                }
            });
        });
    };
    FilenameHeadingSyncPlugin.prototype.saveSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.saveData(this.settings)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return FilenameHeadingSyncPlugin;
}(obsidian.Plugin));
var FilenameHeadingSyncSettingTab = /** @class */ (function (_super) {
    __extends(FilenameHeadingSyncSettingTab, _super);
    function FilenameHeadingSyncSettingTab(app, plugin) {
        var _this = _super.call(this, app, plugin) || this;
        _this.plugin = plugin;
        _this.app = app;
        return _this;
    }
    FilenameHeadingSyncSettingTab.prototype.display = function () {
        var _this = this;
        var containerEl = this.containerEl;
        var regexIgnoredFilesDiv;
        var renderRegexIgnoredFiles = function (div) {
            // empty existing div
            div.innerHTML = '';
            if (_this.plugin.settings.ignoreRegex === '') {
                return;
            }
            try {
                var files = _this.app.vault.getFiles();
                var reg_1 = new RegExp(_this.plugin.settings.ignoreRegex);
                files
                    .filter(function (file) { return reg_1.exec(file.path) !== null; })
                    .forEach(function (el) {
                    new obsidian.Setting(div).setDesc(el.path);
                });
            }
            catch (e) {
                return;
            }
        };
        containerEl.empty();
        containerEl.createEl('h2', { text: 'Filename Heading Sync' });
        containerEl.createEl('p', {
            text: 'This plugin will overwrite the first heading found in a file with the filename.',
        });
        containerEl.createEl('p', {
            text: 'If no header is found, will insert a new one at the first line (after frontmatter).',
        });
        new obsidian.Setting(containerEl)
            .setName('Custom Illegal Charaters/Strings')
            .setDesc('Type charaters/strings seperated by a comma. This input is space sensitive.')
            .addText(function (text) {
            return text
                .setPlaceholder('[],#,...')
                .setValue(_this.plugin.settings.userIllegalSymbols.join())
                .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.plugin.settings.userIllegalSymbols = value.split(',');
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        new obsidian.Setting(containerEl)
            .setName('Ignore Regex Rule')
            .setDesc('Ignore rule in RegEx format. All files listed below will get ignored by this plugin.')
            .addText(function (text) {
            return text
                .setPlaceholder('MyFolder/.*')
                .setValue(_this.plugin.settings.ignoreRegex)
                .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            try {
                                new RegExp(value);
                                this.plugin.settings.ignoreRegex = value;
                            }
                            catch (_b) {
                                this.plugin.settings.ignoreRegex = '';
                            }
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            renderRegexIgnoredFiles(regexIgnoredFilesDiv);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        new obsidian.Setting(containerEl)
            .setName('Use File Open Hook')
            .setDesc('Whether this plugin should trigger when a file is opened, and not just on save. Disable this when you notice conflicts with other plugins that also act on file open.')
            .addToggle(function (toggle) {
            return toggle
                .setValue(_this.plugin.settings.useFileOpenHook)
                .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.plugin.settings.useFileOpenHook = value;
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        containerEl.createEl('h2', { text: 'Ignored Files By Regex' });
        containerEl.createEl('p', {
            text: 'All files matching the above RegEx will get listed here',
        });
        regexIgnoredFilesDiv = containerEl.createDiv('test');
        renderRegexIgnoredFiles(regexIgnoredFilesDiv);
        containerEl.createEl('h2', { text: 'Manually Ignored Files' });
        containerEl.createEl('p', {
            text: 'You can ignore files from this plugin by using the "ignore this file" command',
        });
        var _loop_1 = function (key) {
            var ignoredFilesSettingsObj = new obsidian.Setting(containerEl).setDesc(key);
            ignoredFilesSettingsObj.addButton(function (button) {
                button.setButtonText('Delete').onClick(function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                delete this.plugin.settings.ignoredFiles[key];
                                return [4 /*yield*/, this.plugin.saveSettings()];
                            case 1:
                                _a.sent();
                                this.display();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        };
        // go over all ignored files and add them
        for (var key in this.plugin.settings.ignoredFiles) {
            _loop_1(key);
        }
    };
    return FilenameHeadingSyncSettingTab;
}(obsidian.PluginSettingTab));

module.exports = FilenameHeadingSyncPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsImV4Y2x1c2lvbnMudHMiLCJtYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fY3JlYXRlQmluZGluZyA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfSk7XHJcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgb1trMl0gPSBtW2tdO1xyXG59KTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgbykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBwKSkgX19jcmVhdGVCaW5kaW5nKG8sIG0sIHApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5KHRvLCBmcm9tLCBwYWNrKSB7XHJcbiAgICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcclxuICAgICAgICAgICAgaWYgKCFhcikgYXIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tLCAwLCBpKTtcclxuICAgICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0by5jb25jYXQoYXIgfHwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XHJcbn0pIDogZnVuY3Rpb24obywgdikge1xyXG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XHJcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHJlY2VpdmVyLCBzdGF0ZSwga2luZCwgZikge1xyXG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgZ2V0dGVyXCIpO1xyXG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgcmVhZCBwcml2YXRlIG1lbWJlciBmcm9tIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4ga2luZCA9PT0gXCJtXCIgPyBmIDoga2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIpIDogZiA/IGYudmFsdWUgOiBzdGF0ZS5nZXQocmVjZWl2ZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgc3RhdGUsIHZhbHVlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJtXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIG1ldGhvZCBpcyBub3Qgd3JpdGFibGVcIik7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBzZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB3cml0ZSBwcml2YXRlIG1lbWJlciB0byBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xyXG4gICAgcmV0dXJuIChraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlciwgdmFsdWUpIDogZiA/IGYudmFsdWUgPSB2YWx1ZSA6IHN0YXRlLnNldChyZWNlaXZlciwgdmFsdWUpKSwgdmFsdWU7XHJcbn1cclxuIiwiaW1wb3J0IHsgQXBwLCBURmlsZSB9IGZyb20gJ29ic2lkaWFuJztcblxuZXhwb3J0IGZ1bmN0aW9uIGlzRXhjYWxpZHJhdyhhcHA6IEFwcCwgZjogVEZpbGUpIHtcbiAgaWYgKGYuZXh0ZW5zaW9uID09PSAnZXhjYWxpZHJhdycgfHwgLy4qXFwuZXhjYWxpZHJhd1xcLm1kJC9nLnRlc3QoZi5wYXRoKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGNvbnN0IGZpbGVDYWNoZSA9IGFwcC5tZXRhZGF0YUNhY2hlLmdldEZpbGVDYWNoZShmKTtcbiAgcmV0dXJuIChcbiAgICAhIWZpbGVDYWNoZT8uZnJvbnRtYXR0ZXIgJiYgISFmaWxlQ2FjaGUuZnJvbnRtYXR0ZXJbJ2V4Y2FsaWRyYXctcGx1Z2luJ11cbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRXhjbHVkZWQoYXBwOiBBcHAsIGY6IFRGaWxlKSB7XG4gIGlmIChpc0V4Y2FsaWRyYXcoYXBwLCBmKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuIiwiaW1wb3J0IHtcbiAgQXBwLFxuICBQbHVnaW4sXG4gIFBsdWdpblNldHRpbmdUYWIsXG4gIFNldHRpbmcsXG4gIFRBYnN0cmFjdEZpbGUsXG4gIFRGaWxlLFxufSBmcm9tICdvYnNpZGlhbic7XG5pbXBvcnQgeyBpc0V4Y2x1ZGVkIH0gZnJvbSAnLi9leGNsdXNpb25zJztcblxuY29uc3Qgc3RvY2tJbGxlZ2FsU3ltYm9scyA9IC9bXFxcXC86fCNeW1xcXV0vZztcblxuaW50ZXJmYWNlIExpbmVQb2ludGVyIHtcbiAgbGluZU51bWJlcjogbnVtYmVyO1xuICB0ZXh0OiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBGaWxlbmFtZUhlYWRpbmdTeW5jUGx1Z2luU2V0dGluZ3Mge1xuICB1c2VySWxsZWdhbFN5bWJvbHM6IHN0cmluZ1tdO1xuICBpZ25vcmVSZWdleDogc3RyaW5nO1xuICBpZ25vcmVkRmlsZXM6IHsgW2tleTogc3RyaW5nXTogbnVsbCB9O1xuICB1c2VGaWxlT3Blbkhvb2s6IGJvb2xlYW47XG59XG5cbmNvbnN0IERFRkFVTFRfU0VUVElOR1M6IEZpbGVuYW1lSGVhZGluZ1N5bmNQbHVnaW5TZXR0aW5ncyA9IHtcbiAgdXNlcklsbGVnYWxTeW1ib2xzOiBbXSxcbiAgaWdub3JlZEZpbGVzOiB7fSxcbiAgaWdub3JlUmVnZXg6ICcnLFxuICB1c2VGaWxlT3Blbkhvb2s6IHRydWUsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGaWxlbmFtZUhlYWRpbmdTeW5jUGx1Z2luIGV4dGVuZHMgUGx1Z2luIHtcbiAgc2V0dGluZ3M6IEZpbGVuYW1lSGVhZGluZ1N5bmNQbHVnaW5TZXR0aW5ncztcblxuICBhc3luYyBvbmxvYWQoKSB7XG4gICAgYXdhaXQgdGhpcy5sb2FkU2V0dGluZ3MoKTtcblxuICAgIHRoaXMucmVnaXN0ZXJFdmVudChcbiAgICAgIHRoaXMuYXBwLnZhdWx0Lm9uKCdyZW5hbWUnLCAoZmlsZSwgb2xkUGF0aCkgPT5cbiAgICAgICAgdGhpcy5oYW5kbGVTeW5jRmlsZW5hbWVUb0hlYWRpbmcoZmlsZSwgb2xkUGF0aCksXG4gICAgICApLFxuICAgICk7XG4gICAgdGhpcy5yZWdpc3RlckV2ZW50KFxuICAgICAgdGhpcy5hcHAudmF1bHQub24oJ21vZGlmeScsIChmaWxlKSA9PiB0aGlzLmhhbmRsZVN5bmNIZWFkaW5nVG9GaWxlKGZpbGUpKSxcbiAgICApO1xuXG4gICAgdGhpcy5yZWdpc3RlckV2ZW50KFxuICAgICAgdGhpcy5hcHAud29ya3NwYWNlLm9uKCdmaWxlLW9wZW4nLCAoZmlsZSkgPT4ge1xuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy51c2VGaWxlT3Blbkhvb2spIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVTeW5jRmlsZW5hbWVUb0hlYWRpbmcoZmlsZSwgZmlsZS5wYXRoKTtcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgKTtcblxuICAgIHRoaXMuYWRkU2V0dGluZ1RhYihuZXcgRmlsZW5hbWVIZWFkaW5nU3luY1NldHRpbmdUYWIodGhpcy5hcHAsIHRoaXMpKTtcblxuICAgIHRoaXMuYWRkQ29tbWFuZCh7XG4gICAgICBpZDogJ3BhZ2UtaGVhZGluZy1zeW5jLWlnbm9yZS1maWxlJyxcbiAgICAgIG5hbWU6ICdJZ25vcmUgY3VycmVudCBmaWxlJyxcbiAgICAgIGNoZWNrQ2FsbGJhY2s6IChjaGVja2luZzogYm9vbGVhbikgPT4ge1xuICAgICAgICBsZXQgbGVhZiA9IHRoaXMuYXBwLndvcmtzcGFjZS5hY3RpdmVMZWFmO1xuICAgICAgICBpZiAobGVhZikge1xuICAgICAgICAgIGlmICghY2hlY2tpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MuaWdub3JlZEZpbGVzW1xuICAgICAgICAgICAgICB0aGlzLmFwcC53b3Jrc3BhY2UuZ2V0QWN0aXZlRmlsZSgpLnBhdGhcbiAgICAgICAgICAgIF0gPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIGZpbGVJc0lnbm9yZWQoYWN0aXZlRmlsZTogVEZpbGUsIHBhdGg6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIC8vIGNoZWNrIGV4Y2x1c2lvbnNcbiAgICBpZiAoaXNFeGNsdWRlZCh0aGlzLmFwcCwgYWN0aXZlRmlsZSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIGNoZWNrIG1hbnVhbCBpZ25vcmVcbiAgICBpZiAodGhpcy5zZXR0aW5ncy5pZ25vcmVkRmlsZXNbcGF0aF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gY2hlY2sgcmVnZXhcbiAgICB0cnkge1xuICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuaWdub3JlUmVnZXggPT09ICcnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVnID0gbmV3IFJlZ0V4cCh0aGlzLnNldHRpbmdzLmlnbm9yZVJlZ2V4KTtcbiAgICAgIHJldHVybiByZWcuZXhlYyhwYXRoKSAhPT0gbnVsbDtcbiAgICB9IGNhdGNoIHt9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogUmVuYW1lcyB0aGUgZmlsZSB3aXRoIHRoZSBmaXJzdCBoZWFkaW5nIGZvdW5kXG4gICAqXG4gICAqIEBwYXJhbSAgICAgIHtUQWJzdHJhY3RGaWxlfSAgZmlsZSAgICBUaGUgZmlsZVxuICAgKi9cbiAgaGFuZGxlU3luY0hlYWRpbmdUb0ZpbGUoZmlsZTogVEFic3RyYWN0RmlsZSkge1xuICAgIGlmICghKGZpbGUgaW5zdGFuY2VvZiBURmlsZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZmlsZS5leHRlbnNpb24gIT09ICdtZCcpIHtcbiAgICAgIC8vIGp1c3QgYmFpbFxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGlmIGN1cnJlbnRseSBvcGVuZWQgZmlsZSBpcyBub3QgdGhlIHNhbWUgYXMgdGhlIG9uZSB0aGF0IGZpcmVkIHRoZSBldmVudCwgc2tpcFxuICAgIC8vIHRoaXMgaXMgdG8gbWFrZSBzdXJlIG90aGVyIGV2ZW50cyBkb24ndCB0cmlnZ2VyIHRoaXMgcGx1Z2luXG4gICAgaWYgKHRoaXMuYXBwLndvcmtzcGFjZS5nZXRBY3RpdmVGaWxlKCkgIT09IGZpbGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBpZiBpZ25vcmVkLCBqdXN0IGJhaWxcbiAgICBpZiAodGhpcy5maWxlSXNJZ25vcmVkKGZpbGUsIGZpbGUucGF0aCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmFwcC52YXVsdC5yZWFkKGZpbGUpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIGNvbnN0IGxpbmVzID0gZGF0YS5zcGxpdCgnXFxuJyk7XG4gICAgICBjb25zdCBzdGFydCA9IHRoaXMuZmluZE5vdGVTdGFydChsaW5lcyk7XG4gICAgICBjb25zdCBoZWFkaW5nID0gdGhpcy5maW5kSGVhZGluZyhsaW5lcywgc3RhcnQpO1xuXG4gICAgICBpZiAoaGVhZGluZyA9PT0gbnVsbCkgcmV0dXJuOyAvLyBubyBoZWFkaW5nIGZvdW5kLCBub3RoaW5nIHRvIGRvIGhlcmVcblxuICAgICAgY29uc3Qgc2FuaXRpemVkSGVhZGluZyA9IHRoaXMuc2FuaXRpemVIZWFkaW5nKGhlYWRpbmcudGV4dCk7XG4gICAgICBpZiAoXG4gICAgICAgIHNhbml0aXplZEhlYWRpbmcubGVuZ3RoID4gMCAmJlxuICAgICAgICB0aGlzLnNhbml0aXplSGVhZGluZyhmaWxlLmJhc2VuYW1lKSAhPT0gc2FuaXRpemVkSGVhZGluZ1xuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IG5ld1BhdGggPSBgJHtmaWxlLnBhcmVudC5wYXRofS8ke3Nhbml0aXplZEhlYWRpbmd9Lm1kYDtcbiAgICAgICAgdGhpcy5hcHAuZmlsZU1hbmFnZXIucmVuYW1lRmlsZShmaWxlLCBuZXdQYXRoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTeW5jcyB0aGUgY3VycmVudCBmaWxlbmFtZSB0byB0aGUgZmlyc3QgaGVhZGluZ1xuICAgKiBGaW5kcyB0aGUgZmlyc3QgaGVhZGluZyBvZiB0aGUgZmlsZSwgdGhlbiByZXBsYWNlcyBpdCB3aXRoIHRoZSBmaWxlbmFtZVxuICAgKlxuICAgKiBAcGFyYW0gICAgICB7VEFic3RyYWN0RmlsZX0gIGZpbGUgICAgIFRoZSBmaWxlIHRoYXQgZmlyZWQgdGhlIGV2ZW50XG4gICAqIEBwYXJhbSAgICAgIHtzdHJpbmd9ICAgICAgICAgb2xkUGF0aCAgVGhlIG9sZCBwYXRoXG4gICAqL1xuICBoYW5kbGVTeW5jRmlsZW5hbWVUb0hlYWRpbmcoZmlsZTogVEFic3RyYWN0RmlsZSwgb2xkUGF0aDogc3RyaW5nKSB7XG4gICAgaWYgKCEoZmlsZSBpbnN0YW5jZW9mIFRGaWxlKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChmaWxlLmV4dGVuc2lvbiAhPT0gJ21kJykge1xuICAgICAgLy8ganVzdCBiYWlsXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gaWYgb2xkcGF0aCBpcyBpZ25vcmVkLCBob29rIGluIGFuZCB1cGRhdGUgdGhlIG5ldyBmaWxlcGF0aCB0byBiZSBpZ25vcmVkIGluc3RlYWRcbiAgICBpZiAodGhpcy5maWxlSXNJZ25vcmVkKGZpbGUsIG9sZFBhdGgudHJpbSgpKSkge1xuICAgICAgLy8gaWYgZmlsZW5hbWUgZGlkbid0IGNoYW5nZSwganVzdCBiYWlsLCBub3RoaW5nIHRvIGRvIGhlcmVcbiAgICAgIGlmIChmaWxlLnBhdGggPT09IG9sZFBhdGgpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBJZiBmaWxlcGF0aCBjaGFuZ2VkIGFuZCB0aGUgZmlsZSB3YXMgaW4gdGhlIGlnbm9yZSBsaXN0IGJlZm9yZSxcbiAgICAgIC8vIHJlbW92ZSBpdCBmcm9tIHRoZSBsaXN0IGFuZCBhZGQgdGhlIG5ldyBvbmUgaW5zdGVhZFxuICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuaWdub3JlZEZpbGVzW29sZFBhdGhdKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLnNldHRpbmdzLmlnbm9yZWRGaWxlc1tvbGRQYXRoXTtcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5pZ25vcmVkRmlsZXNbZmlsZS5wYXRoXSA9IG51bGw7XG4gICAgICAgIHRoaXMuc2F2ZVNldHRpbmdzKCk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc2FuaXRpemVkSGVhZGluZyA9IHRoaXMuc2FuaXRpemVIZWFkaW5nKGZpbGUuYmFzZW5hbWUpO1xuICAgIHRoaXMuYXBwLnZhdWx0LnJlYWQoZmlsZSkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgY29uc3QgbGluZXMgPSBkYXRhLnNwbGl0KCdcXG4nKTtcbiAgICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy5maW5kTm90ZVN0YXJ0KGxpbmVzKTtcbiAgICAgIGNvbnN0IGhlYWRpbmcgPSB0aGlzLmZpbmRIZWFkaW5nKGxpbmVzLCBzdGFydCk7XG5cbiAgICAgIGlmIChoZWFkaW5nICE9PSBudWxsKSB7XG4gICAgICAgIGlmICh0aGlzLnNhbml0aXplSGVhZGluZyhoZWFkaW5nLnRleHQpICE9PSBzYW5pdGl6ZWRIZWFkaW5nKSB7XG4gICAgICAgICAgdGhpcy5yZXBsYWNlTGluZUluRmlsZShcbiAgICAgICAgICAgIGZpbGUsXG4gICAgICAgICAgICBsaW5lcyxcbiAgICAgICAgICAgIGhlYWRpbmcubGluZU51bWJlcixcbiAgICAgICAgICAgIGAjICR7c2FuaXRpemVkSGVhZGluZ31gLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB0aGlzLmluc2VydExpbmVJbkZpbGUoZmlsZSwgbGluZXMsIHN0YXJ0LCBgIyAke3Nhbml0aXplZEhlYWRpbmd9YCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRmluZHMgdGhlIHN0YXJ0IG9mIHRoZSBub3RlIGZpbGUsIGV4Y2x1ZGluZyBmcm9udG1hdHRlclxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBmaWxlTGluZXMgYXJyYXkgb2YgdGhlIGZpbGUncyBjb250ZW50cywgbGluZSBieSBsaW5lXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IHplcm8tYmFzZWQgaW5kZXggb2YgdGhlIHN0YXJ0aW5nIGxpbmUgb2YgdGhlIG5vdGVcbiAgICovXG4gIGZpbmROb3RlU3RhcnQoZmlsZUxpbmVzOiBzdHJpbmdbXSkge1xuICAgIC8vIGNoZWNrIGZvciBmcm9udG1hdHRlciBieSBjaGVja2luZyBpZiBmaXJzdCBsaW5lIGlzIGEgZGl2aWRlciAoJy0tLScpXG4gICAgaWYgKGZpbGVMaW5lc1swXSA9PT0gJy0tLScpIHtcbiAgICAgIC8vIGZpbmQgZW5kIG9mIGZyb250bWF0dGVyXG4gICAgICAvLyBpZiBubyBlbmQgaXMgZm91bmQsIHRoZW4gaXQgaXNuJ3QgcmVhbGx5IGZyb250bWF0dGVyIGFuZCBmdW5jdGlvbiB3aWxsIGVuZCB1cCByZXR1cm5pbmcgMFxuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBmaWxlTGluZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGZpbGVMaW5lc1tpXSA9PT0gJy0tLScpIHtcbiAgICAgICAgICAvLyBlbmQgb2YgZnJvbnRtYXR0ZXIgZm91bmQsIG5leHQgbGluZSBpcyBzdGFydCBvZiBub3RlXG4gICAgICAgICAgcmV0dXJuIGkgKyAxO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAwO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmRzIHRoZSBmaXJzdCBoZWFkaW5nIG9mIHRoZSBub3RlIGZpbGVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmdbXX0gZmlsZUxpbmVzIGFycmF5IG9mIHRoZSBmaWxlJ3MgY29udGVudHMsIGxpbmUgYnkgbGluZVxuICAgKiBAcGFyYW0ge251bWJlcn0gc3RhcnRMaW5lIHplcm8tYmFzZWQgaW5kZXggb2YgdGhlIHN0YXJ0aW5nIGxpbmUgb2YgdGhlIG5vdGVcbiAgICogQHJldHVybnMge0xpbmVQb2ludGVyIHwgbnVsbH0gTGluZVBvaW50ZXIgdG8gaGVhZGluZyBvciBudWxsIGlmIG5vIGhlYWRpbmcgZm91bmRcbiAgICovXG4gIGZpbmRIZWFkaW5nKGZpbGVMaW5lczogc3RyaW5nW10sIHN0YXJ0TGluZTogbnVtYmVyKTogTGluZVBvaW50ZXIgfCBudWxsIHtcbiAgICBmb3IgKGxldCBpID0gc3RhcnRMaW5lOyBpIDwgZmlsZUxpbmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoZmlsZUxpbmVzW2ldLnN0YXJ0c1dpdGgoJyMgJykpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBsaW5lTnVtYmVyOiBpLFxuICAgICAgICAgIHRleHQ6IGZpbGVMaW5lc1tpXS5zdWJzdHJpbmcoMiksXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsOyAvLyBubyBoZWFkaW5nIGZvdW5kXG4gIH1cblxuICBzYW5pdGl6ZUhlYWRpbmcodGV4dDogc3RyaW5nKSB7XG4gICAgLy8gc3RvY2tJbGxlZ2FsU3ltYm9scyBpcyBhIHJlZ0V4cCBvYmplY3QsIGJ1dCB1c2VySWxsZWdhbFN5bWJvbHMgaXMgYSBsaXN0IG9mIHN0cmluZ3MgYW5kIHRoZXJlZm9yZSB0aGV5IGFyZSBoYW5kbGVkIHNlcGFyYXRlbHkuXG4gICAgdGV4dCA9IHRleHQucmVwbGFjZShzdG9ja0lsbGVnYWxTeW1ib2xzLCAnJyk7XG4gICAgdGhpcy5zZXR0aW5ncy51c2VySWxsZWdhbFN5bWJvbHMuZm9yRWFjaCgoc3ltYm9sKSA9PiB7XG4gICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKHN5bWJvbCwgJycpO1xuICAgIH0pO1xuICAgIHJldHVybiB0ZXh0LnRyaW0oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNb2RpZmllcyB0aGUgZmlsZSBieSByZXBsYWNpbmcgYSBwYXJ0aWN1bGFyIGxpbmUgd2l0aCBuZXcgdGV4dC5cbiAgICpcbiAgICogVGhlIGZ1bmN0aW9uIHdpbGwgYWRkIGEgbmV3bGluZSBjaGFyYWN0ZXIgYXQgdGhlIGVuZCBvZiB0aGUgcmVwbGFjZWQgbGluZS5cbiAgICpcbiAgICogSWYgdGhlIGBsaW5lTnVtYmVyYCBwYXJhbWV0ZXIgaXMgaGlnaGVyIHRoYW4gdGhlIGluZGV4IG9mIHRoZSBsYXN0IGxpbmUgb2YgdGhlIGZpbGVcbiAgICogdGhlIGZ1bmN0aW9uIHdpbGwgYWRkIGEgbmV3bGluZSBjaGFyYWN0ZXIgdG8gdGhlIGN1cnJlbnQgbGFzdCBsaW5lIGFuZCBhcHBlbmQgYSBuZXdcbiAgICogbGluZSBhdCB0aGUgZW5kIG9mIHRoZSBmaWxlIHdpdGggdGhlIG5ldyB0ZXh0IChlc3NlbnRpYWxseSBhIG5ldyBsYXN0IGxpbmUpLlxuICAgKlxuICAgKiBAcGFyYW0ge1RGaWxlfSBmaWxlIHRoZSBmaWxlIHRvIG1vZGlmeVxuICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBmaWxlTGluZXMgYXJyYXkgb2YgdGhlIGZpbGUncyBjb250ZW50cywgbGluZSBieSBsaW5lXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBsaW5lTnVtYmVyIHplcm8tYmFzZWQgaW5kZXggb2YgdGhlIGxpbmUgdG8gcmVwbGFjZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCB0aGUgbmV3IHRleHRcbiAgICovXG4gIHJlcGxhY2VMaW5lSW5GaWxlKFxuICAgIGZpbGU6IFRGaWxlLFxuICAgIGZpbGVMaW5lczogc3RyaW5nW10sXG4gICAgbGluZU51bWJlcjogbnVtYmVyLFxuICAgIHRleHQ6IHN0cmluZyxcbiAgKSB7XG4gICAgaWYgKGxpbmVOdW1iZXIgPj0gZmlsZUxpbmVzLmxlbmd0aCkge1xuICAgICAgZmlsZUxpbmVzLnB1c2godGV4dCArICdcXG4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmlsZUxpbmVzW2xpbmVOdW1iZXJdID0gdGV4dDtcbiAgICB9XG4gICAgY29uc3QgZGF0YSA9IGZpbGVMaW5lcy5qb2luKCdcXG4nKTtcbiAgICB0aGlzLmFwcC52YXVsdC5tb2RpZnkoZmlsZSwgZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogTW9kaWZpZXMgdGhlIGZpbGUgYnkgaW5zZXJ0aW5nIGEgbGluZSB3aXRoIHNwZWNpZmllZCB0ZXh0LlxuICAgKlxuICAgKiBUaGUgZnVuY3Rpb24gd2lsbCBhZGQgYSBuZXdsaW5lIGNoYXJhY3RlciBhdCB0aGUgZW5kIG9mIHRoZSBpbnNlcnRlZCBsaW5lLlxuICAgKlxuICAgKiBAcGFyYW0ge1RGaWxlfSBmaWxlIHRoZSBmaWxlIHRvIG1vZGlmeVxuICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBmaWxlTGluZXMgYXJyYXkgb2YgdGhlIGZpbGUncyBjb250ZW50cywgbGluZSBieSBsaW5lXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBsaW5lTnVtYmVyIHplcm8tYmFzZWQgaW5kZXggb2Ygd2hlcmUgdGhlIGxpbmUgc2hvdWxkIGJlIGluc2VydGVkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IHRoZSB0ZXh0IHRoYXQgdGhlIGxpbmUgc2hhbGwgY29udGFpblxuICAgKi9cbiAgaW5zZXJ0TGluZUluRmlsZShcbiAgICBmaWxlOiBURmlsZSxcbiAgICBmaWxlTGluZXM6IHN0cmluZ1tdLFxuICAgIGxpbmVOdW1iZXI6IG51bWJlcixcbiAgICB0ZXh0OiBzdHJpbmcsXG4gICkge1xuICAgIGlmIChsaW5lTnVtYmVyID49IGZpbGVMaW5lcy5sZW5ndGgpIHtcbiAgICAgIGZpbGVMaW5lcy5wdXNoKHRleHQgKyAnXFxuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpbGVMaW5lcy5zcGxpY2UobGluZU51bWJlciwgMCwgdGV4dCk7XG4gICAgfVxuICAgIGNvbnN0IGRhdGEgPSBmaWxlTGluZXMuam9pbignXFxuJyk7XG4gICAgdGhpcy5hcHAudmF1bHQubW9kaWZ5KGZpbGUsIGRhdGEpO1xuICB9XG5cbiAgYXN5bmMgbG9hZFNldHRpbmdzKCkge1xuICAgIHRoaXMuc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUX1NFVFRJTkdTLCBhd2FpdCB0aGlzLmxvYWREYXRhKCkpO1xuICB9XG5cbiAgYXN5bmMgc2F2ZVNldHRpbmdzKCkge1xuICAgIGF3YWl0IHRoaXMuc2F2ZURhdGEodGhpcy5zZXR0aW5ncyk7XG4gIH1cbn1cblxuY2xhc3MgRmlsZW5hbWVIZWFkaW5nU3luY1NldHRpbmdUYWIgZXh0ZW5kcyBQbHVnaW5TZXR0aW5nVGFiIHtcbiAgcGx1Z2luOiBGaWxlbmFtZUhlYWRpbmdTeW5jUGx1Z2luO1xuICBhcHA6IEFwcDtcblxuICBjb25zdHJ1Y3RvcihhcHA6IEFwcCwgcGx1Z2luOiBGaWxlbmFtZUhlYWRpbmdTeW5jUGx1Z2luKSB7XG4gICAgc3VwZXIoYXBwLCBwbHVnaW4pO1xuICAgIHRoaXMucGx1Z2luID0gcGx1Z2luO1xuICAgIHRoaXMuYXBwID0gYXBwO1xuICB9XG5cbiAgZGlzcGxheSgpOiB2b2lkIHtcbiAgICBsZXQgeyBjb250YWluZXJFbCB9ID0gdGhpcztcbiAgICBsZXQgcmVnZXhJZ25vcmVkRmlsZXNEaXY6IEhUTUxEaXZFbGVtZW50O1xuXG4gICAgY29uc3QgcmVuZGVyUmVnZXhJZ25vcmVkRmlsZXMgPSAoZGl2OiBIVE1MRWxlbWVudCkgPT4ge1xuICAgICAgLy8gZW1wdHkgZXhpc3RpbmcgZGl2XG4gICAgICBkaXYuaW5uZXJIVE1MID0gJyc7XG5cbiAgICAgIGlmICh0aGlzLnBsdWdpbi5zZXR0aW5ncy5pZ25vcmVSZWdleCA9PT0gJycpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBmaWxlcyA9IHRoaXMuYXBwLnZhdWx0LmdldEZpbGVzKCk7XG4gICAgICAgIGNvbnN0IHJlZyA9IG5ldyBSZWdFeHAodGhpcy5wbHVnaW4uc2V0dGluZ3MuaWdub3JlUmVnZXgpO1xuXG4gICAgICAgIGZpbGVzXG4gICAgICAgICAgLmZpbHRlcigoZmlsZSkgPT4gcmVnLmV4ZWMoZmlsZS5wYXRoKSAhPT0gbnVsbClcbiAgICAgICAgICAuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgICAgICAgIG5ldyBTZXR0aW5nKGRpdikuc2V0RGVzYyhlbC5wYXRoKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb250YWluZXJFbC5lbXB0eSgpO1xuXG4gICAgY29udGFpbmVyRWwuY3JlYXRlRWwoJ2gyJywgeyB0ZXh0OiAnRmlsZW5hbWUgSGVhZGluZyBTeW5jJyB9KTtcbiAgICBjb250YWluZXJFbC5jcmVhdGVFbCgncCcsIHtcbiAgICAgIHRleHQ6XG4gICAgICAgICdUaGlzIHBsdWdpbiB3aWxsIG92ZXJ3cml0ZSB0aGUgZmlyc3QgaGVhZGluZyBmb3VuZCBpbiBhIGZpbGUgd2l0aCB0aGUgZmlsZW5hbWUuJyxcbiAgICB9KTtcbiAgICBjb250YWluZXJFbC5jcmVhdGVFbCgncCcsIHtcbiAgICAgIHRleHQ6XG4gICAgICAgICdJZiBubyBoZWFkZXIgaXMgZm91bmQsIHdpbGwgaW5zZXJ0IGEgbmV3IG9uZSBhdCB0aGUgZmlyc3QgbGluZSAoYWZ0ZXIgZnJvbnRtYXR0ZXIpLicsXG4gICAgfSk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKCdDdXN0b20gSWxsZWdhbCBDaGFyYXRlcnMvU3RyaW5ncycpXG4gICAgICAuc2V0RGVzYyhcbiAgICAgICAgJ1R5cGUgY2hhcmF0ZXJzL3N0cmluZ3Mgc2VwZXJhdGVkIGJ5IGEgY29tbWEuIFRoaXMgaW5wdXQgaXMgc3BhY2Ugc2Vuc2l0aXZlLicsXG4gICAgICApXG4gICAgICAuYWRkVGV4dCgodGV4dCkgPT5cbiAgICAgICAgdGV4dFxuICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcignW10sIywuLi4nKVxuICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy51c2VySWxsZWdhbFN5bWJvbHMuam9pbigpKVxuICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnVzZXJJbGxlZ2FsU3ltYm9scyA9IHZhbHVlLnNwbGl0KCcsJyk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICB9KSxcbiAgICAgICk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKCdJZ25vcmUgUmVnZXggUnVsZScpXG4gICAgICAuc2V0RGVzYyhcbiAgICAgICAgJ0lnbm9yZSBydWxlIGluIFJlZ0V4IGZvcm1hdC4gQWxsIGZpbGVzIGxpc3RlZCBiZWxvdyB3aWxsIGdldCBpZ25vcmVkIGJ5IHRoaXMgcGx1Z2luLicsXG4gICAgICApXG4gICAgICAuYWRkVGV4dCgodGV4dCkgPT5cbiAgICAgICAgdGV4dFxuICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcignTXlGb2xkZXIvLionKVxuICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5pZ25vcmVSZWdleClcbiAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBuZXcgUmVnRXhwKHZhbHVlKTtcbiAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuaWdub3JlUmVnZXggPSB2YWx1ZTtcbiAgICAgICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5pZ25vcmVSZWdleCA9ICcnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgIHJlbmRlclJlZ2V4SWdub3JlZEZpbGVzKHJlZ2V4SWdub3JlZEZpbGVzRGl2KTtcbiAgICAgICAgICB9KSxcbiAgICAgICk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKCdVc2UgRmlsZSBPcGVuIEhvb2snKVxuICAgICAgLnNldERlc2MoXG4gICAgICAgICdXaGV0aGVyIHRoaXMgcGx1Z2luIHNob3VsZCB0cmlnZ2VyIHdoZW4gYSBmaWxlIGlzIG9wZW5lZCwgYW5kIG5vdCBqdXN0IG9uIHNhdmUuIERpc2FibGUgdGhpcyB3aGVuIHlvdSBub3RpY2UgY29uZmxpY3RzIHdpdGggb3RoZXIgcGx1Z2lucyB0aGF0IGFsc28gYWN0IG9uIGZpbGUgb3Blbi4nLFxuICAgICAgKVxuICAgICAgLmFkZFRvZ2dsZSgodG9nZ2xlKSA9PlxuICAgICAgICB0b2dnbGVcbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MudXNlRmlsZU9wZW5Ib29rKVxuICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnVzZUZpbGVPcGVuSG9vayA9IHZhbHVlO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgfSksXG4gICAgICApO1xuXG4gICAgY29udGFpbmVyRWwuY3JlYXRlRWwoJ2gyJywgeyB0ZXh0OiAnSWdub3JlZCBGaWxlcyBCeSBSZWdleCcgfSk7XG4gICAgY29udGFpbmVyRWwuY3JlYXRlRWwoJ3AnLCB7XG4gICAgICB0ZXh0OiAnQWxsIGZpbGVzIG1hdGNoaW5nIHRoZSBhYm92ZSBSZWdFeCB3aWxsIGdldCBsaXN0ZWQgaGVyZScsXG4gICAgfSk7XG5cbiAgICByZWdleElnbm9yZWRGaWxlc0RpdiA9IGNvbnRhaW5lckVsLmNyZWF0ZURpdigndGVzdCcpO1xuICAgIHJlbmRlclJlZ2V4SWdub3JlZEZpbGVzKHJlZ2V4SWdub3JlZEZpbGVzRGl2KTtcblxuICAgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKCdoMicsIHsgdGV4dDogJ01hbnVhbGx5IElnbm9yZWQgRmlsZXMnIH0pO1xuICAgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKCdwJywge1xuICAgICAgdGV4dDpcbiAgICAgICAgJ1lvdSBjYW4gaWdub3JlIGZpbGVzIGZyb20gdGhpcyBwbHVnaW4gYnkgdXNpbmcgdGhlIFwiaWdub3JlIHRoaXMgZmlsZVwiIGNvbW1hbmQnLFxuICAgIH0pO1xuXG4gICAgLy8gZ28gb3ZlciBhbGwgaWdub3JlZCBmaWxlcyBhbmQgYWRkIHRoZW1cbiAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5wbHVnaW4uc2V0dGluZ3MuaWdub3JlZEZpbGVzKSB7XG4gICAgICBjb25zdCBpZ25vcmVkRmlsZXNTZXR0aW5nc09iaiA9IG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKS5zZXREZXNjKGtleSk7XG5cbiAgICAgIGlnbm9yZWRGaWxlc1NldHRpbmdzT2JqLmFkZEJ1dHRvbigoYnV0dG9uKSA9PiB7XG4gICAgICAgIGJ1dHRvbi5zZXRCdXR0b25UZXh0KCdEZWxldGUnKS5vbkNsaWNrKGFzeW5jICgpID0+IHtcbiAgICAgICAgICBkZWxldGUgdGhpcy5wbHVnaW4uc2V0dGluZ3MuaWdub3JlZEZpbGVzW2tleV07XG4gICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgdGhpcy5kaXNwbGF5KCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iXSwibmFtZXMiOlsiVEZpbGUiLCJQbHVnaW4iLCJTZXR0aW5nIiwiUGx1Z2luU2V0dGluZ1RhYiJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxhQUFhLEdBQUcsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ25DLElBQUksYUFBYSxHQUFHLE1BQU0sQ0FBQyxjQUFjO0FBQ3pDLFNBQVMsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLFlBQVksS0FBSyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUNwRixRQUFRLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUMxRyxJQUFJLE9BQU8sYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUMvQixDQUFDLENBQUM7QUFDRjtBQUNPLFNBQVMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDaEMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxLQUFLLFVBQVUsSUFBSSxDQUFDLEtBQUssSUFBSTtBQUM3QyxRQUFRLE1BQU0sSUFBSSxTQUFTLENBQUMsc0JBQXNCLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLCtCQUErQixDQUFDLENBQUM7QUFDbEcsSUFBSSxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3hCLElBQUksU0FBUyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxFQUFFO0FBQzNDLElBQUksQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLEtBQUssSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztBQUN6RixDQUFDO0FBdUNEO0FBQ08sU0FBUyxTQUFTLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFO0FBQzdELElBQUksU0FBUyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsT0FBTyxLQUFLLFlBQVksQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxVQUFVLE9BQU8sRUFBRSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO0FBQ2hILElBQUksT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLEVBQUUsVUFBVSxPQUFPLEVBQUUsTUFBTSxFQUFFO0FBQy9ELFFBQVEsU0FBUyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtBQUNuRyxRQUFRLFNBQVMsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtBQUN0RyxRQUFRLFNBQVMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFBRTtBQUN0SCxRQUFRLElBQUksQ0FBQyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxVQUFVLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUM5RSxLQUFLLENBQUMsQ0FBQztBQUNQLENBQUM7QUFDRDtBQUNPLFNBQVMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUU7QUFDM0MsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3JILElBQUksT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLE9BQU8sTUFBTSxLQUFLLFVBQVUsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLFdBQVcsRUFBRSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDN0osSUFBSSxTQUFTLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxPQUFPLFVBQVUsQ0FBQyxFQUFFLEVBQUUsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUN0RSxJQUFJLFNBQVMsSUFBSSxDQUFDLEVBQUUsRUFBRTtBQUN0QixRQUFRLElBQUksQ0FBQyxFQUFFLE1BQU0sSUFBSSxTQUFTLENBQUMsaUNBQWlDLENBQUMsQ0FBQztBQUN0RSxRQUFRLE9BQU8sQ0FBQyxFQUFFLElBQUk7QUFDdEIsWUFBWSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztBQUN6SyxZQUFZLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDcEQsWUFBWSxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDekIsZ0JBQWdCLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLE1BQU07QUFDOUMsZ0JBQWdCLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQztBQUN4RSxnQkFBZ0IsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUztBQUNqRSxnQkFBZ0IsS0FBSyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsU0FBUztBQUNqRSxnQkFBZ0I7QUFDaEIsb0JBQW9CLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUU7QUFDaEksb0JBQW9CLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FB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
