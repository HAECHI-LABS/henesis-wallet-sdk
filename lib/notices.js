"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notices = void 0;
class Notices {
    constructor(client) {
        this.baseUrl = "/notices";
        this.client = client;
    }
    getNotices() {
        return this.client.get(`${this.baseUrl}`);
    }
    async updateNoticeIsSeen(request) {
        const { noticeId } = request, rest = __rest(request, ["noticeId"]);
        await this.client.patch(`${this.baseUrl}/${noticeId}/is-seen`, rest);
    }
}
exports.Notices = Notices;
//# sourceMappingURL=notices.js.map