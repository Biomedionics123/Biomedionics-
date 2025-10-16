import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { SERVICES } from '../constants';
import { useAppContext } from '../contexts/AppContext';
import { ReviewStatus } from '../types';
import StarRating from '../components/StarRating';
import { getDisplayableGoogleDriveImageUrl } from '../components/IconComponents';

// Helper to convert YouTube URL to embeddable URL
const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return '';
    try {
        const videoUrl = new URL(url);
        const videoId = videoUrl.searchParams.get('v');
        if (videoId) {
            return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0`;
        }
        // Handle youtu.be short URLs
        if(videoUrl.hostname === 'youtu.be') {
            const videoId = videoUrl.pathname.slice(1);
            return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0`;
        }
    } catch (e) {
        console.error("Invalid YouTube URL:", e);
        return '';
    }
    return '';
};

// Helper to convert Google Drive URL to embeddable URL for videos
const getGoogleDriveEmbedUrl = (url: string) => {
    if (!url || typeof url !== 'string' || !url.includes('drive.google.com')) return '';

    const match = url.match(/drive\.google\.com.*\/d\/([^/]+)/);
    if (match && match[1]) {
        return `https://drive.google.com/file/d/${match[1]}/preview`;
    }
    return '';
};

const HomePage: React.FC = () => {
  const { products, siteSettings, reviews, appearanceSettings } = useAppContext();
  const approvedReviews = reviews.filter(r => r.status === ReviewStatus.Approved);
  
  const videoSource = appearanceSettings.videoSource;
  const youtubeEmbedUrl = videoSource === 'youtube' ? getYouTubeEmbedUrl(appearanceSettings.homepageVideoUrl) : '';
  const googleDriveEmbedUrl = videoSource === 'googledrive' ? getGoogleDriveEmbedUrl(appearanceSettings.homepageVideoUrl) : '';
  const uploadedVideoUrl = videoSource === 'upload' ? appearanceSettings.homepageVideoData : '';


  const renderVideoBackground = () => {
    if (videoSource === 'youtube' && youtubeEmbedUrl) {
      return (
         <iframe
            className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2"
            src={youtubeEmbedUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{minWidth: '177.77vh', minHeight: '100vw'}}
        ></iframe>
      );
    }
    if (videoSource === 'googledrive' && googleDriveEmbedUrl) {
        return (
            <iframe
                className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2"
                src={googleDriveEmbedUrl}
                title="Google Drive video player"
                frameBorder="0"
                allow="autoplay"
                allowFullScreen
                style={{minWidth: '177.77vh', minHeight: '100vw'}}
            ></iframe>
        );
    }
    if (videoSource === 'upload' && uploadedVideoUrl) {
        return (
            <video
                className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 object-cover"
                src={uploadedVideoUrl}
                autoPlay
                loop
                muted
                playsInline
            ></video>
        );
    }
    return <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-gray-800 to-gray-900 z-0"></div>;
  };

  return (
    <div className="space-y-16 md:space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white h-[70vh] min-h-[500px] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full z-0">
          {renderVideoBackground()}
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>
        </div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 z-20">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight shadow-text">
            Non-Invasive Detection of
            <span className="block mt-2" style={{color: appearanceSettings.primaryColor}}>Diabetic Peripheral Neuropathy</span>
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-gray-200 shadow-text-sm">
            Biomedionics leads the way with Diasense, our groundbreaking device for early, accurate, and painless DPN screening.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/products"
              className="inline-block text-white font-bold py-3 px-8 rounded-full hover:opacity-90 transition-transform transform hover:scale-105"
              style={{backgroundColor: appearanceSettings.primaryColor}}
            >
              Our Technology
            </Link>
            <Link
              to="/contact"
              className="inline-block bg-transparent text-white font-bold py-3 px-8 rounded-full border-2 hover:bg-white/10 transition-colors"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900">Our Innovations</h2>
        <p className="text-center mt-2 text-gray-600">Pioneering tools for modern healthcare and research.</p>
        <div className="mt-12 grid gap-8 md:grid-cols-1 lg:grid-cols-2 max-w-4xl mx-auto">
          {products.slice(0, 2).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-12">
            <Link to="/products" className="font-semibold hover:underline" style={{color: appearanceSettings.primaryColor}}>
                View All Products &rarr;
            </Link>
        </div>
      </section>
      
      {/* Testimonials Section */}
      {approvedReviews.length > 0 && (
        <section className="bg-gray-50 py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-gray-900">What Our Customers Say</h2>
                <div className="mt-12 grid gap-8 md:grid-cols-1 lg:grid-cols-2 max-w-4xl mx-auto">
                    {approvedReviews.map(review => (
                        <div key={review.id} className="bg-white p-6 rounded-lg shadow-md">
                            <StarRating rating={review.rating} readOnly />
                            <p className="text-gray-600 mt-4 italic">"{review.comment}"</p>
                            <p className="text-right text-gray-800 font-semibold mt-4">- {review.customerName}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
      )}

      {/* Award / About Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-gray-900">Award-Winning Innovation</h2>
                <img src={getDisplayableGoogleDriveImageUrl(siteSettings.teamImageUrl)} alt="The Biomedionics Team" className="rounded-lg shadow-xl mx-auto my-8 w-full h-auto object-cover" style={{maxHeight: '400px'}} />
                <p className="text-xl text-yellow-500 font-semibold">
                  &#9733; {siteSettings.awardText} &#9733;
                </p>
                <p className="mt-4 text-gray-600">
                  Our dedicated team of engineers, scientists, and professionals are committed to pushing the boundaries of medical technology to improve lives.
                </p>
                 <div className="text-center mt-8">
                    <Link to="/about" className="font-semibold hover:underline" style={{color: appearanceSettings.primaryColor}}>
                        Learn More About Us &rarr;
                    </Link>
                </div>
            </div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900">Comprehensive Support Services</h2>
          <p className="text-center mt-2 text-gray-600">Ensuring your equipment runs reliably and efficiently.</p>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4 text-center">
            {SERVICES.map(service => (
                <div key={service.id} className="p-6">
                    {React.cloneElement(service.icon, { style: { color: appearanceSettings.primaryColor } })}
                    <h3 className="text-xl font-semibold text-gray-900">{service.name}</h3>
                    <p className="mt-2 text-gray-600">{service.description}</p>
                </div>
            ))}
          </div>
           <div className="text-center mt-8">
            <Link to="/services" className="font-semibold hover:underline" style={{color: appearanceSettings.primaryColor}}>
                Explore Our Services &rarr;
            </Link>
        </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;