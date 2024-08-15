import React from 'react';
import ofrcImg from '../assets/Cart.jpeg';
import ofrpImg from '../assets/UTV.jpeg';
import onrcImg from '../assets/NEC.jpeg';
import onrpImg from '../assets/Quad.jpeg';

import { ArrowTurnDownLeftIcon } from '@heroicons/react/24/outline';

import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from '@material-tailwind/react';

const options = [
  {
    label: 'QUAD',
    desc: '2 Seater Fun Motorsport Vehicles',
    value: '4W Passenger',
    cost: 150000,
    img: onrpImg,
    disabled: false,
  },
  {
    label: 'NEV',
    desc: 'Robust lifestyle passenger movement upto 6 people.',
    value: '4W Cargo',
    cost: 160000,
    img: onrcImg,
    disabled: false,
  },
  {
    label: 'UTV',
    desc: 'Rugged Passenger + Cargo, Ideal for utility',
    value: '3W Passenger',
    cost: 70000,
    img: ofrpImg,
    disabled: false,
  },
  {
    label: 'Golf Cart',
    desc: 'Versatile cargo vehicle for small to medium loads, ideal for local deliveries.',
    value: '3W Cargo',
    cost: 75000,
    img: ofrcImg,
    disabled: false,
  },

];

const BuildType = ({ formData, setFormData, nextStep, prevStep }) => {
  const handleSelection = (value, cost) => {
    setFormData({
      ...formData,
      vehicleCategory: value,
      totalCost: formData.totalCost + cost,
    });
    nextStep();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 md:px-8 lg:px-16 xl:px-24 no-scrollbar">
      <h2 className="text-3xl md:text-4xl lg:text-5xl mb-8 text-center">
        Select Vehicle Category
      </h2>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
        {options.map((option) => (
          <Card
            className={`w-full rounded-none p-5 ${
              option.disabled
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:shadow-lg hover:shadow-gray-900/20 cursor-pointer'
            }`}
            key={option.value}
            onClick={() => !option.disabled && handleSelection(option.value, option.cost)}
          >
            <CardBody>
              <div className="flex flex-col items-center sm:flex-col sm:items-start">
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
                  <Typography
            
                    color="blue-gray"
                    className="mb-2 text-left sm:text-left text-2xl font-bold"
                  >
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
                className="flex items-center gap-2 rounded-none"
                onClick={() => !option.disabled && handleSelection(option.value, option.cost)}
                disabled={option.disabled}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="flex justify-start w-full mt-5 ml-8">
        <ArrowTurnDownLeftIcon
          onClick={prevStep}
          className="cursor-pointer text-neutral-800 hover:text-neutral-600 transition-all h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10"
        />
      </div>
    </div>
  );
};

export default BuildType;
