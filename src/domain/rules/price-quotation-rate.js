export class PriceQuotationRate {
  constructor(quotationService) {
    this.ruleName = "rule::price::quotation_rate";
    this.quotationService = quotationService;
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
    //call this.quotationService.getPriceQuotation();
    depotValidator.addRule(this.ruleName, false);
    return this.next(depotValidator);
  }
}
