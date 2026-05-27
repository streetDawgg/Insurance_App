import autoDB from "../data/AutoDb";
import { vehiclePremium } from "./vehicleCalculator";
import { driverPremium } from "./driverCalculator";
import { driverPolicyRate } from "./rates";

export const calculateFamilyInsurance = ({
  familyDrivers = [],
  basePrice = 10000,
}) => {

    let total = 0; 

    const breakdown = []

    familyDrivers.forEach(driver =>{
        console.log("Driver input:", driver);
        const makeData = autoDB.find(car => car.make === driver.make);

        console.log("Make Data:", makeData)
        const vehicle = makeData?.models.find(model => model.model === driver.model);
    
        console.log("Vehicle:", vehicle)
    
    const vehicleData = vehiclePremium(vehicle, basePrice);
    if (!vehicleData?.total || isNaN(vehicleData.total)){
        console.log("Invalid vehicle premium", driver)
        return
    }

    const driverData = driverPremium({
        gender:driver.gender || "Male",
        age: Number(driver.age) || 0,
        occupation: driver.occupation || "Worker",
        grade: Number(driver.grade) || 0,
    });
    const safeMultiplier = 
   Number(driverData.multiplier) || 1


    const subtotal = Number((vehicleData.total * safeMultiplier).toFixed(2));

    total += subtotal;
    
    breakdown.push({
        name: driver.name,
        age: Number(driver.age),
        occupation: driver.occupation,
        vehicle:
        `${driver.make} ${driver.model}`,
        subtotal,
        vehicleBreakdown:
            vehicleData.breakdown,
        driverBreakdown:
            driverData.breakdown,
    });
    });

    const policyRate = driverPolicyRate(familyDrivers.length) || 1;
    total *= policyRate;

 
    console.log(breakdown)
    return {
        total: Number(total.toFixed(2)),
        policyRate,
        breakdown,
    }
}