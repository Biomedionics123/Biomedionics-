import type { Product, Service, BlogPost, SiteSettings, Review, AppearanceSettings, DynamicPage, Notification, Order } from './types';
import { ClipboardCheckIcon, WrenchIcon, BeakerIcon, HeartPulseIcon } from './components/IconComponents';
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
    price: 100000,
    stock: 10,
    currency: 'PKR',
  },
  {
    id: 'bioprinter-x1',
    name: '3D Bioprinter X1',
    description: 'High-precision 3D bioprinter for creating complex biological structures and tissues for research.',
    longDescription: 'The 3D Bioprinter X1 offers exceptional resolution and multi-material capabilities, empowering researchers to fabricate intricate tissue scaffolds, organoids, and other biological constructs. With its sterile printing environment and intuitive software, the X1 is the perfect platform for advancing research in regenerative medicine, drug discovery, and personalized therapeutics.',
    category: 'Bioprinting',
    imageUrl: 'https://picsum.photos/seed/bioprinter/600/400',
    price: 150000,
    stock: 5,
    currency: 'PKR',
  },
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
  awardImageUrl: 'https://picsum.photos/seed/team/1200/600',
  awardText: 'Proud Winners of the Pintech Expo 2025 Innovation Award for Diasense.',
  adminPassword: '1234',
};

export const INITIAL_REVIEWS: Review[] = [
    {
        id: 'review_2',
        orderId: 'order_1722124800000',
        customerName: 'Fatima Khan',
        rating: 5,
        comment: "An exceptional device. We've integrated the Diasense scanner into our diabetic clinic in Karachi, and the patient feedback has been overwhelmingly positive. It's fast, non-invasive, and provides results we can trust. A must-have for modern diabetic care.",
        createdAt: '2024-07-28',
        status: ReviewStatus.Approved,
    },
    {
        id: 'review_3',
        orderId: 'order_1721952000000',
        customerName: 'Rohan Sharma',
        rating: 5,
        comment: 'Our research lab in Bangalore is achieving incredible results with the Bioprinter X1. The precision and multi-material capability are top-of-the-line. It has accelerated our tissue engineering projects significantly. A fantastic investment for any serious research institution.',
        createdAt: '2024-07-26',
        status: ReviewStatus.Approved,
    },
    {
        id: 'review_4',
        orderId: 'order_1721520000000',
        customerName: 'Ali Ahmed',
        rating: 5,
        comment: "Our hospital in Lahore recently acquired the Diasense scanner. The training and support from Biomedionics were excellent. The device itself is incredibly user-friendly and has significantly improved our diagnostic workflow for neuropathy. Highly impressive technology.",
        createdAt: '2024-07-21',
        status: ReviewStatus.Approved,
    },
    {
        id: 'review_5',
        orderId: 'order_1721001600000',
        customerName: 'Priya Patel',
        rating: 5,
        comment: "As a PhD student in Mumbai, having access to the Bioprinter X1 has been a game-changer for my thesis work. The software is intuitive, and the prints are consistent and high-resolution. It's an amazing machine that's pushing the boundaries of what we can do in regenerative medicine.",
        createdAt: '2024-07-15',
        status: ReviewStatus.Approved,
    },
    {
        id: 'review_6',
        orderId: 'order_1720569600000',
        customerName: 'Ayesha Malik',
        rating: 4,
        comment: "A very good tool for early DPN screening. It's much better than the older methods. My only suggestion would be to add a more detailed reporting feature in the software. Otherwise, it's a solid piece of equipment for any endocrinologist.",
        createdAt: '2024-07-10',
        status: ReviewStatus.Approved,
    }
];

export const INITIAL_APPEARANCE_SETTINGS: AppearanceSettings = {
    siteName: 'Biomedionics',
    logoUrl: '', // Default empty logo
    videoSource: 'youtube',
    homepageVideoUrl: 'https://www.youtube.com/watch?v=SxTYjptEzZs&list=RDSxTYjptEzZs&start_radio=1', // Default video
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

export const INITIAL_ORDERS: Order[] = [];
