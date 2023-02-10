import { RATE_INSURANCE } from "../services/property.js";
 
function getTotalLoan(amount: number, term: number, isInsuranceEnabled: boolean): number {
  if (isInsuranceEnabled) {
    const loan = amount + amount * RATE_INSURANCE/100 * (term / 12);
    return loan;
  }
  return amount;
}

export { getTotalLoan };