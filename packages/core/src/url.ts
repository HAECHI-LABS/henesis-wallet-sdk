import { Env } from "./sdk";

export const baseUrls = new Map<Env, string>();
baseUrls.set(Env.Local, 'http://localhost:8080/api/v1');
baseUrls.set(Env.Test, 'https://test.wallet.henesis.io/api/v1');
baseUrls.set(Env.Dev, 'https://dev.wallet.henesis.io/api/v1');
baseUrls.set(Env.Prod, 'https://wallet.henesis.io/api/v1');