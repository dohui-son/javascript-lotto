const MissionUtils = require("@woowacourse/mission-utils");

const Lotto = require("./Lotto.js");
const PurchaseLotto = require("./PurchaseLotto.js");
const UserLotto = require("./UserLotto.js");
const LottoResult = require("./LottoResult.js");

class App {
  constructor() {
    this.wonLotto = [];
    this.userLottoNumber = [];
    this.totalLotto = null;
    this.bonusNumber = null;
  }

  play() {
    this.inputPurchase();
    this.userLotto = new UserLotto(this.totalLotto);
    this.userLottoNumber = this.userLotto.getUserLotto();
    this.inputWonLotto();
    this.lottoResult = new LottoResult(
      this.userLottoNumber,
      this.wonLotto,
      this.bonusNumber
    );
  }

  inputPurchase() {
    MissionUtils.Console.readLine("구입금액을 입력해 주세요.\n", (payment) => {
      this.isNumber(payment);
      this.purchaseLotto = new PurchaseLotto(parseInt(payment));
      this.totalLotto = this.purchaseLotto.getTotalLotto();
    });
  }

  isNumber(payment) {
    if (isNaN(payment)) {
      throw new Error("[ERROR] 로또 구입 금액은 숫자만 입력해주세요.");
    }
  }

  inputWonLotto() {
    MissionUtils.Console.readLine(
      "\n당첨 번호를 입력해 주세요.\n",
      (lottoNumber) => {
        const winLotto = lottoNumber.split(",");
        const validatedLotto = this.wonLottoValidate(winLotto);
        this.lotto = new Lotto(validatedLotto);
        this.wonLotto = this.lotto.getWonLotto();
        this.bonusNumber = this.lotto.getBonus();
      }
    );
  }

  wonLottoValidate(winLotto) {
    const validatedLotto = winLotto.map((number) => {
      if (isNaN(number)) {
        throw new Error("[ERROR] 로또번호는 숫자만 입력해주세요.");
      }
      if (number.includes(".")) {
        throw new Error("[ERROR] 로또번호는 자연수만 입력해주세요.");
      }
      return parseInt(number);
    });
    return validatedLotto;
  }
}

module.exports = App;
