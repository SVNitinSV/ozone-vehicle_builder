import React from 'react';
import offroad from '../assets/off_road.png';
import onroad from '../assets/on_road.png';
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const options = [
  { 
    label: 'Off-Road', 
    topspeed: '30kmph', 
    desc: "Ideal for on-campus passenger & cargo", 
    value: 'Off-Road', 
    cost: 100000, 
    img: offroad  
  },
  { 
    label: 'On-Road', 
    topspeed: '70kmph', 
    desc: "Ideal for on-road passenger & cargo", 
    value: 'On-Road', 
    cost: 80000,
    img: onroad 
  },
  
];

const VehicleType = ({ formData, setFormData, nextStep }) => {
  const handleSelection = (value, cost) => {
    setFormData({ ...formData, vehicleType: value, totalCost: formData.totalCost + cost });
    nextStep();
  };

  return (
    <div className="min-h-screen min-w-screen w-full flex flex-col items-center justify-center px-4 py-8 md:px-8 lg:px-16 xl:px-24">
      <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl mb-8 text-center">Choose the Type of Vehicle</h1>
      <div className="w-full text-center mb-8">
        <Typography variant="h6" color="blue-gray" className="mb-2">
          Off-road: Non-road legal, low speed yet fun to drive, special purposes
        </Typography>
        <Typography variant="h6" color="blue-gray" className="mb-2">
          On-road: Road legal, high speed, daily use
        </Typography>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
        {options.map(option => (
          <Card
            key={option.value}
            className="min-w-screen hover:shadow-lg hover:shadow-gray-900/20 cursor-pointer"
            onClick={() => handleSelection(option.value, option.cost)}
          >
            <CardBody>
              <img src={option.img} alt={option.label} className="mb-4 rounded-lg w-full h-40 object-cover" />
              <Typography variant="h5" color="blue-gray" className="mb-2">
                {option.label}
              </Typography>
              <Typography>
                Top speed: {option.topspeed}
              </Typography>
              <Typography>
                {option.desc}
              </Typography>
            </CardBody>
            <CardFooter className="pt-0 flex justify-center">
              <Button
                size="sm"
                variant="text"
                className="flex items-center gap-2"
                onClick={() => handleSelection(option.value, option.cost)}
              >
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
  );
};

export default VehicleType;
