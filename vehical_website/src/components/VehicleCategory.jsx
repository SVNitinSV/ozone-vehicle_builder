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
  { 
    label: '2W Passenger', 
    desc: 'Efficient city commuter for personal mobility, ideal for short urban trips.', 
    value: '2W Passenger', 
    cost: 50000, 
    img: ofrcImg,
    disabled: true
  },
  { 
    label: '2W Cargo', 
    desc: 'Compact delivery vehicle for small parcels, suitable for navigating congested areas.', 
    value: '2W Cargo', 
    cost: 55000, 
    img: ofrpImg,
    disabled: true
  },
  { 
    label: '3W Passenger', 
    desc: 'Flexible transport solution for shared rides, accommodates up to 3 passengers.', 
    value: '3W Passenger', 
    cost: 70000, 
    img: onrcImg,
    disabled: true
  },
  { 
    label: '3W Cargo', 
    desc: 'Versatile cargo vehicle for small to medium loads, ideal for local deliveries.', 
    value: '3W Cargo', 
    cost: 75000, 
    img: onrpImg,
    disabled: true 
  },
  { 
    label: '4W Passenger', 
    desc: 'Comfortable vehicle for family travel, seats up to 5 people with ample legroom.', 
    value: '4W Passenger', 
    cost: 150000, 
    img: onrpImg,
    disabled: false
  },
  { 
    label: '4W Cargo', 
    desc: 'Robust vehicle for transporting larger goods, supports up to 1500 kg payload.', 
    value: '4W Cargo', 
    cost: 160000, 
    img: onrpImg,
    disabled: false
  }
];

const BuildType = ({ formData, setFormData, nextStep, prevStep }) => {
  const handleSelection = (value, cost) => {
    setFormData({ ...formData, vehicleCategory: value, totalCost: formData.totalCost + cost });
    nextStep();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 md:px-8 lg:px-16 xl:px-24 bg-gray-100  no-scrollbar">
      <h2 className="text-3xl md:text-4xl lg:text-5xl mb-8 text-center">Select Vehicle Category</h2>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
        {options.map(option => (
          <Card 
            className={`w-full p-5 ${
              option.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-gray-900/20 cursor-pointer'
            }`}  
            key={option.value}
            onClick={() => !option.disabled && handleSelection(option.value, option.cost)}
          >
            <CardBody>
              <div className='flex flex-col items-center sm:flex-col sm:items-start'>
                <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
                  <img 
                    src={option.img} 
                    alt={option.label} 
                    className={`w-full max-w-[200px] h-32 sm:w-48 sm:h-24 md:w-56 md:h-28 lg:w-64 lg:h-32 object-cover rounded-lg ${
                      option.disabled ? 'grayscale' : ''
                    }`}
                  />
                </div>
                <div>
                  <Typography variant="h5" color="blue-gray" className="mb-2 text-left sm:text-left">
                    {option.label}
                  </Typography>
                  <Typography className="text-left sm:text-left">
                    {option.desc}
                  </Typography>
                </div>
              </div>
            </CardBody>
            <CardFooter className="pt-0 flex justify-center sm:justify-end">
              <Button 
                size="sm" 
                variant="text" 
                className="flex items-center gap-2" 
                onClick={() => !option.disabled && handleSelection(option.value, option.cost)}
                disabled={option.disabled}
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
      <Button onClick={prevStep} className='mt-5'>Previous</Button>
    </div>
  );
};

export default BuildType;
