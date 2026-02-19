module.exports = [
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/utils/mockPaymentAPI.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "confirmMockPayment",
    ()=>confirmMockPayment,
    "createPaymentIntent",
    ()=>createPaymentIntent
]);
// Mock API for payment processing
// In a real application, this would be a backend server endpoint
/**
 * STRIPE PAYMENT INTENT - REQUIRED INFORMATION
 * 
 * To create a Stripe Payment Intent, you need:
 * 
 * REQUIRED FIELDS:
 * 1. amount (number) - Amount in smallest currency unit (e.g., pence for GBP, cents for USD)
 *    Example: £10.50 = 1050 (for GBP)
 * 
 * 2. currency (string) - Three-letter ISO currency code (lowercase)
 *    Examples: 'gbp', 'usd', 'eur', 'cad', 'aud'
 * 
 * OPTIONAL BUT RECOMMENDED FIELDS:
 * 3. metadata (object) - Additional data stored with the payment intent
 *    - items: Array of cart items
 *    - customerInfo: Customer details
 *    - orderId: Your internal order ID
 * 
 * 4. description (string) - Description of the payment (shown to customer)
 * 
 * 5. receipt_email (string) - Email to send receipt to
 * 
 * 6. shipping (object) - Shipping address (if applicable)
 *    {
 *      name: string,
 *      address: {
 *        line1: string,
 *        line2: string (optional),
 *        city: string,
 *        postal_code: string,
 *        country: string (ISO 2-letter code)
 *      }
 *    }
 * 
 * BACKEND IMPLEMENTATION EXAMPLE (Node.js/Express):
 * 
 * const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
 * 
 * app.post('/api/create-payment-intent', async (req, res) => {
 *   try {
 *     const { amount, currency, items, customerInfo } = req.body;
 *     
 *     const paymentIntent = await stripe.paymentIntents.create({
 *       amount: amount,                    // REQUIRED: in smallest currency unit
 *       currency: currency,                 // REQUIRED: 'gbp', 'usd', etc.
 *       metadata: {                         // OPTIONAL: but recommended
 *         items: JSON.stringify(items),
 *         customerInfo: JSON.stringify(customerInfo),
 *         orderId: `order_${Date.now()}`,
 *       },
 *       description: `Order for ${items.length} item(s)`, // OPTIONAL
 *       receipt_email: customerInfo.email,  // OPTIONAL: auto-send receipt
 *       shipping: customerInfo.address ? {  // OPTIONAL: if shipping required
 *         name: customerInfo.name,
 *         address: customerInfo.address,
 *       } : undefined,
 *       automatic_payment_methods: {        // RECOMMENDED: enables multiple payment methods
 *         enabled: true,
 *       },
 *     });
 *     
 *     res.json({ 
 *       client_secret: paymentIntent.client_secret,
 *       payment_intent_id: paymentIntent.id,
 *     });
 *   } catch (error) {
 *     res.status(500).json({ error: error.message });
 *   }
 * });
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$utils$2f$apiConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/utils/apiConfig.js [app-ssr] (ecmascript)");
;
const createPaymentIntent = async (paymentData)=>{
    const { amount, currency = 'gbp', items, customerInfo } = paymentData;
    if (!amount || amount <= 0) {
        throw new Error('Amount is required and must be greater than 0');
    }
    if (!currency) {
        throw new Error('Currency is required');
    }
    // Try to create a real Payment Intent via backend
    try {
        const apiUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$utils$2f$apiConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])('/api/create-payment-intent');
        const requestBody = {
            amount,
            currency,
            items,
            customerInfo
        };
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });
        if (!response.ok) {
            let errorBody;
            const contentType = response.headers.get('content-type');
            try {
                if (contentType && contentType.includes('application/json')) {
                    errorBody = await response.json();
                } else {
                    errorBody = await response.text();
                    // Try to parse as JSON if it looks like JSON
                    try {
                        const parsed = JSON.parse(errorBody);
                        errorBody = parsed;
                    } catch (e) {
                    // Not JSON, keep as text
                    }
                }
            } catch (parseError) {
                errorBody = 'Unable to parse error response';
            }
            const errorMessage = typeof errorBody === 'string' ? errorBody.substring(0, 200) : (errorBody?.error || errorBody?.message || JSON.stringify(errorBody)).substring(0, 200);
            throw new Error(`Backend responded with ${response.status} ${response.statusText}: ${errorMessage}`);
        }
        const data = await response.json();
        if (!data.clientSecret) {
            throw new Error('Backend did not return a clientSecret');
        }
        return {
            client_secret: data.clientSecret
        };
    } catch (error) {
        // Don't fall back to mock - throw the error so the user knows something is wrong
        throw new Error(`Failed to create payment intent: ${error.message}. Please ensure your backend server is running on port 3001.`);
    }
// Removed fallback to mock - we should always use real payment intents
// If we reach here, something went wrong and we should show an error
};
const confirmMockPayment = async (paymentIntentId, amount)=>{
    await new Promise((resolve)=>setTimeout(resolve, 1500));
    return {
        id: paymentIntentId,
        status: 'succeeded',
        created: Math.floor(Date.now() / 1000),
        amount: amount,
        currency: 'gbp'
    };
};
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/InternationalNote/index.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
const InternationalNote = ({ className = '', showOnDesktop = false, showOnMobile = false, title = 'Custom Duties & Import Fees', message = 'International orders may be subject to customs duties, taxes, and fees imposed by your country. These charges are the responsibility of the recipient and are not included in the order total.', variant = 'yellow' // 'yellow' or 'gray'
 })=>{
    // Determine visibility classes based on props
    const visibilityClass = showOnDesktop && showOnMobile ? '' // Show on both
     : showOnDesktop ? 'hidden lg:block' // Show only on desktop
     : showOnMobile ? 'lg:hidden' // Show only on mobile
     : ''; // Default: show on both
    // Style variants
    const bgColor = variant === 'yellow' ? 'bg-yellow-50' : 'bg-gray-100';
    const borderColor = variant === 'yellow' ? 'border-yellow-200' : 'border-gray-200';
    const iconColor = variant === 'yellow' ? 'text-yellow-600' : 'text-gray-600';
    const titleColor = variant === 'yellow' ? 'text-yellow-800' : 'text-gray-800';
    const textColor = variant === 'yellow' ? 'text-yellow-700' : 'text-gray-500';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `${visibilityClass} ${className}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `${bgColor} border ${borderColor} rounded-lg p-4`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${iconColor} text-xl flex-shrink-0`,
                        children: "⚠️"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/InternationalNote/index.jsx",
                        lineNumber: 31,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 font-inter",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: `text-sm font-semibold ${titleColor} mb-1`,
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/InternationalNote/index.jsx",
                                lineNumber: 33,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: `text-xs ${textColor} font-light leading-relaxed font-inter`,
                                children: message
                            }, void 0, false, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/InternationalNote/index.jsx",
                                lineNumber: 36,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/InternationalNote/index.jsx",
                        lineNumber: 32,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/InternationalNote/index.jsx",
                lineNumber: 30,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/InternationalNote/index.jsx",
            lineNumber: 29,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/InternationalNote/index.jsx",
        lineNumber: 28,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = InternationalNote;
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CheckoutHeader.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$context$2f$CartContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/context/CartContext.jsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const CheckoutHeader = ()=>{
    const { getTotalQuantity } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$context$2f$CartContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCart"])();
    const totalQuantity = getTotalQuantity();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "border-b border-gray-200 bg-white",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-6xl mx-auto flex items-center justify-between px-4 lg:px-6 py-5",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    href: "/",
                    className: "hover:opacity-90 transition-opacity duration-300",
                    "aria-label": "HappyCase home",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: "/assets/logo.webp",
                        alt: "The Happy Case Logo",
                        className: "h-14 w-auto "
                    }, void 0, false, {
                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CheckoutHeader.jsx",
                        lineNumber: 15,
                        columnNumber: 12
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CheckoutHeader.jsx",
                    lineNumber: 14,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    href: "/cart",
                    className: "relative flex items-center justify-center p-2 text-gray-900 hover:text-gray-700 transition-colors z-10",
                    "aria-label": "Go to cart",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            viewBox: "0 0 640 640",
                            className: "w-6 h-6",
                            fill: "currentColor",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M8 64C3.6 64 0 67.6 0 72C0 76.4 3.6 80 8 80L53.7 80C65.1 80 75 88.1 77.2 99.4L136.6 402.8C141.7 429.1 164.8 448 191.6 448L488 448C492.4 448 496 444.4 496 440C496 435.6 492.4 432 488 432L191.5 432C172.4 432 155.9 418.5 152.2 399.7L142.9 352L461.2 352C494.7 352 523.7 328.9 531.3 296.4L566.6 145.1C572.5 120 553.4 96 527.7 96L92.8 96C89 77.4 72.7 64 53.7 64L8 64zM96 112L527.7 112C543.2 112 554.6 126.4 551.1 141.5L515.8 292.7C509.9 318 487.3 336 461.3 336L139.8 336L96 112zM176 528C176 510.3 190.3 496 208 496C225.7 496 240 510.3 240 528C240 545.7 225.7 560 208 560C190.3 560 176 545.7 176 528zM256 528C256 501.5 234.5 480 208 480C181.5 480 160 501.5 160 528C160 554.5 181.5 576 208 576C234.5 576 256 554.5 256 528zM432 496C449.7 496 464 510.3 464 528C464 545.7 449.7 560 432 560C414.3 560 400 545.7 400 528C400 510.3 414.3 496 432 496zM432 576C458.5 576 480 554.5 480 528C480 501.5 458.5 480 432 480C405.5 480 384 501.5 384 528C384 554.5 405.5 576 432 576z"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CheckoutHeader.jsx",
                                lineNumber: 28,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CheckoutHeader.jsx",
                            lineNumber: 22,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        totalQuantity > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "absolute top-0 right-0 bg-gray-900 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-light",
                            children: totalQuantity
                        }, void 0, false, {
                            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CheckoutHeader.jsx",
                            lineNumber: 31,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CheckoutHeader.jsx",
                    lineNumber: 17,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CheckoutHeader.jsx",
            lineNumber: 13,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CheckoutHeader.jsx",
        lineNumber: 12,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = CheckoutHeader;
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/LoadingState.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
const LoadingState = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-white py-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-2xl mx-auto p-6 bg-white border border-gray-200",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center py-12",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "animate-spin rounded-full h-12 w-12 border-b-2 border-gray-300 mx-auto mb-4"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/LoadingState.jsx",
                            lineNumber: 9,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-500 font-light font-inter",
                            children: "Loading checkout..."
                        }, void 0, false, {
                            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/LoadingState.jsx",
                            lineNumber: 10,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/LoadingState.jsx",
                    lineNumber: 8,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/LoadingState.jsx",
                lineNumber: 7,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/LoadingState.jsx",
            lineNumber: 6,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/LoadingState.jsx",
        lineNumber: 5,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = LoadingState;
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/navigation.js [app-ssr] (ecmascript)");
'use client';
;
;
;
const CustomerInfoForm = ({ customerInfo, onInputChange, isAuthenticated, authenticatedEmail, onSignIn, onSignOut })=>{
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [showLoginDropdown, setShowLoginDropdown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const dropdownRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Close dropdown when clicking outside
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleClickOutside = (event)=>{
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowLoginDropdown(false);
            }
        };
        if (showLoginDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return ()=>{
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [
        showLoginDropdown
    ]);
    const handleSignInClick = ()=>{
        setShowLoginDropdown(true);
    };
    const handleConfirmLogin = ()=>{
        setShowLoginDropdown(false);
        // Navigate to login page with return URL to come back to checkout
        router.push('/login?redirect=/checkout');
    };
    const handleCancelLogin = ()=>{
        setShowLoginDropdown(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4 ",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-md uppercase tracking-wider text-gray-900 mb-4 font-bold font-inter",
                children: "Contact"
            }, void 0, false, {
                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                lineNumber: 44,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            !isAuthenticated ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-1.5 relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm text-gray-500 font-light font-inter",
                                children: "Email Address *"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                lineNumber: 50,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: dropdownRef,
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: handleSignInClick,
                                        className: "text-xs text-gray-600 hover:text-gray-900 font-light font-inter underline",
                                        children: "Sign In"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                        lineNumber: 54,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    showLoginDropdown && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-sm shadow-lg z-50",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-gray-700 font-light font-inter mb-3",
                                                    children: "Do you want to sign in?"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                                    lineNumber: 66,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: handleConfirmLogin,
                                                            className: "flex-1 px-3 py-1.5 text-xs uppercase tracking-wider font-light font-inter bg-black text-white hover:bg-gray-800 transition-colors",
                                                            children: "Yes"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                                            lineNumber: 70,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: handleCancelLogin,
                                                            className: "flex-1 px-3 py-1.5 text-xs uppercase tracking-wider font-light font-inter border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors",
                                                            children: "No"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                                            lineNumber: 77,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                                    lineNumber: 69,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                            lineNumber: 65,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                        lineNumber: 64,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                lineNumber: 53,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                        lineNumber: 49,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "email",
                        name: "email",
                        value: customerInfo.email,
                        onChange: onInputChange,
                        required: true,
                        placeholder: "your.email@example.com",
                        className: "w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-100 focus:border-yellow-100 bg-white text-gray-900 placeholder-gray-400 font-light font-inter text-base",
                        style: {
                            fontSize: '16px'
                        }
                    }, void 0, false, {
                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                        lineNumber: 90,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-xs text-gray-500 font-light font-inter",
                        children: "We'll send your order confirmation to this email"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                        lineNumber: 100,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                lineNumber: 48,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm text-gray-500 font-light font-inter",
                                children: "Email Address *"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                lineNumber: 107,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onSignOut,
                                className: "text-xs text-gray-600 hover:text-gray-900 font-light font-inter underline",
                                children: "Sign Out"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                lineNumber: 110,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                        lineNumber: 106,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full px-3 py-2 border border-gray-200 rounded-sm bg-gray-50 text-gray-900 font-light font-inter text-sm",
                        children: authenticatedEmail
                    }, void 0, false, {
                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                        lineNumber: 118,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-xs text-gray-500 font-light font-inter",
                        children: [
                            "Signed in as ",
                            authenticatedEmail
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                        lineNumber: 121,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                lineNumber: 105,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-md uppercase tracking-wider text-gray-900 mb-4 font-bold font-inter",
                children: "Delivery"
            }, void 0, false, {
                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                lineNumber: 126,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm text-gray-500 mb-1.5 font-light font-inter",
                                children: "Name *"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                lineNumber: 133,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                name: "name",
                                value: customerInfo.name,
                                onChange: onInputChange,
                                required: true,
                                className: "w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-100 focus:border-yellow-100 bg-white text-gray-900 placeholder-gray-400 font-light font-inter text-base",
                                style: {
                                    fontSize: '16px'
                                }
                            }, void 0, false, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                lineNumber: 136,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                        lineNumber: 132,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm text-gray-500 mb-1.5 font-light font-inter",
                                children: "Surname *"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                lineNumber: 147,
                                columnNumber: 12
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                name: "surname",
                                value: customerInfo.surname,
                                onChange: onInputChange,
                                required: true,
                                className: "w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-100 focus:border-yellow-100 bg-white text-gray-900 placeholder-gray-400 font-light font-inter text-base",
                                style: {
                                    fontSize: '16px'
                                }
                            }, void 0, false, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                lineNumber: 150,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                        lineNumber: 146,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                lineNumber: 130,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block text-sm text-gray-500 mb-1.5 font-light font-inter",
                        children: "Address Line 1 *"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                        lineNumber: 166,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        name: "address.line1",
                        value: customerInfo.address.line1,
                        onChange: onInputChange,
                        required: true,
                        className: "w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-100 focus:border-yellow-100 bg-white text-gray-900 placeholder-gray-400 font-light font-inter text-base",
                        style: {
                            fontSize: '16px'
                        }
                    }, void 0, false, {
                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                        lineNumber: 169,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                lineNumber: 165,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block text-sm text-gray-500 mb-1.5 font-light font-inter",
                        children: "Address Line 2"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                        lineNumber: 181,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        name: "address.line2",
                        value: customerInfo.address.line2,
                        onChange: onInputChange,
                        className: "w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-100 focus:border-yellow-100 bg-white text-gray-900 placeholder-gray-400 font-light font-inter text-base",
                        style: {
                            fontSize: '16px'
                        }
                    }, void 0, false, {
                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                        lineNumber: 184,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                lineNumber: 180,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-3 gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm text-gray-500 mb-1.5 font-light font-inter",
                                children: "City *"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                lineNumber: 196,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                name: "address.city",
                                value: customerInfo.address.city,
                                onChange: onInputChange,
                                required: true,
                                className: "w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-100 focus:border-yellow-100 bg-white text-gray-900 placeholder-gray-400 font-light font-inter text-base",
                                style: {
                                    fontSize: '16px'
                                }
                            }, void 0, false, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                lineNumber: 199,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                        lineNumber: 195,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm text-gray-500 mb-1.5 font-light font-inter",
                                children: [
                                    customerInfo.address.country === 'GB' ? 'Postcode' : 'Postal Code',
                                    " *"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                lineNumber: 211,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                name: "address.postal_code",
                                value: customerInfo.address.postal_code,
                                onChange: onInputChange,
                                required: true,
                                className: "w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-100 focus:border-yellow-100 bg-white text-gray-900 placeholder-gray-400 font-light font-inter text-base",
                                style: {
                                    fontSize: '16px'
                                }
                            }, void 0, false, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                lineNumber: 214,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                        lineNumber: 210,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm text-gray-500 mb-1.5 font-light font-inter",
                                children: "Country/Region *"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                lineNumber: 226,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                name: "address.country",
                                value: customerInfo.address.country,
                                onChange: onInputChange,
                                className: "w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-100 focus:border-yellow-100 bg-white text-gray-900 font-light font-inter text-base",
                                style: {
                                    fontSize: '16px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "GB",
                                        children: "England"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                        lineNumber: 236,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("optgroup", {
                                        label: "Europe",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "AL",
                                                children: "Albania"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                                lineNumber: 238,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "AD",
                                                children: "Andorra"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                                lineNumber: 239,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "AT",
                                                children: "Austria"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                                lineNumber: 240,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "BE",
                                                children: "Belgium"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                                lineNumber: 241,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "BA",
                                                children: "Bosnia and Herzegovina"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                                lineNumber: 242,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "BG",
                                                children: "Bulgaria"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                                lineNumber: 243,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "HR",
                                                children: "Croatia"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                                lineNumber: 244,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "CY",
                                                children: "Cyprus"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                                lineNumber: 245,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "CZ",
                                                children: "Czech Republic"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                                lineNumber: 246,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "DK",
                                                children: "Denmark"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                                lineNumber: 247,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "EE",
                                                children: "Estonia"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                                lineNumber: 248,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "FI",
                                                children: "Finland"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                                lineNumber: 249,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "FR",
                                                children: "France"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                                lineNumber: 250,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "DE",
                                                children: "Germany"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                                lineNumber: 251,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "GR",
                                                children: "Greece"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                                lineNumber: 252,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "HU",
                                                children: "Hungary"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                                lineNumber: 253,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "IS",
                                                children: "Iceland"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                                lineNumber: 254,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "IE",
                                                children: "Ireland"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                                lineNumber: 255,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "IT",
                                                children: "Italy"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                                lineNumber: 256,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "LV",
                                                children: "Latvia"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                                lineNumber: 257,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "LI",
                                                children: "Liechtenstein"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                                lineNumber: 258,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "LT",
                                                children: "Lithuania"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                                lineNumber: 259,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "LU",
                                                children: "Luxembourg"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                                lineNumber: 260,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "MT",
                                                children: "Malta"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                                lineNumber: 261,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "MC",
                                                children: "Monaco"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                                lineNumber: 262,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "ME",
                                                children: "Montenegro"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                                lineNumber: 263,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "NL",
                                                children: "Netherlands"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                                lineNumber: 264,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "MK",
                                                children: "North Macedonia"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                                lineNumber: 265,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "NO",
                                                children: "Norway"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                                lineNumber: 266,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "PL",
                                                children: "Poland"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                                lineNumber: 267,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "PT",
                                                children: "Portugal"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                                lineNumber: 268,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "RO",
                                                children: "Romania"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                                lineNumber: 269,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "SM",
                                                children: "San Marino"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                                lineNumber: 270,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "RS",
                                                children: "Serbia"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                                lineNumber: 271,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "SK",
                                                children: "Slovakia"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                                lineNumber: 272,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "SI",
                                                children: "Slovenia"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                                lineNumber: 273,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "ES",
                                                children: "Spain"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                                lineNumber: 274,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "SE",
                                                children: "Sweden"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                                lineNumber: 275,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "CH",
                                                children: "Switzerland"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                                lineNumber: 276,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                        lineNumber: 237,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                                lineNumber: 229,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                        lineNumber: 225,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
                lineNumber: 194,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx",
        lineNumber: 43,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = CustomerInfoForm;
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/PaymentSection.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$stripe$2f$react$2d$stripe$2d$js$2f$dist$2f$react$2d$stripe$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@stripe/react-stripe-js/dist/react-stripe.esm.mjs [app-ssr] (ecmascript)");
'use client';
;
;
;
const PaymentSection = ({ paymentElementReady, error, onPaymentReady, onPaymentError })=>{
    const paymentElementRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!paymentElementReady) return;
        // Force Card tab open (accordion layout)
        const openCardPayment = ()=>{
            const paymentElement = document.querySelector('[data-testid="payment-element"]');
            if (!paymentElement) return;
            // Stripe usually labels card tab like this
            const cardTab = paymentElement.querySelector('[role="tab"][aria-label*="Card"]') || paymentElement.querySelector('[role="tab"][aria-label*="card"]') || paymentElement.querySelector('[role="tab"][data-testid*="card"]');
            if (!cardTab) return;
            const isExpanded = cardTab.getAttribute("aria-expanded") === "true";
            if (!isExpanded) cardTab.click();
        };
        // Hide blocked payment methods and ensure allowed ones are visible
        const hideAllExceptAllowed = ()=>{
            const paymentElement = document.querySelector('[data-testid="payment-element"]');
            if (!paymentElement) return;
            const blockedKeywords = [
                "revolut",
                "amazon",
                "link",
                "cash app",
                "cashapp"
            ];
            const allowedKeywords = [
                "card",
                "klarna",
                "clearpay",
                "afterpay",
                "apple pay",
                "google pay"
            ];
            // Hide blocked payment methods aggressively
            const allElements = paymentElement.querySelectorAll('[role="tab"], ' + '[role="button"], ' + 'button, ' + '[aria-label*="Revolut"], ' + '[aria-label*="revolut"], ' + '[aria-label*="Amazon"], ' + '[aria-label*="amazon"], ' + '[aria-label*="Link"], ' + '[aria-label*="link"], ' + '[data-testid*="revolut"], ' + '[data-testid*="amazon"], ' + '[data-testid*="link"], ' + '[id*="revolut"], ' + '[id*="amazon"], ' + '[id*="RevolutPay"], ' + '[id*="AmazonPay"], ' + '[class*="revolut"], ' + '[class*="amazon"], ' + 'iframe[src*="revolut"], ' + 'iframe[src*="Revolut"], ' + 'iframe[src*="amazon"], ' + 'iframe[src*="Amazon"], ' + 'iframe[title*="revolut"], ' + 'iframe[title*="Revolut"], ' + 'iframe[title*="amazon"], ' + 'iframe[title*="Amazon"]');
            allElements.forEach((element)=>{
                const label = (element.getAttribute("aria-label") || element.textContent || element.getAttribute("data-testid") || "").toLowerCase();
                const isBlocked = blockedKeywords.some((k)=>label.includes(k));
                if (isBlocked) {
                    element.style.display = "none !important";
                    element.style.visibility = "hidden !important";
                    element.style.opacity = "0 !important";
                    element.style.height = "0 !important";
                    element.style.margin = "0 !important";
                    element.style.padding = "0 !important";
                    element.setAttribute("aria-hidden", "true");
                    element.setAttribute("hidden", "true");
                    // Hide panel linked to that tab too
                    const panelId = element.getAttribute("aria-controls");
                    if (panelId) {
                        const panel = document.getElementById(panelId);
                        if (panel) {
                            panel.style.display = "none";
                            panel.style.visibility = "hidden";
                            panel.setAttribute("aria-hidden", "true");
                        }
                    }
                }
            });
            // Ensure allowed payment methods are visible
            const tabs = paymentElement.querySelectorAll('[role="tab"]');
            tabs.forEach((tab)=>{
                const label = (tab.getAttribute("aria-label") || tab.textContent || "").toLowerCase();
                const isAllowed = allowedKeywords.some((k)=>label.includes(k));
                const isBlocked = blockedKeywords.some((k)=>label.includes(k));
                if (isBlocked) {
                    tab.style.display = "none";
                    tab.style.visibility = "hidden";
                    tab.setAttribute("aria-hidden", "true");
                    const panelId = tab.getAttribute("aria-controls");
                    if (panelId) {
                        const panel = document.getElementById(panelId);
                        if (panel) {
                            panel.style.display = "none";
                            panel.style.visibility = "hidden";
                            panel.setAttribute("aria-hidden", "true");
                        }
                    }
                } else if (isAllowed) {
                    tab.style.display = "";
                    tab.style.visibility = "visible";
                    tab.setAttribute("aria-hidden", "false");
                    // Ensure Klarna stays visible
                    if (label.includes("klarna")) {
                        tab.style.display = "block";
                        tab.style.visibility = "visible";
                        tab.style.opacity = "1";
                    }
                }
            });
        };
        // Run once after render
        const run = ()=>{
            openCardPayment();
            hideAllExceptAllowed();
        };
        // Run immediately and with delays to catch all rendering phases
        setTimeout(run, 100);
        setTimeout(run, 250);
        setTimeout(run, 500);
        setTimeout(run, 1000);
        // Keep enforcing (Stripe re-renders often)
        const paymentElement = document.querySelector('[data-testid="payment-element"]');
        if (!paymentElement) return;
        const observer = new MutationObserver(()=>{
            setTimeout(run, 50);
        });
        observer.observe(paymentElement, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: [
                'aria-hidden',
                'style',
                'class'
            ]
        });
        return ()=>observer.disconnect();
    }, [
        paymentElementReady
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-3 sm:space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-md sm:text-md uppercase tracking-wider text-gray-900 mb-3 sm:mb-4 font-bold font-inter",
                children: "Payment"
            }, void 0, false, {
                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/PaymentSection.jsx",
                lineNumber: 200,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: paymentElementRef,
                className: "p-3 sm:p-4 border border-gray-200 rounded-sm overflow-hidden",
                children: [
                    !paymentElementReady && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-2 text-xs sm:text-sm text-gray-500 font-light font-inter",
                        children: "Loading payment form..."
                    }, void 0, false, {
                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/PaymentSection.jsx",
                        lineNumber: 209,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full flex flex-col space-y-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$stripe$2f$react$2d$stripe$2d$js$2f$dist$2f$react$2d$stripe$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaymentElement"], {
                            options: {
                                layout: "accordion",
                                fields: {
                                    billingDetails: {
                                        email: "never",
                                        phone: "never",
                                        address: "never"
                                    }
                                },
                                wallets: {
                                    applePay: "auto",
                                    googlePay: "auto"
                                },
                                paymentMethodTypes: {
                                    card: "always",
                                    klarna: "always",
                                    afterpayClearpay: "always",
                                    paypal: "never",
                                    link: "never",
                                    amazonPay: "never",
                                    revolutPay: "never"
                                },
                                business: {
                                    name: "The Happy Case"
                                }
                            },
                            onReady: onPaymentReady,
                            onError: (error)=>{
                                if (error?.message?.includes("hcaptcha") || error?.message?.includes("hCaptcha")) {
                                    return;
                                }
                                onPaymentError?.(error.message || "Failed to load payment form. Please refresh the page.");
                            }
                        }, void 0, false, {
                            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/PaymentSection.jsx",
                            lineNumber: 215,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/PaymentSection.jsx",
                        lineNumber: 214,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/PaymentSection.jsx",
                lineNumber: 204,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-red-600 text-xs sm:text-sm bg-red-50 p-2 sm:p-3 rounded-sm font-light font-inter",
                children: error
            }, void 0, false, {
                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/PaymentSection.jsx",
                lineNumber: 260,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/PaymentSection.jsx",
        lineNumber: 199,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = PaymentSection;
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$utils$2f$imagePath$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/utils/imagePath.js [app-ssr] (ecmascript)");
'use client';
;
;
;
const OrderSummaryItem = ({ item, index, formatPrice, onIncrement, onDecrement, onRemove, errorMessage })=>{
    const [isEditing, setIsEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const itemRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Handle click outside to close edit mode
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleClickOutside = (event)=>{
            // Don't close if clicking on any button or input
            const target = event.target;
            const isButton = target.tagName === 'BUTTON' || target.closest('button') !== null || target.closest('[role="button"]') !== null || target.closest('[aria-label*="quantity"]') !== null;
            const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA';
            if (isButton || isInput) {
                return; // Don't close when clicking buttons or inputs
            }
            // Check if click is outside the item element
            if (isEditing && itemRef.current && !itemRef.current.contains(event.target)) {
                setIsEditing(false);
            }
        };
        if (isEditing) {
            // Add listener with a delay to ensure button clicks are processed first
            const timeoutId = setTimeout(()=>{
                document.addEventListener('mousedown', handleClickOutside);
            }, 200);
            return ()=>{
                clearTimeout(timeoutId);
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }
    }, [
        isEditing
    ]);
    // Handle standalone charm items
    if (item.type === 'charm') {
        const charm = item.pin || item;
        // Get unit price (always use item.price as the base unit price)
        const unitPrice = item.price || 0;
        const qty = item.quantity || 1;
        // Always calculate total based on unit price and current quantity
        const total = unitPrice * qty;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: " pb-4 ",
            ref: itemRef,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative flex-shrink-0 w-20 h-20 bg-gray-50 rounded-sm border border-gray-200 flex items-center justify-center overflow-visible",
                        children: [
                            item.image ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$utils$2f$imagePath$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizeImagePath"])(item.image),
                                alt: item.name || "Charm",
                                className: "w-full h-full object-contain p-2",
                                loading: "lazy"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx",
                                lineNumber: 58,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)) : charm?.src ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$utils$2f$imagePath$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizeImagePath"])(charm.src),
                                alt: charm.name || "Charm",
                                className: "w-full h-full object-contain p-2",
                                loading: "lazy"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx",
                                lineNumber: 65,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full h-full rounded-sm bg-gray-100"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx",
                                lineNumber: 72,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "absolute -top-1.5 -right-1.5 bg-gray-900 text-white text-[10px] font-medium rounded-full h-5 w-5 flex items-center justify-center font-inter",
                                children: qty
                            }, void 0, false, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx",
                                lineNumber: 74,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx",
                        lineNumber: 56,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start justify-between gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "text-sm font-medium text-gray-900 font-inter leading-tight",
                                                children: item.name || charm?.name || "Charm"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx",
                                                lineNumber: 83,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-gray-500 mt-0.5 font-inter",
                                                children: item.category === 'bronze' ? 'Bronze Charm' : item.category === 'flags' ? 'Flag' : 'Colorful Charm'
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx",
                                                lineNumber: 86,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx",
                                        lineNumber: 82,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-shrink-0 text-right",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-medium text-gray-900 font-inter",
                                            children: formatPrice(total)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx",
                                            lineNumber: 93,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx",
                                        lineNumber: 92,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx",
                                lineNumber: 81,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            !isEditing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: (e)=>{
                                        e.stopPropagation();
                                        setIsEditing(true);
                                    },
                                    className: "text-xs text-gray-600 hover:text-gray-900 font-light font-inter uppercase tracking-wider transition-colors",
                                    children: "Edit"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx",
                                    lineNumber: 102,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx",
                                lineNumber: 101,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            isEditing && onIncrement && onDecrement && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-3 flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1 border border-gray-200 rounded-sm p-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: (e)=>{
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    const identifier = item.id !== undefined ? item.id : index;
                                                    console.log('➖ Charm item decrement clicked:', {
                                                        identifier,
                                                        itemId: item.id,
                                                        index,
                                                        currentQty: item.quantity,
                                                        itemName: item.name,
                                                        itemType: item.type,
                                                        hasOnDecrement: !!onDecrement
                                                    });
                                                    if (onDecrement) {
                                                        onDecrement(identifier);
                                                    }
                                                },
                                                className: "w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors",
                                                "aria-label": "Decrease quantity",
                                                type: "button",
                                                children: "−"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx",
                                                lineNumber: 118,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "px-2 py-0.5 text-xs text-gray-900 font-light font-inter min-w-[1.5rem] text-center",
                                                children: qty
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx",
                                                lineNumber: 142,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: (e)=>{
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    const identifier = item.id !== undefined ? item.id : index;
                                                    console.log('➕ Charm item increment clicked:', {
                                                        identifier,
                                                        itemId: item.id,
                                                        index,
                                                        currentQty: item.quantity,
                                                        itemName: item.name,
                                                        itemType: item.type,
                                                        hasOnIncrement: !!onIncrement
                                                    });
                                                    if (onIncrement) {
                                                        onIncrement(identifier);
                                                    }
                                                },
                                                className: "w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors",
                                                "aria-label": "Increase quantity",
                                                type: "button",
                                                children: "+"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx",
                                                lineNumber: 145,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx",
                                        lineNumber: 117,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    onRemove && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            onRemove(index);
                                            setIsEditing(false);
                                        },
                                        className: "text-xs text-red-600 hover:text-red-700 font-light font-inter uppercase tracking-wider transition-colors",
                                        children: "Remove"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx",
                                        lineNumber: 171,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx",
                                lineNumber: 116,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            errorMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-red-600 font-inter mt-2",
                                children: errorMessage
                            }, void 0, false, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx",
                                lineNumber: 186,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx",
                        lineNumber: 80,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx",
                lineNumber: 54,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, index, false, {
            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx",
            lineNumber: 53,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    // Handle case items (with or without charms)
    // Get base price - prefer basePrice, then casePrice, then price, fallback to 8
    const base = typeof item.basePrice === 'number' ? item.basePrice : typeof item.casePrice === 'number' ? item.casePrice : typeof item.price === 'number' ? item.price : 8;
    // Calculate charms total from pinsDetails if available
    const charms = item.pinsDetails && item.pinsDetails.length ? item.pinsDetails.reduce((s, p)=>s + (p.price || 0), 0) : 0;
    // Unit price = base + charms
    const unit = base + charms;
    const qty = item.quantity || 1;
    // Always calculate total based on unit price and current quantity
    const total = unit * qty;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: " pb-4 last:border-b-0",
        ref: itemRef,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-start gap-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative flex-shrink-0 w-20 h-20 bg-gray-50 rounded-sm border border-gray-200 flex items-center justify-center overflow-visible",
                    children: [
                        item.designImage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$utils$2f$imagePath$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizeImagePath"])(item.designImage),
                            alt: "Custom Case Design",
                            className: "w-full h-full object-contain p-2 rounded-sm",
                            loading: "lazy"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx",
                            lineNumber: 222,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)) : item.caseImage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$utils$2f$imagePath$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizeImagePath"])(item.caseImage),
                            alt: "Custom Case",
                            className: "w-full h-full object-contain p-2 rounded-sm",
                            loading: "lazy"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx",
                            lineNumber: 229,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full h-full rounded-sm",
                            style: {
                                background: item.color
                            }
                        }, void 0, false, {
                            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx",
                            lineNumber: 236,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "absolute -top-1.5 -right-1.5 bg-gray-900 text-white text-[10px] font-medium rounded-full h-5 w-5 flex items-center justify-center font-inter",
                            children: qty
                        }, void 0, false, {
                            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx",
                            lineNumber: 241,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx",
                    lineNumber: 220,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 min-w-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start justify-between gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "text-sm font-medium text-gray-900 font-inter leading-tight",
                                            children: item.caseName || item.name || 'Passport Case'
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx",
                                            lineNumber: 250,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 mt-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-gray-500 font-inter",
                                                    children: "Color:"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx",
                                                    lineNumber: 254,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "inline-flex h-4 w-4 rounded-full border border-gray-300 shadow-sm",
                                                    style: {
                                                        backgroundColor: item.color
                                                    },
                                                    "aria-label": `Selected color ${item.color}`
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx",
                                                    lineNumber: 255,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx",
                                            lineNumber: 253,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx",
                                    lineNumber: 249,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-shrink-0 text-right",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-medium text-gray-900 font-inter",
                                        children: formatPrice(total)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx",
                                        lineNumber: 263,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx",
                                    lineNumber: 262,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx",
                            lineNumber: 248,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        !isEditing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-3",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: (e)=>{
                                    e.stopPropagation();
                                    setIsEditing(true);
                                },
                                className: "text-xs text-gray-600 hover:text-gray-900 font-light font-inter uppercase tracking-wider transition-colors",
                                children: "Edit"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx",
                                lineNumber: 272,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx",
                            lineNumber: 271,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        isEditing && onIncrement && onDecrement && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-3 flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-1 border border-gray-200 rounded-sm p-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: (e)=>{
                                                e.preventDefault();
                                                e.stopPropagation();
                                                const identifier = item.id !== undefined ? item.id : index;
                                                console.log('➖ Case item decrement clicked:', {
                                                    identifier,
                                                    itemId: item.id,
                                                    index,
                                                    currentQty: item.quantity,
                                                    itemName: item.caseName || item.name,
                                                    hasOnDecrement: !!onDecrement
                                                });
                                                if (onDecrement) {
                                                    onDecrement(identifier);
                                                } else {
                                                    console.error('❌ onDecrement handler is missing!');
                                                }
                                            },
                                            className: "w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors",
                                            "aria-label": "Decrease quantity",
                                            type: "button",
                                            children: "−"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx",
                                            lineNumber: 288,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "px-2 py-0.5 text-xs text-gray-900 font-light font-inter min-w-[1.5rem] text-center",
                                            children: qty
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx",
                                            lineNumber: 313,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: (e)=>{
                                                e.preventDefault();
                                                e.stopPropagation();
                                                const identifier = item.id !== undefined ? item.id : index;
                                                console.log('➕ Case item increment clicked:', {
                                                    identifier,
                                                    itemId: item.id,
                                                    index,
                                                    currentQty: item.quantity,
                                                    itemName: item.caseName || item.name,
                                                    hasOnIncrement: !!onIncrement
                                                });
                                                if (onIncrement) {
                                                    onIncrement(identifier);
                                                } else {
                                                    console.error('❌ onIncrement handler is missing!');
                                                }
                                            },
                                            className: "w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors",
                                            "aria-label": "Increase quantity",
                                            type: "button",
                                            children: "+"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx",
                                            lineNumber: 316,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx",
                                    lineNumber: 287,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                onRemove && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        onRemove(index);
                                        setIsEditing(false);
                                    },
                                    className: "text-xs text-red-600 hover:text-red-700 font-light font-inter uppercase tracking-wider transition-colors",
                                    children: "Remove"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx",
                                    lineNumber: 343,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx",
                            lineNumber: 286,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        item.pinsDetails && item.pinsDetails.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-3 pt-3 ",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-2",
                                children: Object.values(item.pinsDetails.reduce((acc, pin)=>{
                                    acc[pin.src] = acc[pin.src] || {
                                        ...pin,
                                        quantity: 0
                                    };
                                    acc[pin.src].quantity++;
                                    return acc;
                                }, {})).map((groupedPin, i)=>{
                                    const pinPrice = groupedPin.price || 0;
                                    const pinTotal = pinPrice * groupedPin.quantity;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative w-10 h-10 bg-gray-50 rounded-sm border border-gray-200 flex items-center justify-center overflow-visible",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                src: groupedPin.src,
                                                                alt: groupedPin.name,
                                                                className: "w-full h-full object-contain p-1",
                                                                loading: "lazy"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx",
                                                                lineNumber: 371,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "absolute -top-1 -right-1 bg-gray-900 text-white text-[10px] font-medium rounded-full h-4 w-4 flex items-center justify-center font-inter",
                                                                children: groupedPin.quantity
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx",
                                                                lineNumber: 377,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx",
                                                        lineNumber: 370,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs font-light text-gray-700 font-inter",
                                                        children: groupedPin.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx",
                                                        lineNumber: 381,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx",
                                                lineNumber: 369,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs font-medium text-gray-900 font-inter",
                                                children: formatPrice(pinTotal)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx",
                                                lineNumber: 385,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx",
                                        lineNumber: 368,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0));
                                })
                            }, void 0, false, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx",
                                lineNumber: 359,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx",
                            lineNumber: 358,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx",
                    lineNumber: 247,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx",
            lineNumber: 218,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, index, false, {
        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx",
        lineNumber: 217,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = OrderSummaryItem;
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummary.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$component$2f$Checkout$2f$components$2f$OrderSummaryItem$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummaryItem.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$component$2f$InternationalNote$2f$index$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/InternationalNote/index.jsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
const OrderSummary = ({ cart, formatPrice, subtotal, shippingCost, shippingLabel, totalWithShipping, showInternationalNote, onShowShippingInfo, onIncrement, onDecrement, onRemove, itemErrors })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-full min-h-0 mt-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto pr-2 -mr-2 min-h-0 order-summary-scroll",
                style: {
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#d1d5db #f3f4f6'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "pr-2 pb-2",
                    children: cart.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-500 font-inter py-8 text-center",
                        children: "Your cart is empty"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummary.jsx",
                        lineNumber: 28,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-0 mt-2",
                        children: cart.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$component$2f$Checkout$2f$components$2f$OrderSummaryItem$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                item: item,
                                index: index,
                                formatPrice: formatPrice,
                                onIncrement: onIncrement,
                                onDecrement: onDecrement,
                                onRemove: onRemove,
                                errorMessage: itemErrors?.[item.id || index]
                            }, item.id || `item-${index}`, false, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummary.jsx",
                                lineNumber: 32,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummary.jsx",
                        lineNumber: 30,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummary.jsx",
                    lineNumber: 26,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummary.jsx",
                lineNumber: 25,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-shrink-0 pt-6  mt-4 ",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between text-sm font-light text-gray-700 font-inter",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Subtotal"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummary.jsx",
                                        lineNumber: 52,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-medium text-gray-900 font-inter",
                                        children: formatPrice(subtotal)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummary.jsx",
                                        lineNumber: 53,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummary.jsx",
                                lineNumber: 51,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between text-sm font-light text-gray-700 font-inter",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex items-center gap-1.5",
                                        children: [
                                            "Shipping (",
                                            shippingLabel,
                                            ")",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: onShowShippingInfo,
                                                className: "text-gray-400 hover:text-gray-600 transition-colors w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center text-[10px] leading-none",
                                                title: "Quick delivery information",
                                                children: "?"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummary.jsx",
                                                lineNumber: 59,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummary.jsx",
                                        lineNumber: 57,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-medium text-gray-900 font-inter",
                                        children: shippingCost === 0 ? 'Free' : formatPrice(shippingCost)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummary.jsx",
                                        lineNumber: 68,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummary.jsx",
                                lineNumber: 56,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummary.jsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between py-4 border-t border-gray-200 mt-4 pt-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-base font-medium text-gray-900 font-inter uppercase tracking-wider",
                                children: "Total"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummary.jsx",
                                lineNumber: 75,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xl font-semibold text-gray-900 font-inter",
                                children: formatPrice(totalWithShipping)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummary.jsx",
                                lineNumber: 76,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummary.jsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 pt-4 border-t border-gray-100",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-gray-500 font-light font-inter leading-relaxed",
                            children: [
                                "Shipping and taxes are calculated at checkout if applicable.",
                                ' ',
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/shipping",
                                    className: "text-gray-600 hover:text-gray-900 underline transition-colors",
                                    title: "Learn more about shipping information",
                                    children: "Learn more"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummary.jsx",
                                    lineNumber: 82,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummary.jsx",
                            lineNumber: 80,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummary.jsx",
                        lineNumber: 79,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    showInternationalNote && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$component$2f$InternationalNote$2f$index$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            showOnDesktop: true,
                            showOnMobile: false,
                            title: "Custom Duties & Taxes Included",
                            message: "The total amount you pay includes all applicable customs duties & taxes. We guarantee no additional charges on delivery.",
                            variant: "gray"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummary.jsx",
                            lineNumber: 94,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummary.jsx",
                        lineNumber: 93,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummary.jsx",
                lineNumber: 49,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummary.jsx",
        lineNumber: 23,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = OrderSummary;
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/MobileOrderSummary.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$component$2f$Checkout$2f$components$2f$OrderSummary$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummary.jsx [app-ssr] (ecmascript)");
;
;
;
const MobileOrderSummary = ({ isOpen, onToggle, cartLength, totalWithShipping, formatPrice, cart, subtotal, shippingCost, shippingLabel, showInternationalNote, onShowShippingInfo, onIncrement, onDecrement, onRemove, itemErrors })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lg:hidden ",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: onToggle,
                    className: "w-full flex items-center justify-between px-4 py-3 text-xs uppercase tracking-wider text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-400 transition-all duration-200 font-light font-inter",
                    "aria-expanded": isOpen,
                    "aria-controls": "mobile-order-summary",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: [
                                "Order Summary (",
                                cartLength,
                                " item",
                                cartLength === 1 ? '' : 's',
                                ")"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/MobileOrderSummary.jsx",
                            lineNumber: 31,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: formatPrice(totalWithShipping)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/MobileOrderSummary.jsx",
                                    lineNumber: 33,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: `w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`,
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    "aria-hidden": "true",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: "1.5",
                                        d: "M19 9l-7 7-7-7"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/MobileOrderSummary.jsx",
                                        lineNumber: 42,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/MobileOrderSummary.jsx",
                                    lineNumber: 34,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/MobileOrderSummary.jsx",
                            lineNumber: 32,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/MobileOrderSummary.jsx",
                    lineNumber: 24,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/MobileOrderSummary.jsx",
                lineNumber: 23,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "mobile-order-summary",
                className: "lg:hidden  pb-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-2 bg-yellow-50 p-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$component$2f$Checkout$2f$components$2f$OrderSummary$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        cart: cart,
                        formatPrice: formatPrice,
                        subtotal: subtotal,
                        shippingCost: shippingCost,
                        shippingLabel: shippingLabel,
                        totalWithShipping: totalWithShipping,
                        showInternationalNote: showInternationalNote,
                        onShowShippingInfo: onShowShippingInfo,
                        onIncrement: onIncrement,
                        onDecrement: onDecrement,
                        onRemove: onRemove,
                        itemErrors: itemErrors
                    }, void 0, false, {
                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/MobileOrderSummary.jsx",
                        lineNumber: 51,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/MobileOrderSummary.jsx",
                    lineNumber: 50,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/MobileOrderSummary.jsx",
                lineNumber: 49,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
};
const __TURBOPACK__default__export__ = MobileOrderSummary;
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/ShippingInfoModal.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
'use client';
;
;
;
const ShippingInfoModal = ({ isOpen, onClose })=>{
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white border border-gray-200 max-w-md w-full p-6 space-y-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-start justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-sm uppercase tracking-wider text-gray-900 font-light font-inter",
                            children: "Delivery Information"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/ShippingInfoModal.jsx",
                            lineNumber: 13,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: onClose,
                            className: "text-gray-400 hover:text-gray-900 transition-colors font-inter",
                            "aria-label": "Close delivery information",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-5 h-5",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 1.5,
                                    d: "M6 18L18 6M6 6l12 12"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/ShippingInfoModal.jsx",
                                    lineNumber: 23,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/ShippingInfoModal.jsx",
                                lineNumber: 22,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/ShippingInfoModal.jsx",
                            lineNumber: 16,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/ShippingInfoModal.jsx",
                    lineNumber: 12,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xs text-gray-500 font-light font-inter",
                    children: "We dispatch orders within 2 - 3 business days. Shipping costs depend on your delivery country."
                }, void 0, false, {
                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/ShippingInfoModal.jsx",
                    lineNumber: 27,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xs text-gray-500 font-light font-inter",
                    children: "Including Ireland, Europe, Asia, North America, South America, Canada, Australia and New Zealand. Shipping charges are calculated at the checkout depending on location and parcel size."
                }, void 0, false, {
                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/ShippingInfoModal.jsx",
                    lineNumber: 30,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    className: "text-xs text-gray-600 space-y-2 font-light font-inter font-medium",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "UK:"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/ShippingInfoModal.jsx",
                                    lineNumber: 34,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                " 3-4 business days"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/ShippingInfoModal.jsx",
                            lineNumber: 34,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-medium font-medium",
                                    children: "Europe:"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/ShippingInfoModal.jsx",
                                    lineNumber: 35,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                " 5-10 business days"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/ShippingInfoModal.jsx",
                            lineNumber: 35,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "USA & Canada:"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/ShippingInfoModal.jsx",
                                    lineNumber: 36,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                " 7-14 business days"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/ShippingInfoModal.jsx",
                            lineNumber: 36,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-medium",
                                    children: "Rest of World:"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/ShippingInfoModal.jsx",
                                    lineNumber: 37,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                " 10-21 business days"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/ShippingInfoModal.jsx",
                            lineNumber: 37,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/ShippingInfoModal.jsx",
                    lineNumber: 33,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "pt-2 border-t border-gray-100",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-gray-500 font-light font-inter leading-relaxed",
                        children: "Orders delivered outside of the UK may be subject to import duties and taxes. These are levied when the delivery reaches its specific destination, and you will be responsible for the payment of any such duties and taxes. For more information, please contact your local customs office."
                    }, void 0, false, {
                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/ShippingInfoModal.jsx",
                        lineNumber: 40,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/ShippingInfoModal.jsx",
                    lineNumber: 39,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-end",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/shipping",
                        className: "text-xs text-gray-500 hover:text-gray-900 underline transition-colors font-light font-inter",
                        onClick: onClose,
                        children: "View full shipping policy"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/ShippingInfoModal.jsx",
                        lineNumber: 45,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/ShippingInfoModal.jsx",
                    lineNumber: 44,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/ShippingInfoModal.jsx",
            lineNumber: 11,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/ShippingInfoModal.jsx",
        lineNumber: 10,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = ShippingInfoModal;
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/index.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
// React & Router
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
// Stripe
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$stripe$2f$stripe$2d$js$2f$lib$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@stripe/stripe-js/lib/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$stripe$2f$stripe$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@stripe/stripe-js/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$stripe$2f$react$2d$stripe$2d$js$2f$dist$2f$react$2d$stripe$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@stripe/react-stripe-js/dist/react-stripe.esm.mjs [app-ssr] (ecmascript)");
// Contexts
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$context$2f$CartContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/context/CartContext.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$context$2f$CurrencyContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/context/CurrencyContext.jsx [app-ssr] (ecmascript)");
// Utils
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$utils$2f$mockPaymentAPI$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/utils/mockPaymentAPI.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$utils$2f$inventory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/utils/inventory.js [app-ssr] (ecmascript)");
// Components
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$component$2f$InternationalNote$2f$index$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/InternationalNote/index.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$component$2f$Checkout$2f$components$2f$CheckoutHeader$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CheckoutHeader.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$component$2f$Checkout$2f$components$2f$LoadingState$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/LoadingState.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$component$2f$Checkout$2f$components$2f$CustomerInfoForm$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/CustomerInfoForm.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$component$2f$Checkout$2f$components$2f$PaymentSection$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/PaymentSection.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$component$2f$Checkout$2f$components$2f$OrderSummary$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/OrderSummary.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$component$2f$Checkout$2f$components$2f$MobileOrderSummary$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/MobileOrderSummary.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$component$2f$Checkout$2f$components$2f$ShippingInfoModal$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/components/ShippingInfoModal.jsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
// --- Constants ---
// Get Stripe publishable key from environment
// In Next.js, NEXT_PUBLIC_* variables are injected at build time and available via process.env
// Access them directly - they're available in both server and client code
const getStripeKey = ()=>{
    if (typeof process !== 'undefined' && process.env) {
        return ("TURBOPACK compile-time value", "pk_test_51SRxFZFJzpn39buGuSe4Smdsfrnrm8S3IeVJYCra5wXLFeVBGfAdOeFGYGBfStlhZnUlzUVFvajHzioLv92EVyWn00hOlOtcU4") || process.env.VITE_STRIPE_PUBLISHABLE_KEY || '';
    }
    return '';
};
const stripePublishableKey = getStripeKey();
// Debug logging in development
if (typeof process !== 'undefined' && ("TURBOPACK compile-time value", "development") === 'development') {
    console.log('[Checkout] Stripe key check:', {
        hasProcess: typeof process !== 'undefined',
        hasEnv: typeof process !== 'undefined' && !!process.env,
        NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: typeof process !== 'undefined' ? !!("TURBOPACK compile-time value", "pk_test_51SRxFZFJzpn39buGuSe4Smdsfrnrm8S3IeVJYCra5wXLFeVBGfAdOeFGYGBfStlhZnUlzUVFvajHzioLv92EVyWn00hOlOtcU4") : false,
        VITE_STRIPE_PUBLISHABLE_KEY: typeof process !== 'undefined' ? !!process.env?.VITE_STRIPE_PUBLISHABLE_KEY : false,
        stripePublishableKey: stripePublishableKey ? `${stripePublishableKey.substring(0, 20)}...` : 'NOT SET'
    });
}
// Validate Stripe key format (silent validation)
const stripePromise = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$stripe$2f$stripe$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loadStripe"])(stripePublishableKey || 'pk_test_51234567890abcdefghijklmnopqrstuvwxyz1234567890');
// European countries list
const EUROPEAN_COUNTRIES = new Set([
    'AL',
    'AD',
    'AT',
    'BE',
    'BA',
    'BG',
    'HR',
    'CY',
    'CZ',
    'DK',
    'EE',
    'FI',
    'FR',
    'DE',
    'GR',
    'HU',
    'IS',
    'IE',
    'IT',
    'LV',
    'LI',
    'LT',
    'LU',
    'MT',
    'MC',
    'ME',
    'NL',
    'MK',
    'NO',
    'PL',
    'PT',
    'RO',
    'SM',
    'RS',
    'SK',
    'SI',
    'ES',
    'SE',
    'CH'
]);
const SHIPPING_RATES = {
    GB: 3,
    // All European countries use the same rate
    ...Object.fromEntries(Array.from(EUROPEAN_COUNTRIES).map((code)=>[
            code,
            10
        ]))
};
const SHIPPING_LABELS = {
    GB: 'England',
    // European countries will use their country name
    AL: 'Albania',
    AD: 'Andorra',
    AT: 'Austria',
    BE: 'Belgium',
    BA: 'Bosnia and Herzegovina',
    BG: 'Bulgaria',
    HR: 'Croatia',
    CY: 'Cyprus',
    CZ: 'Czech Republic',
    DK: 'Denmark',
    EE: 'Estonia',
    FI: 'Finland',
    FR: 'France',
    DE: 'Germany',
    GR: 'Greece',
    HU: 'Hungary',
    IS: 'Iceland',
    IE: 'Ireland',
    IT: 'Italy',
    LV: 'Latvia',
    LI: 'Liechtenstein',
    LT: 'Lithuania',
    LU: 'Luxembourg',
    MT: 'Malta',
    MC: 'Monaco',
    ME: 'Montenegro',
    NL: 'Netherlands',
    MK: 'North Macedonia',
    NO: 'Norway',
    PL: 'Poland',
    PT: 'Portugal',
    RO: 'Romania',
    SM: 'San Marino',
    RS: 'Serbia',
    SK: 'Slovakia',
    SI: 'Slovenia',
    ES: 'Spain',
    SE: 'Sweden',
    CH: 'Switzerland'
};
const DEFAULT_SHIPPING_RATE = 12;
const CURRENCY_MULTIPLIERS = {
    'jpy': 1,
    'krw': 1,
    'vnd': 1
};
const CheckoutForm = ()=>{
    // --- Hooks ---
    const stripe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$stripe$2f$react$2d$stripe$2d$js$2f$dist$2f$react$2d$stripe$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStripe"])();
    const elements = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$stripe$2f$react$2d$stripe$2d$js$2f$dist$2f$react$2d$stripe$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useElements"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { cart, getTotalPrice, clearCart, incrementItemQty, decrementItemQty, removeFromCart } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$context$2f$CartContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCart"])();
    const { formatPrice, setCurrency, currency } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$context$2f$CurrencyContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCurrency"])();
    // --- State ---
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [paymentElementReady, setPaymentElementReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showShippingInfo, setShowShippingInfo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showMobileSummary, setShowMobileSummary] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isAuthenticated, setIsAuthenticated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [authenticatedEmail, setAuthenticatedEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [itemErrors, setItemErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [customerInfo, setCustomerInfo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        email: '',
        name: '',
        address: {
            line1: '',
            line2: '',
            city: '',
            postal_code: '',
            country: 'GB',
            state: ''
        }
    });
    // --- Refs ---
    const errorTimeoutsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({});
    const isNavigatingToSuccessRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    // --- Computed Values ---
    const subtotal = getTotalPrice();
    const selectedCountry = customerInfo.address.country;
    // Calculate shipping cost
    // Use fixed rates from SHIPPING_RATES
    const shippingCost = cart.length === 0 ? 0 : SHIPPING_RATES[selectedCountry] ?? DEFAULT_SHIPPING_RATE;
    const shippingLabel = SHIPPING_LABELS[selectedCountry] || 'International';
    const showInternationalNote = selectedCountry && selectedCountry.toUpperCase() !== 'GB' && cart.length > 0;
    const totalWithShipping = subtotal + shippingCost;
    // --- Effects ---
    // Suppress non-critical hCaptcha errors (used internally by Stripe for fraud detection)
    // These 401 errors are harmless - Stripe falls back to other fraud detection methods
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleUnhandledRejection = (event)=>{
            const errorMessage = event.reason?.message || event.reason?.toString() || '';
            const errorUrl = event.reason?.url || '';
            // Suppress hCaptcha 401 errors (non-critical, Stripe handles gracefully)
            if (errorMessage.includes('hcaptcha') || errorMessage.includes('hCaptcha') || errorUrl.includes('api.hcaptcha.com') || errorMessage.includes('401') && errorMessage.includes('Unauthorized')) {
                event.preventDefault(); // Prevent error from showing in console
            }
        };
        window.addEventListener('unhandledrejection', handleUnhandledRejection);
        return ()=>{
            window.removeEventListener('unhandledrejection', handleUnhandledRejection);
        };
    }, []);
    // Automatically change currency based on selected country
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (selectedCountry) {
            if (EUROPEAN_COUNTRIES.has(selectedCountry)) {
                // Set currency to EUR for European countries
                setCurrency('EUR');
            } else if (selectedCountry === 'GB') {
                // Set currency to GBP for UK
                setCurrency('GBP');
            }
        }
    }, [
        selectedCountry,
        setCurrency
    ]);
    // Check authentication status on mount and when returning from login
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const checkAuth = ()=>{
            const userEmail = localStorage.getItem('userEmail');
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            if (isLoggedIn && userEmail) {
                setIsAuthenticated(true);
                setAuthenticatedEmail(userEmail);
                // Auto-fill email in customer info if empty
                setCustomerInfo((prev)=>{
                    if (!prev.email) {
                        return {
                            ...prev,
                            email: userEmail
                        };
                    }
                    return prev;
                });
            } else {
                setIsAuthenticated(false);
                setAuthenticatedEmail('');
            }
        };
        checkAuth();
        // Check auth when window gains focus (user returns from login page)
        const handleFocus = ()=>{
            checkAuth();
        };
        // Also listen for storage changes (when user logs in/out in another tab)
        const handleStorageChange = (e)=>{
            if (e.key === 'userEmail' || e.key === 'isLoggedIn') {
                checkAuth();
            }
        };
        window.addEventListener('focus', handleFocus);
        window.addEventListener('storage', handleStorageChange);
        return ()=>{
            window.removeEventListener('focus', handleFocus);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []); // Run once on mount
    // Auto-clear error messages after 3 seconds
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const timeouts = errorTimeoutsRef.current;
        Object.keys(itemErrors).forEach((itemKey)=>{
            if (timeouts[itemKey]) {
                clearTimeout(timeouts[itemKey]);
            }
            timeouts[itemKey] = setTimeout(()=>{
                setItemErrors((prev)=>{
                    const newErrors = {
                        ...prev
                    };
                    if (typeof newErrors[itemKey] === 'string') {
                        delete newErrors[itemKey];
                    } else if (newErrors[itemKey] && typeof newErrors[itemKey] === 'object') {
                        delete newErrors[itemKey];
                    }
                    return newErrors;
                });
                delete timeouts[itemKey];
            }, 3000);
        });
        return ()=>{
            Object.values(timeouts).forEach((timeout)=>{
                clearTimeout(timeout);
            });
        };
    }, [
        itemErrors
    ]);
    // Redirect if cart is empty
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (cart.length === 0 && !isNavigatingToSuccessRef.current) {
            router.push('/cart');
        }
    }, [
        cart,
        router
    ]);
    // Reset payment element ready state when elements change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setPaymentElementReady(false);
    }, [
        elements
    ]);
    // --- Handlers ---
    const handleIncrementWithCheck = (itemId)=>{
        // Find item by ID or by index
        const item = typeof itemId === 'string' ? cart.find((i)=>i.id === itemId) : typeof itemId === 'number' && itemId >= 0 && itemId < cart.length ? cart[itemId] : null;
        if (!item) {
            return;
        }
        const maxAvailable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$utils$2f$inventory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getMaxAvailableQuantity"])(item, cart);
        const canIncrement = maxAvailable === null || maxAvailable > 0;
        if (canIncrement) {
            incrementItemQty(itemId);
            // Clear error when successfully incrementing
            setItemErrors((prev)=>{
                const newErrors = {
                    ...prev
                };
                delete newErrors[itemId];
                return newErrors;
            });
        } else {
            // Show inline error message for out of stock items
            let itemName = '';
            if (item.type === 'charm') {
                itemName = item.name || item.pin?.name || 'Charm';
                const errorMessage = `Oops! We don't have any more ${itemName} in stock right now, so you can't add more to your basket.`;
                setItemErrors((prev)=>({
                        ...prev,
                        [itemId]: errorMessage
                    }));
            } else {
                // For case items, just increment (they handle their own errors)
                console.log('⚠️ Case item - incrementing anyway despite inventory check');
                incrementItemQty(itemId);
            }
        }
    };
    // Handle decrement with error clearing
    const handleDecrementWithCheck = (itemId)=>{
        decrementItemQty(itemId);
        // Clear error when decrementing
        setItemErrors((prev)=>{
            const newErrors = {
                ...prev
            };
            delete newErrors[itemId];
            return newErrors;
        });
    };
    // Redirect if cart is empty (but not if we're navigating to success page)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Don't redirect if we're navigating to success page
        if (cart.length === 0 && !isNavigatingToSuccessRef.current) {
            router.push('/cart');
        }
    }, [
        cart,
        router
    ]);
    const handleInputChange = (e)=>{
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setCustomerInfo((prev)=>({
                    ...prev,
                    [parent]: {
                        ...prev[parent],
                        [child]: value
                    }
                }));
        } else {
            setCustomerInfo((prev)=>({
                    ...prev,
                    [name]: value
                }));
        }
    };
    const handleSubmit = async (event)=>{
        event.preventDefault();
        if (!stripe || !elements) {
            setError('Stripe is not loaded. Please wait...');
            return;
        }
        // Check if Payment Element is ready
        const paymentElement = elements.getElement('payment');
        if (!paymentElement) {
            setError('Payment form is not ready. Please wait...');
            return;
        }
        if (!paymentElementReady) {
            setError('Payment form is still loading. Please wait...');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            // Double-check inventory from Supabase before processing payment
            // This prevents race conditions where another customer bought the last item
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$utils$2f$inventory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["refreshInventoryFromSupabase"])();
            // Check each item in cart against current Supabase inventory
            // Allow purchase if user has the item in their cart (even if it shows as sold out)
            const outOfStockItems = [];
            // Group items by their inventory key (case+color or charm identity)
            const itemGroups = new Map();
            for (const item of cart){
                let groupKey = '';
                let itemName = '';
                if (item.type === 'charm') {
                    const category = item.category || item.pin?.category || 'colorful';
                    const pinName = item.pin?.name || item.name || '';
                    groupKey = `charm-${category}-${pinName}`;
                    itemName = item.name || item.pin?.name || 'Charm';
                } else if (item.caseType && item.color) {
                    groupKey = `case-${item.caseType}-${item.color}`;
                    itemName = item.caseName || item.name || 'Passport Case';
                } else {
                    groupKey = item.id || `item-${item.name}`;
                    itemName = item.name || 'Item';
                }
                if (!itemGroups.has(groupKey)) {
                    itemGroups.set(groupKey, {
                        item: item,
                        name: itemName,
                        totalQuantity: 0
                    });
                }
                const group = itemGroups.get(groupKey);
                group.totalQuantity += item.quantity || 1;
            }
            // Check each group against base inventory (without cart subtraction)
            for (const [groupKey, group] of itemGroups){
                // Get base inventory without subtracting cart items
                const baseInventory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$utils$2f$inventory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getMaxAvailableQuantity"])(group.item, []);
                // If item has limited stock
                if (baseInventory !== null) {
                    // Check if base inventory is sufficient for what's in cart
                    // If baseInventory is 0, it means truly out of stock
                    // If baseInventory > 0 but less than totalQuantity, insufficient stock
                    if (baseInventory === 0 || group.totalQuantity > baseInventory) {
                        outOfStockItems.push(group.name);
                    }
                }
            // If baseInventory is null, it means unlimited stock - always allow
            }
            // If any items are out of stock, prevent payment
            if (outOfStockItems.length > 0) {
                const itemsList = outOfStockItems.length === 1 ? outOfStockItems[0] : outOfStockItems.slice(0, -1).join(', ') + ' and ' + outOfStockItems[outOfStockItems.length - 1];
                const errorMessage = `Sorry, ${itemsList} ${outOfStockItems.length === 1 ? 'is' : 'are'} no longer available. Please remove ${outOfStockItems.length === 1 ? 'it' : 'them'} from your cart and try again.`;
                setError(errorMessage);
                setLoading(false);
                return;
            }
            // Confirm the payment with Stripe
            // The clientSecret is automatically retrieved from Elements context
            const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${window.location.origin}/payment-success`,
                    payment_method_data: {
                        billing_details: {
                            name: customerInfo.name,
                            email: customerInfo.email,
                            phone: null,
                            address: {
                                line1: customerInfo.address.line1,
                                line2: customerInfo.address.line2,
                                city: customerInfo.address.city,
                                postal_code: customerInfo.address.postal_code,
                                country: customerInfo.address.country,
                                state: customerInfo.address.state
                            }
                        }
                    }
                },
                redirect: 'if_required'
            });
            if (stripeError) {
                setError(stripeError.message || 'An error occurred while processing your payment.');
                setLoading(false);
                return;
            }
            if (paymentIntent && paymentIntent.status === 'succeeded') {
                // Payment succeeded - navigate to success page
                isNavigatingToSuccessRef.current = true; // Set flag to prevent redirect
                const cartItemsCopy = [
                    ...cart
                ]; // Create a copy to preserve cart data
                clearCart(); // Clear cart before navigation
                // Store data in sessionStorage since Next.js doesn't support navigation state
                if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                ;
                router.push('/payment-success');
            } else if (paymentIntent && paymentIntent.status === 'requires_action') {
            // Payment requires additional action (e.g., 3D Secure)
            // Stripe will handle redirect automatically to return_url
            // After redirect completes, user will land on payment-success page
            } else if (paymentIntent) {
                // Other status (processing, requires_confirmation, etc.)
                // For most cases, we still show success as the payment was initiated
                // Note: 'processing' status means payment is being processed and may take time
                isNavigatingToSuccessRef.current = true; // Set flag to prevent redirect
                const cartItemsCopy = [
                    ...cart
                ]; // Create a copy to preserve cart data
                clearCart(); // Clear cart before navigation
                // Store data in sessionStorage since Next.js doesn't support navigation state
                if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                ;
                router.push('/payment-success');
            }
        } catch (err) {
            setError('An error occurred while processing your payment.');
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-full w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$component$2f$Checkout$2f$components$2f$MobileOrderSummary$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                isOpen: showMobileSummary,
                onToggle: ()=>setShowMobileSummary((prev)=>!prev),
                cartLength: cart.length,
                totalWithShipping: totalWithShipping,
                formatPrice: formatPrice,
                cart: cart,
                subtotal: subtotal,
                shippingCost: shippingCost,
                shippingLabel: shippingLabel,
                showInternationalNote: showInternationalNote,
                onShowShippingInfo: ()=>setShowShippingInfo(true),
                onIncrement: handleIncrementWithCheck,
                onDecrement: handleDecrementWithCheck,
                onRemove: removeFromCart,
                itemErrors: itemErrors
            }, void 0, false, {
                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/index.jsx",
                lineNumber: 524,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col lg:flex-row  w-full ",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: handleSubmit,
                        className: "space-y-6  mt-6 lg:mt-0 lg:p-6 w-full lg:w-1/2 lg:flex-shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$component$2f$Checkout$2f$components$2f$CustomerInfoForm$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                customerInfo: customerInfo,
                                onInputChange: handleInputChange,
                                isAuthenticated: isAuthenticated,
                                authenticatedEmail: authenticatedEmail,
                                onSignIn: (email)=>{
                                    setIsAuthenticated(true);
                                    setAuthenticatedEmail(email);
                                },
                                onSignOut: ()=>{
                                    setIsAuthenticated(false);
                                    setAuthenticatedEmail('');
                                    localStorage.removeItem('userId'); // Clear user ID
                                }
                            }, void 0, false, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/index.jsx",
                                lineNumber: 549,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$component$2f$Checkout$2f$components$2f$PaymentSection$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                paymentElementReady: paymentElementReady,
                                error: error,
                                onPaymentReady: ()=>setPaymentElementReady(true),
                                onPaymentError: (errorMessage)=>{
                                    setError(errorMessage);
                                }
                            }, void 0, false, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/index.jsx",
                                lineNumber: 566,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                disabled: !stripe || !elements || loading || !paymentElementReady,
                                className: "w-full py-3 text-sm uppercase tracking-wider font-light disabled:opacity-50 disabled:cursor-not-allowed font-inter bg-btn-primary hover:bg-btn-primary-hover text-btn-primary-text border border-btn-primary-border hover:border-btn-primary-hover transition-all duration-200",
                                children: loading ? 'Processing...' : 'Complete Payment'
                            }, void 0, false, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/index.jsx",
                                lineNumber: 575,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            showInternationalNote && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$component$2f$InternationalNote$2f$index$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                className: "mt-4",
                                showOnDesktop: false,
                                showOnMobile: true,
                                title: "Custom Duties & Taxes Included",
                                message: "The total amount you pay includes all applicable customs duties & taxes. We guarantee no additional charges on delivery.",
                                variant: "gray"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/index.jsx",
                                lineNumber: 583,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/index.jsx",
                        lineNumber: 544,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                        className: "hidden lg:flex border border-gray-200 bg-yellow-50 p-6 w-full lg:w-1/2 lg:sticky lg:top-20 mt-4 lg:mt-0 flex-col max-h-[calc(100vh-8rem)]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 overflow-hidden flex flex-col min-h-0",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$component$2f$Checkout$2f$components$2f$OrderSummary$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                cart: cart,
                                formatPrice: formatPrice,
                                subtotal: subtotal,
                                shippingCost: shippingCost,
                                shippingLabel: shippingLabel,
                                totalWithShipping: totalWithShipping,
                                showInternationalNote: showInternationalNote,
                                onShowShippingInfo: ()=>setShowShippingInfo(true),
                                onIncrement: handleIncrementWithCheck,
                                onDecrement: handleDecrementWithCheck,
                                onRemove: removeFromCart,
                                itemErrors: itemErrors
                            }, void 0, false, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/index.jsx",
                                lineNumber: 597,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/index.jsx",
                            lineNumber: 596,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/index.jsx",
                        lineNumber: 595,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$component$2f$Checkout$2f$components$2f$ShippingInfoModal$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        isOpen: showShippingInfo,
                        onClose: ()=>setShowShippingInfo(false)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/index.jsx",
                        lineNumber: 614,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/index.jsx",
                lineNumber: 542,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full border-t border-gray-200 mt-8 pt-6 pb-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-6xl mx-auto px-4 lg:px-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap justify-center gap-4 md:gap-6 text-xs text-gray-600 font-light font-inter",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/returns",
                                className: "hover:text-gray-900 transition-colors underline",
                                children: "Refund Policy"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/index.jsx",
                                lineNumber: 624,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-300",
                                children: "|"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/index.jsx",
                                lineNumber: 630,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/shipping",
                                className: "hover:text-gray-900 transition-colors underline",
                                children: "Shipping"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/index.jsx",
                                lineNumber: 631,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-300",
                                children: "|"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/index.jsx",
                                lineNumber: 637,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/returns",
                                className: "hover:text-gray-900 transition-colors underline",
                                children: "Cancellations"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/index.jsx",
                                lineNumber: 638,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-300",
                                children: "|"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/index.jsx",
                                lineNumber: 644,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/about",
                                className: "hover:text-gray-900 transition-colors underline",
                                children: "Contact"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/index.jsx",
                                lineNumber: 645,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/index.jsx",
                        lineNumber: 623,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/index.jsx",
                    lineNumber: 622,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/index.jsx",
                lineNumber: 621,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/index.jsx",
        lineNumber: 523,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const Checkout = ()=>{
    const { cart, getTotalPrice } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$context$2f$CartContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCart"])();
    const { currency, convertPrice } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$context$2f$CurrencyContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCurrency"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [options, setOptions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [paymentError, setPaymentError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const hasInitializedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Don't redirect to cart if we're already on a different page (e.g., payment-success)
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        // Only initialize payment options once when we have items in cart
        if (cart.length === 0 || hasInitializedRef.current || options !== null) {
            return;
        }
        const initializeOptions = async ()=>{
            try {
                hasInitializedRef.current = true;
                setLoading(true);
                setPaymentError(null); // Clear any previous errors
                // Get total price in GBP, then convert to selected currency
                const totalPriceGBP = getTotalPrice();
                const totalPriceInCurrency = convertPrice(totalPriceGBP);
                // Convert to smallest currency unit (pence, cents, etc.)
                // For currencies like JPY that don't use decimals, multiply by 1
                const currencyMultipliers = {
                    'jpy': 1,
                    'krw': 1,
                    'vnd': 1
                };
                const multiplier = currencyMultipliers[currency.toLowerCase()] || 100;
                const amount = Math.round(totalPriceInCurrency * multiplier);
                const currencyCode = currency.toLowerCase();
                const paymentData = {
                    amount,
                    currency: currencyCode,
                    items: cart,
                    customerInfo: {}
                };
                const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$utils$2f$mockPaymentAPI$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPaymentIntent"])(paymentData);
                setOptions({
                    clientSecret: result.client_secret,
                    appearance: {
                        theme: 'stripe',
                        variables: {
                            colorPrimary: '#3b82f6',
                            colorBackground: '#ffffff',
                            colorText: '#1f2937',
                            colorDanger: '#ef4444',
                            fontFamily: 'system-ui, sans-serif',
                            spacingUnit: '4px',
                            borderRadius: '8px'
                        }
                    }
                });
            } catch (err) {
                // More detailed error message
                let errorMessage = 'Failed to initialize payment. ';
                if (err?.message) {
                    errorMessage += err.message;
                } else {
                    errorMessage += 'Please ensure the backend server is running on port 3001.';
                }
                setPaymentError(errorMessage);
                hasInitializedRef.current = false; // Allow retry on error
            } finally{
                setLoading(false);
            }
        };
        initializeOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        cart.length
    ]); // Only re-run if cart length changes (hasInitializedRef prevents re-init)
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$component$2f$Checkout$2f$components$2f$LoadingState$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/index.jsx",
            lineNumber: 748,
            columnNumber: 12
        }, ("TURBOPACK compile-time value", void 0));
    }
    if (paymentError) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex flex-col bg-white",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$component$2f$Checkout$2f$components$2f$CheckoutHeader$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/index.jsx",
                    lineNumber: 754,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 flex items-center justify-center bg-white py-10",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-md mx-auto px-4 text-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-red-50 border border-red-200 rounded-lg p-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-xl font-semibold text-red-900 mb-3",
                                    style: {
                                        fontFamily: "'Poppins', sans-serif"
                                    },
                                    children: "Payment Setup Error"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/index.jsx",
                                    lineNumber: 758,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-red-700 mb-4 font-inter",
                                    children: paymentError
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/index.jsx",
                                    lineNumber: 761,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm text-red-600 mb-4 font-inter",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mb-2",
                                            children: "To fix this issue:"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/index.jsx",
                                            lineNumber: 765,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                                            className: "list-decimal list-inside space-y-1 text-left",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: [
                                                        "Make sure your backend server is running: ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                            className: "bg-red-100 px-1 rounded",
                                                            children: "npm run server"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/index.jsx",
                                                            lineNumber: 767,
                                                            columnNumber: 65
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/index.jsx",
                                                    lineNumber: 767,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: "Verify the server is running on port 3001"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/index.jsx",
                                                    lineNumber: 768,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: "Check that the proxy is configured correctly"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/index.jsx",
                                                    lineNumber: 769,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: "Refresh this page to retry"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/index.jsx",
                                                    lineNumber: 770,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/index.jsx",
                                            lineNumber: 766,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/index.jsx",
                                    lineNumber: 764,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setPaymentError(null);
                                        hasInitializedRef.current = false;
                                        window.location.reload();
                                    },
                                    className: "px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors font-inter",
                                    children: "Retry"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/index.jsx",
                                    lineNumber: 773,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/index.jsx",
                            lineNumber: 757,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/index.jsx",
                        lineNumber: 756,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/index.jsx",
                    lineNumber: 755,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/index.jsx",
            lineNumber: 753,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    if (!options) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$component$2f$Checkout$2f$components$2f$LoadingState$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/index.jsx",
            lineNumber: 791,
            columnNumber: 12
        }, ("TURBOPACK compile-time value", void 0));
    }
    // Validate Stripe key is set and not the placeholder
    const isPlaceholderKey = stripePublishableKey === 'pk_test_51234567890abcdefghijklmnopqrstuvwxyz1234567890';
    if (!stripePublishableKey || isPlaceholderKey) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex flex-col bg-white",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$component$2f$Checkout$2f$components$2f$CheckoutHeader$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/index.jsx",
                    lineNumber: 799,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 flex items-center justify-center bg-white py-10",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-md mx-auto px-4 text-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-yellow-50 border border-yellow-200 rounded-lg p-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-xl font-semibold text-yellow-900 mb-3",
                                    style: {
                                        fontFamily: "'Poppins', sans-serif"
                                    },
                                    children: "Stripe Configuration Missing"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/index.jsx",
                                    lineNumber: 803,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-yellow-700 mb-4 font-inter",
                                    children: "Please set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY in your environment variables."
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/index.jsx",
                                    lineNumber: 806,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-yellow-600 mb-2 font-inter",
                                    children: "(Also supports VITE_STRIPE_PUBLISHABLE_KEY for backward compatibility)"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/index.jsx",
                                    lineNumber: 809,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-yellow-600 font-inter",
                                    children: "The Stripe publishable key is required to process payments."
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/index.jsx",
                                    lineNumber: 812,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/index.jsx",
                            lineNumber: 802,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/index.jsx",
                        lineNumber: 801,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/index.jsx",
                    lineNumber: 800,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/index.jsx",
            lineNumber: 798,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex flex-col bg-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$component$2f$Checkout$2f$components$2f$CheckoutHeader$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/index.jsx",
                lineNumber: 824,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex items-stretch bg-white py-10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 max-w-6xl mx-auto px-4 lg:px-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$stripe$2f$react$2d$stripe$2d$js$2f$dist$2f$react$2d$stripe$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Elements"], {
                        stripe: stripePromise,
                        options: options,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CheckoutForm, {}, void 0, false, {
                            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/index.jsx",
                            lineNumber: 828,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/index.jsx",
                        lineNumber: 827,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/index.jsx",
                    lineNumber: 826,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/index.jsx",
                lineNumber: 825,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Checkout/index.jsx",
        lineNumber: 823,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = Checkout;
}),
];

//# sourceMappingURL=Desktop_HappyCase_TheHappy_TheHappyCase_src_d324dc43._.js.map