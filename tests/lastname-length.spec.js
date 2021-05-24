import { DepotValidator } from "../src/domain/depot-validator";
import data from "./mock-data.json";
import { LastNameLength } from "../src/domain/rules";

const lastNameLength = new LastNameLength();

describe("LastNameLength rule test", () => {
  test("Lastname length valid", () => {
    const depotValidator = new DepotValidator(data);
    lastNameLength.handle(depotValidator);
    expect(depotValidator.fraudRules).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ruleName: "rule::lastname::length",
          result: true,
        }),
      ])
    );
  });

  test("Lastname length error", () => {
    data.contacts.lastName = "ss";
    const depotValidator = new DepotValidator(data);
    lastNameLength.handle(depotValidator);
    expect(depotValidator.fraudRules).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ruleName: "rule::lastname::length",
          result: false,
        }),
      ])
    );
  });

  test("Lastname undefined", () => {
    delete data.contacts;
    const depotValidator = new DepotValidator(data);
    lastNameLength.handle(depotValidator);
    expect(depotValidator.fraudRules).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ruleName: "rule::lastname::length",
          result: false,
        }),
      ])
    );
  });
});
