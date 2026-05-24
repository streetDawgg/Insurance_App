import {useState} from "react";
import autoDB from "../data/AutoDb";
import {calculateFamilyInsurance } from "../utils/familyInsuranceCalculator";
import { calculateSingleInsurance } from "../utils/singleInsuranceCalculator";

import "../styles/Dropdown.css"
import { vehiclePremium } from "../utils/vehicleCalculator";

export default function Dropdown(){

    const [selectedMake, setSelectedMake] = useState("");
    const [selectedModel, setSelectedModel] = useState("");

    const [clientName, setClientName] = useState("");
    const [gender, setGender] = useState("Male");
    const [age, setAge] = useState("");  

    const [occupation, setOccupation] = useState("Worker");
    const [grade, setGrade] = useState("");

    const [policyType, setPolicyType] = useState("Single");
    const [familyDrivers, setFamilyDrivers] = useState([]);

    const [premium, setPremium] = useState(null);
    const [familyPremium, setFamilyPremium] = useState(null);

    const [selectedBreakdown,setSelectedBreakdown] = useState(null)

    // Find Make
    const currentMake = autoDB.find(
        car => car.make === selectedMake
    );

    // Find Model
    const currentModel = currentMake?.models.find(
        model => model.model === selectedModel
    );

    ////////CALCULATION HANDLER///////////
    const handleCalculate = () =>{

        if (policyType === `Single`){ 
          const result = calculateSingleInsurance ({
              car: currentModel,
              gender,
              age: Number(age),
              occupation,
              grade: Number(grade),
              basePrice: 10000
          });  
            setPremium(result)
          } else {
            if (!familyDrivers.length) return;

            const result = calculateFamilyInsurance({ 
            familyDrivers,
            basePrice: 9000
            });
            setFamilyPremium(result);
          }
        }
        
 return (
  
    <div className="page">
      <div className="card">
        <h1 className="title">Auto Insurance Calculator</h1>

  <div className="group">
  <label>Policy Type</label>

  <select
    value={policyType}
    onChange={(e) =>
      setPolicyType(e.target.value)
    }
    className="input"
  >
    <option value="Single">
      Single Policy
    </option>

    <option value="Family">
      Family Policy
    </option>
  </select>
</div>

        {/* Client Name */}
        {policyType === "Single" && (
  <>
        <div className="group">
          <label>Client Name</label>
          <input
            type="text"
            placeholder="Enter full name"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="input"
          />
        </div>

        {/* Gender */}
        <div className="group">
          <label>Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="input"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Age */}
        <div className="group">
          <label>Driver Age</label>
          <input
            type="number"
            placeholder="Enter age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="input"
          />
        </div>

        {/* Occupation */}
        <div className="group">
          <label>Occupation</label>
          <select
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            className="input"
          >
            <option value="Student">Student</option>
            <option value="Worker">Worker</option>
            <option value="Businessman">Businessman</option>
          </select>
        </div>

        {/* Student Grade */}
        {occupation === "Student" && (
          <div className="group">
            <label>Student Grade</label>
            <input
              type="number"
              placeholder="Enter grade"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="input"
            />
          </div>
        )}
                {/* Make Dropdown */}
        <div className="group">
          <label>Vehicle Make</label>
          <select
            value={selectedMake}
            onChange={(e) => {
              setSelectedMake(e.target.value);
              setSelectedModel("");
            }}
            className="input"
          >
            <option value="">Select Make</option>

            {autoDB.map(car => (
              <option key={car.make} value={car.make}>
                {car.make}
              </option>
            ))}
          </select>
        </div>

        {/* Model Dropdown */}
        <div className="group">
          <label>Vehicle Model</label>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="input"
            disabled={!selectedMake}
          >
            <option value="">Select Model</option>

            {currentMake?.models.map(model => (
              <option key={model.model} value={model.model}>
                {model.model}
              </option>
            ))}
          </select>
        </div>

        {/* Calculate Button */}
        <button onClick={handleCalculate} className="button">
          Calculate Premium
        </button>

        {/* Result */}
        {premium && (
          <div className="result">
            <h2>Estimated Premium</h2>
            <h1>
              ₱
              {premium.total.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </h1>
            <p>
              Client: <strong>{clientName}</strong>
            </p>

            <p>
              Vehicle:
              <strong>
                {" "}
                {selectedMake} {selectedModel}
              </strong>
            </p>

            <div className="breakdown">
  <h3>Premium Breakdown</h3>

  {premium.breakdown.map((item, index) => (
    <div key={index} className="breakdown-item">

      <div>
        <strong>{item.label}</strong>
      </div>

      <div>
        x {item.rate.toFixed(2)}
      </div>

      <div>
        ₱
        {item.amount.toLocaleString(undefined, {
          maximumFractionDigits: 2,
        })}
      </div>

    </div>
  ))}
</div>
            <h2>Breakdown:</h2>
            <h1>
              ₱
              {premium.total.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </h1>
          </div>
        )}
      </>)}

{/*- ----------------------------------------------------------------------------------------------------------------------------------- */}
{/* FAMILY SECTION */}
{policyType === `Family` && (
<div className="family-section">

  {/* TOP ROW */}
  <div className="family-row">

    {familyDrivers.map((driver, index) => {

      const driverMakeData =
        autoDB.find(
          car => car.make === driver.make
        );

        const calculated = familyPremium?.breakdown?.find(
          b => b.name === driver.name
        );

      return (

        <div key={index} className="driver-card">

 <input
    type="text"
    placeholder="Driver Name"
    value={driver.name}
    onChange={(e) => {
      const updated = [...familyDrivers];
      updated[index].name = e.target.value;
      setFamilyDrivers(updated);
    }}
    className="input"
  />

  <input
    type="number"
    placeholder="Age"
    value={driver.age}
    onChange={(e) => {
      const updated = [...familyDrivers];
      updated[index].age = e.target.value;
      setFamilyDrivers(updated);
    }}
    className="input"
  />

  <select
    value={driver.gender}
    onChange={(e) => {
      const updated = [...familyDrivers];
      updated[index].gender = e.target.value;
      setFamilyDrivers(updated);
    }}
    className="input"
  >
    <option value="Male">Male</option>
    <option value="Female">Female</option>
  </select>

<select
value ={driver.occupation}
onChange={(e) => {
   const updated = [...familyDrivers];
   updated[index].occupation = e.target.value;
   setFamilyDrivers(updated);
}}
className = "input"
>
  <option value="Worker"
  >Worker
  </option>

  <option value="Businessman"
  >Businessman
  </option>

  <option value="Student"
  >Student
  </option>
</select>
{driver.occupation === "Student" && (
  <input
    type = "number"
    placeholder="Student Grade"
    value={driver.grade}
    onChange={(e)=> {
      const updated = [...familyDrivers];

      updated[index].grade = 
      e.target.value;

      setFamilyDrivers(updated);
    }}
    className="input"
    ></input>
)}
  <select
    value={driver.make}
    onChange={(e) => {
      const updated = [...familyDrivers];
      updated[index].make = e.target.value;
      updated[index].model = "";
      setFamilyDrivers(updated);
    }}
    className="input"
  >
    <option value="">Select Make</option>

    {autoDB.map(car => (
      <option key={car.make} value={car.make}>
        {car.make}
      </option>
    ))}
  </select>

  <select
    value={driver.model}
    onChange={(e) => {
      const updated = [...familyDrivers];
      updated[index].model = e.target.value;
      setFamilyDrivers(updated);
    }}
    className="input"
  >
    <option value="">Select Model</option>

    {driverMakeData?.models?.map(model => (
      <option
        key={model.model}
        value={model.model}
      >
        {model.model}
      </option>
    ))}
  </select>

  {/* PREMIUM INFO */}
  {calculated && (
    <>
      <h2 className="price">
        ₱
        {calculated
          .subtotal
          ?.toLocaleString()}
      </h2>

      <button
        className="breakdown-btn"
        onClick={() =>
          setSelectedBreakdown(
            familyPremium.breakdown[index]
          )
        }
      >
        View Breakdown
      </button>
    </>
  )}

        </div>

      );

    })}

    {/* ADD CARD */}
    <div className="add-card">
    
      <button
        className="add-btn"
        onClick={() => {
          setFamilyDrivers([
            ...familyDrivers,
            {
              name: "",
              age: "",
              gender: "Male",
              occupation: "Worker",
              grade: "",
              make: "",
              model: ""
            }
          ]);
        }}
      >
        + Add Card
      </button>

    </div>

  </div>
{selectedBreakdown && (
  <div
    className="modal-overlay"
    onClick={() => setSelectedBreakdown(null)}
  >
    <div
      className="modal-content"
      onClick={(e) => e.stopPropagation()}
    >
      <h2>{selectedBreakdown.name}</h2>

      <p>
        Vehicle:
        <strong>
          {" "}
          {selectedBreakdown.vehicle}
        </strong>
      </p>

      <h3>Vehicle Breakdown</h3>

      {selectedBreakdown.vehicleBreakdown?.map((v, i) => (
        <div key={i} className="modal-row">
          <span>{v.label}</span>
          <span>x{v.rate}</span>
        </div>
      ))}

      <h3>Driver Breakdown</h3>

      {selectedBreakdown.driverBreakdown?.map((d, i) => (
        <div key={i} className="modal-row">
          <span>{d.label}</span>
          <span>x{d.rate}</span>
        </div>
      ))}

      <h2>
        ₱
        {selectedBreakdown.subtotal?.toLocaleString()}
      </h2>

      <button
        className="close-btn"
        onClick={() => setSelectedBreakdown(null)}
      >
        Close
      </button>
    </div>
    
  </div>
  
)}
  {/* Calculate Button */}
        <button onClick={handleCalculate} className="button">
          Calculate Premium
        </button>
  {/* TOTAL */}
  <div className="family-total-box">

    <h2> TOTAL FAMILY PREMIUM </h2>

    <h1>
      ₱{Number(familyPremium?.total || 0).toLocaleString()}
    </h1>

  </div>
  
</div>
)}

{/* -------------------------------------------------------------------------*/}
</div>
  </div>
  
  );
}

