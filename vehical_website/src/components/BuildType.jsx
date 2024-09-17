import React from 'react';
import ofrcImg from '../assets/img/Off_road_cargo.png';
import ofrpImg from '../assets/img/Off_road_Passenger.png';
import onrcImg from '../assets/img/On_road_cargo.png';
import onrpImg from '../assets/img/On_road_passenger.png';


import { ArrowTurnDownLeftIcon } from '@heroicons/react/24/outline';

import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

// Options with associated images and details
const options = [
  { label: 'Off-Road Cargo', desc: "In campus vehicle for material handling, up to 1300 kg GVW", value: 'Golf Cart', cost: 100000, img: ofrcImg, type: 'Off-Road', category: 'Golf Cart' },
  { label: 'Off-Road Passenger', desc: "In campus vehicle for people movement, up to 9 seats", value: 'Off-Road Passenger', cost: 110000, img: ofrpImg, type: 'Off-Road', category: 'Golf Cart' },
  { label: 'On-Road Cargo', desc: "Last mile cargo vehicle for e-logistics up to 1300 kg GVW", value: 'On-Road Cargo', cost: 120000, img: onrcImg, type: 'On-Road', category: 'Golf Cart' },
  { label: 'On-Road Passenger', desc: "Last mile passenger movement, up to 9 seats", value: 'On-Road Passenger', cost: 130000, img: onrpImg, type: 'On-Road', category: 'Golf Cart' }
];

const BuildType = ({ formData, setFormData, nextStep, prevStep }) => {
  // Filter options based on selected vehicle type and category
  const filteredOptions = options.filter(option => 
    option.type === formData.vehicleType && option.category === formData.vehicleCategory
  );

  const handleSelection = (value, cost) => {
    setFormData({
      ...formData,
      buildType: value, // Set the selected build type
      buildTypeCost: cost, // Update the cost for the selected build type
    });
    nextStep(); // Move to the next step
  };

  return (
    <div className="min-h-screen flex flex-col items-center mt-10 px-4 py-8 md:px-8 lg:px-16 xl:px-24 ">
      <h2 className="text-3xl md:text-5xl mb-8 text-center">Select Build Type</h2>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {filteredOptions.length > 0 ? (
          filteredOptions.map(option => (
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
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>

                  </Button>
                </a>
              </CardFooter>
            </Card>
          ))
        ) : (
          <Typography variant="h6" color="gray" className="text-center">
            No build types available for the selected vehicle type and category.
          </Typography>
        )}
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
