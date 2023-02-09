import { LoanApplicationRequestDTO } from "./LoanApplicationRequestDTO.js";
import { LoanOfferDTO } from "./LoanOfferDTO.js";
import { PaymentScheduleElement } from "./PaymentScheduleElement.js";
import { CreditDTO } from "./CreditDTO.js";

// interface ScoringDataDTO {
//   "amount": "BigDecimal",
//   "term": "Integer",
//   "firstName": "String",
//   "lastName": "String",
//   "middleName": "String",
//   "gender": "Enum",
//   "birthdate": "LocalDate",
//   "passportSeries": "String",
//   "passportNumber": "String",
//   "passportIssueDate": "LocalDate",
//   "passportIssueBranch": "String",
//   "maritalStatus": "Enum",
//   "dependentAmount": "Integer",
//   "employment": "EmploymentDTO",
//   "account": "String",
//   "isInsuranceEnabled": "Boolean",
//   "isSalaryClient": "Boolean"
// }

// interface CreditDTO {
//   "amount": "BigDecimal",
//   "term": "Integer",
//   "monthlyPayment": "BigDecimal",
//   "rate": "BigDecimal",
//   "psk": "BigDecimal",
//   "isInsuranceEnabled": "Boolean",
//   "isSalaryClient": "Boolean",
//   "paymentSchedule": "List<PaymentScheduleElement>"
// }


// interface EmploymentDTO {
//   "employmentStatus": "Enum",
//   "employerINN": "String",
//   "salary": "BigDecimal",
//   "position": "Enum",
//   "workExperienceTotal": "Integer",
//   "workExperienceCurrent": "Integer"
// }

// interface PaymentScheduleElement {
//   "number": "Integer",
//   "date": "LocalDate",
//   "totalPayment": "BigDecimal",
//   "interestPayment": "BigDecimal",
//   "debtPayment": "BigDecimal",
//   "remainingDebt": "BigDecimal"
// }

export {
  LoanApplicationRequestDTO, 
  LoanOfferDTO,
  CreditDTO,
  PaymentScheduleElement
};