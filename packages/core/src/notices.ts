import { Client } from "./httpClient";

export interface Notice {
  id: string;
}

export class Notices {
  private readonly client: Client;

  private readonly baseUrl = "/notices";

  constructor(client: Client) {
    this.client = client;
  }

  getNotices(): Promise<Notice[]> {
    return Promise.resolve([
      {
        id: "1",
      },
    ]);
  }

  updateNotice(request: { noticeId: string; seen: boolean }) {}
}
