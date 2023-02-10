import z from "zod";

export const EmploymentDTO = z.object({
  "employmentStatus": z.enum(["Unemployed", "Self-employed", "Business owner"]),     // "Enum",
  "employerINN": z.string(),                                // "String",
  "salary": z.number(),                                     // "BigDecimal",
  "position": z.enum(["Salaryman", "Middle manager", "Top manager"]),                     // "Enum",
  "workExperienceTotal": z.number().min(12),                        // "Integer",
  "workExperienceCurrent": z.number().min(3)                       // "Integer"
});