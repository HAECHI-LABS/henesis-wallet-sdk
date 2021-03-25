import { Controller, Get } from "@nestjs/common";

@Controller("/api/v2/eth")
export class EthController {
  @Get()
  findAll(): string {
    return "This action returns all eths";
  }
}
