
import React from 'react';
import { SERVICES } from '../constants';

const ServicesPage: React.FC = () => {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900">Our Services</h1>
            <p className="mt-4 text-lg text-gray-600">Dedicated support to maximize the performance and lifespan of your equipment.</p>
        </div>
        <div className="max-w-4xl mx-auto space-y-8">
            {SERVICES.map((service) => (
                <div key={service.id} className="bg-white p-8 rounded-lg shadow-md flex items-start space-x-6">
                    <div className="flex-shrink-0">
                        {service.icon}
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">{service.name}</h2>
                        <p className="mt-2 text-gray-600 text-base">{service.description}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
