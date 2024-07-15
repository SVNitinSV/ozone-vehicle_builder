import React from 'react';
import { Button } from "@material-tailwind/react";

const Summary = ({ formData, prevStep }) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl mb-4">Summary</h2>
      <div className="text-left">
        <p><strong>Vehicle Type:</strong> {formData.vehicleType}</p>
        <p><strong>Drivetrain:</strong> {formData.drivetrain}</p>
        <p><strong>Battery Configuration:</strong> {formData.battery}</p>
        <p><strong>Build Type:</strong> {formData.buildType}</p>
        <p><strong>Additional Features:</strong> {formData.features}</p>
        <p><strong>Insurance & Warranty:</strong> {formData.warranty}</p>
        <p className="mt-4"><strong>Total Cost:</strong> ${formData.totalCost}</p>
      </div>
      <div className="flex space-x-4">
       <Button onClick={prevStep} className='m-5' >Previous</Button>
       </div>
    </div>
  );
};

export default Summary;
