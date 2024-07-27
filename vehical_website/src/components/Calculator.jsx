import React, { useState } from "react";
import {
  Input,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import {
  ArrowTurnDownLeftIcon,
  ArrowTurnDownRightIcon,
} from "@heroicons/react/24/outline";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { calculatePowertrain } from "../assets/calculators/calculatePowertrain";
import { calculateWheelDiameter } from "../assets/calculators/CalculateWheelDia";
import regulationsData from "../assets/details/reguations.json";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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
  const [graphData, setGraphData] = useState(null); // State to hold graph data

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
       // Generate graph data
       generateGraphData();
      } catch (error) {
        console.error("Error calculating powertrain:", error);
        alert("An error occurred while calculating.");
    }
  };

  const generateGraphData = () => {
    const slopes = Array.from({ length: 46 }, (_, i) => i); // 0 to 45 degrees
    const graphValues = slopes.map((slope) => {
      const tempOperand = { ...operand, slope };
      const result = calculatePowertrain(tempOperand);
      return result.motorPower || 0;
    });

    setGraphData({
      labels: slopes,
      datasets: [
        {
          label: "Motor Power vs. Gradability",
          data: graphValues,
          borderColor: "rgba(255, 255, 255, 0.5)", // neutral-800
          backgroundColor: "rgba(255, 255, 255, 1)", // neutral-800
          grid: "rgba(0, 0, 255, 0.2)",
          fill: true,
        },
      ],
    });
  };


  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("PowerTrain Specification Calculator", 14, 20);

    // Vehicle Specifications Section
    doc.text("Vehicle Specifications", 14, 30);
    doc.autoTable({
      head: [["Specification", "Value"]],
      body: [
        ["Vehicle Type", formData.vehicleType],
        ["Category", formData.vehicleCategory],
        ["Regulation", formData.regulation],
      ],
      startY: 40,
    });

    // Input Data Section
    doc.text("Input Data", 14, doc.previousAutoTable.finalY + 10);
    const inputData = Object.keys(operand).map((key) => [
      key.replace(/([A-Z])/g, " $1").toUpperCase(),
      operand[key],
    ]);

    doc.autoTable({
      head: [["Input", "Value"]],
      body: inputData,
      startY: doc.previousAutoTable.finalY + 10,
    });

    // Results Section
    doc.text("Results", 14, doc.previousAutoTable.finalY + 10);
    const resultData = Object.keys(results).map((key) => [
      key.replace(/([A-Z])/g, " $1").toUpperCase(),
      results[key],
    ]);

    doc.autoTable({
      head: [["Output", "Value"]],
      body: resultData,
      startY: doc.previousAutoTable.finalY + 10,
    });

    doc.save("powertrain_calculations.pdf");
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
          <h1 className="text-xl font-bold ">Enter Specifications</h1>
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
                    <Button onClick={handleOpen} className="ml-2 ">
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
            <div >
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
          <div className="bg-neutral-800 p-4 rounded-lg mb-4 shadow-inner">
            <h2 className="text-lg font-bold mb-4 text-white">Gradability</h2>
            {graphData ? (
              <Line data={graphData} />
            ) : (
              <p className="text-white">No graph data available. Calculate first.</p>
            )}
          </div>
        </div>
        <div className="flex flex-row">
        <div className="flex justify-start w-full mt-5 ml-8">
        <ArrowTurnDownLeftIcon
          onClick={prevStep}
          className="cursor-pointer text-neutral-800 hover:text-neutral-600 transition-all h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10"
        />
      </div>
           <Button
            color="neutral-800"
            onClick={generatePDF}
            
          
          >
            Download Report
          </Button>
      <div className="flex justify-end w-full mt-5 mr-8">
        <ArrowTurnDownRightIcon
          onClick={nextStep}
          className="cursor-pointer text-neutral-800 hover:text-neutral-600 transition-all h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10"
        />
      </div>
      </div>
      </div>
    </div>
  );
};

export default Calculator;
