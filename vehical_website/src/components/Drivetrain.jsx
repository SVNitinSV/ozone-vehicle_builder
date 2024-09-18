import React, { useState } from 'react';
import batImg from '../assets/img/Battery.png';
import Bat_model from '../Modelrender';

import ofrcImg from '../assets/img/Off_road_cargo.png';
import ofrpImg from '../assets/img/Off_road_Passenger.png';
import onrcImg from '../assets/img/On_road_cargo.png';
import onrpImg from '../assets/img/On_road_passenger.png';

import chassis from '../assets/3dmodels/chassis/frame.gltf'; // Chassis model stays always on
import body from '../assets/3dmodels/chassis/battery.gltf'; // Second model
import wheels from '../assets/3dmodels/chassis/drivetrain.gltf'; // Third model

import { Canvas } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import { ArrowLeftIcon,ArrowRightIcon } from '@heroicons/react/24/outline';
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Switch
} from "@material-tailwind/react";

import Breadcrumbs from './BreadCrumbs';

const Model = ({ gltfFile, visible }) => {
  const gltf = useLoader(GLTFLoader, gltfFile);
  return visible ? <primitive object={gltf.scene} /> : null;
};

// Battery options with associated range keys
const drivetrainOptions = [
  { label: "FWD", desc: "Ideal for lower loading, passenger vehicles", value: "fwd", cost: 124000 },
  { label: "RWD", desc: "Ideal for higher loading, cargo vehicles", value: "rwd", cost: 110000 },
  { label: "AWD", desc: "Ideal for All-Terrain Adventures, Ensuring Traction and Control", value: "awd", cost: 110000 },
];

const batteryOptions = [
  { label: "10.1 Kwh", desc: "Ideal for last mile 8 Hours trips for On road & off road", rangeKey: "range1", value: "standard", cost: 150000 },
  { label: "20.2 Kwh", desc: "Ideal for mid mile 12 Hours trips for On road", rangeKey: "range2", value: "extended", cost: 200000 },
  { label: "30.3 Kwh", desc: "Ideal for long mile 16 Hours trips for On road", rangeKey: "range3", value: "extended plus", cost: 250000 },
];

const buildOptions = [
  { label: 'Off-Road Cargo', desc: "In campus vehicle for material handling, up to 1300 kg GVW", value: 'Golf Cart', cost: 100000, img: ofrcImg, type: 'Off-Road', category: 'Golf Cart' },
  { label: 'Off-Road Passenger', desc: "In campus vehicle for people movement, up to 9 seats", value: 'Off-Road Passenger', cost: 110000, img: ofrpImg, type: 'Off-Road', category: 'Golf Cart' },
  { label: 'On-Road Cargo', desc: "Last mile cargo vehicle for e-logistics up to 1300 kg GVW", value: 'On-Road Cargo', cost: 120000, img: onrcImg, type: 'On-Road', category: 'Golf Cart' },
  { label: 'On-Road Passenger', desc: "Last mile passenger movement, up to 9 seats", value: 'On-Road Passenger', cost: 130000, img: onrpImg, type: 'On-Road', category: 'Golf Cart' }
];

const chargerOptions = [
  { label: "Level 1", desc: "Ideal for overnight home charging", value: "level1", cost: 50000 },
  { label: "Level 2", desc: "Faster home or public charging", value: "level2", cost: 100000 },
  { label: "DC Fast Charger", desc: "Rapid charging for long trips", value: "dc_fast", cost: 200000 },
];

const acOptions = [
  { label: 'AC', value: 'ac', cost: 50000 },
  { label: 'Non-AC', value: 'non-ac', cost: 0 }
];

const techOptions = [
  { label: 'Basic Technology', desc: "LTE, GPS, Infotainment system", value: 'basic', cost: 25000 },
  { label: 'Smart Technology', desc: "LTE, GPS, Infotainment system DMS, Parking assistance Booking, navigation & maintenance", value: 'smart', cost: 50000 },
  { label: 'Smart+ Technology', desc: "LTE, GPS, Infotainment system DMS, Parking assistance, ADAS Booking & navigation apps", value: 'smart+', cost: 75000 }
];





