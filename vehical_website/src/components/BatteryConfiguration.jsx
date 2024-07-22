import React from 'react';
import batImg from '../assets/Battery.png';
import Bat_model from '../Modelrender';
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

// Battery options with associated range keys
const options = [
  { label: '10.1 Kwh', desc: "Ideal for last mile 8 Hours trips for On road & off road", rangeKey: 'range1', value: 'standard', cost: 150000 },
  { label: '20.2 Kwh', desc: "Ideal for mid mile 12 Hours trips for On road", rangeKey: 'range2', value: 'extended', cost: 200000 },
  { label: '30.3 Kwh', desc: "Ideal for long mile 16 Hours trips for On road", rangeKey: 'range3', value: 'extended plus', cost: 250000 }
];

const BatteryConfiguration = ({ formData, setFormData, nextStep, prevStep }) => {
  const handleSelection = (value, cost) => {
    // Update formData with selected battery and total cost
    setFormData({
      ...formData,
      battery: value,
      totalCost: formData.totalCost + cost
    });
    nextStep();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 md:px-8 lg:px-16 xl:px-24 ">
      <h2 className="text-3xl md:text-5xl mb-8 text-center">Select Battery</h2>
      <div className="flex flex-col lg:flex-row items-center gap-8 w-full bg-gray-100 p-4 rounded-lg mb-4 shadow-inner">
        
        <Bat_model ></Bat_model>

        <div className="flex flex-col items-center w-full lg:w-1/2">
          {options.map(option => (
            <Card className="mt-6 w-full md:w-96 hover:shadow-lg hover:shadow-gray-900/20"
              key={option.value}
              onClick={() => handleSelection(option.value, option.cost)}>
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {option.label}
                </Typography>
                <Typography>
                  {option.desc}
                </Typography>
                <Typography color="green">
                  {/* Display the range using formData */}
                  Total Range: {formData[option.rangeKey] || 'N/A'} km
                </Typography>
              </CardBody>
              <CardFooter className="pt-0">
                <a href="#" className="inline-block">
                  <Button size="sm" variant="text" className="flex items-center gap-2"
                    onClick={() => handleSelection(option.value, option.cost)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                      />
                    </svg>
                  </Button>
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <Button onClick={prevStep} className='mt-5'>Previous</Button>
    </div>
  );
};

export default BatteryConfiguration;
