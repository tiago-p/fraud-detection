import { FirstNameLength } from "../src/domain/rules";
import { DepotValidator } from "../src/domain/depot-validator";
import data from "./mock-data.json";

const firstNameLength = new FirstNameLength();

describe("FirstNameLength rule test", () => {
  test("FirstName length valid", () => {
    const depotValidator = new DepotValidator(data);
    firstNameLength.handle(depotValidator);
    expect(depotValidator.fraudRules).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ruleName: "rule::firstname::length",
          result: true,
        }),
      ])
    );
  });

  test("FirstName length error", () => {
    data.contacts.firstName = "bb";
    const depotValidator = new DepotValidator(data);
    firstNameLength.handle(depotValidator);
    expect(depotValidator.fraudRules).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ruleName: "rule::firstname::length",
          result: false,
        }),
      ])
    );
  });

  test("FirstName undefined", () => {
    delete data.contacts;
    const depotValidator = new DepotValidator(data);
    firstNameLength.handle(depotValidator);
    expect(depotValidator.fraudRules).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ruleName: "rule::firstname::length",
          result: false,
        }),
      ])
    );
  });
});
