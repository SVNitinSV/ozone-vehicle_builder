import React, { useState } from "react";
import {
  Input,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Select,
  Option,
  Slider,
} from "@material-tailwind/react";

import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

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
import symbols from "./symbols.json";
import input_des from "./assets/Input_description.json";

const data = [
  ["Modern car like a Tesla model 3 or model Y", "0.23", ""],
  ["Toyota Prius, Tesla model S", "0.24", "frontal area"],
  ["Sports car, sloping rear", "0.2 - 0.3", "frontal area"],
  ["Common car like Opel Vectra (class C)", "0.29", ""],
  ["Old Car like a T-ford", "0.7 - 0.9", ""],
  ["Tractor Trailed Truck", "0.96", ""],
  ["Truck", "0.8 - 1.0", ""],
];

const dragCoefficientData = [
  ["Truck tire on asphalt", "0.006 - 0.01"],
  ["Bicycle tire on rough paved road", "0.008"],
  [
    "Ordinary car tires on concrete, new asphalt, cobbles small new",
    "0.01 - 0.015",
  ],
  ["Car tires on tar or asphalt", "0.02"],
  ["Car tires on gravel - rolled new", "0.02"],
  ["Car tires on cobbles - large worn", "0.03"],
  [
    "Car tire on solid sand, gravel loose worn, soil medium hard",
    "0.04 - 0.08",
  ],
  ["Car tire on loose sand", "0.2 - 0.4"],
];

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
  const [openInfo, setOpenInfo] = React.useState(false);
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [result, setResult] = useState("");
  const [operand, setOperand] = useState({
    width: "",
    height: "",
    length: "",
    maxSpeed: "",
    gvw: "",
    dragCoeff: "0.29",
    accTime: "",
    slope: "",
    gearRatio: "",
    rollCoeff: "0.015",
    airDen: "1.1",
    wheelDia: "",
  });

  const [gradabilityInputs, setGradabilityInputs] = useState({
    slope: "",
    accTime: "",
    maxSpeed: "",
    load: "",
  });

  const [alerts, setAlerts] = useState({
    maxSpeed: "",
    width: "",
    height: "",
    gvw: "",
    motorPower: "",
  });

  const [results, setResults] = useState({});
  const [gradabilityResults, setGradabilityResults] = useState({});
  const [graphData, setGraphData] = useState();
  const [graphSpeedData, setGraphSpeedData] = useState();
  const handleOpen = () => setOpen(!open);
  const handleOpenInfo = () => setOpenInfo(!open);

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

  const handleGradabilityChange = (e) => {
    const { name, value } = e.target;
    setGradabilityInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOperand((prev) => ({ ...prev, [name]: value }));
  };

  const handleSliderChange = (name, newValue) => {
    setOperand((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
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

    let newAlerts = {
      maxSpeed: "",
      width: "",
      height: "",
      gvw: "",
      motorPower: "",
    };
    for (const key in limitCheck) {
      const regulationValue = parseFloat(limitCheck[key]);
      const operandValue = parseFloat(operand[key]);

      if (
        !isNaN(regulationValue) &&
        !isNaN(operandValue) &&
        operandValue > regulationValue
      ) {
        newAlerts[key] = `${key.replace(
          /([A-Z])/g,
          " $1"
        )} exceeds the regulation limit of ${limitCheck[key]}.`;
      }
    }

    const motorPower = calculatedResults.motorPower;
    const peakPowerLimit = parseFloat(selectedRegulation.peakPower);

    if (motorPower > peakPowerLimit) {
      newAlerts.motorPower = `Warning: The motor power exceeds the regulation limit of ${selectedRegulation.peakPower}. Suggestions: Please reduce the acceleration time, reduce the GVW, or reduce the max speed.`;
    }

    setAlerts(newAlerts);

    // Return false if any alert is not empty, true otherwise
    return Object.values(newAlerts).every((alert) => alert === "");
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

  const handleGradabilityCalculate = () => {
    const { slope, accTime, maxSpeed, load } = gradabilityInputs;

    if (!slope || !accTime || !maxSpeed || !load) {
      alert("Please fill in all fields for gradability calculation.");
      return;
    }

    try {
      const newOperand = {
        ...operand,
        slope,
        accTime,
        maxSpeed,
        gvw: (parseFloat(operand.gvw) * 0.8 + parseFloat(load)).toString(),
      };
      const gradabilityResult = calculatePowertrain(newOperand);
      setGradabilityResults(gradabilityResult);
      // Generate graph data
      generateGraphData();
      generateMaxSpeedGraphData();
    } catch (error) {
      console.error("Error calculating gradability powertrain:", error);
      alert("An error occurred while calculating gradability.");
    }
  };

  const generateGraphData = () => {
    const maxSpeedValues = Array.from(
      { length: (gradabilityInputs.maxSpeed / 10) * 10 + 1 },
      (_, i) => i
    ); // 0 to maxSpeed
    console.log({ maxSpeedValues });
    const { gvw } = operand; // Extracting gvw from operand
    const { slope, accTime, load } = gradabilityInputs; // Extracting values from gradabilityInputs
    const effectiveGvw = parseFloat(gvw) * 0.8 + parseFloat(load); // Calculating effective GVW

    const graphSpeedValues = maxSpeedValues.map((maxSpeed) => {
      const tempOperand = {
        ...operand,
        slope,
        maxSpeed,
        accTime,
        gvw: effectiveGvw,
      }; // Using effective GVW
      const result = calculatePowertrain(tempOperand);
      return result.motorPower || 0;
    });

    setGraphData({
      labels: maxSpeedValues,
      datasets: [
        {
          label: "Motor Power vs. MaxSpeed",
          data: graphSpeedValues,
          borderColor: "rgba(255, 255, 255, 0.5)", // neutral-800
          backgroundColor: "rgba(255, 255, 255, 1)", // neutral-800
          grid: "rgba(0, 0, 255, 0.2)",
          fill: true,
        },
      ],
    });
  };

  const generateMaxSpeedGraphData = () => {
    const slopes = Array.from({ length: 46 }, (_, i) => i); // 0 to 45 degrees
    const { gvw } = operand; // Extracting gvw from operand
    const { maxSpeed, accTime, load } = gradabilityInputs; // Extracting values from gradabilityInputs
    const effectiveGvw = parseFloat(gvw) * 0.8 + parseFloat(load); // Calculating effective GVW

    const graphValues = slopes.map((slope) => {
      const tempOperand = {
        ...operand,
        slope,
        maxSpeed,
        accTime,
        gvw: effectiveGvw,
      }; // Using effective GVW
      const result = calculatePowertrain(tempOperand);
      console.log({ result });
      return result.motorPower || 0;
    });

    setGraphSpeedData({
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

    // Gradability Results Section
    doc.text("Gradability Results", 14, doc.previousAutoTable.finalY + 10);
    const gradabilityResultData = Object.keys(gradabilityResults).map((key) => [
      key.replace(/([A-Z])/g, " $1").toUpperCase(),
      gradabilityResults[key],
    ]);

    doc.autoTable({
      head: [["Output", "Value"]],
      body: gradabilityResultData,
      startY: doc.previousAutoTable.finalY + 10,
    });

    doc.save("powertrain_specifications.pdf");
  };

  return (
    <div className="min-h-screen m-5 ">
      <h1 className="text-3xl font-bold text-center mt-10">
        Specification Inputs
      </h1>
      <div className="p-4 border border-gray-300 rounded-lg shadow-md w-full max-w-3xl mx-auto mt-10">
        <div className="text-center mb-5">
          <h1 className="text-xl font-bold ">Enter Desired Specifications</h1>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg mb-4 shadow-inner">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 w-full">
            {Object.keys(operand).map((key) => {
              if (
                key === "dragCoeff" ||
                key === "rollCoeff" ||
                key === "wheelDia"||
                key === "slope"
              )
                return null;

              return (
                <div key={key} className="mb-4">
                  <label className="block mb-1 font-bold">
                    {key.replace(/([A-Z])/g, " $1").toUpperCase()}:
                    {symbols[key] && (
                      <span className="ml-2 text-sm text-gray-600">
                        ({symbols[key]})
                      </span>
                    )}
                  </label>
                  <span className=" text-xs text-gray-600">
                    {input_des[key]}
                  </span>
                  <div className="flex items-center">
                    <Input
                      type="number"
                      variant="standard"
                      name={key}
                      value={
                        key === "airDensity" && operand[key] === undefined
                          ? 1.1
                          : operand[key]
                      }
                      onChange={handleChange}
                      className="w-full p-2"
                      required
                    />
                  </div>
                </div>
              );
            })}
             <div>
            <div className="flex justify-items-center">
              <label className="block mb-1 font-bold">
                WHEEL DIA:
                </label>
                <span className="ml-2 text-sm text-gray-600">(mm) </span>
                <QuestionMarkCircleIcon
                  onClick={handleOpen}
                  className="h-5 w-5 ml-2 hover:stroke-neutral-400 cursor-pointer"
                />
                
              
              </div>
              <span className=" text-xs text-gray-600">Size of the Wheel</span>

              <Input
                type="number"
                variant="standard"
                name="Wheel Dia"
                value={operand.wheelDia}
                onChange={handleChange}
                className="w-full p-2"
                required
              />
            </div>
          </div>
 
           
        

          <div className="flex justify-center">
            <p className="mb-5 text-xs  ">
              Dont change the below values unless you have idea about them{" "}
            </p>
            <QuestionMarkCircleIcon
              onClick={handleOpenInfo}
              className="h-5 w-5 ml-2 hover:stroke-neutral-400 cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-4 w-full ">
            <div className="mb-4">
              <Slider
                id="dragCoeffSlider"
                name="dragCoeff"
                min={0.2}
                max={1}
                step={0.01}
                value={operand.dragCoeff}
                onChange={(e) =>
                  handleSliderChange("dragCoeff", e.target.value)
                }
              />
              <label htmlFor="dragCoeffSlider">
                Drag Coefficient: {operand.dragCoeff}
              </label>
            </div>

            <div className="mb-4">
              <Slider
                id="rollCoeffSlider"
                name="rollCoeff"
                min={0.015}
                max={0.5}
                step={0.001}
                value={operand.rollCoeff}
                onChange={(e) =>
                  handleSliderChange("rollCoeff", e.target.value)
                }
              />
              <label htmlFor="rollCoeffSlider">
                Rolling Coefficient: {operand.rollCoeff}
              </label>
            </div>
          </div>
          <Dialog
            open={openInfo}
            onClose={() => setOpenInfo(false)}
            className="relative z-10 "
          >
            <DialogBody className="p-4 w-full text-xs">
              <h2 className="text-lg text-neutral-800  font-bold mb-4">
                Drag Coefficient Reference Table
              </h2>
              <table className="min-w-full border-collapse border border-gray-400">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">
                      Description
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Drag Coefficient
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 px-4 py-2">
                        {row[0]}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {row[1]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <h2 className="text-lg text-neutral-800 font-bold mb-4 mt-8">
                Rolling Resistance Reference Table
              </h2>
              <table className="min-w-full border-collapse border border-gray-400">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">
                      Description
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Rolling Resistance Coefficient
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dragCoefficientData.map((row, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 px-4 py-2">
                        {row[0]}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {row[1]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </DialogBody>
            <DialogFooter>
              <Button
                variant="text"
                color="neutral-800"
                onClick={() => setOpenInfo(false)}
                className="mr-1"
              >
                <span>Close</span>
              </Button>
            </DialogFooter>
          </Dialog>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 w-full">
            {alerts.maxSpeed && (
              <p className="alert-text text-red-600">{alerts.maxSpeed}</p>
            )}
            {alerts.width && (
              <p className="alert-text text-red-600">{alerts.width}</p>
            )}
            {alerts.height && (
              <p className="alert-text text-red-600">{alerts.height}</p>
            )}
            {alerts.gvw && (
              <p className="alert-text text-red-600">{alerts.gvw}</p>
            )}
          </div>
          {alerts.motorPower && (
            <p className="alert-text text-red-600 font-bold">
              {alerts.motorPower}
            </p>
          )}
        </div>

        <Dialog open={open} handler={handleOpen} className="relative z-10">
          <DialogHeader>Calculate Wheel Diameter</DialogHeader>
          <DialogBody className="">
            <div>
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
        <div className="mt-4 bg-gray-100 p-4 rounded-lg mb-4 shadow-inner">
          <h2 className="text-2xl font-bold mb-5">Gradability:</h2>
          <div className="grid grid-cols-2 gap-2">
            <Select
              label="Gradability"
              variant="standard"
              name="slope"
              value={gradabilityInputs.slope}
              onChange={(e) =>
                handleGradabilityChange({
                  target: { name: "slope", value: e },
                })
              }
            >
              <Option value="7">City Bridges</Option>
              <Option value="10">Multilevel Parking</Option>
              <Option value="15">Residential Driveways</Option>
              <Option value="17">Hill Stations</Option>
              <Option value="12">Garage Ramps</Option>
            </Select>
            <Input
              type="text"
              name="slope"
              variant="standard"
              label="Slope"
              value={gradabilityInputs.slope}
              onChange={handleGradabilityChange}
              required
            />
            <Input
              type="text"
              name="accTime"
              variant="standard"
              label="Acceleration Time"
              value={gradabilityInputs.accTime}
              onChange={handleGradabilityChange}
              required
            />
            <Input
              type="text"
              name="maxSpeed"
              variant="standard"
              label="Max Speed"
              value={gradabilityInputs.maxSpeed}
              onChange={handleGradabilityChange}
              required
            />

            <Input
              label="Load (in kg)"
              variant="standard"
              name="load"
              value={gradabilityInputs.load}
              onChange={handleGradabilityChange}
              type="number"
            />
          </div>
          <div className="flex justify-center gap-3">
            <Button onClick={handleGradabilityCalculate} className="mt-5">
              Calculate Gradability
            </Button>
          </div>
          <h2 className="text-2xl font-bold mb-5">Results:</h2>
          <div className="mb-4 w-full">
            <h5 className="font-bold">
              {gradabilityResults.motorPower}
              kW required at {gradabilityInputs.slope}/
              {((gradabilityInputs.slope / 45) * 100).toFixed(2)}% with GVW{" "}
              {operand.gvw}kg and load of {gradabilityInputs.load}kg at{" "}
              {gradabilityInputs.maxSpeed} kmph
            </h5>
          </div>
          <div className="bg-neutral-800 p-4 rounded-lg mb-4 shadow-inner">
            <h2 className="text-lg font-bold mb-4 text-white">MaxSpeed</h2>
            {graphData ? (
              <Line data={graphData} options={{ responsive: true }} />
            ) : (
              <p className="text-white">
                No graph data available. Please provide the necessary inputs to
                generate the graph.
              </p>
            )}
            <h2 className="text-lg font-bold mb-4 text-white mt-5">
              Gradability
            </h2>
            {graphSpeedData ? (
              <Line data={graphSpeedData} options={{ responsive: true }} />
            ) : (
              <p className="text-white">
                No graph data available. Please provide the necessary inputs to
                generate the graph.
              </p>
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
          <Button color="neutral-800" onClick={generatePDF}>
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
