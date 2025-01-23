import React from 'react';

function Hero() {
  return (
    <section className="flex flex-col space-x-8 md:flex-row items-center text-center bg-gray-100 py-16">
      <div className="md:w-4/5 px-6">
        <h1 className="text-4xl font-bold text-blue-800">Design Your Unique Passport Case with Custom Pins</h1>
        <p className="mt-4 text-lg text-gray-600">
          Express your individuality with our custom passport cases. Choose your favorite pins and create a travel accessory that tells your story. Whether it’s for your next adventure or as a special gift, make it uniquely yours.
        </p>
        <button className="mt-6 px-6 py-3 bg-blue-800 text-white rounded  hover:bg-blue-600">Get Started</button>
      </div>
      <div className="md:w-1/2 px-6 mt-8 md:mt-0 flex justify-center items-center">
  <img src="/assets/images/Mykonos.PNG" className="w-full h-96 md:h-full" alt="Passport Case" />
</div>

    </section>
  );
}

export default Hero;
