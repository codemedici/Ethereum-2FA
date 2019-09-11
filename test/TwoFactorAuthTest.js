require('./helpers/assert');
const TwoFactorAuth = artifacts.require("./TwoFactorAuth.sol");

contract('TwoFactorAuth', function (accounts) {
  const expectedUrl = 'example.com';
  const expectedService = 'Example Ltd';
  let instance;

  beforeEach(async () => {
    //token = await Token.new()
    instance = await TwoFactorAuth.deployed();
  });

  describe('authentication', () => {
    it('should authenticate on the default function', async () => {
      const result = await instance.sendTransaction({from: accounts[1]});
      const events = result.logs;

      assert.equal(events.length, 1);
      assert.equal(events[0].event, 'Authenticated');
      assert.equal(events[0].args._user, accounts[1]);
    });

    it('should authenticate on the authenticate method', async () => {
      const result = await instance.authenticate({from: accounts[1]});
      const events = result.logs;

      assert.equal(events.length, 1);
      assert.equal(events[0].event, 'Authenticated');
      assert.equal(events[0].args._user, accounts[1]);
    });

    it('should have a public url string', async () => {
      const url = await instance.url.call();
      assert.equal(url, expectedUrl);
    });

    it('should have a public service string', async () => {
      const service = await instance.service.call();
      assert.equal(service, expectedService);
    });
  });
});
