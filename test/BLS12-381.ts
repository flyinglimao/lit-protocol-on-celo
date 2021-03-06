import { expect } from 'chai';
import { ethers } from 'hardhat';
import { LitVerify } from '../typechain/LitVerify';

describe('BLS12-381', function () {
  let bls: LitVerify;
  before(async () => {
    const BLS = await ethers.getContractFactory('LitVerify');
    // bls = (await BLS.deploy()) as LitVerify;
    bls = (await BLS.attach(
      '0xFa07A38E8170F043EaA976F4c4b287bCA6E73e5f'
    )) as LitVerify;
    console.log(bls.address);
  });

  it('verify encoded', async function () {
    /* toHex(
       base64(JSON.stringify({ "alg": "BLS12-381", "typ": "JWT" }))
        + '.'
         + base64(JSON.stringify({ "iss": "LIT", "chain": "ethereum", "iat": 1639065668, "exp": 1639108868, "callRequests": [{ "from": "0xf8f7873f80039d59783e7059ecff5a6c49d70d47", "to": "0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419", "data": "0xfeaf968c" }], "callResponses": ["0x0000000000000000000000000000000000000000000000050000000000003c6400000000000000000000000000000000000000000000000000000061ba17fdbc0000000000000000000000000000000000000000000000000000000061b226ea0000000000000000000000000000000000000000000000000000000061b226ea0000000000000000000000000000000000000000000000050000000000003c64"] }))
      )
    */
    const msg =
      '0x65794a68624763694f694a4354464d784d69307a4f4445694c434a30655841694f694a4b5631516966512e65794a7063334d694f694a4d535651694c434a6a6147467062694936496d5630614756795a5856744969776961574630496a6f784e6a4d354d7a41344d5451344c434a6c654841694f6a45324d7a6b7a4e54457a4e446773496d4e68624778535a5846315a584e306379493657337369644738694f6949776544466b5a6d5533593245774f5755354f5751784d44677a4e574a6d4e7a4d774e4452684d6a4e694e7a4e6d597a49774e6a497a5a4759694c434a6b59585268496a6f694d48686a4f4464694e545a6b5a4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441775a4456685a44676966537837496e5276496a6f694d4867785a475a6c4e324e684d446c6c4f546c6b4d5441344d7a56695a6a637a4d4451305954497a596a637a5a6d4d794d4459794d32526d496977695a47463059534936496a42344e6a4d314d6a49784d5755774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d47513159575134496e31644c434a6a59577873556d567a634739756332567a496a7062496a42344d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441794d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441325a5445324e4459784e7a51324d544e684e6a45334d4463774e6d4d324f54597a4e6a45334e4459354e6d59325a544a6d4e6d45334d7a5a6d4e6d557a596a59794e6a45334d7a59314d7a597a4e444a6a4e6a55334f5452684e7a55314f5455334d7a4532597a51354e6d45325a6a59334e446b32596a52684e6a6731595463354e4445325954526d4e4451324d7a4d784e475132595451354d7a41304f5459354e7a63324e7a51354e6d51314d6a5a6a4e6a4d7a4d6a526c4e7a6b324d5455344e44497a4d4459784e54637a4f5463314e446b3259545a6d4e6a63304f545a694d7a45334e6a597a4e6d51314e5459334e5451304e7a4d354e7a59324e44517a4e4449334d44597a4e7a6b304d6a59344e5745304e7a55794e7a41324e4451334e6d4d334e6a59794e6d51304e6a637a4e446b304f4452684e6a67324d6a5a6b4e5449334e6a59794e546332597a4d324e5745314e7a55784e6a63314f5455334e54497a4d6a56684e54637a4e544d774e6a51314f4452684e6d4d324d7a59354e4449325a5456684e5463304e6a63354e446b304e7a59304e6d4d324d6a5a6b4e5459334f5455354e5467314d6a5a6a4e5745304d7a51794e6a67324d6a5a6b4e5445324e7a597a4d7a4d314d6a63324e6a4d325a4455324e6d49304f5451334d7a6b334e5451354e4463305a545a6d4e546b314e7a5a6a4e7a5530597a59354e4449305a5455354e5467324f4463774e6a49314f4455324e7a51304f5451344e47557a4d54597a4e4467304d6a637a4e6a55314d7a51794e7a41324d7a63354e444932596a59314e54637a4e5459344e6a49314e7a5a6a4e6d4530597a517a4e4449334d4459794e6d51305a5463354e5745314e7a51324e3245324d5455334d7a55325a5451354e4463304e6a4d774e446b304e4451314e7a59305a4455304e44497a4d4459784e444d304d6a63324e5745324f5451794e4459324e4451334e6a6732597a597a4e6d51314e6a4d784e6a49314d7a59304e3245304f5451334e4745334d7a59794d7a49305a5463794e446b304f4452684e6a67324e4451334e5455334e5451354e4459305a544d774e546b314f4455794e324530597a517a4e4449334d4459794e5463304e6a5a6c4e5745314f44526b4e7a4d304f5451334e4459334e5456684e444d304d6a63324e6a51304e7a59344e6d4d324d7a59354e4449325a4459304e54637a4e545a684e6a51304e7a5a6a4e7a59324d6a5a6b4e4459334d7a59784e5467314d6a4d314e446b304e7a51324e7a6b315954557a4e4449334d4459794e6d55314d6a5a6a4e6a49325a5455794e7a41324d6a4d794d7a55324f4459794e4463334f444d314e446b304e7a4d354e7a51324d5455344e54497a4d4456684e5463314d5459334e5745325a444d354e7a6b304f5451334d7a6b7a4d4459784e4463314e6a63354e6a4d334f5451794d7a41324d6a63354e4449334d4459794e6d55314d6a5a6a4e6a4d325a5451794e7a6b31595455344e5445334e5451354e44553159545a6a4e5745314e7a63334e6a633159545a6c4e474532597a56684e544d304d6a4d774e6a49334f5451794d7a45324d7a4d794e5455324e7a55304e54637a4f5463354e5745314d7a51794e4751324d6a4d794d7a6b7a4d4451354e446332597a63314e446b304e7a51324e7a55324e54557a4e44497a4d7a55354e546732596a59334e6a55314e7a4d354d7a45304f5451344e6a51324f4459794e6d55314d5463314e446b324f5463334e6a63304f545a6b4e6d4d334e4455354e5463324e445a6a4e446b3259545a6d4e6a63304f545a6b4e5449324f4459304e4463304e544d324e6a45314e7a4d784e6a673159544d794e5455334e6a597a4d7a4d3159545a6c4e47497a4d7a59344e7a51324d6a51304e7a51324f5455354e5467305a545a6a4e475532595455784e7a4d314e5451314e6a67305a6a526b4e6d4d334d444d314e544532595455794e6a6b314e6a4d7a4e6a677a4d5455354d7a4d325a6a63334e6a45314e7a51324e446b314e545a684e444932595455794e44637a4f544d794e5451304e44526c4e6d49305a444d794e54497a4e54526c4e5451305a54526c4e6a55314e4455324d7a49314f544d794d7a4532595459304e6d497a4d5463784e5445314f4459304e4755314d5464684e6d4d7a4e6a56684e44637a4d545a684e6a45314e545a6a4e446b314d545a6c4e6d4d324d5455334e44557a4e54637a4e546b7a4d6a4d314e6a45324d6a51324e4459314f5455304e6d55324e4459784e54597a4d444d304e7a63314e6a55334d7a45304e7a526b4e4463304e6a55344e4759304e445a6a4e4745324d6a5a6b4e6a67305a6a55354e5459324d7a4d784e546332597a55794e5467324d6a51344e545930595455794e3245304e6a637a4e546332597a59344e5449324d5455314e6d4d304f5455334e6d55304d6a59784e5463304e7a55794e4451314f545a684e4755325a54526d4e545532597a63784e5445314e7a59304e4755314d544d774e44597a4e6a55304e6d4d314d6a51794e57457a4d444d784d7a59314e6a55344e6a5130595459784e6d45314d544d304e546b335954526c4e544d305a5455334e4745304f4455324e544d334e44526b4e6a49314e5463774e6d59314f5464684e4745314e6a56684d7a49314e6a4d314e5445325a444d784e6a67314e6a4d7a4e6a6733595455304d7a4932597a517a4e47517a4d6a51324e4467324d6a51304e4449324d5455324e4467305a545a6c4e5463325a444d774d7a55324e4455334e5449304e44526b4e54637a4d5456684e545933595451324e7a63314f545a694e6a67334d6a526c4e6d4932597a51354e5451325a4463344e6d45324d6a55334e7a67334e4455304d7a4d32597a517a4e6a49314e7a51354e7a6b305a5455304e4449305a4455334e44557a4e5463334e5745314e7a4d784e5459305a545a694e6d4d304e5455794e5451304d6a5a684e544d304e7a597a4d7a4d314d7a55314e6a63334e7a526d4e4455334e7a64684e545132595451794e6d4d314e6a4d7a4e6a67334d7a55314e4463334d444d304e6a55314e6a63774e5467314e445a684e4449305954557a4e4463314d6a63334e546332596a59344e544d324d6a4d784e4449314e44557a4e5467324f44526c4e5449304e5451324e7a4d314d7a55334e6d4d304d7a59794d7a45334d4455344e6a49304e7a4d314e6a67314d7a51324e44557a4e54557a4e5463334d4451324e6a517a4d444d784e4451314e6a55334e6d4d30595455794d7a45334d4463334e546b32596a59304d7a4d305a6a55314e6d4d334e44557a4e6d55305a5456684e54597a4d444d314e7a6b314d7a55334e6d4d304d6a59304e6d4d304d6a63784e6a55304e4451794e6a45314e7a51334e6a63334e7a557a4e5455324f445a6c4e4759314e545a6a4e7a45314d6a55344e6a5130595459784e5455304f544d784e5455304e6a526c4e4745324e5455314d7a45304e44557a4e5463324e4456684e4751325a5459344e6d59314f5464684e4755305a54526d4e545532597a63304e544d325a4459344e6d45305a445a6a4e5459334d4455314e4463334f445a694e6a45304e7a52684e7a51314e5455304e6a67305a44526b4d7a45305954637a4e5745314e5459344e544930596a4d784e4449304f5455314e6d51334f445a6a4e544d304e6a51324e6d5531595455314e5445334e7a59784e54557a4d5455314e5445314e7a5a6a4e4745314d7a51334e7a4d7a4e54557a4e5463334d4455794e6a517a4d445a6a4e7a41314d545a6b4e7a41324f5455794d7a413159544d324e546b7a4d7a5a6d4e7a63324d5455324e6d4d334e4455794e6d55334d4459784e54557a4d445a694e7a49314e545a694e6a51334d7a526b4e6d51304e6a55344e4755314e7a63344e4745314d6a5a694e7a417a4d6a55334e54637a4d5455324e4759304e5463334e3245314e545a6b4e7a6732597a557a4e4459304e5463794e5455304e5459344e544d324d6a51334e5459304f5455314e5463324e445a6a4e5449304e4451794e7a41314e4455324e5449304d6a59784e545532597a51354e6a453359545a6a4e4745324d545a6a4e6d4d7a4d7a557a4e546332597a517a4e6a45325a4452684e4467314d6a5a6c4e7a4132595459314e6d45304d6a63774e5463314e7a4d784e4463324e545a6a4e7a41314e44557a4e544d334e4452684e6a49304e6a52684e7a4d314f545a6a4e6a67304d7a59794e4463305a4464684e5455314e7a59304e5459305a445a6b4e6a677a4d6a56684e4459324f4455794e6a45314e545a6a4e4459314e545a6c4e444932596a59794e5463334f444d784e546332597a526c4e444d314d7a55334e446b334f54526d4e5463334e4452684e54493359545a6a4e7a51314d7a55314e545932596a597a4e445932597a55344e4755314e4451794e6d45324e5455314e4459334f5455304e5459314d6a4d7a4e6a51325a4455794e4467314e6a5a684e544932596a55794e4451314d544d304e5745304e5459304e5463305a5451334e5449304e4455784e6d45314d6a55784e54557a4d445a6a4d7a51314e4455314e475530595456684d7a49314e6a55314e4751304e7a5a6a4e5441314d6a51314e4459334d44557a4e5455324e44526d4e6a4d7a4d545a6a4e546b314e445a6c4e7a41314d5455314d7a41334d4463774e5463314e6a59344e4759324d6a51314e6d4d334d54526c4e5459314d6a56684e5463304e544d314e7a59314e5451314e47517a4e54526b4e4459334d4455354e6a45304e4451794e5445324d545a6c4e6a63334e7a55334e6d4d324f445a6d4e4751304e545a6a4e446b31595464684e6d4d30595459784e6d49314e6a4d7a4e544d314e7a5a6a4e444d305a5455324e4449314e44557a4e5467324f44526c4e5449304e5451324e7a41314d7a55314e6a51305a6a597a4d7a4532597a55354e5451325a5463774e5445314e544d774e7a41334d4455334e5459324f44526d4e6a49304e545a6a4e7a45305a5455314d7a45324d5455324d7a41314f5463334e546b314e5459304e5463324e5455314e6d4d304e6a557a4e6d5531595459354e47517a4d5452684d7a59314d7a55314e6a4d7a4e5459794e545532597a51324e544d325a545a6a4e6a67314e6a4d7a4e6a6733595455354e5459324e4451334e6a51314e6a5a694e7a6b314e6a55304e6a67305a44526b4d7a45305954637a4e5745314e5459344e544930596a4d784e4449304f5455314e6d51334f445a6a4e544d304e6a51324e6d5531595455314e5445334e7a59784e54557a4d5455314e5445314e7a5a6a4e4745314d7a51334e7a4d7a4e54557a4e5463334d4451324e6a55314e544d784e4451314d7a55334e6a51315954526b4e6d55324f445a6d4e546b335954526c4e4755305a6a55314e6d4d334e44557a4e6d51324f445a684e475132597a55324e7a41314e5451334e7a51305a6a59794d7a4532597a55344e6a49304f4455324e4745314d6a55334e544933595455354e6d45305a5459784e6a49304e7a526c4d7a59324e444d7a4e574532596a55794d7a45314f544d774e5745304e5455784d7a41305a6a51334e5449304f4455324e6d45314d6a5a694e54457a4d4451354d7a41314e5451324e475530595459314e44557a4d5451304e544d314e7a59304e6d4d314e6a51304e4449334d4455304e5459314d6a55794e6a517a4d445a6a4e7a41314d545a6b4e7a41324f5455794d7a413159544d324e546b7a4d7a5a6d4e7a63324d5455324e6d4d334e4455794e6d55334d4459784e54557a4d445a694e7a49314d7a55334e7a51314d7a526b4e5463305a4463354e6a4d7a4d6a59304e5459305a444d784e57457a4d54557a4e546332597a517a4e5445325a4452684e546b314e6a5a6c4e4755324d5455334e4459304e6a5a6c4e546b32595452684e57453159544d784e4745314f44526c4e5467305a5459344e54597a4d6a55794e7a5931595451314e6a51314e7a59304e546330595455344e5459325a5455324e6d49314d6a51344e6a517a4d6a56684e4455324e4455334e4755304e7a55794e4455305a5451304e6a6732596a55794d7a45314f544d774e5745304e54526c4e444d305a5451324e4449314e44557a4e5467324f44526c4e54457a4d445a6a4e6d5531595455324e5445334e7a59784e54557a4d5455314e5463314f4459304e4745324d5455314e4745334d5455354e6d49324e4451334e6a55325a44526c4d7a59305a4451334e6d4d31595459794e54553159544d324e546332597a526c4e474530596a4d784e5455334f5459794e4467305a545a694e6a49314e6a56684d7a55314d7a55314e574530596a597a4e446330595463304e546b33595459344e4751305a444d784e4745334d7a56684e5455324f4455794e47497a4d5451794e4451305a6a55344e7a4132596a59794e5463305a4463794e446b325a544d774d3251774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d434973496a42344d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441775a6a686d4e7a67334d3259344d44417a4f5751314f5463344d3255334d4455355a574e6d5a6a56684e6d4d304f5751334d4751304e794a646651';
    // G2.fromSignature(original sig)
    // It's easy and safe to compute in client compare with within contract
    const sig =
      '0x00000000000000000000000000000000080a1a16f9d036577d4f44deb6e6ae752bf7239b8645254f11815a788be38f876f8085132a28cdce8b2d495167d350960000000000000000000000000000000008cb40929c6451968c1a4045963f6cef676800a12294781a34f161c296d07d3324260cc595ee0efa699f873fefb14ed900000000000000000000000000000000063935f57e619a2105d1c72f519ef44e9de2c1c8543f283de57f72af21735212a445daefa29a2849646e17dd0bb629f000000000000000000000000000000000007560ff72e01108f4c2ebf87b58af49a0af57b076a9137b67d1b109fa62c769cb8107247acafaf19978af3cb82c90ef';

    expect(await bls['verify(bytes,bytes)'](msg, sig)).equal(true);
  });

  it('veirfy not encoded', async function () {
    const headerJSON = '{"alg":"BLS12-381","typ":"JWT"}';
    const payloadJSON =
      '{"iss":"LIT","chain":"ethereum","iat":1639448716,"exp":1639491916,"callRequests":[{"to":"0x90ca8a3eb2574f937f514749ce619fdcca187d45","data":"0xc87b56dd0000000000000000000000000000000000000000000000000000000000001a26"},{"to":"0x90ca8a3eb2574f937f514749ce619fdcca187d45","data":"0x6352211e0000000000000000000000000000000000000000000000000000000000001a26"}],"callResponses":["0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000005568747470733a2f2f676174657761792e70696e6174612e636c6f75642f697066732f516d576a4d524b36777645414262414e4678637075546844777466446a37644b7674613576314c79534744704c4b2f363639340000000000000000000000","0x0000000000000000000000004241d550b424e12d1eacf498d3babc5c9297719c"]}';
    const sig =
      '0x00000000000000000000000000000000109fec25ed091635fd0ae6e59ba0df973dbed583e8396554304c76c1b5a837bca49b14dff304461fc10fe1b7bb7c34a40000000000000000000000000000000014132a69f443268a5f9f917b9eb8cdb78996c1f839181ada4132a322da95c78808c215a28b00e8ccc007ffb7684c4f91000000000000000000000000000000001565e9f685825600001ed3626567396c73bde82f623d9e214aee15f20dc0f112b620a72452ee8d553868e7e708dfe3e500000000000000000000000000000000008f5847b3711c743b3b6865d1dbe230648404476bdd1eedd7eabc468ba08cb95452649885d109b9c422064413a78af3';

    expect(
      await bls['verify(string,string,bytes)'](headerJSON, payloadJSON, sig)
    ).equal(true);
  });

  /* following codes are for debug, now we make the function intenral
  it('expand_message_xmd', async function () {
    const msg =
      '0x65794a68624763694f694a4354464d784d69307a4f4445694c434a30655841694f694a4b5631516966512e65794a7063334d694f694a4d535651694c434a6a6147467062694936496d5630614756795a5856744969776961574630496a6f784e6a4d354d4459314e6a59344c434a6c654841694f6a45324d7a6b784d4467344e6a6773496d4e68624778535a5846315a584e3063794936573373695a6e4a7662534936496a42345a6a686d4e7a67334d3259344d44417a4f5751314f5463344d3255334d4455355a574e6d5a6a56684e6d4d304f5751334d4751304e794973496e5276496a6f694d4867315a6a526c597a4e6b5a6a6c6a596d51304d7a63784e475a6c4d6a63304d4759315a544d324d5459784e54566a4e5749344e444535496977695a47463059534936496a42345a6d56685a6a6b324f474d6966563073496d4e68624778535a584e776232357a5a584d694f6c73694d4867774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4455774d4441774d4441774d4441774d44417a597a59304d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774e6a4669595445335a6d5269597a41774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774e6a46694d6a49325a5745774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d445978596a49794e6d56684d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441314d4441774d4441774d4441774d4441774d324d324e434a646651';
    expect(await bls.expand_message_xmd(msg)).equal(
      '0x40d43074ee846df712118ceb49286776d7880e3744e4e4ea0f94338d94993b70ffbea2b402261e55845ca54188952c4e890f3a06e920c4f07c4e0951549c4e9b397215ba4cee78dc1b85597d804e77f08bb803d8545f6255f69db4ea1fcd0dad4a3cbbac6f504cae29751b43b23052917d2b5f74ac979e083224e0b9c8b182d502bb2df18acdcca1719be3bf91683ff8b3acf22180440e58145f3d29358e856f78b10a4f94fe32423b10523db66b0e75ce3d256845aab769a0104cf1cf247b8ad9d43dbc44151a63d498daf16e4d5bfab56c5a2a80f75f9e8db1d0aeadd01eaa74c4fbb4a60fc74414f68fa196af1357a567f9e4017bc26a8ddba70878ee210b'
    );
  });

  it('hash_to_field', async function () {
    const msg =
      '0x65794a68624763694f694a4354464d784d69307a4f4445694c434a30655841694f694a4b5631516966512e65794a7063334d694f694a4d535651694c434a6a6147467062694936496d5630614756795a5856744969776961574630496a6f784e6a4d354d4459314e6a59344c434a6c654841694f6a45324d7a6b784d4467344e6a6773496d4e68624778535a5846315a584e3063794936573373695a6e4a7662534936496a42345a6a686d4e7a67334d3259344d44417a4f5751314f5463344d3255334d4455355a574e6d5a6a56684e6d4d304f5751334d4751304e794973496e5276496a6f694d4867315a6a526c597a4e6b5a6a6c6a596d51304d7a63784e475a6c4d6a63304d4759315a544d324d5459784e54566a4e5749344e444535496977695a47463059534936496a42345a6d56685a6a6b324f474d6966563073496d4e68624778535a584e776232357a5a584d694f6c73694d4867774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4455774d4441774d4441774d4441774d44417a597a59304d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774e6a4669595445335a6d5269597a41774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774e6a46694d6a49325a5745774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d445978596a49794e6d56684d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441314d4441774d4441774d4441774d4441774d324d324e434a646651';
    const fps = await bls.hash_to_field(msg);
    const rs = [
      '0x0000000000000000000000000000000003004d4b574513e821288e73e24004c62abd074634961d6f067e36519cb030a7462adb99285ef10c99f5b9ecb44f901b0000000000000000000000000000000017de5ca33b6b96e5f23bc17ee16de9d61d0acaf25d7076875638d6f8df9b413b9578e4520e88dc12a576c6954e25a999',
      '0x00000000000000000000000000000000153532e4bafcef3de3ef2c990357d69f7221977e8d5c8ca62f90a73f128b4f1b1d551853c8cd79b4ebc5137db48ed908000000000000000000000000000000000390245a884c3cea6eae2bbc1844f840f63b51f01c361a7ff4de661ab23c4683026800bac1d728dd621eb831aa7c490b',
    ];
    expect(fps[0]).equal(rs[0]);
    expect(fps[1]).equal(rs[1]);
  });

  it('hash_to_curve', async function () {
    const msg =
      '0x65794a68624763694f694a4354464d784d69307a4f4445694c434a30655841694f694a4b5631516966512e65794a7063334d694f694a4d535651694c434a6a6147467062694936496d5630614756795a5856744969776961574630496a6f784e6a4d354d4459314e6a59344c434a6c654841694f6a45324d7a6b784d4467344e6a6773496d4e68624778535a5846315a584e3063794936573373695a6e4a7662534936496a42345a6a686d4e7a67334d3259344d44417a4f5751314f5463344d3255334d4455355a574e6d5a6a56684e6d4d304f5751334d4751304e794973496e5276496a6f694d4867315a6a526c597a4e6b5a6a6c6a596d51304d7a63784e475a6c4d6a63304d4759315a544d324d5459784e54566a4e5749344e444535496977695a47463059534936496a42345a6d56685a6a6b324f474d6966563073496d4e68624778535a584e776232357a5a584d694f6c73694d4867774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4455774d4441774d4441774d4441774d44417a597a59304d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774e6a4669595445335a6d5269597a41774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774e6a46694d6a49325a5745774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d445978596a49794e6d56684d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441774d4441314d4441774d4441774d4441774d4441774d324d324e434a646651';

    expect(await bls.hash_to_curve(msg)).equal(
      '0x000000000000000000000000000000000c54644ffb122ee24d1c095f8b7707139252226c3841b136a28dda4ee0f6d21f5ec933d4003452fc6b8f7564e09a65550000000000000000000000000000000006810151bdf1aa1c3aa743bd85d142984b4a23ee99a77d98dab3e73d17b4272f70f043ff5c81f1506729def59ead50b20000000000000000000000000000000012122ea7178c6b0ea8b54a5d3929be64861430cc9fc6174e64e48cbdb04946afa39cb95375cf0918e3e5b7243977874e0000000000000000000000000000000004f9b54cf0ce78498c1d79b8f7d816d042cd0e3be991fba4c40bb1990543d7790cff219bf048dc97a09ca5ee8ac0dda5'
    );
  });

  it('exp', async function () {
    expect(
      await bls.callBigModExp(
        '0x40d43074ee846df712118ceb49286776d7880e3744e4e4ea0f94338d94993b70ffbea2b402261e55845ca54188952c4e890f3a06e920c4f07c4e0951549c4e9b',
        '0x000000000000000000000000000000001a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaab'
      )
    ).equal(
      '0x0000000000000000000000000000000003004d4b574513e821288e73e24004c62abd074634961d6f067e36519cb030a7462adb99285ef10c99f5b9ecb44f901b'
    );
  });
  */
});
