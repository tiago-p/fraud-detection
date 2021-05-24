export class FirstNameLength {
  constructor() {
    this.ruleName = "rule::firstname::length";
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
    let result = !!(contacts?.firstName?.length > 2);

    depotValidator.addRule(this.ruleName, result);
    return this.next(depotValidator);
  }
}
