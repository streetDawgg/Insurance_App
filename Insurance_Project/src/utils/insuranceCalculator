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

  ////////////////////////FAMILY POLICY//////////////////////////////////////
const isFamily = familyDrivers.length > 0;
if(isFamily){

let total = 0; 

const breakdown = [];

familyDrivers.forEach(driver => {
  const makeData = autoDB.find(c => c.make === driver.make);
  const vehicle = makeData?.models.find(model => model.model === driver.model);

if(!vehicle) return;

// vehicle
const vehicleData = vehiclePremium(
  vehicle, 
  basePrice);

const driverData = driverPremium({
    gender:driver.gender,
    age: Number(driver.age),
    occupation: driver.occupation,
    grade: Number(driver.grade),
});

const memberPrice = vehicleData.total * driverData.multiplier 

total += memberPrice;

breakdown.push({
  driver:driver.name,

  vehicle: 
  `${driver.make} ${driver.model}`,

  vehicleBreakdown:
  vehicleData.breakdown,

  driverBreakdown: 
  driverData.breakdown,

  subtotal: 
  memberPrice,
});
});

const policyRate = driverPolicyRate(familyDrivers.length || 1);

total *= policyRate

//final breakdown
breakdown.push( {
  label:
  `Policy (${familyDrivers.length || 1} drivers)`,
  
  rate: 
  policyRate,
  
  amount: 
  total,
});
return{
  total:
  Number(total.toFixed(2)),

  breakdown,
}
}

/////////////////////////SINGLE POLICY/////////////////////////////////
if (!isFamily){
  // vehicle premium
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
],  
  }
};
}
