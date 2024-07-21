import React, { useState } from 'react';
import img from '../assets/On_road_passenger.png';

import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Radio
} from "@material-tailwind/react";

const acOptions = [
  { label: 'AC', value: 'ac', cost: 50000 },
  { label: 'Non-AC', value: 'non-ac', cost: 0 }
];

const techOptions = [
  { label: 'Basic Technology', desc: "LTE, GPS, Infotainment system", value: 'basic', cost: 25000 },
  { label: 'Smart Technology', desc: "LTE, GPS, Infotainment system DMS, Parking assistance Booking, navigation & maintenance", value: 'smart', cost: 50000 },
  { label: 'Smart+ Technology', desc: "LTE, GPS, Infotainment system DMS, Parking assistance, ADAS Booking & navigation apps", value: 'smart+', cost: 75000 }
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
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 md:px-8 lg:px-16 xl:px-24 bg-gray-100">
      <h2 className="text-3xl md:text-5xl mb-8 text-center">Select Additional Features</h2>
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

            <div className="flex flex-col space-y-4">
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
          </div>

          <div className="flex flex-col space-y-8">
            {techOptions.map(option => (
              <Card className="w-full hover:shadow-lg hover:shadow-gray-900/20 cursor-pointer" 
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
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    
      <Button onClick={prevStep} className='mt-5'>Previous</Button>
    </div>
  );
};

export default AdditionalFeatures;
