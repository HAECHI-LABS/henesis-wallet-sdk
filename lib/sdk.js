"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDK = void 0;
const accounts_1 = require("./accounts");
const organizations_1 = require("./organizations");
const httpClient_1 = require("./httpClient");
const eth_1 = require("./eth");
const fil_1 = require("./fil");
const url_1 = require("./utils/url");
const btc_1 = require("./btc");
const blockchain_1 = require("./blockchain");
const withdrawalApprovals_1 = require("./withdrawalApprovals");
const billings_1 = require("./billings");
const notices_1 = require("./notices");
const coinListings_1 = require("./coinListings");
const ltc_1 = require("./ltc");
const bch_1 = require("./bch");
class SDK {
    constructor(params) {
        let env = 3;
        if (params.env !== undefined && params.env !== null) {
            env = params.env;
        }
        let baseUrl = url_1.baseUrls.get(params.env);
        if (params.url !== null && params.url !== undefined) {
            baseUrl = params.url;
        }
        this.client = new httpClient_1.HttpClient({
            secret: params.secret,
            accessToken: params.accessToken,
            url: baseUrl,
            env,
        });
        this.withdrawalApproval = new withdrawalApprovals_1.WithdrawalApprovals(this.client);
        this.accounts = new accounts_1.Accounts(this.client);
        this.notices = new notices_1.Notices(this.client);
        this.billings = new billings_1.Billings(this.client);
        this.organizations = new organizations_1.Organizations(this.client);
        this.coinListings = new coinListings_1.CoinListings(this.client);
        this.klay = new eth_1.KlayModule({
            env: env,
            client: httpClient_1.enhancedBlockchainClient(this.client, blockchain_1.BlockchainType.KLAYTN),
            blockchain: blockchain_1.BlockchainType.KLAYTN,
        });
        this.eth = new eth_1.EthModule({
            env: env,
            client: httpClient_1.enhancedBlockchainClient(this.client, blockchain_1.BlockchainType.ETHEREUM),
            blockchain: blockchain_1.BlockchainType.ETHEREUM,
        });
        this.bsc = new eth_1.BscModule({
            env: env,
            client: httpClient_1.enhancedBlockchainClient(this.client, blockchain_1.BlockchainType.BINANCE_SMART_CHAIN),
            blockchain: blockchain_1.BlockchainType.BINANCE_SMART_CHAIN,
        });
        this.fil = new fil_1.FilModule({
            env: env,
            client: httpClient_1.enhancedBlockchainClient(this.client, blockchain_1.BlockchainType.FILECOIN),
            blockchain: blockchain_1.BlockchainType.FILECOIN,
        });
        this.btc = new btc_1.BtcModule({
            env: env,
            client: httpClient_1.enhancedBlockchainClient(this.client, blockchain_1.BlockchainType.BITCOIN),
        });
        this.ltc = new ltc_1.LtcModule({
            env: env,
            client: httpClient_1.enhancedBlockchainClient(this.client, blockchain_1.BlockchainType.LITECOIN),
        });
        this.bch = new bch_1.BchModule({
            env: env,
            client: httpClient_1.enhancedBlockchainClient(this.client, blockchain_1.BlockchainType.BITCOIN_CASH),
        });
    }
}
exports.SDK = SDK;
//# sourceMappingURL=sdk.js.map