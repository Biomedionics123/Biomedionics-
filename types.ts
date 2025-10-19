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
  currency: 'USD' | 'PKR';
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
  awardImageUrl: string;
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
  currency: 'USD' | 'PKR';
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

// Full data structure for import/export
export interface FullSiteData {
    products: Product[];
    blogPosts: BlogPost[];
    siteSettings: SiteSettings;
    appearanceSettings: AppearanceSettings;
    dynamicPages: DynamicPage[];
    reviews: Review[];
    orders: Order[];
    notifications: Notification[];
}


export interface AppContextType {
    products: Product[];
    setProducts: (products: Product[]) => void;
    blogPosts: BlogPost[];
    setBlogPosts: (posts: BlogPost[]) => void;
    siteSettings: SiteSettings;
    setSiteSettings: (settings: SiteSettings) => void;
    appearanceSettings: AppearanceSettings;
    setAppearanceSettings: (settings: AppearanceSettings) => void;
    dynamicPages: DynamicPage[];
    setDynamicPages: (pages: DynamicPage[]) => void;
    cart: CartItem[];
    addToCart: (product: Product, quantity: number) => void;
    updateCartQuantity: (productId: string, quantity: number) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
    cartTotal: number;
    wishlist: Product[];
    addToWishlist: (product: Product) => void;
    removeFromWishlist: (productId: string) => void;
    isInWishlist: (productId: string) => boolean;
    orders: Order[];
    addOrder: (customerDetails: CustomerDetails) => Order;
    updateOrderStatus: (orderId: string, status: OrderStatus) => void;
    reviews: Review[];
    addReview: (order: Order, rating: number, comment: string) => void;
    updateReviewStatus: (reviewId: string, status: ReviewStatus) => void;
    deleteReview: (reviewId: string) => void;
    notifications: Notification[];
    addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'isRead'>) => void;
    markNotificationAsRead: (notificationId: string) => void;
    markAllNotificationsAsRead: () => void;
    exportAllData: () => void;
    importAllData: (file: File) => void;
}
