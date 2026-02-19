'use client';

import React, { useState } from "react";
import { Shippo } from "shippo";

// Initialize Shippo API with your API token
const shippo = new Shippo({
  apiKeyHeader: "ShippoToken shippo_test_e7d19db5a004d8c39f117947d16102aaa2222de5", // Use your actual API key
  shippoApiVersion: "2018-02-08",
});

// Example addresses and parcel details
const addressFrom = {
  name: "The Happy Case",
  company: "The Happy Case",
  street1: "Flat 5, 205 Willesden Lane, Richmound Court",
  city: "London",
  state: "",
  zip: "94117",
  country: "GB",
  phone: "+1 555 341 9393",
  email: "shippotle@shippo.com",
};

const parcel = {
  length: "100",
  width: "100",
  height: "100",
  distanceUnit: "mm", // Distance unit: Inches
  weight: "0.1",
  massUnit: "kg", 
};

function PostOfficeBtn() {
  const [rates, setRates] = useState(null);
  const [shipmentMessages, setShipmentMessages] = useState(null);
  const [shipmentRates, setShipmentRates] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // State for addressTo input fields
  const [addressTo, setAddressTo] = useState({
    name: "",
    street1: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressTo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fetchRates = async () => {
    setIsLoading(true);
    setError(null);
    setRates(null);
    setShipmentMessages(null);

    try {
      // Create the shipment details
      const shipment = {
        addressFrom: addressFrom,
        addressTo: addressTo, // Use the customer input for addressTo
        parcels: [parcel],
      };

      // Create a shipment using Shippo
      const shipmentResponse = await shippo.shipments.create(shipment);
      console.log("Shipment Response:", shipmentResponse);
      console.log("Rates:", shipmentResponse.rates);

      // Show shipment messages
      setShipmentMessages(shipmentResponse.messages);
      setShipmentRates(shipmentResponse.rates);

      if (shipmentResponse && shipmentResponse.object_id) {
        // Fetch rates using the created shipment object_id
        const ratesResponse = await shippo.shipments.get(shipmentResponse.object_id);
        console.log("Rates Response:", ratesResponse);

        if (ratesResponse && ratesResponse.rates && ratesResponse.rates.length > 0) {
          setRates(ratesResponse.rates);
        } else {
          setError("No rates available");
        }
      
      }
    } catch (err) {
      console.error("Error fetching rates:", err);
      setError("Error fetching rates. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-bold">Check Shipping Rates</h3>

      {/* Address Input Form */}
      <div className="mb-4">
        <label className="block mb-4">Street Address:</label>
        {/* <input
          type="text"
          name="street1"
          value={addressTo.street1}
          onChange={handleInputChange}
          className="border p-2 w-full mb-2"
        />
        <label className="block">City:</label>
        <input
          type="text"
          name="city"
          value={addressTo.city}
          onChange={handleInputChange}
          className="border p-2 w-full mb-2"
        /> */}
        <label className="block">PostCode:</label>
        <input
          type="text"
          name="zip"
          value={addressTo.zip}
          onChange={handleInputChange}
          className="border p-2 w-full mb-2"
        />
        <label className="block">Country:</label>
        <input
          type="text"
          name="country"
          value={addressTo.country}
          onChange={handleInputChange}
          className="border p-2 w-full mb-2"
        />
        {/* <label className="block">Phone:</label> */}
        {/* <input
          type="text"
          name="phone"
          value={addressTo.phone}
          onChange={handleInputChange}
          className="border p-2 w-full mb-2"
        /> */}
        {/* <label className="block">Email:</label>
        <input
          type="email"
          name="email"
          value={addressTo.email}
          onChange={handleInputChange}
          className="border p-2 w-full mb-4"
        /> */}
      </div>

      <button
        onClick={fetchRates}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={isLoading}
      >
        {isLoading ? "Fetching..." : "Get Rates"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Display Rates */}
      {shipmentRates && (
        <div className="mt-4">
          <h4 className="text-lg font-semibold">Available Rates:</h4>
          <ul>
            {shipmentRates.map((rate, index) => (
              <li key={index}>
                <strong>{rate.provider}</strong>: {rate.servicelevel.name} - <strong>£{rate.amount}</strong>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PostOfficeBtn;
