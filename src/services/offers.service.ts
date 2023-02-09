import { LoanApplicationRequestDTO, LoanOfferDTO } from "../dto/DTOs.js";
import z from "zod";

import RATE from "./property.js";


// По API приходит LoanApplicationRequestDTO.
// На основании LoanApplicationRequestDTO происходит 
// прескоринг (п.6.1) 


// создаётся 4 кредитных предложения LoanOfferDTO 
// на основании всех возможных комбинаций булевских полей isInsuranceEnabled и isSalaryClient 
// (false-false, false-true, true-false, true-true). 
// Логику формирования кредитных предложений можно придумать самому. 
// К примеру: в зависимости от страховых услуг увеличивается/уменьшается процентная ставка и сумма кредита, 
// базовая ставка хардкодится в коде через property файл.

// Например цена страховки 100к (или прогрессивная, в зависимости от запрошенной суммы кредита), 
// ее стоимость добавляется в тело кредита, но она уменьшает ставку на 3. 
// Цена зарплатного клиента 0, уменьшает ставку на 1.

// Ответ на API - список из 4х LoanOfferDTO от "худшего" к "лучшему" (чем меньше итоговая ставка, тем лучше).


// prescoring validates both:
// data types and minimal requirements

type LoanApplicationRequestDTO = z.infer<typeof LoanApplicationRequestDTO>;
type LoanOfferDTO = z.infer<typeof LoanOfferDTO>;

function prescoring(obj: LoanApplicationRequestDTO): LoanOfferDTO[] {
  const result = {
    valid: true,
    errors: []
  };
  
  const data = LoanApplicationRequestDTO.safeParse(obj)
  if (!data.success) {
    const formatted = data.error.format();
    console.error(formatted)
  } else {
    console.log(`prescoring: ${JSON.stringify(data)}`)
  }
  
  // obj.amount                //: number,               // "BigDecimal"
  // obj.term                  //: number,                 // "Integer"
  // obj.firstName             //: string,            // "String"
  // obj.lastName              //: string,             // "String"
  // obj.middleName            //?: string,           // "String"
  // obj.email                 //: string,                // "String"
  // obj.birthdate             //: Date,              // "LocalDate"
  // obj.passportSeries        //: string,       // "String"
  // obj.passportNumber        //: string        // "String"
  
  
  return []
}

function generateLoanOffer(obj: LoanApplicationRequestDTO): LoanOfferDTO {
  let result = {
    "applicationId": 123123,            // "Long"
    "requestedAmount": 123123,          // "BigDecimal"
    "totalAmount": 123123,              // "BigDecimal"
    "term": 123123123,                     // "Integer"
    "monthlyPayment": 123123123,           // "BigDecimal"
    "rate": 123123123,                     // "BigDecimal"
    "isInsuranceEnabled": true,      // "Boolean"
    "isSalaryClient": true           // "Boolean"
  };
  return result
}

export { prescoring }