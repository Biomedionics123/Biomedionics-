import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { getDisplayableImageUrl } from '../components/IconComponents';

const AboutPage: React.FC = () => {
  const { siteSettings } = useAppContext();
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">About Us</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Pioneers in Medical Technology
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Biomedionics was founded to bridge the gap between groundbreaking research and real-world clinical applications.
          </p>
        </div>

        <div className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                    <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
                    <p className="mt-4 text-lg text-gray-600">
                        Our mission is to empower healthcare providers and researchers with the most advanced, reliable, and user-friendly biomedical devices. We are dedicated to improving diagnostic accuracy for conditions like Diabetic Peripheral Neuropathy and accelerating research through technologies like 3D bioprinting.
                    </p>
                </div>
                <div>
                     <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
                    <p className="mt-4 text-lg text-gray-600">
                       We envision a future where preventative care is proactive and personalized medicine is a reality. By developing innovative tools like Diasense and the Bioprinter X1, we aim to be a catalyst for the next generation of healthcare solutions.
                    </p>
                </div>
            </div>
        </div>

        <div className="mt-16 text-center">
             <img src={getDisplayableImageUrl(siteSettings.awardImageUrl)} alt="Our Team" className="rounded-lg shadow-xl mx-auto" />
             <p className="mt-6 text-xl text-yellow-500 font-semibold">&#9733; {siteSettings.awardText} &#9733;</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;