import { DepotValidator } from "../src/domain/depot-validator";
import data from "./mock-data.json";
import { EmailAlphaRate } from "../src/domain/rules";

const emailAlphaRate = new EmailAlphaRate();

describe("EmailAlphaRate rule test", () => {
  test("email alpha rate valid", () => {
    const depotValidator = new DepotValidator(data);
    emailAlphaRate.handle(depotValidator);
    expect(depotValidator.fraudRules).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ruleName: "rule::alpha_rate",
          result: true,
        }),
      ])
    );
  });

  test("email alpha rate invalid", () => {
    data.contacts.email = "te.st-d_ot@yopmail.fr";
    const depotValidator = new DepotValidator(data);
    emailAlphaRate.handle(depotValidator);
    expect(depotValidator.fraudRules).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ruleName: "rule::alpha_rate",
          result: false,
        }),
      ])
    );
  });

  test("email invalid", () => {
    data.contacts.email = "uuuuu";
    const depotValidator = new DepotValidator(data);
    emailAlphaRate.handle(depotValidator);
    expect(depotValidator.fraudRules).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ruleName: "rule::alpha_rate",
          result: false,
        }),
      ])
    );
  });

  test("email undefined", () => {
    delete data.contacts.email;
    const depotValidator = new DepotValidator(data);
    emailAlphaRate.handle(depotValidator);
    expect(depotValidator.fraudRules).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ruleName: "rule::alpha_rate",
          result: false,
        }),
      ])
    );
  });
});
