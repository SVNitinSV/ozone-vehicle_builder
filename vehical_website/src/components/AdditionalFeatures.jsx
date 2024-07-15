import React, { useState } from 'react';
import img from '../assets/On_road_passenger.png'

import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Radio
} from "@material-tailwind/react";

const acOptions = [
  { label: 'AC', value: 'ac', cost: 1000 },
  { label: 'Non-AC', value: 'non-ac', cost: 0 }
];

const techOptions = [
  { label: 'Basic Technology',desc:"LTE, GPS, Infotainment system", value: 'basic', cost: 1500 },
  { label: 'Smart Technology',desc:"LTE, GPS, Infotainment system DMS, Parking assistance Booking, navigation & maintenance", value: 'smart', cost: 3000 },
  { label: 'Smart+ Technology',desc:"LTE, GPS, Infotainment system DMS, Parking assistance, ADAS Booking & navigation apps", value: 'smart+', cost: 5000 }
];

const AdditionalFeatures = ({ formData, setFormData, nextStep, prevStep }) => {
  const [selectedAC, setSelectedAC] = useState(formData.ac || '');

  const handleACSelection = (value, cost) => {
    setSelectedAC(value);
    setFormData({ ...formData, ac: value, totalCost: formData.totalCost + cost - (formData.ac ? acOptions.find(option => option.value === formData.ac).cost : 0) });
  };

  const handleTechSelection = (value, cost) => {
    setFormData({ ...formData, features: value, totalCost: formData.totalCost + cost });
    nextStep();
  };

  return (
    <div>
    <h2 className="text-2xl mb-4">Select Additional Features</h2>
    <div className="flex flex-row items-center">
      <img src={img} className='w-96'></img>
      <div className="flex flex-col h-full">

      <Card className="mt-6 w-96 mb-12 hover:shadow-lg hover:shadow-gray-900/20"  
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

    
        {acOptions.map(option => (
          <label key={option.value} className="flex items-center space-x-2">
            <Radio
              name="ac"
              value={option.value}
              checked={selectedAC === option.value}
              onChange={() => handleACSelection(option.value, option.cost)}
              className="form-radio"
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>

      <div className="flex flex-col ml-10">
      {techOptions.map(option => (
<Card className="mt-6 w-96 hover:shadow-lg hover:shadow-gray-900/20"  
            key={option.value}
            onClick={() => handleTechSelection(option.value, option.cost)}>
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
          onClick={() => handleTechSelection(option.value, option.cost)}>
           
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

export default AdditionalFeatures;
