import React from 'react';
import batImg from '../assets/Battery.png'

import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const options = [
  { label: '10.1 Kwh',desc:"Ideal for last mile 8 Hours trips for On road & off road", value: 'standard', cost: 5000 },
  { label: '20.2 Kwh',desc:"Ideal for mid mile 12 Hours trips for On road", value: 'extended', cost: 8000 }
];

const BatteryConfiguration = ({ formData, setFormData, nextStep, prevStep }) => {
  const handleSelection = (value, cost) => {
    setFormData({ ...formData, battery: value, totalCost: formData.totalCost + cost });
    nextStep();
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Select Battery</h2>
    <div className="flex flex-row ">
      
      <img src={batImg} alt='Drive Train Image' className='w-full h-96 aspect-w-16 aspect-h-9'></img>

      <div className="flex flex-col items-center">

{options.map(option => (
<Card className="mt-6 w-96 hover:shadow-lg hover:shadow-gray-900/20"  
            key={option.value}
            onClick={() => handleSelection(option.value, option.cost)}>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {option.label}
        </Typography>
        <Typography>
         {option.desc}
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
    <p className="mt-4">Current Cost: ${formData.totalCost}</p>
    <Button onClick={prevStep} className='m-5' >Previous</Button>
    </div>
  );
};

export default BatteryConfiguration;