const BatteryConfiguration = ({ formData, setFormData, nextStep, prevStep }) => {
  const [step, setStep] = useState(0); // 0: Drivetrain, 1: Battery, 2: Charger
  const [selectedOptions, setSelectedOptions] = useState({ drivetrain: '', battery: '', charger: '' });

  const handleSelection = (value, cost, type) => {
    // Check if the option being selected is already the current selection
    if (selectedOptions[type] === value) {
      // If the current step is not the last one, move to the next section
      if (step < 4) {
        setStep(step + 1);
      }
      return; // Do nothing if the same option is selected again
    }
  
    // Update formData and selectedOptions
    setFormData((prev) => ({
      ...prev,
      [type]: value, // Set the selected type (drivetrain, battery, charger)
      [`${type}Cost`]: cost, // Update the corresponding cost field (drivetrainCost, batteryCost, chargerCost)
    }));
  
    setSelectedOptions((prev) => ({ ...prev, [type]: value }));
  
    // Toggle models based on the current step and previous selections
    if (step === 0 && !selectedOptions.wheels) {
      toggleWheels(); // Assuming this toggles the model visualization
    } else if (step === 1 && !selectedOptions.body) {
      toggleBody(); // Assuming this toggles the model visualization
    }
  
    // Move to the next step if applicable
    if (step < 4) {
      setStep(step + 1);
    }
  };
  
  

  const prevCard = () => {
    if (step === 1) {
      // Going back from Battery to DriveTrain
      // Reset battery selection and cost
      setFormData((prev) => ({
        ...prev,
        battery: '', // Reset battery selection
        batteryCost: 0, // Reset battery cost
      }));
      setSelectedOptions((prev) => ({ ...prev, battery: '' })); // Reset selected battery option
    } else if (step === 2) {
      // Going back from Charger to Battery
      // Reset charger selection and cost
      setFormData((prev) => ({
        ...prev,
        charger: '', // Reset charger selection
        chargerCost: 0, // Reset charger cost
      }));
      setSelectedOptions((prev) => ({ ...prev, charger: '' })); // Reset selected charger option
    }
  
    // Go back to the previous step if it's not the first step
    if (step > 0) {
      setStep(step - 1);
  
      // Toggle the corresponding model back on
      if (step === 1) {
        if (selectedOptions.battery) {
          toggleBody(); // Turn off the charger model only if it has been selected
        }
      } else if (step === 2) {
        if (selectedOptions.charger) {
          toggleWheels(); // Turn off the charger model only if it has been selected
        }
      }
    }
  };
  

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
      };
    });
  };

  
  // Visibility states for body and wheels, chassis always stays on
  const [showBody, setShowBody] = useState(false);
  const [showWheels, setShowWheels] = useState(false);

  const toggleBody = () => setShowBody((prev) => !prev);
  const toggleWheels = () => setShowWheels((prev) => !prev);

  const currentOptions = () => {
    switch (step) {
      case 0:
        return drivetrainOptions;
      case 1:
        return batteryOptions;
      case 2:
        return chargerOptions;
      case 3:
          return buildOptions;
      case 4:
          return techOptions;
      default:
        return [];
    }
  };

  const currentType = () => {
    switch (step) {
      case 0:
        return 'drivetrain';
      case 1:
        return 'battery';
      case 2:
        return 'charger';
      case 3:
        return 'buildType';
      case 4:
        return 'features';
      default:
        return '';
    }
  };

  return (
    <div className="">
      <h2 className="text-3xl mt-5 md:text-5xl mb-8 text-center">Select {step === 0 ? "Drivetrain" : step === 1 ? "Battery" : "Charger"}</h2>
      <Breadcrumbs formData={formData} className="" />
      <div className="flex flex-col xl:flex-row items-center gap-8 w-full bg-white p-4 -lg mb-4 lg:h-[75vh] sm:h-fit">

        {/* 3D Canvas */}
        <Canvas camera={{ position: [-1, -1, 3], fov: 60 }}>
          {/* Lighting Setup */}
          <ambientLight intensity={1} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} />
          <directionalLight position={[5, -5, 5]} intensity={0.5} />
          <directionalLight position={[-5, 5, 5]} intensity={0.5} />
          <directionalLight position={[5, 5, -5]} intensity={0.5} />
          <directionalLight position={[0, -5, 0]} intensity={0.5} />
          <directionalLight position={[-5, 0, 0]} intensity={0.5} />
          <Model gltfFile={chassis} visible={true} /> {/* Chassis always visible */}
          <Model gltfFile={body} visible={showBody} />
          <Model gltfFile={wheels} visible={showWheels} />
          <OrbitControls enableZoom={false} />
        </Canvas>

        <div className="flex flex-col items-center w-full xl:w-1/3">
          {currentOptions().map(option => (
            <Card
              className={`mt-6 w-full hover:shadow-lg hover:shadow-gray-900/20 rounded-none${selectedOptions[currentType()] === option.value ? 'border-4 border-black' : ''}`}
              key={option.value}
              onClick={() => handleSelection(option.value, option.cost, currentType())}
            >
              <CardBody>
              <div className='flex flex-col items-center sm:flex-row'>
              {step === 3 && (
                  <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
                    <img src={option.img} alt={option.label} className="w-24 h-auto object-cover rounded-lg" />
                  </div>
                   )} 
                  <div>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {option.label}
                </Typography>
                <Typography>{option.desc}</Typography>
                {step === 1 && (
          <Typography color="green" className="font-semibold">
            Total Range: {formData[option.rangeKey] || "N/A"} km
          </Typography>
        )}
         </div>
               </div>
              </CardBody>
            </Card>
          ))}
 {step === 4 && (
          <div className="flex items-center mb-8">
              <Typography className="mr-4 text-lg">AC</Typography>
              <Switch
                checked={isAC}
                onChange={(e) => handleACChange(e.target.checked)}
                
              />
              <Typography className='ml-3'> Non-AC</Typography>
            </div>
  )} 
          <div className="relative flex justify-start w-full mt-5 mb-5">
            {step > 0 && (
              <ArrowLeftIcon
                onClick={prevCard}
                className="cursor-pointer text-neutral-800 hover:text-neutral-600 transition-all h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10"
              />
            )}
            {step === 4 && (
              <ArrowRightIcon
                onClick={nextStep}
                className="cursor-pointer text-neutral-800 hover:text-neutral-600 transition-all h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatteryConfiguration;
