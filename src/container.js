//handle simple dependency injection
import {
  FirstNameLength,
  EmailAlphaRate,
  EmailNumberRate,
  LastNameLength,
  PriceQuotationRate,
  RegisterNumberBlacklist,
} from "./domain/rules";

import { QuotationService, BlacklistService } from "./infrastructure/external";

const firstNameLength = new FirstNameLength();
const lastNameLength = new LastNameLength();
const emailAlphaRate = new EmailAlphaRate();
const emailNumberRate = new EmailNumberRate();

const priceQuotationRate = new PriceQuotationRate(new QuotationService());
const registerNumberBlacklist = new RegisterNumberBlacklist(
  new BlacklistService()
);

export default {
  firstNameLength,
  lastNameLength,
  emailAlphaRate,
  emailNumberRate,
  registerNumberBlacklist,
  priceQuotationRate,
};
