import { Injectable } from "@nestjs/common";
import { SDK } from "@haechi-labs/henesis-wallet-core";
import { PaginationDTO } from "../dto/pagination.dto";
import { Transfer } from "@haechi-labs/henesis-wallet-core/lib/btc/transfers";
import { Pagination } from "@haechi-labs/henesis-wallet-core/lib/types";
import { TransferDTO } from "../dto/transfer.dto";
import { getPaginationMeta } from "../../../utils/pagination";

@Injectable()
export class TransfersService {
  public constructor() {}

  public async getTransfers(
    sdk: SDK,
    query: any,
    path: string
  ): Promise<PaginationDTO<TransferDTO>> {
    const result: Pagination<Transfer> = await sdk.btc.transfers.getTransfers(
      query
    );

    return {
      pagination: getPaginationMeta(
        path,
        query.page,
        query.size,
        result.pagination.totalCount,
        query
      ),
      results: result.results.map(TransferDTO.fromTransfer),
    };
  }

  public async getTransfer(sdk: SDK, transferId: string): Promise<TransferDTO> {
    return TransferDTO.fromTransfer(
      await sdk.btc.transfers.getTransfer(transferId)
    );
  }
}
