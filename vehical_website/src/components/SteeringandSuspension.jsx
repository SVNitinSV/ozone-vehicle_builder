import React, { useState } from "react";
import {
  Input,
  Button,
} from "@material-tailwind/react";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

import input_des from "./assets/steer_input_desc.json";
import symbols from "./assets/symbols.json";

import { calculateSteeringAndSuspen } from "../assets/calculators/CalculateSteeringAndSuspen";

const SteerSuspCalc = ({ formData, setFormData, nextStep, prevStep }) => {
  const [result, setResult] = useState("");
  const [operand, setOperand] = useState({
    wheelBase: "",
    track: "",
    turningRadius: "",
    OperationalLoad: "",
    fullLoad: "",
    safetyLoad: "",
    frontWeight: "",
    rearWeight: "",
    displacement: ""
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOperand((prevOperand) => ({
      ...prevOperand,
      [name]: value,
    }));
  };

  // Handle calculation
  const handleCalculate = () => {
    // Check if any input fields are empty
    const emptyFields = Object.keys(operand).filter((key) => operand[key] === "");
  
    if (emptyFields.length > 0) {
      // Alert the user if there are empty fields
      alert("Please fill in all the fields before calculating.");
      return; // Exit the function to prevent calculation
    }
  
    // Perform the calculation if all fields are filled
    const calculationResult = calculateSteeringAndSuspen(operand);
    setResult(calculationResult);
  };
  

  return (
    <div className="h-[100vh] m-5 ">
      <h1 className="text-3xl font-bold text-center mt-10">
        Specification Inputs
      </h1>
      <div className="p-4 border border-gray-300 rounded-lg shadow-md w-full max-w-3xl mx-auto mt-10 rounded-none">
        <div className="text-center mb-5">
          <h1 className="text-xl font-bold ">Enter Desired Specifications</h1>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg mb-4 shadow-inner rounded-none">
        <h1 className="text-xl font-bold ">Streeting Angle Calculations:</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 mt-5 w-full">
            {Object.keys(operand).slice(0,3).map((key) => {
              return (
                <div key={key} className="mb-4">
                  <label className="block mb-3 font-bold">
                    {key.replace(/([A-Z])/g, " $1").toUpperCase()}:
                    {symbols[key] && (
                      <span className="ml-2 text-sm text-gray-600">
                        ({symbols[key]})
                      </span>
                    )}
                  </label>

                  <div className="flex items-center">
                    <Input
                      type="number"
                      variant="standard"
                      label={input_des[key]}
                      name={key}
                      value={operand[key]}
                      onChange={handleChange}
                      className="w-full p-2"
                      required
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-6">
        
          </div>
          {result && (
            <div className="mt-6">
              <h2 className="text-2xl font-bold">Calculation Result:</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 w-full mt-5">
            {Object.keys(result).length > 0 ? (
              Object.keys(result).slice(0,4)
                .map((key) => (
                  <div key={key} className="">
                    <label className="font-bold text-xs">
                      {key.replace(/([A-Z])/g, " $1").toUpperCase()}:
                      {symbols[key] && (
                      <span className="ml-2 text-sm text-gray-600">
                        ({symbols[key]})
                      </span>
                    )}
                    </label>{" "}
                    <label className="text-xs">{result[key]}</label>
                  </div>
                ))
            ) : (
              <p>No results to display. Please calculate first.</p>
            )}
          </div>
             
            </div>
          )}
        </div>

        <div className="bg-gray-100 p-4 rounded-lg mb-4 shadow-inner rounded-none">
        <h1 className="text-xl font-bold ">Suspension Calculations:</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 w-full mt-5">
            {Object.keys(operand).slice(3).map((key) => {
              return (
                <div key={key} className="mb-4">
                  <label className="block mb-3 font-bold">
                    {key.replace(/([A-Z])/g, " $1").toUpperCase()}:
                    {symbols[key] && (
                      <span className="ml-2 text-sm text-gray-600">
                        ({symbols[key]})
                      </span>
                    )}
                  </label>

                  <div className="flex items-center">
                    <Input
                      type="number"
                      variant="standard"
                      label={input_des[key]}
                      name={key}
                      value={operand[key]}
                      onChange={handleChange}
                      className="w-full p-2"
                      required
                    />
                  </div>
                </div>
              );
            })}
          </div>
          
          {result && (
            <div className="mt-6">
              <h2 className="text-2xl font-bold">Calculation Result:</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 mt-5 w-full">
            {Object.keys(result).length > 0 ? (
              Object.keys(result).slice(4)
                .map((key) => (
                  <div key={key} className="">
                    <label className="font-bold text-xs">
                      {key.replace(/([A-Z])/g, " $1").toUpperCase()}:
                      {symbols[key] && (
                      <span className="ml-2 text-sm text-gray-600">
                        ({symbols[key]})
                      </span>
                    )}
                    
                    </label>{" "}
                    <label className="text-xs">{result[key]}</label>
                  </div>
                ))
            ) : (
              <p>No results to display. Please calculate first.</p>
            )}
          </div>
             
            </div>
          )}
        </div>
        
        <div className="flex flex-row">
          <div className="flex justify-start w-full mt-5 ml-8">
            <ArrowLeftIcon
              onClick={prevStep}
              className="cursor-pointer text-neutral-800 hover:text-neutral-600 transition-all h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10"
            />
          </div>
       
            <Button className="rounded-none bg-neutral-800 w-64 " onClick={handleCalculate}>
              Calculate
            </Button>
      
          
          <div className="flex justify-end w-full mt-5 mr-8">
            <ArrowRightIcon
              onClick={nextStep}
              className="cursor-pointer text-neutral-800 hover:text-neutral-600 transition-all h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10"
            />
          </div>
        </div>
      </div>
    
      
    </div>
  );
};

export default SteerSuspCalc;
