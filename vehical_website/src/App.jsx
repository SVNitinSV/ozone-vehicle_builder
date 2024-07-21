import React, { useState } from 'react';
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
import './App.css';

const components = {
  1: VehicleType,
  2: VehicleCategory,
  3: RegulationSelect,
  4: Calculator,
  5: BatteryConfiguration,
  6: Drivetrain,
  7: BuildType,
  8: AdditionalFeatures,
  9: InsuranceWarranty,
  10: Summary,
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
      <CurrentComponent formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />
      <Footer className='bottom-0 left-0 w-full'></Footer>
    </div>
  );
};

export default App;
