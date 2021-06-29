"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.syntaxHighlight = void 0;
const chalk_1 = __importDefault(require("chalk"));
exports.syntaxHighlight = (json) => {
    if (typeof json != "string") {
        json = JSON.stringify(json, undefined, 2);
    }
    json = json
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                return chalk_1.default.green(match);
            }
            else {
                return chalk_1.default.yellow(match);
            }
        }
        else if (/true|false/.test(match)) {
            return chalk_1.default.blue(match);
        }
        else if (/null/.test(match)) {
            return chalk_1.default.cyan(match);
        }
        return chalk_1.default.magenta(match);
    });
};
//# sourceMappingURL=chalk.js.map