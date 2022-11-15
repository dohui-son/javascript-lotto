const MissionUtils = require("@woowacourse/mission-utils");

class UserLotto {
  #userLotto;

  constructor(totalLotto) {
    this.userLotto = [];
    this.createUserLotto(totalLotto);
    this.#userLotto = this.userLotto;
    this.printUserLotto(totalLotto);
  }

  createUserLotto(totalLotto) {
    for (let number = 0; number < totalLotto; number++) {
      const RANDOM = MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6);
      if (RANDOM) {
        const NEW_LOTTO = RANDOM.sort((a, b) => a - b);
        this.userLotto.push(NEW_LOTTO);
      }
    }
  }

  printUserLotto(totalLotto) {
    MissionUtils.Console.print(`${totalLotto}개를 구매했습니다.`);
    for (let index = 0; index < totalLotto; index++) {
      const FORMATTED_LOTTO = this.printFormatter(this.userLotto[index]);
      MissionUtils.Console.print("[" + FORMATTED_LOTTO + "]");
    }
  }

  printFormatter(lotto) {
    const STR_LOTTO = lotto.map((number) => {
      return String(number);
    });
    const FORMATTED_LOTTO = STR_LOTTO.join(", ");
    return FORMATTED_LOTTO;
  }

  getUserLotto() {
    return this.#userLotto;
  }
}

module.exports = UserLotto;