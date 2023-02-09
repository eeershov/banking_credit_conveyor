import z from "zod";

export const LoanOfferDTO = z.object({
  "applicationId": z.number(),            // "Long"
  "requestedAmount": z.number(),          // "BigDecimal"
  "totalAmount": z.number(),              // "BigDecimal"
  "term": z.number(),                     // "Integer"
  "monthlyPayment": z.number(),           // "BigDecimal"
  "rate": z.number(),                     // "BigDecimal"
  "isInsuranceEnabled": z.boolean(),      // "Boolean"
  "isSalaryClient": z.boolean()           // "Boolean"
})

// interface LoanOfferDTO {
//   "applicationId": number,            // "Long"
//   "requestedAmount": number,          // "BigDecimal"
//   "totalAmount": number,              // "BigDecimal"
//   "term": number,                     // "Integer"
//   "monthlyPayment": number,           // "BigDecimal"
//   "rate": number,                     // "BigDecimal"
//   "isInsuranceEnabled": boolean,      // "Boolean"
//   "isSalaryClient": boolean           // "Boolean"
// }