import { Client } from "./httpClient";
import { NoticeDTO, UpdateNoticeIsSeenRequest } from "./__generate__/accounts";

export class Notices {
  private readonly client: Client;

  private readonly baseUrl = "/notices";

  constructor(client: Client) {
    this.client = client;
  }

  getNotices(): Promise<NoticeDTO[]> {
    return this.client.get(`${this.baseUrl}`);
  }

  async updateNoticeIsSeen(
    request: { noticeId: string } & UpdateNoticeIsSeenRequest
  ) {
    const { noticeId, ...rest } = request;
    await this.client.patch(`${this.baseUrl}/${noticeId}/is-seen`, rest);
  }
}
