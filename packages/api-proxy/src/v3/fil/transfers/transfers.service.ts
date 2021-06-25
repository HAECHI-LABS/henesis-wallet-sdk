import { Injectable } from "@nestjs/common";
import { SDK } from "@haechi-labs/henesis-wallet-core";
import { GetTransfersOption } from "./dto/get-transfers-options.dto";
import { PaginationDTO } from "../dto/pagination.dto";
import { TransferDTO } from "../dto/transfer.dto";

@Injectable()
export class TransfersService {
  public async getTransfers(
    sdk: SDK,
    options: GetTransfersOption
  ): Promise<PaginationDTO<TransferDTO>> {
    const data = await sdk.fil.transfers.getTransfers(options);
    return {
      pagination: data.pagination,
      results: data.results.map(TransferDTO.fromTransfer),
    };
  }
}
