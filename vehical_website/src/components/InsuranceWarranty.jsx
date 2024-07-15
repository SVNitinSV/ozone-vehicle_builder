import React from 'react';
import img from '../assets/On_road_passenger.png';

import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const options = [
  { label: '1 Year Warranty',desc:'Our Smart +  build is eligible for dynamic insurance & warranty plans', value: '1-year', cost: 1000 }

];

const InsuranceWarranty = ({ formData, setFormData, nextStep, prevStep }) => {
  const handleSelection = (value, cost) => {
    setFormData({ ...formData, warranty: value, totalCost: formData.totalCost + cost });
    nextStep();
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Select Insurance & Warranty</h2>
      <div className="flex flex-row items-center">

      <img src={img} className='w-96'></img>
      <div className="flex flex-col h-full">

      <Card className="mt-6 w-96 mb-12"  
           >
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
         Build Card
        </Typography>
        <Typography>
        {formData.vehicleType}
        </Typography>
        <Typography>
        {formData.drivetrain}
        </Typography>
        <Typography>
        {formData.battery}
        </Typography>
        
      </CardBody>
      <CardFooter className="pt-0">
      </CardFooter>
    </Card>

      {options.map(option => (
<Card className="mt-6 w-96"  
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
      <div className="flex space-x-4">
        <Button onClick={prevStep} className='m-5' >Previous</Button>
      </div>
    </div>
  );
};

export default InsuranceWarranty;
