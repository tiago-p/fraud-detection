export class DepotValidator {
  constructor(informations) {
    this.informations = informations;
    this.fraudRules = [];
  }

  addRule(ruleName, result) {
    this.fraudRules.push({ ruleName, result });
  }

  isScam() {
    const invalidRule = this.fraudRules.find((rule) => {
      return rule.result === false;
    });
    return !!invalidRule;
  }

  getInvalidRules() {
    return this.fraudRules
      .filter((item) => {
        return item.result === false;
      })
      .map((item) => item.ruleName);
  }

  formatLog() {
    return {
      reference: this.informations.reference,
      scam: this.isScam(),
      rules: this.getInvalidRules(),
    };
  }
}
