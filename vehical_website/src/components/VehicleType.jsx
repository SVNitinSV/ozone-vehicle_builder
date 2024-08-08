import React from "react";
import offroad from "../assets/off_road.jpeg";
import onroad from "../assets/on_road.jpeg";
import { ArrowTurnDownLeftIcon } from "@heroicons/react/24/outline";

import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const options = [
  {
    label: "(Upto 30kmph,Non-Road Legal)",
    value: "Off-Road",
    cost: 100000,
    img: offroad,
    type: "QUAD / UTV / NEV / GOLF CART",
    cap: "MOTORSPORT - PEOPLE MOVEMENT - GOODS MOVEMENT"
  },
  {
    label: "(Upto 200kmph,Road Legal)",
    value: "On-Road",
    cost: 80000,
    img: onroad,
    type: "QUAD / LMV / LCV",
    cap: "2 SEATER - 4 SEATER - CARGO"
  },
];

const VehicleType = ({ formData, setFormData, nextStep }) => {
  const handleSelection = (value, cost) => {
    setFormData({ ...formData, vehicleType: value, totalCost: formData.totalCost + cost });
    nextStep();
  };

  return (
    <div className="min-h-screen min-w-screen w-full flex flex-col items-center justify-center px-4 py-8 md:px-8 lg:px-16 xl:px-24 relative">
    
      <div className="relative z-10 text-neutral-800">
        <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl mb-10 text-center">
          WHAT DO YOU WANT TO BUILD?
        </h1>
        <div className="w-full text-center mb-8">
         
        </div>
        <div className="w-full grid grid-cols-1  lg:grid-cols-2 gap-8">
          {options.map((option) => (
            <Card
              key={option.value}
              className="min-w-screen hover:shadow-lg hover:shadow-gray-900/20 cursor-pointer rounded-none"
              onClick={() => handleSelection(option.value, option.cost)}
            >
              <CardBody className="text-left ">
                <img
                  src={option.img}
                  alt={option.label}
                  className="mb-4 rounded-lg w-fit h-fit object-cover"
                />
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {option.type}
                </Typography>
                <Typography  color="blue-gray" className="mb-2 text-md">
                  {option.cap}
                </Typography>
                
                <div className="">
      
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {option.label}
                </Typography>
        
                <Typography>{option.desc}</Typography>
                <Typography className="mt-5">{option.des}</Typography>
                </div>
              </CardBody>
              <CardFooter className="pt-0 flex justify-center">
                <Button
                  size="sm"
                  variant="text"
                  className="flex items-center gap-2 rounded-none"
                  onClick={() => handleSelection(option.value, option.cost)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>

                  
                </Button>
              </CardFooter>
             
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VehicleType;
