import data from "../../data.json";
import { FraudRulesHandler } from "../domain/fraud-rules-handler";
import { DepotValidator } from "../domain/depot-validator";
import container from "../container";

const depotValidator = new DepotValidator(data);

const fraudHandler = new FraudRulesHandler({ ...container });
fraudHandler.validationChain(depotValidator);

console.log(depotValidator.formatLog());
