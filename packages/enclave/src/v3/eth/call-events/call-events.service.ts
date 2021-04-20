import { Injectable } from "@nestjs/common";
import { CallEventDTO } from "../dto/call-event.dto";

@Injectable()
export class CallEventsService {
  public async getCallEvents(): Promise<CallEventDTO> {
    return null;
  }
}
