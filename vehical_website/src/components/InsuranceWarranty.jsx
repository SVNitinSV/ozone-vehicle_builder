import React from 'react';
import img from '../assets/img/On_road_passenger.png';

import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const options = [
  { label: '1 Year Warranty', desc: 'Our Smart + build is eligible for dynamic insurance & warranty plans', value: '1-year', cost: 10000 }
];

const InsuranceWarranty = ({ formData, setFormData, nextStep, prevStep }) => {
  const handleSelection = (value, cost) => {
    setFormData({ ...formData, warranty: value, totalCost: formData.totalCost + cost });
    nextStep();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 md:px-8 lg:px-16 xl:px-24 bg-gray-100 overflow-y-auto">
      <h2 className="text-3xl md:text-5xl mb-8 text-center">Select Insurance & Warranty</h2>
      <div className="flex flex-col md:flex-row items-center w-full">
        <img src={img} className='w-full md:w-1/3 mb-8 md:mb-0 md:mr-8' alt="Vehicle" />

        <div className="flex flex-col md:flex-row w-full">
          <div className="flex flex-col mb-8 md:mb-0 md:mr-8">
            <Card className="w-full mb-8 hover:shadow-lg hover:shadow-gray-900/20">
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  Build Card
                </Typography>
                <Typography>{formData.vehicleType}</Typography>
                <Typography>{formData.drivetrain}</Typography>
                <Typography>{formData.battery}</Typography>
              </CardBody>
            </Card>

            <div className="flex flex-col space-y-8">
              {options.map(option => (
                <Card className="w-full hover:shadow-lg hover:shadow-gray-900/20 cursor-pointer" 
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
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
     
      <Button onClick={prevStep} className='mt-5'>Previous</Button>
    </div>
  );
};

export default InsuranceWarranty;
