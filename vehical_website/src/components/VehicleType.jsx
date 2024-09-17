import React from "react";
import offroad from "../assets/img/off_road.jpeg";
import onroad from "../assets/img/on_road.jpeg";
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
    label: "(Upto 30kmph, Non-Road Legal)",
    value: "Off-Road",
    cost: 100000,
    img: offroad,
    type: "QUAD / UTV / NEV / GOLF CART",
    cap: "MOTORSPORT - PEOPLE MOVEMENT - GOODS MOVEMENT",
    disabled: false, 
  },
  {
    label: "(Upto 200kmph, Road Legal)",
    value: "On-Road",
    cost: 80000,
    img: onroad,
    type: "QUAD / LMV / LCV",
    cap: "2 SEATER - 4 SEATER - CARGO",
    disabled: true, 
  },
];

const VehicleType = ({ formData, setFormData, nextStep }) => {
  const handleSelection = (value, cost) => {
    // Only allow selection if the option is not disabled
    if (formData.disabled) {
      return;
    }
    setFormData({ ...formData, vehicleType: value, totalCost: formData.totalCost + cost });
    nextStep();
  };

  return (
    <div className="xl:h-[90vh] lg:h-fit xs:h-fit flex flex-col items-center justify-center px-4 py-8 md:px-8 lg:px-16 xl:px-24 relative">
      <div className="relative z-10 text-neutral-800 ">
        <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl mb-10 text-center">
          WHAT DO YOU WANT TO BUILD?
        </h1>
        <div className="w-full text-center mb-8"></div>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
          {options.map((option) => (
            <Card
              key={option.value}
              className={`w-full max-w-md mx-auto hover:shadow-lg rounded-none lg:w-11/12 h-auto ${option.disabled ? "opacity-50 cursor-not-allowed" : "hover:shadow-gray-900/20 cursor-pointer"}`}
              onClick={() => !option.disabled && handleSelection(option.value, option.cost)} // Only call handleSelection if not disabled
              title={option.disabled ? "Coming Soon" : ""}
            >
              <CardBody className="text-left p-4">
                <img
                  src={option.img}
                  alt={option.label}
                  className="mb-4 rounded-lg w-full h-auto object-cover"
                />
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {option.type}
                </Typography>
                <Typography color="blue-gray" className="mb-2 text-md">
                  {option.cap}
                </Typography>
                <div>
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
                  disabled={option.disabled} // Disable button if option is disabled
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
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
