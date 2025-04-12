
import React from 'react';
import { useParams } from 'react-router-dom';
import { LazyMotion, domAnimation } from "framer-motion";
import ServicesOverview from './ServicesOverview';
import ServiceDetail from './ServiceDetail';
import servicesData from './servicesData';

const Services = () => {
  const { service } = useParams();
  
  const selectedService = service && servicesData[service] ? servicesData[service] : null;

  return (
    <div className="min-h-screen">
      <LazyMotion features={domAnimation}>
        {selectedService ? (
          <ServiceDetail service={selectedService} servicesData={servicesData} />
        ) : (
          <ServicesOverview servicesData={servicesData} />
        )}
      </LazyMotion>
    </div>
  );
};

export default Services;
