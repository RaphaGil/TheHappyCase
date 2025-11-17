import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useCart } from "../../context/CartContext";
import { useCurrency } from "../../context/CurrencyContext";
import InternationalNote from "../../component/InternationalNote";

// Backend URL - change this to your backend server URL
const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:3001";

// Initialize Stripe with your publishable key
// This must be outside the component and only created once to ensure it's stable
// Using a singleton pattern to ensure loadStripe is only called once
let stripePromiseInstance = null;
const getStripePromise = () => {
  if (!stripePromiseInstance) {
    const publishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
    console.log(
      "🔑 Initializing Stripe with key:",
      publishableKey.substring(0, 20) + "..."
    );
    stripePromiseInstance = loadStripe(publishableKey);
  }
  return stripePromiseInstance;
};

const stripePromise = getStripePromise();

const CheckoutStripe = () => {
  const { cart, getTotalPrice, clearCart } = useCart();
  const { currency, formatPrice } = useCurrency();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const initializedRef = useRef(false);
  const stripeProviderRef = useRef(false); // Track if Stripe provider has been mounted
  const [backendCheckStatus, setBackendCheckStatus] = useState("checking");

  // Redirect to cart if empty
  useEffect(() => {
    if (cart.length === 0) {
      navigate("/cart");
    }
  }, [cart, navigate]);

  // Check if backend is running
  useEffect(() => {
    const checkBackend = async () => {
      try {
        console.log("🔍 Checking backend at:", BACKEND_URL);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

        const response = await fetch(`${BACKEND_URL}/health`, {
          method: "GET",
          signal: controller.signal,
          headers: {
            Accept: "application/json",
          },
        });
        clearTimeout(timeoutId);

        console.log(
          "📡 Health check response:",
          response.status,
          response.statusText
        );

        if (response.ok) {
          const data = await response.json();
          console.log("✅ Backend server is online:", data);
          setBackendCheckStatus("online");
        } else {
          const errorText = await response.text();
          console.error(
            "❌ Backend returned error:",
            response.status,
            errorText
          );
          setBackendCheckStatus("error");
          setError(
            `Backend server returned an error: ${response.status} ${response.statusText}`
          );
        }
      } catch (err) {
        console.error("❌ Backend check failed:", err);
        const errorMessage =
          err.name === "AbortError"
            ? `Connection timeout. Backend server at ${BACKEND_URL} is not responding.`
            : err.message ||
              `Cannot connect to backend server at ${BACKEND_URL}`;

        setBackendCheckStatus("offline");
        setError(
          `${errorMessage}. Make sure it's running with: npm run server`
        );
      }
    };

    checkBackend();
  }, []);

  // Prevent multiple Embedded Checkout instances (React StrictMode causes double mount)
  useEffect(() => {
    if (
      !initializedRef.current &&
      backendCheckStatus === "online" &&
      !stripeProviderRef.current
    ) {
      initializedRef.current = true;
      stripeProviderRef.current = true;
      // Small delay to ensure component is fully mounted
      setTimeout(() => {
        setShowCheckout(true);
      }, 100);
    }

    // Prevent cleanup from resetting the ref in StrictMode
    return () => {
      // Don't reset stripeProviderRef on unmount to prevent re-initialization
    };
  }, [backendCheckStatus]);

  const fetchClientSecret = useCallback(async () => {
    console.log("🚀 fetchClientSecret called!", new Date().toISOString());
    console.log("🔄 Fetching checkout session...", {
      backendUrl: BACKEND_URL,
      cartItems: cart.length,
      totalAmount: getTotalPrice(),
      currency: currency.toLowerCase(),
    });

    try {
      // Optimize cart data - remove large base64 images and keep only what Stripe needs
      const optimizedCart = cart.map((item) => ({
        color: item.color,
        caseType: item.caseType,
        caseName: item.caseName,
        basePrice: item.basePrice,
        quantity: item.quantity || 1,
        // Only include caseImage if it's a URL, not base64
        caseImage:
          item.caseImage && !item.caseImage.startsWith("data:image")
            ? item.caseImage
            : undefined,
        // Only include essential pin data (name, price) - remove large image data
        pinsDetails: item.pinsDetails
          ? item.pinsDetails.map((pin) => ({
              name: pin.name,
              price: pin.price,
              // Only include src if it's a URL, not base64
              src:
                pin.src && !pin.src.startsWith("data:image")
                  ? pin.src
                  : undefined,
            }))
          : [],
      }));

      console.log(
        "📦 Optimized cart data size:",
        JSON.stringify(optimizedCart).length,
        "bytes"
      );
      console.log(
        "🌐 Making fetch request to:",
        `${BACKEND_URL}/create-checkout-session`
      );

      // Create a Checkout Session with cart data
      // Use AbortController for timeout instead of Promise.race
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        console.error("⏱️ Request timeout after 8 seconds");
        controller.abort();
      }, 8000); // 8 second timeout

      const startTime = Date.now();
      const response = await fetch(`${BACKEND_URL}/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: optimizedCart,
          totalAmount: Math.round(getTotalPrice() * 100), // Convert to smallest currency unit
          currency: currency.toLowerCase(),
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const fetchTime = Date.now() - startTime;
      console.log(`⏱️ Fetch completed in ${fetchTime}ms`);

      console.log("📡 Response status:", response.status);
      const contentType = response.headers.get("content-type");

      // Check if response is JSON
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("❌ Non-JSON response received:", text.substring(0, 200));
        throw new Error(
          `Server returned HTML instead of JSON. Status: ${response.status}`
        );
      }

      if (!response.ok) {
        const err = await response.json();
        console.error("❌ Server error:", err);
        throw new Error(
          err.error || `Server error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log("✅ Checkout session created:", data);

      if (data.error) {
        throw new Error(data.error);
      }

      if (!data.clientSecret) {
        throw new Error("No client secret returned from server");
      }

      console.log(
        "✅ Returning client secret:",
        data.clientSecret.substring(0, 30) + "..."
      );
      setDebugInfo({
        clientSecret: data.clientSecret.substring(0, 20) + "...",
      });
      return data.clientSecret;
    } catch (error) {
      console.error("❌ Error creating checkout session:", error);
      console.error("Error details:", {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });

      // Don't set error state here - let Stripe handle it
      // Just re-throw so Stripe can show its own error message
      if (error.name === "AbortError") {
        throw new Error(
          "Request timed out. Please check your connection and try again."
        );
      }
      throw error;
    }
  }, [cart, getTotalPrice, currency]);

  // Memoize onComplete callback to prevent prop changes
  const handleComplete = useCallback(
    (result) => {
      console.log("✅ Payment completed:", result);

      try {
        // Clear the cart after successful payment
        if (clearCart) {
          clearCart();
        }

        // Navigate to success page
        // The result object contains payment intent information
        navigate("/payment-success", {
          state: {
            paymentIntent: result.paymentIntent || {
              id: result.clientSecret?.split("_secret_")[0] || "unknown",
              status: "succeeded",
              created: Math.floor(Date.now() / 1000),
            },
            customerInfo: result.billingDetails || {},
            items: cart,
          },
        });
      } catch (err) {
        console.error("❌ Error handling payment completion:", err);
        setError(
          "Failed to process payment completion. Please contact support."
        );
      }
    },
    [navigate, clearCart, cart]
  );

  // Memoize options object to prevent Stripe from detecting prop changes
  const options = useMemo(() => {
    console.log("🔧 Creating options object with fetchClientSecret");
    console.log("fetchClientSecret type:", typeof fetchClientSecret);
    return {
      fetchClientSecret,
      onComplete: handleComplete,
    };
  }, [fetchClientSecret, handleComplete]);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-blue-50 to-sky-100 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-center">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h2
                className="text-2xl font-bold text-gray-800 mb-2 lazy-dog-title"
                style={{ fontFamily: "'Fredoka One', cursive" }}
              >
                Checkout Error
              </h2>
              <p
                className="text-gray-600 mb-6 student-text"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {error}
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setError(null);
                    window.location.reload();
                  }}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 mr-3"
                >
                  Try Again
                </button>
                <button
                  onClick={() => navigate("/cart")}
                  className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700"
                >
                  Back to Cart
                </button>
              </div>
              <div className="mt-6 p-4 bg-yellow-50 rounded-md text-left">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Note:</strong> Make sure your backend server is
                  running:
                </p>
                <code className="text-xs bg-white p-2 rounded block">
                  npm run server
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (backendCheckStatus === "checking") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-blue-50 to-sky-100 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Checking backend connection...</p>
                <p className="text-sm text-gray-500 mt-2">
                  Connecting to {BACKEND_URL}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (backendCheckStatus === "offline" && !error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-blue-50 to-sky-100 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-center">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h2
                className="text-2xl font-bold text-gray-800 mb-2 lazy-dog-title"
                style={{ fontFamily: "'Fredoka One', cursive" }}
              >
                Backend Server Not Running
              </h2>
              <p
                className="text-gray-600 mb-6 student-text"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Cannot connect to backend server at {BACKEND_URL}
              </p>
              <div className="space-y-3">
                <div className="bg-yellow-50 rounded-md p-4 text-left mb-4">
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>To fix this:</strong>
                  </p>
                  <ol className="text-sm text-gray-700 list-decimal list-inside space-y-1">
                    <li>Open a new terminal window</li>
                    <li>Navigate to your project directory</li>
                    <li>
                      Run:{" "}
                      <code className="bg-white px-2 py-1 rounded">
                        npm run server
                      </code>
                    </li>
                    <li>
                      Wait for the message: "🚀 Stripe Checkout Server running
                      on http://localhost:3001"
                    </li>
                    <li>Then refresh this page</li>
                  </ol>
                </div>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 mr-3"
                >
                  Retry Connection
                </button>
                <button
                  onClick={() => navigate("/cart")}
                  className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700"
                >
                  Back to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-blue-50 to-sky-100 py-8">
      <div className="px-4">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div id="checkout" className="stripe-checkout-container">
                {error ? (
                  <div className="text-center py-8">
                    <div className="text-red-500 text-4xl mb-4">⚠️</div>
                    <p className="text-red-600 font-semibold mb-2">
                      Failed to load payment form
                    </p>
                    <p className="text-sm text-gray-600 mb-4">{error}</p>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-left">
                      <p className="text-sm font-semibold text-yellow-800 mb-2">
                        Troubleshooting:
                      </p>
                      <ul className="text-xs text-yellow-700 space-y-1 list-disc list-inside">
                        <li>
                          Make sure backend server is running:
                          <code className="bg-white px-1 rounded">
                            npm run server
                          </code>
                        </li>
                        <li>
                          Check backend URL:
                          <code className="bg-white px-1 rounded">
                            {BACKEND_URL}
                          </code>
                        </li>
                        <li>Verify Stripe keys are set in .env file</li>
                        <li>Check browser console (F12) for detailed errors</li>
                      </ul>
                      <button
                        onClick={() => {
                          setError(null);
                          window.location.reload();
                        }}
                        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm"
                      >
                        Retry
                      </button>
                    </div>
                  </div>
                ) : showCheckout && stripePromise ? (
                  <EmbeddedCheckoutProvider
                    key="stripe-checkout-provider"
                    stripe={stripePromise}
                    options={options}
                  >
                    <EmbeddedCheckout
                      onReady={() => {
                        console.log("✅ Stripe checkout form is ready!");
                        setError(null);
                      }}
                      onError={(error) => {
                        console.error("❌ Stripe checkout error:", error);
                        const errorMessage =
                          error?.message ||
                          error?.error?.message ||
                          "Something went wrong. Please try again or contact the merchant.";
                        setError(errorMessage);
                      }}
                    />
                  </EmbeddedCheckoutProvider>
                ) : (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Preparing payment form...</p>
                  </div>
                )}

                {debugInfo && (
                  <div className="mt-4 p-2 bg-gray-100 rounded text-xs text-gray-600">
                    Debug: {JSON.stringify(debugInfo)}
                  </div>
                )}
              </div>
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2
                className="text-xl font-bold mb-4 lazy-dog-title"
                style={{ fontFamily: "'Fredoka One', cursive" }}
              >
                Order Summary
              </h2>
              <div className="space-y-4">
                {cart.map((item, index) => {
                  const basePrice =
                    typeof item.basePrice === "number" ? item.basePrice : 8;
                  const pinsDetails = Array.isArray(item.pinsDetails)
                    ? item.pinsDetails
                    : [];
                  const charmsPrice = pinsDetails.length
                    ? pinsDetails.reduce(
                        (sum, pin) => sum + (pin.price || 0),
                        0
                      )
                    : 0;
                  const charmCount = pinsDetails.length;
                  const groupedPins = Object.values(
                    pinsDetails.reduce((acc, pin) => {
                      const key = `${pin.src || "no-src"}|${
                        pin.name || "unknown"
                      }|${pin.price || 0}`;
                      if (!acc[key]) {
                        acc[key] = {
                          ...pin,
                          count: 0,
                        };
                      }
                      acc[key].count += 1;
                      return acc;
                    }, {})
                  );

                  return (
                    <div key={index} className="border-b pb-4 last:border-b-0">
                      <div className="flex gap-3">
                        <div className="w-32 h-32 bg-gray-100 rounded border flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {item.designImage ? (
                            <img
                              src={item.designImage}
                              alt="Your Design"
                              className="w-full h-full object-contain rounded"
                            />
                          ) : item.caseImage ? (
                            <img
                              src={item.caseImage}
                              alt="Case"
                              className="w-full h-full object-contain rounded"
                            />
                          ) : (
                            <div
                              className="w-10 h-16 rounded"
                              style={{ backgroundColor: item.color }}
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm">
                            Custom Passport Case
                          </h3>
                          <div className="flex items-center justify-between gap-2 text-xs text-gray-600">
                            <span
                              className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-gray-300 ml-4"
                              style={{ backgroundColor: item.color }}
                              aria-label={`Selected color ${item.color}`}
                            />
                            <p className="mt-2 text-xs font-medium text-gray-700">
                              {formatPrice(basePrice)}
                            </p>
                          </div>

                          {charmCount > 0 && (
                            <div className="mt-2 space-y-1">
                              {groupedPins.map((pin, pinIndex) => (
                                <div
                                  key={`${pin.name || "charm"}-${pinIndex}`}
                                  className="flex items-center justify-between text-xs text-gray-600"
                                >
                                  <div className="flex items-center gap-2 min-w-0">
                                    {pin.src ? (
                                      <img
                                        src={pin.src}
                                        alt={pin.name || "Charm"}
                                        className="h-14 w-14 rounded object-contain"
                                      />
                                    ) : (
                                      <div className="flex h-6 w-6 items-center justify-center rounded bg-gray-100">
                                        ✨
                                      </div>
                                    )}
                                    <span className="truncate">
                                      {pin.name || "Charm"}
                                    </span>
                                  </div>
                                  {typeof pin.price === "number" && (
                                    <span>
                                      {formatPrice(
                                        (pin.price || 0) * (pin.count || 1)
                                      )}
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                          {/* <p className="mt-2 text-xs text-gray-500">
                            Quantity: {item.quantity || 1}
                          </p> */}
                          <p className="mt-4 text-xs font-semibold text-gray-700 text-right border-b pb-2">
                            Item Total:{" "}
                            {formatPrice(
                              (basePrice + charmsPrice) * (item.quantity || 1)
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 pt-4 border-t flex justify-between items-center">
                <span className="text-base font-semibold">Subtotal</span>
                <span className="text-xl font-bold happy-text-gradient">
                  {formatPrice(getTotalPrice())}
                </span>
              </div>

              {/* Custom Duties Alert - Desktop */}
              <InternationalNote 
                className="mt-6 pt-4 border-t" 
                showOnDesktop={true} 
                showOnMobile={false} 
              />
            </div>
          </aside>
        </div>

        {/* Custom Duties Alert - Mobile */}
        <InternationalNote 
          className="mt-6" 
          showOnDesktop={false} 
          showOnMobile={true} 
        />
      </div>
    </div>
  );
};

export default CheckoutStripe;
