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
  { label: 'Off-Road Cargo', desc: "In campus vehicle for material handling, up to 1300 kg GVW", value: 'Off-Road Cargo', cost: 100000, img: ofrcImg },
  { label: 'Off-Road Passenger', desc: "In campus vehicle for people movement, up to 9 seats", value: 'Off-Road Passenger', cost: 110000, img: ofrpImg },
  { label: 'On-Road Cargo', desc: "Last mile cargo vehicle for e-logistics up to 1300 kg GVW", value: 'On-Road Cargo', cost: 120000, img: onrcImg },
  { label: 'On-Road Passenger', desc: "Last mile passenger movement, up to 9 seats", value: 'On-Road Passenger', cost: 130000, img: onrpImg }
];

const BuildType = ({ formData, setFormData, nextStep, prevStep }) => {
  const handleSelection = (value, cost) => {
    setFormData({ ...formData, buildType: value, totalCost: formData.totalCost + cost });
    nextStep();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 md:px-8 lg:px-16 xl:px-24 bg-gray-100">
      <h2 className="text-3xl md:text-5xl mb-8 text-center">Select Build Type</h2>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {options.map(option => (
          <Card className="w-full hover:shadow-lg hover:shadow-gray-900/20 cursor-pointer p-5"  
                key={option.value}
                onClick={() => handleSelection(option.value, option.cost)}>
            <CardBody className=''>
              <div className='flex flex-col items-center sm:flex-row'>
                <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
                  <img src={option.img} alt={option.label} className="w-64 h-32 object-cover rounded-lg" />
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
      <Button onClick={prevStep} className='mt-5'>Previous</Button>
    </div>
  );
};

export default BuildType;
