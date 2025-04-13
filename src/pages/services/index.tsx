
import React from 'react';
import { useParams } from 'react-router-dom';
import { m } from "framer-motion";
import ServicesOverview from './ServicesOverview';
import ServiceDetail from './ServiceDetail';
import servicesData from './servicesData';

const Services = () => {
  const { service } = useParams<{ service?: string }>();
  
  const selectedService = service && servicesData[service] ? servicesData[service] : null;

  return (
    <div className="min-h-screen">
      {selectedService ? (
        <ServiceDetail service={selectedService} servicesData={servicesData} />
      ) : (
        <ServicesOverview servicesData={servicesData} />
      )}
    </div>
  );
};

export default Services;
