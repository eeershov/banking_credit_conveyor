import z from "zod";

import { ScoringDataDTO, PaymentScheduleElement, CreditDTO } from "../dto/DTOs.js";
import { getRate } from "../helpers/rate.calculation.js";
import { getTotalLoan } from "../helpers/totalLoan.calculation.js";
import { getDaysInMonth } from "../helpers/daysInMonth.js";


type ScoringDataDTO = z.infer<typeof ScoringDataDTO>;
type CreditDTO = z.infer<typeof CreditDTO>;

function scoring(ScoringData: ScoringDataDTO): CreditDTO | false {
  console.log('scoring data');
  const data = ScoringDataDTO.safeParse(ScoringData);
  if (!data.success) {
    const formatted = data.error.format();
    console.error(formatted);
    return false;
  } else {
    console.log(`prescoring: ${JSON.stringify(data)}`);
    if (!validateScoringData(data.data)) {
      return false;
    }
    return generateCreditData(data.data);
  }
}

// Validating data after zod
function validateScoringData(ScoringData: ScoringDataDTO): boolean {
  // Рабочий статус: Безработный → отказ;
  if (ScoringData.employment.employmentStatus == "Unemployed") {
    return false;
  }

  // Сумма займа больше, чем 20 зарплат → отказ
  const salary20 = ScoringData.employment.salary * 20;
  const creditAmount = ScoringData.amount;
  if (creditAmount > salary20) {
    return false;
  }

  // Возраст менее 20 или более 60 лет → отказ
  const userAge = Math.round((Date.now() - ScoringData.birthdate.getDate())/1000/60/60/24/365);
  const VALIDATE_ageGate = [20,60];
  if (userAge < VALIDATE_ageGate[0] || 
      userAge > VALIDATE_ageGate[1]) {
    return false;
  }

  // Стаж работы: Общий стаж менее 12 месяцев → отказ; Текущий стаж менее 3 месяцев → отказ
  const totalWorkExp = ScoringData.employment.workExperienceTotal;
  const currentWorkExp = ScoringData.employment.workExperienceCurrent;
  const VALIDATE_totalWorkExp = 12;
  const VALIDATE_currentWorkExp = 3;
  if (totalWorkExp < VALIDATE_totalWorkExp) {
    return false;
  }
  if (currentWorkExp < VALIDATE_currentWorkExp) {
    return false;
  }

  return true;
}

// Gets CreditDto from validated data.
function generateCreditData(ScoringData: ScoringDataDTO): CreditDTO {
  const term = ScoringData.term;
  const amount = ScoringData.amount;
  
  // высчитывание ставки(rate), 
  const rate = getRate(ScoringData);
  
  // полной стоимости кредита(psk), 
  const psk = getTotalLoan(amount, term, ScoringData.isInsuranceEnabled);
  
  // размер ежемесячного платежа(monthlyPayment), 
  const monthlyPctRate = rate / 100 / 12;
  const fullTermRate = Math.pow((1 + monthlyPctRate), term);
  const annuityRatio = monthlyPctRate * fullTermRate / (fullTermRate-1);

  const monthlyPayment = psk * annuityRatio;
  
  // график ежемесячных платежей (List<PaymentScheduleElement>).
  type PaymentScheduleElement = z.infer<typeof PaymentScheduleElement>;
  const getMonthlyPaymentCalendar = ({amount, psk, term, rate, monthlyPayment }: {
      amount: number;
      psk: number;
      term: number;
      rate: number;
      monthlyPayment: number;
    }): PaymentScheduleElement[] => {

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // 0 index based
    
    const listOfMonths = [];
    let remainingDebt = amount;
    for (let i = 0; i < term; i++) {
      // Остаток долга × Процентная ставка × Количество дней в месяце / Количество дней в году
      const interestPayment = remainingDebt * rate/100 * getDaysInMonth(currentYear,currentMonth) / 365;
      const debtPayment = monthlyPayment - interestPayment;
      remainingDebt -= debtPayment;
      
      const monthElement = {
        "number": i+1,
        "date": new Date(currentYear, currentMonth + i, 2),
        "totalPayment": monthlyPayment,
        "interestPayment": interestPayment,
        "debtPayment": debtPayment,
        "remainingDebt": remainingDebt
      };
      listOfMonths.push(monthElement);
    }
    console.log(listOfMonths);

    return listOfMonths;
  };

  const CreditData = {
    "amount": amount,
    "term": term,
    "monthlyPayment": monthlyPayment,
    "rate": rate,
    "psk": psk,
    "isInsuranceEnabled": ScoringData.isInsuranceEnabled,
    "isSalaryClient": ScoringData.isSalaryClient,
    "paymentSchedule": getMonthlyPaymentCalendar({amount: amount, psk: psk, term: term, rate: rate, monthlyPayment: monthlyPayment})
  };

  return CreditData;
}


export { scoring };