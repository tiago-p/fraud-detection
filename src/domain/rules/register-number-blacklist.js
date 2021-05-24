export class RegisterNumberBlacklist {
  constructor(blacklistService) {
    this.ruleName = "rule::registernumber::blacklist";
    this.blacklistService = blacklistService;
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
    //@TODO
    //call this.blacklistService.checkRegisterNumberIsBlacklisted();
    depotValidator.addRule(this.ruleName, false);
    return this.next(depotValidator);
  }
}
