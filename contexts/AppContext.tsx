import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import type { Product, BlogPost, SiteSettings, CartItem, Order, CustomerDetails, Review, AppearanceSettings, DynamicPage, Notification } from '../types';
import { OrderStatus, ReviewStatus, NotificationType } from '../types';
import { INITIAL_PRODUCTS, INITIAL_BLOG_POSTS, INITIAL_SITE_SETTINGS, INITIAL_REVIEWS, INITIAL_APPEARANCE_SETTINGS, INITIAL_DYNAMIC_PAGES, INITIAL_NOTIFICATIONS } from '../constants';

// Helper to get data from localStorage
const getFromStorage = <T,>(key: string, defaultValue: T): T => {
    try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error(`Error reading from localStorage key “${key}”:`, error);
        return defaultValue;
    }
};

interface AppContextType {
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
    notifications: Notification[];
    addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'isRead'>) => void;
    markNotificationAsRead: (notificationId: string) => void;
    markAllNotificationsAsRead: () => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [products, setProductsState] = useState<Product[]>(() => getFromStorage('biomedionics_products', INITIAL_PRODUCTS));
    const [blogPosts, setBlogPostsState] = useState<BlogPost[]>(() => getFromStorage('biomedionics_blogPosts', INITIAL_BLOG_POSTS));
    const [siteSettings, setSiteSettingsState] = useState<SiteSettings>(() => getFromStorage('biomedionics_siteSettings', INITIAL_SITE_SETTINGS));
    const [appearanceSettings, setAppearanceSettingsState] = useState<AppearanceSettings>(() => getFromStorage('biomedionics_appearanceSettings', INITIAL_APPEARANCE_SETTINGS));
    const [dynamicPages, setDynamicPagesState] = useState<DynamicPage[]>(() => getFromStorage('biomedionics_dynamicPages', INITIAL_DYNAMIC_PAGES));
    const [cart, setCart] = useState<CartItem[]>(() => getFromStorage('biomedionics_cart', []));
    const [wishlist, setWishlist] = useState<Product[]>(() => getFromStorage('biomedionics_wishlist', []));
    const [orders, setOrders] = useState<Order[]>(() => getFromStorage('biomedionics_orders', []));
    const [reviews, setReviews] = useState<Review[]>(() => getFromStorage('biomedionics_reviews', INITIAL_REVIEWS));
    const [notifications, setNotifications] = useState<Notification[]>(() => getFromStorage('biomedionics_notifications', INITIAL_NOTIFICATIONS));

    useEffect(() => { localStorage.setItem('biomedionics_products', JSON.stringify(products)); }, [products]);
    useEffect(() => { localStorage.setItem('biomedionics_blogPosts', JSON.stringify(blogPosts)); }, [blogPosts]);
    useEffect(() => { localStorage.setItem('biomedionics_siteSettings', JSON.stringify(siteSettings)); }, [siteSettings]);
    useEffect(() => { localStorage.setItem('biomedionics_appearanceSettings', JSON.stringify(appearanceSettings)); }, [appearanceSettings]);
    useEffect(() => { localStorage.setItem('biomedionics_dynamicPages', JSON.stringify(dynamicPages)); }, [dynamicPages]);
    useEffect(() => { localStorage.setItem('biomedionics_cart', JSON.stringify(cart)); }, [cart]);
    useEffect(() => { localStorage.setItem('biomedionics_wishlist', JSON.stringify(wishlist)); }, [wishlist]);
    useEffect(() => { localStorage.setItem('biomedionics_orders', JSON.stringify(orders)); }, [orders]);
    useEffect(() => { localStorage.setItem('biomedionics_reviews', JSON.stringify(reviews)); }, [reviews]);
    useEffect(() => { localStorage.setItem('biomedionics_notifications', JSON.stringify(notifications)); }, [notifications]);

    const setProducts = (newProducts: Product[]) => setProductsState(newProducts);
    const setBlogPosts = (newPosts: BlogPost[]) => setBlogPostsState(newPosts);
    const setSiteSettings = (newSettings: SiteSettings) => setSiteSettingsState(newSettings);
    const setAppearanceSettings = (newSettings: AppearanceSettings) => setAppearanceSettingsState(newSettings);
    const setDynamicPages = (newPages: DynamicPage[]) => setDynamicPagesState(newPages);

    const addToCart = (product: Product, quantity: number) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            const productInStock = products.find(p => p.id === product.id);
            const availableStock = productInStock ? productInStock.stock : 0;
            const currentQuantityInCart = existingItem ? existingItem.quantity : 0;

            const quantityToAdd = Math.min(quantity, availableStock - currentQuantityInCart);

            if (quantityToAdd <= 0) return prevCart; 

            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + quantityToAdd } : item
                );
            }
            return [...prevCart, { ...product, quantity: quantityToAdd }];
        });
    };
    
    const updateCartQuantity = (productId: string, quantity: number) => {
        setCart(prevCart => {
            if (quantity <= 0) {
                return prevCart.filter(item => item.id !== productId);
            }
            const productInStock = products.find(p => p.id === productId);
            const availableStock = productInStock ? productInStock.stock : 0;
            const newQuantity = Math.min(quantity, availableStock);
            
            return prevCart.map(item =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            );
        });
    };

    const removeFromCart = (productId: string) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };
    
    const clearCart = () => setCart([]);
    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const isInWishlist = (productId: string) => wishlist.some(item => item.id === productId);
    const addToWishlist = (product: Product) => {
        if (!isInWishlist(product.id)) {
            setWishlist(prev => [...prev, product]);
        }
    };
    const removeFromWishlist = (productId: string) => setWishlist(prev => prev.filter(item => item.id !== productId));

    const addNotification = (notification: Omit<Notification, 'id' | 'createdAt' | 'isRead'>) => {
        const newNotification: Notification = {
            ...notification,
            id: `notif_${Date.now()}`,
            createdAt: new Date().toISOString(),
            isRead: false,
        };
        setNotifications(prev => [newNotification, ...prev]);
    };
    const markNotificationAsRead = (notificationId: string) => {
        setNotifications(prev => prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n));
    };
    const markAllNotificationsAsRead = () => setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));

    const addOrder = (customerDetails: CustomerDetails): Order => {
        const newOrder: Order = {
            id: `order_${Date.now()}`,
            customerDetails,
            items: cart,
            total: cartTotal,
            status: OrderStatus.Pending,
            createdAt: new Date().toISOString(),
            reviewSubmitted: false,
        };
        setOrders(prevOrders => [newOrder, ...prevOrders]);

        const newProducts = [...products];
        cart.forEach(cartItem => {
            const productIndex = newProducts.findIndex(p => p.id === cartItem.id);
            if (productIndex !== -1) {
                newProducts[productIndex].stock -= cartItem.quantity;
            }
        });
        setProducts(newProducts);

        const orderItemsSummary = cart.map(item => 
            `- ${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`
        ).join('\n');

        addNotification({
            type: NotificationType.NewOrder,
            subject: `New Order Received: ${newOrder.id}`,
            from: customerDetails.email,
            body: `
A new order has been placed on the website.

CUSTOMER DETAILS:
Name: ${customerDetails.name}
Email: ${customerDetails.email}
Address: ${customerDetails.address}

ORDER SUMMARY:
${orderItemsSummary}
-------------------------
TOTAL: $${cartTotal.toFixed(2)}
            `,
        });

        clearCart();
        return newOrder;
    };

    const updateOrderStatus = (orderId: string, status: OrderStatus) => {
        setOrders(prevOrders =>
            prevOrders.map(order =>
                order.id === orderId ? { ...order, status } : order
            )
        );
    };

    const addReview = (order: Order, rating: number, comment: string) => {
        const newReview: Review = {
            id: `review_${order.id}`,
            orderId: order.id,
            customerName: order.customerDetails.name,
            rating,
            comment,
            createdAt: new Date().toISOString(),
            status: ReviewStatus.Pending,
        };
        setReviews(prevReviews => [newReview, ...prevReviews]);
        setOrders(prevOrders => prevOrders.map(o => o.id === order.id ? {...o, reviewSubmitted: true} : o));
    };

    const updateReviewStatus = (reviewId: string, status: ReviewStatus) => {
        setReviews(prevReviews =>
            prevReviews.map(review =>
                review.id === reviewId ? { ...review, status } : review
            )
        );
    };

    return (
        <AppContext.Provider value={{
            products, setProducts,
            blogPosts, setBlogPosts,
            siteSettings, setSiteSettings,
            appearanceSettings, setAppearanceSettings,
            dynamicPages, setDynamicPages,
            cart, addToCart, updateCartQuantity, removeFromCart, clearCart, cartTotal,
            wishlist, addToWishlist, removeFromWishlist, isInWishlist,
            orders, addOrder, updateOrderStatus,
            reviews, addReview, updateReviewStatus,
            notifications, addNotification, markNotificationAsRead, markAllNotificationsAsRead
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppContextProvider');
    }
    return context;
};