import type { ReactNode } from 'react';

export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  category: string;
  imageUrl: string;
  price: number;
  stock: number;
}

export interface Service {
  id: number;
  name: string;
  description: string;
  icon: ReactNode;
}

export interface BlogPostFile {
  name: string;
  type: string;
  data: string; // base64 encoded file data
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  author: string;
  date: string;
  files: BlogPostFile[];
}

export interface SiteSettings {
  teamImageUrl: string;
  awardText: string;
  adminPassword: string;
}

export interface CustomLink {
  id:string;
  text: string;
  url: string;
  category: 'Solutions' | 'Company'; // For footer organization
}

export interface AppearanceSettings {
  siteName: string;
  logoUrl: string;
  videoSource: 'youtube' | 'upload' | 'googledrive';
  homepageVideoUrl: string;
  homepageVideoData: string; // base64 encoded video data
  primaryColor: string;
  secondaryColor: string;
  headerLinks: CustomLink[];
  footerLinks: CustomLink[];
}

export interface DynamicPage {
  id: string;
  slug: string;
  title: string;
  content: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export enum ChatRole {
    USER = "user",
    MODEL = "model",
}

export interface ChatMessage {
    role: ChatRole;
    text: string;
}

export enum OrderStatus {
  Pending = 'Pending',
  Processing = 'Processing',
  Shipped = 'Shipped',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
}

export interface CustomerDetails {
  name: string;
  email: string;
  address: string;
}

export interface Order {
  id: string;
  customerDetails: CustomerDetails;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  reviewSubmitted: boolean;
}

export enum ReviewStatus {
    Pending = 'Pending',
    Approved = 'Approved',
    Rejected = 'Rejected',
}

export interface Review {
    id: string;
    orderId: string;
    customerName: string;
    rating: number;
    comment: string;
    createdAt: string;
    status: ReviewStatus;
}

export enum NotificationType {
    NewOrder = 'New Order',
    ContactInquiry = 'Contact Inquiry',
}

export interface Notification {
    id: string;
    type: NotificationType;
    subject: string;
    from?: string; // e.g., customer's email
    body: string;
    createdAt: string;
    isRead: boolean;
}