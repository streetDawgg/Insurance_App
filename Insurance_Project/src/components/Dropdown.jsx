import {useState} from "react";
import autoDB from "../data/AutoDb";
import {calculateInsurance} from "../utils/insuranceCalculator";

import "../styles/Dropdown.css"

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

    // Find Make
    const currentMake = autoDB.find(
        car => car.make === selectedMake
    );

    // Find Model
    const currentModel = currentMake?.models.find(
        model => model.model === selectedModel
    );

    const handleCalculate = () =>{
        if (!currentModel){
            alert("Select a vehicle");
            return;
        }
    
   const result = calculateInsurance({
    car: currentModel,
    gender,
    age: Number(age),
    occupation,
    grade: Number(grade),
    basePrice: 10000,
});

    setPremium(result)
    };

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

            <h1>
              ₱
              {premium.total.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </h1>
          </div>
        )}
      </>)}

      {policyType === "Family" && (

// FAMILY SELECTION
  <div className="family-section">
    

    <h2>Family Drivers</h2>

    {familyDrivers.map((driver, index) => {
      const driverMakeData = autoDB.find(car => car.make === driver.make);
      return(
      <div
        key={index}
        className="family-card"
      >

        <input
          type="text"
          placeholder="Driver Name"
          value={driver.name}
          onChange={(e) => {
            
            const updated =
              [...familyDrivers];

            updated[index].name =
              e.target.value;

            setFamilyDrivers(updated);
          }}
          className="input"
        />
        <select
          value={driver.gender}
          onChange={(e) => {
            const updated = [...familyDrivers];

            updated[index].gender =
              e.target.value;

            setFamilyDrivers(updated);
          }}
          className="input"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <input
          type="number"
          placeholder="Age"
          value={driver.age}
          onChange={(e) => {

            const updated =
              [...familyDrivers];

            updated[index].age =
              e.target.value;

            setFamilyDrivers(updated);
          }}
          className="input"
        />

        <select
  value={driver.occupation}
  onChange={(e) => {
    const updated = [...familyDrivers];

    updated[index].occupation =
      e.target.value;

    setFamilyDrivers(updated);
  }}
  className="input">
  <option value="Businessman">Businessman</option>
  <option value="Worker">Worker</option>
  <option value="Student">Student</option>
</select>

      {driver.occupation === "Student" && (
                <div className="group">
                  <label>Student Grade</label>
                  <input
                    type="number"
                    placeholder="Enter grade"
                    value={driver.grade || ""}
                    onChange={(e) => { 
                    const updated = [...familyDrivers];
                    updated[index].grade = e.target.value;
                    setFamilyDrivers(updated)
                    }}

                    className="input"/>
                </div>
              )}

          <select
          value={driver.make}
          onChange={(e) =>{

            const updated = [...familyDrivers];
          updated[index].make = 
          e.target.value;
          setFamilyDrivers(updated)
          }}    
          className = "input">
        <option value ="">Select Make</option>

        {autoDB.map(car =>(
          <option
          key={car.make}
          value={car.make}
          >
            {car.make}
          </option>
        )
      )};
          </select>
          
  <select
  value={driver.model}
  onChange={(e) =>{
    const updated = [...familyDrivers];
    updated[index].model = 
    e.target.value;
    
    setFamilyDrivers(updated);
}}  
className = "input">

<option value = ""> Select Model </option>

{autoDB.find(car => car.make === driver.make)
?.models.map(model => (
  <option key={model.model} value={model.model}>
    {model.model}
  </option>
))}

</select>

      </div>
      );
})}

    <button
      className="button"
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
          },
        ]);
      }}
    >
      Add Family Driver
    </button>

  </div>
)}


      </div>
    </div>
  );
}