import { ClientOptions, HttpClient } from '../src/httpClient';
import { Env } from "../src";

describe('HttpClient', () => {
  it('should sign correctly', () => {
    const options: ClientOptions = {
      accessToken: 'TemporaryToken',
      secret: 'WdiZiGKU3TPvRHRAprQ1ScBV3cNBd6b8QDmFlhSxM8k=',
      url: 'http://localhost:8080',
      env: Env.Local,
    };

    const client: HttpClient = new HttpClient(options);
    expect(client.createSig('1584200816test')).toEqual(
      'FaamjOPc58hvW+nEa4AGD9Ci0BCx8a5QUapQw5SfmkQ=',
    );
  });
});
