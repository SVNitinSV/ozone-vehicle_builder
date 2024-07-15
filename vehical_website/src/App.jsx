import React, { useState } from 'react';
import VehicleType from './components/VehicleType';
import Drivetrain from './components/Drivetrain.jsx';
import BatteryConfiguration from './components/BatteryConfiguration';
import BuildType from './components/BuildType';
import AdditionalFeatures from './components/AdditionalFeatures';
import InsuranceWarranty from './components/InsuranceWarranty';
import Summary from './components/Summary';
import './App.css';

const App = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    vehicleType: '',
    drivetrain: '',
    battery: '',
    buildType: '',
    features: '',
    warranty: '',
    totalCost: 0
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  switch (step) {
    case 1:
      return <VehicleType formData={formData} setFormData={setFormData} nextStep={nextStep} />;
    case 2:
      return <Drivetrain formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />;
    case 3:
      return <BatteryConfiguration formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />;
    case 4:
      return <BuildType formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />;
    case 5:
      return <AdditionalFeatures formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />;
    case 6:
      return <InsuranceWarranty formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />;
    case 7:
      return <Summary formData={formData} prevStep={prevStep} />;
    default:
      return <div>Invalid Step</div>;
  }
};

export default App;
