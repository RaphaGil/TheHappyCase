import React from 'react';
import Footer from '../../component/Footer';
import NavBar from '../../component/NavBar';
import { useLocation } from 'react-router-dom';

const RefundPolicy = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-white">

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white rounded-lg  p-8 md:p-12">
            <h1 
             className="text-title md:text-title-lg font-bold text-gray-800 mb-8 text-center font-fredoka"
              style={{color: '#1e3a8a'}}
            >
            Refund Policy
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8 rounded">
               <p className="text-gray-700 text-body-lg leading-relaxed mb-4 font-inter">
                  <strong>No returns or refunds.</strong> We only offer returns/refunds if there has been a fault on our end. This is due to our stock being made-to-order.
                </p>
               <p className="text-gray-700 text-body-lg leading-relaxed font-inter">
                Thanks for understanding!
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RefundPolicy;

