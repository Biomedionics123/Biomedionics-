import React from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { ReviewStatus } from '../../types';
import StarRating from '../../components/StarRating';

const AdminReviewsPage: React.FC = () => {
    const { reviews, updateReviewStatus, deleteReview } = useAppContext();

    const handleDeleteReview = (reviewId: string) => {
        if (window.confirm('Are you sure you want to permanently delete this review? This action cannot be undone.')) {
            deleteReview(reviewId);
        }
    };

    const getStatusColor = (status: ReviewStatus) => {
        switch (status) {
            case ReviewStatus.Pending: return 'bg-yellow-200 text-yellow-800';
            case ReviewStatus.Approved: return 'bg-green-200 text-green-800';
            case ReviewStatus.Rejected: return 'bg-red-200 text-red-800';
            default: return 'bg-gray-200 text-gray-800';
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Reviews</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="space-y-4">
                    {reviews.length > 0 ? reviews.map(review => (
                        <div key={review.id} className="bg-gray-50 p-4 rounded-md shadow-sm">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-semibold text-lg text-gray-800">{review.customerName}</p>
                                    <p className="text-sm text-gray-500">Order ID: {review.orderId}</p>
                                    <div className="mt-2">
                                        <StarRating rating={review.rating} readOnly />
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(review.status)}`}>
                                        {review.status}
                                    </span>
                                     <p className="text-sm text-gray-400 mt-1">{new Date(review.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <p className="mt-3 text-gray-700 italic">"{review.comment}"</p>
                            <div className="mt-4 flex justify-between items-center">
                                <div className="flex gap-3">
                                    {review.status === ReviewStatus.Pending && (
                                        <>
                                            <button 
                                                onClick={() => updateReviewStatus(review.id, ReviewStatus.Approved)} 
                                                className="bg-green-500 text-white text-sm py-1 px-3 rounded-md hover:bg-green-600"
                                            >
                                                Approve
                                            </button>
                                            <button 
                                                onClick={() => updateReviewStatus(review.id, ReviewStatus.Rejected)} 
                                                className="bg-yellow-500 text-white text-sm py-1 px-3 rounded-md hover:bg-yellow-600"
                                            >
                                                Reject
                                            </button>
                                        </>
                                    )}
                                </div>
                                <button 
                                    onClick={() => handleDeleteReview(review.id)} 
                                    className="bg-red-500 text-white text-sm py-1 px-3 rounded-md hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    )) : (
                        <p className="text-center text-gray-500 py-8">No customer reviews have been submitted yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminReviewsPage;