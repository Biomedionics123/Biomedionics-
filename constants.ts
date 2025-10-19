import type { Service } from './types';
import { ClipboardCheckIcon, WrenchIcon, BeakerIcon, HeartPulseIcon } from './components/IconComponents';
import React from 'react';

export const SERVICES: Service[] = [
    {
        id: 1,
        name: 'Device Maintenance',
        description: 'Scheduled check-ups and servicing to ensure your Diasense and Bioprinter equipment operates at peak performance and longevity.',
        icon: React.createElement(WrenchIcon, { className: "w-12 h-12 text-blue-600 mb-4 mx-auto" })
    },
    {
        id: 2,
        name: 'Emergency Repair',
        description: '24/7 rapid response team for critical equipment failures. We diagnose and repair issues swiftly to get your operations back on track.',
        icon: React.createElement(HeartPulseIcon, { className: "w-12 h-12 text-red-600 mb-4 mx-auto" })
    },
    {
        id: 3,
        name: 'Calibration & Certification',
        description: 'Precision calibration services, ensuring your devices provide accurate readings and meet regulatory compliance.',
        icon: React.createElement(ClipboardCheckIcon, { className: "w-12 h-12 text-green-600 mb-4 mx-auto" })
    },
    {
        id: 4,
        name: 'Research Consultation',
        description: 'Expert guidance on utilizing our 3D Bioprinter for your research goals and experimental design.',
        icon: React.createElement(BeakerIcon, { className: "w-12 h-12 text-purple-600 mb-4 mx-auto" })
    }
];
