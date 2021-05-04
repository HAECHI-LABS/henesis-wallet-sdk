import { Injectable } from "@nestjs/common";
import { SDK } from "@haechi-labs/henesis-wallet-core";
import { PaginationDTO } from "../dto/pagination.dto";
import { Transfer } from "@haechi-labs/henesis-wallet-core/lib/btc/transfers";
import { Pagination } from "@haechi-labs/henesis-wallet-core/lib/types";
import { TransferDTO } from "../dto/transfer.dto";

@Injectable()
export class TransfersService {
  public constructor() {}

  public async getTransfers(
    sdk: SDK,
    query: any
  ): Promise<PaginationDTO<TransferDTO>> {
    const result: Pagination<Transfer> = await sdk.btc.transfers.getTransfers(
      query
    );

    return {
      pagination: result.pagination as any,
      results: result.results.map(TransferDTO.fromTransfer),
    };
  }

  public async getTransfer(sdk: SDK, transferId: string): Promise<TransferDTO> {
    return TransferDTO.fromTransfer(
      await sdk.btc.transfers.getTransfer(transferId)
    );
  }
}
