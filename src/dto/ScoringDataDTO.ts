import z from "zod";

import { EmploymentDTO } from "./EmploymentDTO.js";


export const ScoringDataDTO = z.object({
  "amount": z.number(),                       // "BigDecimal",
  "term": z.number(),                       // "Integer",
  "firstName": z.string(),                      // "String",
  "lastName": z.string(),                       // "String",
  "middleName": z.string(),                       // "String",
  "gender": z.enum(["Male","Female","Prefer not to disclose"]),                       // "Enum",
  "birthdate": z.coerce.date(),                      // "LocalDate",
  "passportSeries": z.string(),                       // "String",
  "passportNumber": z.string(),                       // "String",
  "passportIssueDate": z.coerce.date(),                      // "LocalDate",
  "passportIssueBranch": z.string(),                      // "String",
  "maritalStatus": z.enum(["Married", "Unmarried"]),                      // "Enum",
  "dependentAmount": z.number(),                      // "Integer",
  "employment": EmploymentDTO,                       // "EmploymentDTO",
  "account": z.string(),                      // "String",
  "isInsuranceEnabled": z.boolean(),                       // "Boolean",
  "isSalaryClient": z.boolean()                        // "Boolean"
});