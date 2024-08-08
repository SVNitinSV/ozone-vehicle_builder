// src/App.jsx
import React, { useState } from 'react';
import Header from './components/Header.jsx';
import VehicleType from './components/VehicleType';
import VehicleCategory from './components/VehicleCategory.jsx';
import RegulationSelect from './components/RegulationSelect.jsx';
import Calculator from './components/Calculator.jsx';
import Drivetrain from './components/Drivetrain.jsx';
import BatteryConfiguration from './components/BatteryConfiguration';
import BuildType from './components/BuildType';
import AdditionalFeatures from './components/AdditionalFeatures';
import InsuranceWarranty from './components/InsuranceWarranty';
import Summary from './components/Summary';
import Footer from './components/Footer';
import StepperComponent from './components/ProgressBar.jsx';
import { Button } from "@material-tailwind/react";
import './App.css';

const components = {
  1: VehicleType,
  2: VehicleCategory,
  19: RegulationSelect,
  3: Calculator,
  4: Drivetrain,
  5: BatteryConfiguration,
  6: BuildType,
  7: AdditionalFeatures,
  19: InsuranceWarranty,
  8: Summary,
};

const App = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    vehicleType: '',
    vehicleCategory: '',
    regulation: '',
    range1: '',
    range2: '',
    range3: '',
    drivetrain: '',
    battery: '',
    buildType: '',
    features: '',
    warranty: '',
    totalCost: 0,
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const CurrentComponent = components[step] || (() => <div>Invalid Step</div>);

  return (
    <div className="app-container">
      <Header />
      {/*{step > 1 && <StepperComponent step={step} />}*/}
      <CurrentComponent formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />
      <Footer className='bottom-0 left-0 w-full' />
    </div>
  );
};

export default App;
