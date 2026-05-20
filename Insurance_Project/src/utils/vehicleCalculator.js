import autoDB from "../data/AutoDb";
import {
  autoRates,
  engineRates,
} from "../utils/rates";

export const yearRate = (year) => {
  if (!year) return 1;

  const minRate = 1.0;
  const maxRate = 1.6;

  const baseYear = 1980;
  const latestYear = 2026;

  let progress =
    (year - baseYear) /
    (latestYear - baseYear);

  progress = Math.max(0, Math.min(progress, 1));

  return (
    minRate +
    (maxRate - minRate) *
      Math.pow(progress, 1.5)
  );
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
  const vehicleYearRate = (car.year);

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


