export class EmailNumberRate {
  constructor() {
    this.ruleName = "rule::number_rate";
  }

  setNext(nextHandler) {
    this.nextHandler = nextHandler;
    return nextHandler;
  }

  next(depotValidator) {
    if (this.nextHandler) {
      return this.nextHandler.handle(depotValidator);
    }
  }

  handle(depotValidator) {
    const { contacts: { email } = {} } = depotValidator.informations;
    let result;

    try {
      if (!email || !(typeof email === "string") || email.indexOf("@") === -1) {
        throw new Error("invalid email");
      }
      const emailPart = email.substring(0, email.indexOf("@"));
      const totalChars = emailPart.length;

      const alphaNumChars = emailPart.match(/([0-9])/g);
      const totalAlphaNum = Array.isArray(alphaNumChars)
        ? alphaNumChars.length
        : 0;

      const percent = (100 * totalAlphaNum) / totalChars;
      result = percent < 30;
    } catch {
      result = false;
    }

    depotValidator.addRule(this.ruleName, result);
    return this.next(depotValidator);
  }
}
