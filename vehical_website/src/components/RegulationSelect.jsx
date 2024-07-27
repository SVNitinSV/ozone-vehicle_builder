import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { ArrowTurnDownLeftIcon } from '@heroicons/react/24/outline';
import regulationsData from '../assets/details/reguations.json'; // Adjust path as necessary

const Regulation = ({ formData, setFormData, prevStep, nextStep }) => {
  const { vehicleCategory, regulation } = formData;
  const [regulationsToShow, setRegulationsToShow] = useState([]);

  useEffect(() => {
    if (vehicleCategory) {
      setRegulationsToShow(regulationsData[vehicleCategory] || []);
    }
  }, [vehicleCategory]);

  const handleRegulationSelection = (selectedRegulation) => {
    setFormData({ ...formData, regulation: selectedRegulation });
    nextStep();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 md:px-8 lg:px-16 xl:px-24">
      <h2 className="text-3xl md:text-4xl lg:text-5xl mb-8 text-center">Vehicle Regulations</h2>
      <div className="w-full max-w-7xl mx-auto">
        {vehicleCategory ? (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
            {regulationsToShow.map((reg, index) => (
              <Card 
                key={index}
                className={`w-full p-5 bg-white shadow-lg rounded-lg ${
                  regulation === reg.type ? 'border-2 border-black' : ''
                }`}
                onClick={() => handleRegulationSelection(reg.type)}
              >
                <CardBody>
                  <Typography variant="h5" color="blue-gray" className="mb-4 text-center">
                    {reg.type}
                  </Typography>
                  <div className="space-y-2">
                    <Typography className="text-left">
                      <span className="font-bold">Length:</span> {reg.length}
                    </Typography>
                    <Typography className="text-left">
                      <span className="font-bold">Width:</span> {reg.width}
                    </Typography>
                    <Typography className="text-left">
                      <span className="font-bold">Top Speed:</span> {reg.topSpeed}
                    </Typography>
                    <Typography className="text-left">
                      <span className="font-bold">Peak Power:</span> {reg.peakPower}
                    </Typography>
                    <Typography className="text-left">
                      <span className="font-bold">Dry Weight:</span> {reg.dryWeight}
                    </Typography>
                    <Typography className="text-left">
                      <span className="font-bold">Seating Capacity:</span> {reg.seatingCapacity}
                    </Typography>
                  </div>
                </CardBody>
                <CardFooter className="pt-0 flex justify-center">
                  <Button 
                    size="sm" 
                    variant="text" 
                    className="flex items-center gap-2" 
                    onClick={() => handleRegulationSelection(reg.type)}
                  >
                    Select
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Typography className="text-center text-lg">Please select a vehicle category to view regulations.</Typography>
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

export default Regulation;
