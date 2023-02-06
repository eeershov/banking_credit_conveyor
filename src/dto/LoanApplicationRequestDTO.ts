export interface LoanApplicationRequestDTO {
  "amount": number,               // "BigDecimal"
  "term": number,                 // "Integer"
  "firstName": string,            // "String"
  "lastName": string,             // "String"
  "middleName"?: string,           // "String"
  "email": string,                // "String"
  "birthdate": Date,              // "LocalDate"
  "passportSeries": string,       // "String"
  "passportNumber": string        // "String"
}