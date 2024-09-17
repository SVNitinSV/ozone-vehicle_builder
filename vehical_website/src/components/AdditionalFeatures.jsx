import React, { useState } from 'react';

import EVModel from '../ModelCar';

import { ArrowTurnDownLeftIcon } from '@heroicons/react/24/outline';

import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Switch
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
  // State for AC selection
  const [isAC, setIsAC] = useState(formData.ac === 'ac');

  const handleACChange = (checked) => {
    const value = checked ? 'ac' : 'non-ac';
    const acCost = checked ? acOptions.find(option => option.value === 'ac').cost : acOptions.find(option => option.value === 'non-ac').cost;
  
    setIsAC(checked);
    setFormData(prevFormData => {
      const currentACCost = prevFormData.ac ? acOptions.find(option => option.value === prevFormData.ac).cost : 0;
      const totalFeaturesCost = acCost + prevFormData.techCost; // Assuming you have a techCost in formData
      return {
        ...prevFormData,
        ac: value,
        acCost: acCost, // Optionally store the ac cost
        featuresCost: totalFeaturesCost, // Update featuresCost
        totalCost: prevFormData.totalCost + acCost - currentACCost
      };
    });
  };

  const handleTechSelection = (value, cost) => {
    setFormData(prevFormData => {
      const totalFeaturesCost = prevFormData.acCost + cost; // Assuming you have an acCost in formData
      return {
        ...prevFormData,
        features: value,
        techCost: cost, // Optionally store the tech cost
        featuresCost: totalFeaturesCost, // Update featuresCost
        totalCost: prevFormData.totalCost + cost // Update total cost if needed
      };
    });
    nextStep();
  };
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 md:px-8 lg:px-16 xl:px-24 bg-gray-100">
      <h2 className="text-3xl md:text-5xl mb-8 text-center">Select Additional Features</h2>
      <div className="flex flex-col md:flex-row items-center w-full">
        <EVModel></EVModel>
        
        
        <div className="flex flex-col md:flex-row w-full">
         

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
             <div className="flex items-center mb-8">
              <Typography className="mr-4 text-lg">AC</Typography>
              <Switch
                checked={isAC}
                onChange={(e) => handleACChange(e.target.checked)}
                
              />
              <Typography className='ml-3'> Non-AC</Typography>
            </div>
          </div>
        </div>
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

export default AdditionalFeatures;
