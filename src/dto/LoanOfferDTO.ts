export interface LoanOfferDTO {
  "applicationId": number,            // "Long"
  "requestedAmount": number,          // "BigDecimal"
  "totalAmount": number,              // "BigDecimal"
  "term": number,                     // "Integer"
  "monthlyPayment": number,           // "BigDecimal"
  "rate": number,                     // "BigDecimal"
  "isInsuranceEnabled": boolean,      // "Boolean"
  "isSalaryClient": boolean           // "Boolean"
}