import { DepotValidator } from "../src/domain/depot-validator";
import data from "./mock-data.json";
import { EmailNumberRate } from "../src/domain/rules";

const emailNumberRate = new EmailNumberRate();

describe("EmailNumberRate rule test", () => {
  test("email number rate valid", () => {
    const depotValidator = new DepotValidator(data);
    emailNumberRate.handle(depotValidator);
    expect(depotValidator.fraudRules).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ruleName: "rule::number_rate",
          result: true,
        }),
      ])
    );
  });

  test("email number rate invalid", () => {
    data.contacts.email = "t45621@yopmail.fr";
    const depotValidator = new DepotValidator(data);
    emailNumberRate.handle(depotValidator);
    expect(depotValidator.fraudRules).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ruleName: "rule::number_rate",
          result: false,
        }),
      ])
    );
  });

  test("email invalid", () => {
    data.contacts.email = "456uuu";
    const depotValidator = new DepotValidator(data);
    emailNumberRate.handle(depotValidator);
    expect(depotValidator.fraudRules).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ruleName: "rule::number_rate",
          result: false,
        }),
      ])
    );
  });

  test("email undefined", () => {
    delete data.contacts.email;
    const depotValidator = new DepotValidator(data);
    emailNumberRate.handle(depotValidator);
    expect(depotValidator.fraudRules).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ruleName: "rule::number_rate",
          result: false,
        }),
      ])
    );
  });
});
