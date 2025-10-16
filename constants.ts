import type { Product, Service, BlogPost, SiteSettings, Review, AppearanceSettings, DynamicPage, Notification } from './types';
import { StethoscopeIcon, WrenchIcon, MicroscopeIcon, HeartPulseIcon } from './components/IconComponents';
import React from 'react';
import { ReviewStatus } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'diasense-v1',
    name: 'Diasense DPN Scanner',
    description: 'A revolutionary non-invasive device for early detection of Diabetic Peripheral Neuropathy.',
    longDescription: 'The Diasense DPN Scanner utilizes advanced biosensors to provide a rapid, painless, and accurate assessment of nerve function. It is designed for clinical use, enabling healthcare providers to detect DPN in its earliest stages, facilitating timely intervention and improved patient outcomes. Its user-friendly interface and quick results make it an essential tool for any diabetes care practice.',
    category: 'Neuropathy Screening',
    imageUrl: 'https://picsum.photos/seed/diasense/600/400',
    price: 4999.99,
    stock: 10,
  },
  {
    id: 'bioprinter-x1',
    name: '3D Bioprinter X1',
    description: 'High-precision 3D bioprinter for creating complex biological structures and tissues for research.',
    longDescription: 'The 3D Bioprinter X1 offers exceptional resolution and multi-material capabilities, empowering researchers to fabricate intricate tissue scaffolds, organoids, and other biological constructs. With its sterile printing environment and intuitive software, the X1 is the perfect platform for advancing research in regenerative medicine, drug discovery, and personalized therapeutics.',
    category: 'Bioprinting',
    imageUrl: 'https://picsum.photos/seed/bioprinter/600/400',
    price: 15000.00,
    stock: 5,
  },
];

export const SERVICES: Service[] = [
    {
        id: 1,
        name: 'Device Maintenance',
        description: 'Scheduled check-ups and servicing to ensure your Diasense and Bioprinter equipment operates at peak performance and longevity.',
        icon: React.createElement(WrenchIcon, { className: "w-12 h-12 text-blue-600 mb-4" })
    },
    {
        id: 2,
        name: 'Emergency Repair',
        description: '24/7 rapid response team for critical equipment failures. We diagnose and repair issues swiftly to get your operations back on track.',
        icon: React.createElement(HeartPulseIcon, { className: "w-12 h-12 text-red-600 mb-4" })
    },
    {
        id: 3,
        name: 'Calibration & Certification',
        description: 'Precision calibration services, ensuring your devices provide accurate readings and meet regulatory compliance.',
        icon: React.createElement(StethoscopeIcon, { className: "w-12 h-12 text-green-600 mb-4" })
    },
    {
        id: 4,
        name: 'Research Consultation',
        description: 'Expert guidance on utilizing our 3D Bioprinter for your research goals and experimental design.',
        icon: React.createElement(MicroscopeIcon, { className: "w-12 h-12 text-purple-600 mb-4" })
    }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'first-post',
    title: 'The Future of DPN Detection is Here',
    content: 'Diabetic Peripheral Neuropathy (DPN) is a common complication of diabetes, but early detection has always been a challenge. Traditional methods can be invasive and subjective. In this post, we explore how our non-invasive Diasense technology is changing the game, allowing for earlier and more accurate diagnoses, ultimately leading to better patient care and outcomes. Join us as we delve into the science behind this breakthrough.',
    imageUrl: 'https://picsum.photos/seed/blog1/800/400',
    author: 'Dr. Evelyn Reed',
    date: '2024-07-15',
    files: [],
  },
  {
    id: 'second-post',
    title: 'Unlocking New Frontiers with 3D Bioprinting',
    content: '3D bioprinting is no longer science fiction. It is a powerful tool that is accelerating medical research at an unprecedented rate. From creating patient-specific tissue models for drug testing to developing scaffolds for regenerative medicine, the possibilities are endless. This article highlights the latest advancements in the field and showcases how the Biomedionics 3D Bioprinter X1 is empowering scientists to push the boundaries of what\'s possible.',
    imageUrl: 'https://picsum.photos/seed/blog2/800/400',
    author: 'Admin',
    date: '2024-07-20',
    files: [],
  }
];

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  teamImageUrl: 'https://picsum.photos/seed/team/1200/600',
  awardText: 'Proud Winners of the Pintech Expo 2025 Innovation Award for Diasense.',
  adminPassword: '1234',
};

export const INITIAL_REVIEWS: Review[] = [
    {
        id: 'review_1',
        orderId: 'order_1625247600000',
        customerName: 'John Doe',
        rating: 5,
        comment: 'The Diasense scanner has been a game-changer for our clinic. The non-invasive nature is a huge plus for our patients, and the accuracy is top-notch. Highly recommended!',
        createdAt: '2024-07-25',
        status: ReviewStatus.Approved,
    }
];

export const INITIAL_APPEARANCE_SETTINGS: AppearanceSettings = {
    siteName: 'Biomedionics',
    logoUrl: '', // Default empty logo
    videoSource: 'youtube',
    homepageVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Default video
    homepageVideoData: '',
    primaryColor: '#2563EB', // blue-600
    secondaryColor: '#4F46E5', // indigo-600
    headerLinks: [
        { id: 'h1', text: 'Home', url: '/', category: 'Company' },
        { id: 'h2', text: 'Products', url: '/products', category: 'Company' },
        { id: 'h3', text: 'Services', url: '/services', category: 'Company' },
        { id: 'h4', text: 'Blog', url: '/blog', category: 'Company' },
        { id: 'h5', text: 'About Us', url: '/about', category: 'Company' },
        { id: 'h6', text: 'Contact', url: '/contact', category: 'Company' },
    ],
    footerLinks: [
        { id: 'f1', text: 'Products', url: '/products', category: 'Solutions' },
        { id: 'f2', text: 'Services', url: '/services', category: 'Solutions' },
        { id: 'f3', text: 'Blog', url: '/blog', category: 'Solutions' },
        { id: 'f4', text: 'About', url: '/about', category: 'Company' },
        { id: 'f5', text: 'Contact', url: '/contact', category: 'Company' },
        { id: 'f6', text: 'Admin', url: '/admin', category: 'Company' },
    ]
};

export const INITIAL_DYNAMIC_PAGES: DynamicPage[] = [];

export const INITIAL_NOTIFICATIONS: Notification[] = [];