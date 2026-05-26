import autoDB from "../data/AutoDb";
import {
  clientRates,
  genderRates,
} from "../utils/rates";

export const ageRate = (age) => {
  if (age <= 19) return 1.45;

  if (age < 25) return 1.2;

  if (age >= 60) return 1.25;

  return 1;
};

export const studentDiscount = (grade) => {
  if (grade >= 85) {
    return 0.75;
  }
  return 1;
};

export const driverPremium = ({
    gender,
    age,
    occupation,
    grade,
}) => {

let multiplier = 1;
const breakdown = [];

  // Occupation
  const occupationRate = Number(clientRates[occupation]) || 1;

  multiplier *= occupationRate;

  breakdown.push({
    label: `Occupation (${occupation})`,
    rate: occupationRate,
    amount: multiplier,
  });

  // Student Discount
  if (occupation === "Student") {
    const safeGrade = Number(grade) || 0;
    const goodStudent = studentDiscount(safeGrade);

    multiplier *= goodStudent;

    breakdown.push({
        label:`Good Student Discount`,
        rate: goodStudent,
        amount: multiplier,
    });
  }

  // Gender
  const genderRateValue = Number(genderRates[gender]) || 1;
  multiplier *= genderRateValue;

  breakdown.push({
    label:`Gender (${gender})`,
    rate: genderRateValue,
    amount: multiplier,
  })

  // Age
 const driverAgeRate = Number(ageRate(age)) || 1;
 multiplier *= driverAgeRate;

  breakdown.push({
    label: `Age (${age})`,
    rate: driverAgeRate,
    amount: multiplier

  });

  return {
    multiplier: Number(multiplier.toFixed(4)),
    breakdown,
  }
}