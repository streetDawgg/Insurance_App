import autoDB from "../data/AutoDb";
import { vehiclePremium } from "./vehicleCalculator";
import { driverPremium } from "./driverCalculator";
import { driverPolicyRate } from "./rates";


export const calculateInsurance = ({
  car,
  gender,
  age,
  occupation,
  grade,
  familyDrivers = [],
  basePrice = 10000,
}) => {

  //Family cal
const isFamily = familyDrivers.length > 0;

if (!isFamily){
  // vehicle premium
    const vehicleData = 
      vehiclePremium(
        car, 
        basePrice);
let price = vehicleData.price;

// driver
  const driverData = 
  driverPremium ({
    gender,
    age,
    occupation,
    grade,
});
price *= driverData.multiplier || 1 ;

  // Total Drivers
  const totalDrivers = (familyDrivers?.length || 0) +1;
  // Policy Calculation
  const policyRate = driverPolicyRate(totalDrivers) || 1;
    
  price *= policyRate || 1;

  return{ 
    total:Number(price.toFixed(2)),
    breakdown:[
      ...vehicleData.breakdown,
      ...driverData.breakdown,
    {
      label: `Policy (${totalDrivers} drivers)`,
      rate: policyRate,
      amount: price,
  },
],  
  }
};
}
