import z from "zod";

const legalAgeBirthday = new Date(new Date().setFullYear(new Date().getFullYear() - 18));
export const LoanApplicationRequestDTO = z.object({
  "amount": z.number().min(10000),              // "BigDecimal"
  "term": z.number().min(6),                    // "Integer"
  "firstName": z.string().min(2).max(30),       // "String"
  "lastName": z.string().min(2).max(30),        // "String"
  "middleName": z.string().optional(),          // "String"
  "email": z.string()
    .regex(/[\w\.]{2,50}@[\w\.]{2,20}/),                          // "String"
  "birthdate": z.coerce.date()
    .max(legalAgeBirthday),                        // "LocalDate"
  "passportSeries": z.string().length(4),       // "String"
  "passportNumber": z.string().length(6)        // "String"
});