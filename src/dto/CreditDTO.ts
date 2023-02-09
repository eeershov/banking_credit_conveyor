import z from "zod";
import { PaymentScheduleElement } from "./PaymentScheduleElement.js";

const CreditDTO = z.object({
  "amount": z.number(),                                   // "BigDecimal",
  "term": z.number().int(),                               // "Integer",
  "monthlyPayment": z.number(),                           // "BigDecimal",
  "rate": z.number(),                                     // "BigDecimal",
  "psk": z.number(),                                      // "BigDecimal",
  "isInsuranceEnabled": z.boolean(),                      // "Boolean",
  "isSalaryClient": z.boolean(),                          // "Boolean",
  "paymentSchedule": z.array(PaymentScheduleElement)      // "List<PaymentScheduleElement>"
});

export { CreditDTO };