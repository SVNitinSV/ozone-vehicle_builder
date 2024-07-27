// src/components/StepperComponent.jsx
import React from 'react';
import { Stepper, Step, Typography } from "@material-tailwind/react";
import {
  UserIcon,
  CogIcon,
  BuildingLibraryIcon,
  CalculatorIcon,
  DocumentTextIcon,
  Battery100Icon,
  WrenchIcon,
  CpuChipIcon,
  TruckIcon,
  WrenchScrewdriverIcon
} from "@heroicons/react/24/outline";

const steps = [
  { icon: <WrenchIcon className="h-5 w-5" />, label: 'Vehicle Type', caption: 'Select the type of vehicle.' },
  { icon: <TruckIcon className="h-5 w-5" />, label: 'Vehicle Category', caption: 'Choose the category for your vehicle.' },
  { icon: <BuildingLibraryIcon className="h-5 w-5" />, label: 'Regulation', caption: 'Select the regulations applicable to your vehicle.' },
  { icon: <CalculatorIcon className="h-5 w-5" />, label: 'Calculator', caption: 'Calculate various parameters for your vehicle.' },
  { icon: <CogIcon className="h-5 w-5" />, label: 'Drivetrain', caption: 'Choose the drivetrain configuration.' },
  { icon: <Battery100Icon className="h-5 w-5" />, label: 'Battery Configuration', caption: 'Select the battery configuration for your vehicle.' },
  { icon: <WrenchScrewdriverIcon className="h-5 w-5" />, label: 'Build Type', caption: 'Choose the build type for your vehicle.' },
  { icon: <CpuChipIcon className="h-5 w-5" />, label: 'Additional Features', caption: 'Select additional features for your vehicle.' },
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
