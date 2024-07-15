import React from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";



const options = [
  { label: 'Off-Road',topspeed: '90kmph',desc:"Ideal for on campus passenger & cargo", value: 'off-road', cost: 10000 },
  { label: 'On-Road',topspeed: '90kmph',desc:"Ideal for on road passenger & cargo", value: 'on-road', cost: 8000 }
];

const VehicleType = ({ formData, setFormData, nextStep }) => {
  const handleSelection = (value, cost) => {
    setFormData({ ...formData, vehicleType: value, totalCost: formData.totalCost + cost });
    nextStep();
  };

  return (
    <div className="flex flex-col ">
      <h1 className="text-7xl mb-4">Choose the Type of Vehicle</h1>
      <div>
      <Typography variant="h5" color="blue-gray" className="mb-2">
      Off road: Non road legal, low speed yet fun to drive, special purposes
      </Typography>
      <Typography variant="h5" color="blue-gray" className="mb-2">
      On road: Road legal, high speed, daily use
      </Typography>

      </div>
      <div className="flex space-x-4">

      {options.map(option => ( 
      <Card className="mt-6 w-96  bg-gradient-to-tr from-gray-50 to-gray-100  hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] "  key={option.value}
      onClick={() => handleSelection(option.value, option.cost)}
      >
      <CardBody>
   
        <Typography variant="h5" color="blue-gray" className="mb-2">
        {option.label}
        </Typography>
        <Typography className='font-semibold'>
          Top speed: {option.topspeed}
        </Typography>
        <Typography className='font-semibold'>
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
  );
};

export default VehicleType;
