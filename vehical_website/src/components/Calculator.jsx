import React, { useState } from 'react';
import { Input, Button } from "@material-tailwind/react";
import { calculatePowertrain } from '../assets/calculators/calculatePowertrain';
import regulationsData from '../assets/details/reguations.json';

const Calculator = ({ formData, setFormData, nextStep, prevStep }) => {
  const [operand, setOperand] = useState({
    width: '',
    height: '',
    dragCoeff: '',
    accTime: '',
    slope: '',
    gearRatio: '',
    maxSpeed: '',
    gvw: '',
    wheelDia: '',
    rollCoeff: '',
    airDen: '',
  });
  const [results, setResults] = useState({});

  // Function to handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOperand(prev => ({ ...prev, [name]: value }));
  };

  // Function to check if operands exceed regulation limits
  const checkRegulationLimits = (calculatedResults) => {
    const selectedRegulation = regulationsData[formData.vehicleCategory]?.find(
      reg => reg.type === formData.regulation
    );

    if (!selectedRegulation) return true; // If no regulation is found, allow calculation

    // Mapping of regulation fields to operand fields
    const limitCheck = {
      maxSpeed: selectedRegulation.topSpeed,
      width: selectedRegulation.width,
      height: selectedRegulation.length,
      gvw: selectedRegulation.dryWeight, // Check gross vehicle weight against dryWeight
    };

    for (const key in limitCheck) {
      const regulationValue = parseFloat(limitCheck[key]);
      const operandValue = parseFloat(operand[key]);

      // Check if a numeric comparison is valid
      if (!isNaN(regulationValue) && !isNaN(operandValue) && operandValue > regulationValue) {
        alert(`The value of ${key.replace(/([A-Z])/g, ' $1')} exceeds the regulation limit of ${limitCheck[key]}.`);
        return false;
      }
    }

    // Check motor power against the regulation peakPower
    const motorPower = calculatedResults.motorPower;
    const peakPowerLimit = parseFloat(selectedRegulation.peakPower);

    if (motorPower > peakPowerLimit) {
      alert(`Warning: The motor power exceeds the regulation limit of ${selectedRegulation.peakPower}.`);
    }

    return true;
  };

  // Function to perform the calculation
  const handleCalculate = () => {
    // Ensure all required fields are filled
    if (Object.values(operand).some(v => v === '')) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      // Calculate powertrain results
      const calculatedResults = calculatePowertrain(operand);

      // Calculate ranges for each battery size
      const batterySizes = [10.1, 20.2, 30.3];
      const ranges = {};

      batterySizes.forEach(size => {
        const tempOperand = { ...operand, batt: size };
        const rangeResults = calculatePowertrain(tempOperand);

        if (checkRegulationLimits(rangeResults)) {
          ranges[`range${batterySizes.indexOf(size) + 1}`] = rangeResults.totRange || 'N/A';
        } else {
          ranges[`range${batterySizes.indexOf(size) + 1}`] = 'N/A'; // Set to 'N/A' if not within limits
        }
      });

      // Update form data with calculated ranges and other results
      setFormData({
        ...formData,
        ...ranges,
      });

      // Display results excluding ranges
      const { range1, range2, range3, ...nonRangeResults } = calculatedResults;
      setResults(nonRangeResults);

    } catch (error) {
      console.error('Error calculating powertrain:', error);
      alert('An error occurred while calculating.');
    }
  };

  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-md w-full max-w-3xl mx-auto mt-10">
      {/* Display Selected Vehicle Info */}
      <div className="bg-gray-100 p-4 rounded-lg mb-4 shadow-inner">
        <h2 className="text-xl font-bold mb-2">Current Vehicle Selection</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <span className="font-bold">Vehicle Type:</span> <span>{formData.vehicleType}</span>
          </div>
          <div>
            <span className="font-bold">Category:</span> <span>{formData.vehicleCategory}</span>
          </div>
          <div>
            <span className="font-bold">Regulation:</span> <span>{formData.regulation}</span>
          </div>
        </div>
      </div>
      <div className='text-center mb-5'>
        <h1 className='text-xl font-bold '>Powertrain Calculator</h1>
      </div>
      {/* Input Fields */}
      <div className="bg-gray-100 p-4 rounded-lg mb-4 shadow-inner">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 w-full">
          {Object.keys(operand).map(key => (
            <div key={key} className="mb-4">
              <label className="block mb-1 font-bold">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</label>
              <Input
                type="number"
                variant="standard"
                name={key}
                value={operand[key]}
                onChange={handleChange}
                className="w-full p-2"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Calculate Button */}
      <div className='flex justify-center mt-5 space-x-4'>
        <Button onClick={handleCalculate}>
          Calculate
        </Button>
      </div>

      {/* Display the results */}
      <div className="mt-4 bg-gray-100 p-4 rounded-lg mb-4 shadow-inner">
        <h2 className="text-2xl font-bold mb-5">Results:</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 w-full'>
          {Object.keys(results).length > 0 ? (
            Object.keys(results)
              .filter(key => !['totRange', 'theoreticalConsump', 'frontal'].includes(key))
              .map((key) => (
                <div key={key} className="mb-2">
                  <span className="font-bold">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</span> <span>{results[key]}</span>
                </div>
              ))
          ) : (
            <p>No results to display. Please calculate first.</p>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className='flex justify-center mt-5 space-x-4'>
        <Button onClick={prevStep}>Previous</Button>
        <Button onClick={nextStep}>Next</Button>
      </div>
    </div>
  );
};

export default Calculator;
