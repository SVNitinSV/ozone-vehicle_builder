// src/components/StepperComponent.jsx
import React from 'react';
import { Stepper, Step, Typography } from "@material-tailwind/react";
import {
  UserIcon,
  CogIcon,
  BuildingLibraryIcon,
  CalculatorIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

const steps = [
  { icon: <UserIcon className="h-5 w-5" />, label: 'Vehicle Type', caption: 'Select the type of vehicle.' },
  { icon: <CogIcon className="h-5 w-5" />, label: 'Vehicle Category', caption: 'Choose the category for your vehicle.' },
  { icon: <BuildingLibraryIcon className="h-5 w-5" />, label: 'Regulation', caption: 'Select the regulations applicable to your vehicle.' },
  { icon: <UserIcon className="h-5 w-5" />, label: 'Calculator', caption: 'Calculate various parameters for your vehicle.' },
  { icon: <UserIcon className="h-5 w-5" />, label: 'Drivetrain', caption: 'Choose the drivetrain configuration.' },
  { icon: <UserIcon className="h-5 w-5" />, label: 'Battery Configuration', caption: 'Select the battery configuration for your vehicle.' },
  { icon: <UserIcon className="h-5 w-5" />, label: 'Build Type', caption: 'Choose the build type for your vehicle.' },
  { icon: <DocumentTextIcon className="h-5 w-5" />, label: 'Additional Features', caption: 'Select additional features for your vehicle.' },
  { icon: <DocumentTextIcon className="h-5 w-5" />, label: 'Summary', caption: 'Review your selections and finalize your purchase.' },
];

const ProgressBar = ({ step }) => {
  return (
    <div className="w-full px-24 py-4 mt-10">
      <Stepper activeStep={step - 1} className="relative">
        {steps.map((stepData, index) => (
          <Step key={index}>
            {stepData.icon}
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default ProgressBar;
