import { FilDepositAddress } from "@haechi-labs/henesis-wallet-core/lib/fil/depositAddress";

export class DepositAddressDTO {
  id: string;
  name: string;
  address: string;
  createdAt: string;
  updatedAt: string;

  static fromDepositAddress(depositAddress: FilDepositAddress) {
    return {
      id: depositAddress.getId(),
      name: depositAddress.getData().name,
      address: depositAddress.getAddress(),
      createdAt: depositAddress.getData().createdAt,
      updatedAt: depositAddress.getData().updatedAt,
    };
  }
}
