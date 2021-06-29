import { Client } from "./httpClient";
import { NoticeDTO, UpdateNoticeIsSeenRequest } from "./__generate__/accounts";
export declare class Notices {
    private readonly client;
    private readonly baseUrl;
    constructor(client: Client);
    getNotices(): Promise<NoticeDTO[]>;
    updateNoticeIsSeen(request: {
        noticeId: string;
    } & UpdateNoticeIsSeenRequest): Promise<void>;
}
