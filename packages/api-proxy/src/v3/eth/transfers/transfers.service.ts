import { Injectable } from "@nestjs/common";
import { SDK } from "@haechi-labs/henesis-wallet-core";
import { TransferDTO } from "../dto/transfer.dto";
import { GetTransfersOption } from "./dto/get-transfers-option.dto";
import { PaginationDTO } from "../dto/pagination.dto";
import { Pagination } from "@haechi-labs/henesis-wallet-core/lib/types";
import { EthValueTransferEvent } from "@haechi-labs/henesis-wallet-core/lib/events";
import { object } from "../../../utils/object";
import { getPaginationMeta } from "../../../utils/pagination";

@Injectable()
export class TransfersService {
  public async getTransfers(
    sdk: SDK,
    options: GetTransfersOption,
    path: string
  ): Promise<PaginationDTO<TransferDTO>> {
    const result: Pagination<EthValueTransferEvent> =
      await sdk.eth.events.getValueTransferEvents(
        object(GetTransfersOption.toSDKOption(options))
      );
    return {
      pagination: getPaginationMeta(
        path,
        options.page,
        options.size,
        result.pagination.totalCount,
        options
      ),
      results: result.results.map(TransferDTO.fromValueTransferEvent),
    };
  }
}
