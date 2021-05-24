export class LastNameLength {
  constructor() {
    this.ruleName = "rule::lastname::length";
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
    const { contacts } = depotValidator.informations;
    //check length
    let result = !!(contacts?.lastName?.length > 2);

    depotValidator.addRule(this.ruleName, result);
    return this.next(depotValidator);
  }
}
