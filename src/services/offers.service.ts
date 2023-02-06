import { LoanApplicationRequestDTO, LoanOfferDTO } from "../dto/DTOs.js";

export function prescoring(obj:LoanApplicationRequestDTO): Array<LoanOfferDTO> {
  console.log(`prescoring: ${JSON.stringify(obj)}`)
  return new Array<LoanOfferDTO>
}