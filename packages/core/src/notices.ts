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

  // todo: implement
  getNotices(): Promise<Notice[]> {
    return Promise.resolve([
      {
        id: "1",
      },
    ]);
  }

  // todo: implement
  updateNotice(request: { noticeId: string; seen: boolean }) {}
}
