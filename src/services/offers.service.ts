import { LoanApplicationRequestDTO, LoanOfferDTO } from "../dto/DTOs.js";
import z from "zod";

import { RATE, RATE_INSURANCE } from "./property.js";


// prescoring validates both:
// data types and minimal requirements

type LoanApplicationRequestDTO = z.infer<typeof LoanApplicationRequestDTO>;
type LoanOfferDTO = z.infer<typeof LoanOfferDTO>;

function prescoring(LoanApplication: LoanApplicationRequestDTO): LoanOfferDTO[] | false {
  
  const data = LoanApplicationRequestDTO.safeParse(LoanApplication);
  if (!data.success) {
    const formatted = data.error.format();
    console.log(formatted);
    return false;
  } else {
    console.log(`prescoring: ${JSON.stringify(data)}`);
    return generateLoanOffers(LoanApplication);
  }

}


function generateLoanOffers(LoanApplication: LoanApplicationRequestDTO): LoanOfferDTO[] {
  const amount = LoanApplication.amount;
  const term = LoanApplication.term;

  const offersList = [];
  offersList.push(getLoanOffer(amount, term, false, false));
  offersList.push(getLoanOffer(amount, term, false, true));
  offersList.push(getLoanOffer(amount, term, true, false));
  offersList.push(getLoanOffer(amount, term, true, true));

  return offersList;
}

function getLoanOffer(amount: number, term: number, isInsuranceEnabled: boolean, isSalaryClient: boolean): LoanOfferDTO {
  const RATE_isInsuranceEnabled = -1;
  const RATE_isSalaryClient = -1;
  
  let addonRate = 0;
  let totalAmount = amount;

  if (isInsuranceEnabled) {
    addonRate += RATE_isInsuranceEnabled;
    totalAmount += totalAmount * RATE_INSURANCE/100;
  } else {
    addonRate += 1;
  }

  if (isSalaryClient) {
    addonRate += RATE_isSalaryClient;
  }
  const calculatedRate = RATE + addonRate;

  const monthlyPayment = totalAmount / term;

  const offer = {
    "applicationId": Math.round(Math.random()*100000000),      // "Long"
    "requestedAmount": amount,                // "BigDecimal"
    "totalAmount": totalAmount,                    // "BigDecimal"
    "term": term,                             // "Integer"
    "monthlyPayment": monthlyPayment,                      // "BigDecimal"
    "rate": calculatedRate,                                // "BigDecimal"
    "isInsuranceEnabled": isInsuranceEnabled,      // "Boolean"
    "isSalaryClient": isSalaryClient           // "Boolean"
  };

  return offer;
}

export { prescoring };