import { vehiclePremium } from "./vehicleCalculator";
import { driverPremium } from "./driverCalculator";


export const calculateSingleInsurance = ({
    car,
    gender,
    age,
    occupation,
    grade,
    basePrice = 10000,
}) =>{
  //Vehikol
    const vehicleData = 
          vehiclePremium(car, basePrice);
    
    // driver
      const driverData = 
      driverPremium ({
        gender,
        age,
        occupation,
        grade,
    });
    
    let price = vehicleData.total * driverData.multiplier || 1 ;

  return{ 
    total:Number(price.toFixed(2)),
    breakdown:[
      ...vehicleData.breakdown,
      ...driverData.breakdown,
], 
  } 
  }


