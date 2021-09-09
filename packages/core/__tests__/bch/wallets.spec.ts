import { HttpClient } from "../../src/httpClient";
import { Env } from "../../src";
import { BchWallets } from "../../src/bch/wallets";
import { BchKeyChains } from "../../src/bch/keychains";

describe("BchWallets", () => {
  it("should return false when address is not from dev", async () => {
    const wallets = new BchWallets(
      Env.Dev,
      new HttpClient({
        accessToken: "accessToken",
        secret: "secret",
        url: "http://localhost:8080/api/v2/bch",
        env: Env.Dev,
      }) as any,
      new BchKeyChains(Env.Dev)
    );

    expect(
      wallets.verifyAddress("bchtest:pp7zq5cy7tz6xsteesfydnlrna47zxm4xq")
    ).toEqual(true);
  });

  it("should return false when old address is not from dev", async () => {
    const wallets = new BchWallets(
      Env.Dev,
      new HttpClient({
        accessToken: "accessToken",
        secret: "secret",
        url: "http://localhost:8080/api/v2/bch",
        env: Env.Dev,
      }) as any,
      new BchKeyChains(Env.Dev)
    );

    expect(
      wallets.verifyAddress("2MvNDajCeC9qCqezstGXU436qmH4ajr4N2v")
    ).toEqual(true);
  });
});
