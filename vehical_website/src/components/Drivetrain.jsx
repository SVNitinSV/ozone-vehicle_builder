import React from 'react';
import driveImg from '../assets/Drive_Train.png';
import EVModel from '../Modelrender';

import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const options = [
  { label: 'FWD', desc: "Ideal for lower loading, passenger vehicles", value: 'fwd', cost: 124000 },
  { label: 'RWD', desc: "Ideal for higher loading, cargo vehicles", value: 'rwd', cost: 110000 },
  { label: 'AWD', desc: "Ideal for All-Terrain Adventures, Ensuring Traction and Control", value: 'awd', cost: 110000 }

];

const Drivetrain = ({ formData, setFormData, nextStep, prevStep }) => {
  const handleSelection = (value, cost) => {
    setFormData({ ...formData, drivetrain: value, totalCost: formData.totalCost + cost });
    nextStep();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 md:px-8 lg:px-16 xl:px-24  ">
      <h2 className="text-3xl md:text-5xl mb-8 text-center">Select Drivetrain</h2>
      <div className="flex flex-col xl:flex-row items-center gap-8 w-full bg-gray-100 p-4 rounded-lg mb-4 shadow-inner">
   
        <EVModel></EVModel>
   

        <div className="flex flex-col items-center w-full lg:w-1/2">
          {options.map(option => (
            <Card className="mt-6 w-full  hover:shadow-lg hover:shadow-gray-900/20"  
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
   
      <Button onClick={prevStep} className='mt-5'>Previous</Button>
    </div>
  );
};

export default Drivetrain;
