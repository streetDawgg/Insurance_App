export const autoRates = {
  Coupe: 1,
  Luxury: 1.2,
  Sports: 1.3,
  Sedan: 1.2,
  SUV: 1.1,
  Hatchback: 1,
};

export const engineRates = {
  V: 1.1,
  Inline: 1,
  Hybrid: 1.05,
  Electric: 1.15,
  Flat: 1.1,
};

export const clientRates = {
  Student: 1.1,
  Businessman: 1.15,
  Worker: 1,
};

export const genderRates = {
  Male: 0.7,
  Female: 0.9,
};

export const driverPolicyRate = (
  numDrivers) => {
    
  if (numDrivers === 1) return 1;

  if (numDrivers <= 2) return 1.08;

  if (numDrivers <= 4) return 1.15;

  return 1.25;
};