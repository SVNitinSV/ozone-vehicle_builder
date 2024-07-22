import React, { useState } from "react";
import {
  Input,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { calculatePowertrain } from "../assets/calculators/calculatePowertrain";
import { calculateWheelDiameter } from "../assets/calculators/CalculateWheelDia";
import regulationsData from "../assets/details/reguations.json";

const Calculator = ({ formData, setFormData, nextStep, prevStep }) => {
  const [open, setOpen] = React.useState(false);
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [result, setResult] = useState("");
  const [operand, setOperand] = useState({
    width: "",
    height: "",
    dragCoeff: "",
    accTime: "",
    slope: "",
    gearRatio: "",
    maxSpeed: "",
    gvw: "",
    rollCoeff: "",
    airDen: "",
    wheelDia: "",
  });
  const [results, setResults] = useState({});

  const handleOpen = () => setOpen(!open);

  const handleCalculateDia = () => {
    if (a && b && c) {
      const calculationResult = calculateWheelDiameter(a, b, c);
      setResult(calculationResult.wheelDiameter);
      setOperand((prev) => ({
        ...prev,
        wheelDia: calculationResult.wheelDiameter,
      }));
    } else {
      alert("Please fill in all fields for diameter calculation.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOperand((prev) => ({ ...prev, [name]: value }));
  };

  const checkRegulationLimits = (calculatedResults) => {
    const selectedRegulation = regulationsData[formData.vehicleCategory]?.find(
      (reg) => reg.type === formData.regulation
    );

    if (!selectedRegulation) return true;

    const limitCheck = {
      maxSpeed: selectedRegulation.topSpeed,
      width: selectedRegulation.width,
      height: selectedRegulation.length,
      gvw: selectedRegulation.dryWeight,
    };

    for (const key in limitCheck) {
      const regulationValue = parseFloat(limitCheck[key]);
      const operandValue = parseFloat(operand[key]);

      if (
        !isNaN(regulationValue) &&
        !isNaN(operandValue) &&
        operandValue > regulationValue
      ) {
        alert(
          `The value of ${key.replace(
            /([A-Z])/g,
            " $1"
          )} exceeds the regulation limit of ${limitCheck[key]}.`
        );
        return false;
      }
    }

    const motorPower = calculatedResults.motorPower;
    const peakPowerLimit = parseFloat(selectedRegulation.peakPower);

    if (motorPower > peakPowerLimit) {
      alert(
        `Warning: The motor power exceeds the regulation limit of ${selectedRegulation.peakPower}.`
      );
    }

    return true;
  };

  const handleCalculate = () => {
    if (Object.values(operand).some((v) => v === "")) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const calculatedResults = calculatePowertrain(operand);
      const batterySizes = [10.1, 20.2, 30.3];
      const ranges = {};

      batterySizes.forEach((size) => {
        const tempOperand = { ...operand, batt: size };
        const rangeResults = calculatePowertrain(tempOperand);

        if (checkRegulationLimits(rangeResults)) {
          ranges[`range${batterySizes.indexOf(size) + 1}`] =
            rangeResults.totRange || "N/A";
        } else {
          ranges[`range${batterySizes.indexOf(size) + 1}`] = "N/A";
        }
      });

      setFormData({
        ...formData,
        ...ranges,
      });

      const { range1, range2, range3, ...nonRangeResults } = calculatedResults;
      setResults(nonRangeResults);
    } catch (error) {
      console.error("Error calculating powertrain:", error);
      alert("An error occurred while calculating.");
    }
  };

  return (
    <div className="min-h-screen m-5 ">
      <h1 className="text-3xl font-bold text-center mt-10">
        PowerTrain Specification Calculator
      </h1>
      <div className="p-4 border border-gray-300 rounded-lg shadow-md w-full max-w-3xl mx-auto mt-10">
        <div className="bg-gray-100 p-4 rounded-lg mb-4 shadow-inner">
          <h2 className="text-xl font-bold mb-2">Current Vehicle Selection</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="font-bold">Vehicle Type:</span>{" "}
              <span>{formData.vehicleType}</span>
            </div>
            <div>
              <span className="font-bold">Category:</span>{" "}
              <span>{formData.vehicleCategory}</span>
            </div>
            <div>
              <span className="font-bold">Regulation:</span>{" "}
              <span>{formData.regulation}</span>
            </div>
          </div>
        </div>
        <div className="text-center mb-5">
          <h1 className="text-xl font-bold ">Powertrain Calculator</h1>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg mb-4 shadow-inner">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 w-full">
            {Object.keys(operand).map((key) => (
              <div key={key} className="mb-4">
                <label className="block mb-1 font-bold">
                  {key.replace(/([A-Z])/g, " $1").toUpperCase()}:
                </label>
                <div className="flex items-center">
                  <Input
                    type="number"
                    variant="standard"
                    name={key}
                    value={operand[key]}
                    onChange={handleChange}
                    className="w-full p-2"
                  />
                  {key === "wheelDia" && (
                    <Button onClick={handleOpen} className="ml-2 w-full">
                      Calculate Diameter
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Dialog
          open={open}
          handler={handleOpen}
          className="relative z-10"
        >
          <DialogHeader>Calculate Wheel Diameter</DialogHeader>
          <DialogBody>
            <div className="p-4 border border-gray-300 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">
                Enter Values for Calculation
              </h2>
              <div className="grid grid-cols-1 gap-4 mb-4">
              <div className="flex items-center">
          <input
            type="text"
            className="w-full p-2 mb-2 text-left bg-gray-100 rounded"
            value={a}
            onChange={(e) => setA(e.target.value)}
            placeholder="TureWidth"
          />
          <span className="mx-2 font-bold">/</span>
          <input
            type="text"
            className="w-full p-2 mb-2 text-left bg-gray-100 rounded"
            value={b}
            onChange={(e) => setB(e.target.value)}
            placeholder="AspectRatio"
          />
          <span className="mx-2 font-bold">R</span>
          <input
            type="text"
            className="w-full p-2 mb-2 text-left bg-gray-100 rounded"
            value={c}
            onChange={(e) => setC(e.target.value)}
            placeholder="RimDiameter"
          />
        </div>
                <div className="flex items-center gap-4">
                  <Button
                    onClick={handleCalculateDia}
                    className="p-2 bg-neutral-800"
                  >
                    Calculate Diameter
                  </Button>
                  {result && (
                    <div className="font-bold text-lg">
                      Wheel Diameter: {result}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="neutral-800"
              onClick={() => setOpen(false)}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button
              variant="gradient"
              color="neutral-800"
              onClick={() => setOpen(false)}
            >
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>

        <div className="flex justify-center mt-5 space-x-4">
          <Button onClick={handleCalculate}>Calculate</Button>
        </div>

        <div className="mt-4 bg-gray-100 p-4 rounded-lg mb-4 shadow-inner">
          <h2 className="text-2xl font-bold mb-5">Results:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 w-full">
            {Object.keys(results).length > 0 ? (
              Object.keys(results)
                .filter(
                  (key) =>
                    !["totRange", "theoreticalConsump", "frontal"].includes(key)
                )
                .map((key) => (
                  <div key={key} className="mb-2">
                    <span className="font-bold">
                      {key.replace(/([A-Z])/g, " $1").toUpperCase()}:
                    </span>{" "}
                    <span>{results[key]}</span>
                  </div>
                ))
            ) : (
              <p>No results to display. Please calculate first.</p>
            )}
          </div>
        </div>

        <div className="flex justify-center mt-5 space-x-4">
          <Button onClick={prevStep}>Previous</Button>
          <Button onClick={nextStep}>Next</Button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
