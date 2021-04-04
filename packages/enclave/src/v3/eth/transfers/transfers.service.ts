import { Injectable } from "@nestjs/common";
import { SDK } from "@haechi-labs/henesis-wallet-core";
import { TransferDTO } from "../dto/transfer.dto";
import { GetTransfersOption } from "./dto/get-transfers-option.dto";
import { PaginationDTO } from "../dto/pagination.dto";
import { Pagination } from "@haechi-labs/henesis-wallet-core/lib/types";
import { EthValueTransferEvent } from "@haechi-labs/henesis-wallet-core/lib/events";
import { object } from "../../../utils/object";

@Injectable()
export class TransfersService {
  public async getTransfers(
    sdk: SDK,
    option: GetTransfersOption
  ): Promise<PaginationDTO<TransferDTO>> {
    const result: Pagination<EthValueTransferEvent> = await sdk.eth.events.getValueTransferEvents(
      object(GetTransfersOption.toSDKOption(option))
    );
    return {
      pagination: result.pagination as any,
      results: result.results.map(TransferDTO.fromValueTransferEvent),
    };
  }
}
