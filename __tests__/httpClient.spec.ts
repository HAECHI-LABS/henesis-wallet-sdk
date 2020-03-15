import {ClientOptions, HttpClient} from '../src/httpClient';

describe('HttpClient', () => {
  it('should sign correctly', ()=>{
    let options : ClientOptions = {
      accessToken: 'TemporaryToken',
      secret: 'WdiZiGKU3TPvRHRAprQ1ScBV3cNBd6b8QDmFlhSxM8k='
    };

    let client : HttpClient = new HttpClient(options);
    expect(client.createSig('1584200816test')).toEqual('FaamjOPc58hvW+nEa4AGD9Ci0BCx8a5QUapQw5SfmkQ=');
  });
});
