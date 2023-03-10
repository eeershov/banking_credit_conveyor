import z from "zod";

export const PaymentScheduleElement = z.object({
  "number": z.number(),               // "Integer",
  "date": z.coerce.date(),            // "LocalDate",
  "totalPayment": z.number(),         // "BigDecimal",
  "interestPayment": z.number(),      // "BigDecimal",
  "debtPayment": z.number(),          // "BigDecimal",
  "remainingDebt": z.number()         // "BigDecimal"
});