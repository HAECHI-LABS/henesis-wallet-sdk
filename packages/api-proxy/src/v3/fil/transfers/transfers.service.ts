import { Injectable } from "@nestjs/common";
import { SDK } from "@haechi-labs/henesis-wallet-core";
import { GetTransfersOption } from "./dto/get-transfers-options.dto";
import { PaginationDTO } from "../dto/pagination.dto";
import { TransferDTO } from "../dto/transfer.dto";
import { getPaginationMeta } from "../../../utils/pagination";

@Injectable()
export class TransfersService {
  public async getTransfers(
    sdk: SDK,
    options: GetTransfersOption,
    path: string
  ): Promise<PaginationDTO<TransferDTO>> {
    const data = await sdk.fil.transfers.getTransfers(options);
    return {
      pagination: getPaginationMeta(
        path,
        options.page,
        options.size,
        data.pagination.totalCount,
        options
      ),
      results: data.results.map(TransferDTO.fromTransfer),
    };
  }
}
