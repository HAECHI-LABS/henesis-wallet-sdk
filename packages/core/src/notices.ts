import { Client } from "./httpClient";
import { NoticeDTO, UpdateNoticeRequest } from "./__generate__/accounts";

export class Notices {
  private readonly client: Client;

  private readonly baseUrl = "/notices";

  constructor(client: Client) {
    this.client = client;
  }

  getNotices(): Promise<NoticeDTO[]> {
    return this.client.get(`${this.baseUrl}`);
  }

  async updateNotice(request: { noticeId: string } & UpdateNoticeRequest) {
    const { noticeId, ...rest } = request;
    await this.client.patch(`${this.baseUrl}/${noticeId}`, rest);
  }
}
