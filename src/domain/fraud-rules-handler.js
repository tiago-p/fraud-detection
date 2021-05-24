export class FraudRulesHandler {
  constructor({
    firstNameLength,
    emailAlphaRate,
    lastNameLength,
    priceQuotationRate,
    registerNumberBlacklist,
    emailNumberRate,
  }) {
    this.emailAlphaRate = emailAlphaRate;
    this.firstNameLength = firstNameLength;
    this.lastNameLength = lastNameLength;
    this.priceQuotationRate = priceQuotationRate;
    this.registerNumberBlacklist = registerNumberBlacklist;
    this.emailNumberRate = emailNumberRate;
  }

  validationChain(depotValidator) {
    //pattern chain of responsability
    this.firstNameLength
      .setNext(this.lastNameLength)
      .setNext(this.emailAlphaRate)
      .setNext(this.emailNumberRate)
      .setNext(this.priceQuotationRate)
      .setNext(this.registerNumberBlacklist);

    this.firstNameLength.handle(depotValidator);

    return depotValidator;
  }
}
