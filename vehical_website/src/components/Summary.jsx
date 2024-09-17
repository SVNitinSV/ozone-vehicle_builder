import React from "react";
import { Button } from "@material-tailwind/react";
import { ArrowTurnDownLeftIcon } from "@heroicons/react/24/outline";

// Function to format labels from keys
const formatLabel = (key) => {
  return key
    .replace(/([A-Z])/g, " $1") // Insert a space before each uppercase letter
    .replace(/_/g, " ") // Replace underscores with spaces
    .replace(/^\w/, (c) => c.toUpperCase()); // Capitalize the first letter
};

const Summary = ({ formData, prevStep }) => {
  // Extracting and filtering cost fields from formData
  const costFields = Object.keys(formData).filter((key) =>
    key.includes("Cost")
  );

  // Dynamically rendering vehicle details
  const orderDetails = Object.keys(formData)
    .filter((key) => !key.includes("Cost") && key !== "totalCost" && formData[key])
    .map((key) => (
      <div className="flex justify-between" key={key}>
        <p className="text-lg font-medium">
          <strong>{formatLabel(key)}:</strong>
        </p>
        <p className="text-lg">{formData[key]}</p>
      </div>
    ));

  // Dynamically rendering the cost breakdown
  const costBreakdown = Object.keys(formData)
  .filter((key) => key.includes("Cost") )
  .map((key) => (
    <div className="flex justify-between" key={key}>
      <p className="text-lg font-medium">
        <strong>{formatLabel(key)}:</strong>
      </p>
      <p className="text-lg">{formData[key]}</p>
    </div>
  ));

  // Calculate total cost from the individual costs
  const totalCost = costFields.reduce((acc, key) => acc + Number(formData[key] || 0), 0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 md:px-8 lg:px-16 xl:px-24 bg-gray-100">
      <h2 className="text-4xl md:text-5xl mb-8 text-center font-semibold">
        Order Summary
      </h2>
      <div className="w-full md:max-w-4xl bg-white rounded-lg shadow-lg p-8">
        <div className="mb-8 border-b border-gray-300 pb-8">
          <h3 className="text-2xl font-semibold mb-4">Vehicle Details</h3>
          <div className="space-y-4">{orderDetails}</div>
        </div>
        
        <div className="mb-8 border-b border-gray-300 pb-8">
          <h3 className="text-2xl font-semibold mb-4">Cost Breakdown</h3>
          <div className="space-y-4">{costBreakdown}</div>
        </div>

        <div className="flex flex-col items-center border-t border-gray-300 pt-8">
          <h3 className="text-2xl font-semibold mb-4">Order Summary</h3>
          <div className="flex justify-between w-full mb-4">
            <p className="text-xl font-semibold">Total Cost:</p>
            <p className="text-xl font-semibold">₹{totalCost}</p>
          </div>
          <Button
            className="bg-neutral-800 w-full"
            onClick={() => alert("Proceeding to Checkout")}
          >
            Checkout
          </Button>
        </div>

        <div className="flex justify-start w-full mt-5 ml-8">
          <ArrowTurnDownLeftIcon
            onClick={prevStep}
            className="cursor-pointer text-neutral-800 hover:text-neutral-600 transition-all h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10"
          />
        </div>
      </div>
    </div>
  );
};

export default Summary;
