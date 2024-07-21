import React from 'react';
import { Button } from "@material-tailwind/react";

const Summary = ({ formData, prevStep }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 md:px-8 lg:px-16 xl:px-24 bg-gray-100 overflow-y-auto">
      <h2 className="text-4xl md:text-5xl mb-8 text-center">Summary</h2>
      <div className="w-full md:max-w-4xl bg-white rounded-lg shadow-lg p-8">
        <div className="text-left mb-6">
          <p className="text-lg md:text-xl mb-4"><strong>Vehicle Type:</strong> {formData.vehicleType}</p>
          <p className="text-lg md:text-xl mb-4"><strong>Vehicle Category:</strong> {formData.vehicleCategory}</p>
          <p className="text-lg md:text-xl mb-4"><strong>Drivetrain:</strong> {formData.drivetrain}</p>
          <p className="text-lg md:text-xl mb-4"><strong>Battery Configuration:</strong> {formData.battery}</p>
          <p className="text-lg md:text-xl mb-4"><strong>Build Type:</strong> {formData.buildType}</p>
          <p className="text-lg md:text-xl mb-4"><strong>Additional Features:</strong> {formData.features}</p>
          <p className="text-lg md:text-xl mb-4"><strong>Insurance & Warranty:</strong> {formData.warranty}</p>
          <p className="text-lg md:text-xl mb-4"><strong>Total Cost:</strong> ₹{formData.totalCost}</p>
        </div>
        <div className="flex justify-center">
          <Button onClick={prevStep} className='px-8 py-3 text-lg '>Previous</Button>
        </div>
      </div>
    </div>
  );
};

export default Summary;
