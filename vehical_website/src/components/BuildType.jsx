import React from 'react';
import ofrcImg from '../assets/Off_road_cargo.png';
import ofrpImg from '../assets/Off_road_Passenger.png';
import onrcImg from '../assets/On_road_cargo.png';
import onrpImg from '../assets/On_road_passenger.png';

import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const options = [
  { label: 'Off-Road Cargo',desc:"In campus vehicle for material handling, upto 1300 kg GVW", value: 'Off-Road Cargo', cost: 2000, img: 'ofrcImg' },
  { label: 'Off-Road Passenger',desc:"In campus vehicle for people movement, upto 9 seat", value: 'Off-Road Passenger', cost: 3000, img: "ofrpImg" },
  { label: 'On-Road Cargo',desc:"Last mile cargo vehicle for e-logistics upto 1300 kg GVW", value: 'On-Road Cargo', cost: 2000, img: "onrcImg" },
  { label: 'On-Road Passenger',desc:"Last mile passenger movement, upto 9 seats", value: 'On-Road Passenger', cost: 3000, img: "onrcImg" }
];

const BuildType = ({ formData, setFormData, nextStep, prevStep }) => {
  const handleSelection = (value, cost) => {
    setFormData({ ...formData, buildType: value, totalCost: formData.totalCost + cost });
    nextStep();
  };

  return (
    <div>
       <h2 className="text-2xl mb-4">Select Build Type</h2>
    <div className="flex ">
      <div className="grid  grid-rows-2 grid-flow-col gap-4">
        
        {options.map(option => (
<Card className="mt-6 w-96 hover:shadow-lg hover:shadow-gray-900/20 "  
            key={option.value}
            onClick={() => handleSelection(option.value, option.cost)}>
      <CardBody className=''>
        <div className='flex flex-row'>
      <div>
        <img src={onrpImg}></img>
      </div>
        <div>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {option.label}
        </Typography>
        <Typography>
          {option.desc}
        </Typography>
        </div>
        </div>
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

export default BuildType;
