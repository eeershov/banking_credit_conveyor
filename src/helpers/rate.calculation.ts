import z from "zod";

import { ScoringDataDTO } from "../dto/ScoringDataDTO.js";
import { RATE } from "../services/property.js";


type ScoringDataDTO = z.infer<typeof ScoringDataDTO>;

function getRate(ScoringData: ScoringDataDTO): number {
  let addonRate = 0;
  
  const RATE_SelfEmployed = 1;
  const RATE_BusinessOwner = 3;
  switch (ScoringData.employment.employmentStatus) {
    case "Self-employed":
      addonRate += RATE_SelfEmployed;
      break;
    case "Business owner":
      addonRate += RATE_BusinessOwner;
      break;
  }

  const RATE_MiddleManager = 2;
  const RATE_TopManager = -4;
  switch (ScoringData.employment.position) {
    case "Middle manager":
      addonRate += RATE_MiddleManager;
      break;
    case "Top manager":
      addonRate += RATE_TopManager;
      break;
  }

  const RATE_Married = -3;
  const RATE_Unmarried = 1;
  switch (ScoringData.maritalStatus) {
    case "Married":
      addonRate += RATE_Married;
      break;
    case "Unmarried":
      addonRate += RATE_Unmarried;
      break;
  }

  const RATE_dependents = 1;
  if (ScoringData.dependentAmount > 1) {
    addonRate += RATE_dependents;
  }

  const RATE_HELP_ageGateMale = [30,55];
  const RATE_HELP_ageGateFemale = [35,60];
  const RATE_ageGate = -3;
  const RATE_nonbinary = 3;
  const userSex = ScoringData.gender;
  const userAge = Math.round((Date.now() - ScoringData.birthdate.getDate())/1000/60/60/24/365);
  switch (userSex) {
    case "Female":
      if (userAge >= RATE_HELP_ageGateFemale[0] && 
          userAge <= RATE_HELP_ageGateFemale[1]) {
        addonRate += RATE_ageGate;        
      }
      break;
    case "Male":
      if (userAge >= RATE_HELP_ageGateMale[0] &&
          userAge <= RATE_HELP_ageGateMale[1]) {
        addonRate += RATE_ageGate;
      }
      break;
    case "Prefer not to disclose":
      addonRate += RATE_nonbinary;
  }
  
  return RATE + addonRate;
}


export { getRate };