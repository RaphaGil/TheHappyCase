import React from 'react';

const ContactInfo = () => {
  return (
    <div className="mt-8 md:mt-12 text-center">
      <p className="text-gray-600 font-inter">
        Questions about your order? Contact us at{' '}
        <a href="mailto:support@thehappycase.com" className="text-gray-900 hover:underline font-medium">
          support@thehappycase.com
        </a>
      </p>
    </div>
  );
};

export default ContactInfo;
