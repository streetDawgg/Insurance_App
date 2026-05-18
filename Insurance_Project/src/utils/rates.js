export const autoRates = {
  Coupe: 1.25,
  Luxury: 1.6,
  Sports: 1.8,
  Sedan: 1.2,
  SUV: 1.4,
  Hatchback: 1.2,
};

export const engineRates = {
  V: 1.25,
  Inline: 1.2,
  Hybrid: 1.25,
  Electric: 1.15,
};

export const clientRates = {
  Student: 0.45,
  Businessman: 1.2,
  Worker: 0.9,
};

export const genderRates = {
  Male: 1.2,
  Female: 1.3,
};

export const driverPolicyRate = (
  numDrivers) => {
    
  if (numDrivers === 1) return 1;

  if (numDrivers <= 2) return 1.1;

  if (numDrivers <= 4) return 1.25;

  return 1.4;
};