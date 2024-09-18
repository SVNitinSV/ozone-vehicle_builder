import React from 'react';

import { Breadcrumbs } from "@material-tailwind/react";

const BreadCrumbs = ({ formData }) => {
  // Filter out the empty fields and those that contain "Cost"
 // Filter out empty fields and exclude cost fields
 const breadcrumbItems = Object.entries(formData)
 .filter(([key, value]) => value && !key.toLowerCase().includes('cost') &&!key.toLowerCase().includes('range'))
 .map(([key, value], index) => (
   <a href="#" className="opacity-60" key={index}>
     {value}
   </a>
 ));

return (
 <Breadcrumbs className='ml-10'>
   {breadcrumbItems.length > 0 ? breadcrumbItems : <span>No data yet</span>}
 </Breadcrumbs>
);
};

export default BreadCrumbs;
