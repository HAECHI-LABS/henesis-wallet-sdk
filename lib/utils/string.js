"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCamelCase = exports.toSnakeCase = void 0;
exports.toSnakeCase = (s) => s.replace(/[\w]([A-Z])/g, (m) => `${m[0]}_${m[1]}`).toLowerCase();
exports.toCamelCase = (s) => s.replace(/([-_][a-z])/gi, ($1) => $1.toUpperCase().replace("-", "").replace("_", ""));
//# sourceMappingURL=string.js.map