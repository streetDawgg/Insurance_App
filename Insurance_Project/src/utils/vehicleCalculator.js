import autoDB from "../data/AutoDb";
import {
  autoRates,
  engineRates,
} from "../utils/rates";

export const yearRate = (year) => {
  if (!year) return 1;

  const currentYear = 2026;
  const carAge = currentYear - year
  
  if(carAge <=2) return 1.20;

  if (carAge <= 5) return 1.12;

  if (carAge <= 10) return 1.05;

  if (carAge <= 20) return 0.95;

  return 0.85;
};

export const vehiclePremium = (
    car, 
    basePrice = 10000
) =>{
     // Base Price
  let total = basePrice;

  const breakdown =[];

  breakdown.push({
    label:"Base Price",
    rate: 1,
    amount: total,
});

  // Vehicle Type
  car.type.forEach((type) => {
    const rate = autoRates[type] || 1;
    total *= rate;

    breakdown.push({
        label: `Type (${type})`,
        rate,
        amount: total,
    });
  });

  // Engine
  car.engine.forEach((engine) => {
    const rate = engineRates[engine] || 1;
    total *= rate;

    breakdown.push({
        label:`Engine (${engine})`,
        rate,
        amount: total,
    });
});

  // Year
  const vehicleYearRate = yearRate(car.year);

  total *= vehicleYearRate;

  breakdown.push({
    label:`year (${car.year})`,
    rate: vehicleYearRate,
    amount: total,

  });

  return {
    total,
    breakdown,
  }
}


