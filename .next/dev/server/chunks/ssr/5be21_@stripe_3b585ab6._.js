module.exports = [
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@stripe/stripe-js/dist/index.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "loadStripe",
    ()=>loadStripe
]);
var RELEASE_TRAIN = 'basil';
var runtimeVersionToUrlVersion = function runtimeVersionToUrlVersion(version) {
    return version === 3 ? 'v3' : version;
};
var ORIGIN = 'https://js.stripe.com';
var STRIPE_JS_URL = "".concat(ORIGIN, "/").concat(RELEASE_TRAIN, "/stripe.js");
var V3_URL_REGEX = /^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/;
var STRIPE_JS_URL_REGEX = /^https:\/\/js\.stripe\.com\/(v3|[a-z]+)\/stripe\.js(\?.*)?$/;
var EXISTING_SCRIPT_MESSAGE = 'loadStripe.setLoadParameters was called but an existing Stripe.js script already exists in the document; existing script parameters will be used';
var isStripeJSURL = function isStripeJSURL(url) {
    return V3_URL_REGEX.test(url) || STRIPE_JS_URL_REGEX.test(url);
};
var findScript = function findScript() {
    var scripts = document.querySelectorAll("script[src^=\"".concat(ORIGIN, "\"]"));
    for(var i = 0; i < scripts.length; i++){
        var script = scripts[i];
        if (!isStripeJSURL(script.src)) {
            continue;
        }
        return script;
    }
    return null;
};
var injectScript = function injectScript(params) {
    var queryString = params && !params.advancedFraudSignals ? '?advancedFraudSignals=false' : '';
    var script = document.createElement('script');
    script.src = "".concat(STRIPE_JS_URL).concat(queryString);
    var headOrBody = document.head || document.body;
    if (!headOrBody) {
        throw new Error('Expected document.body not to be null. Stripe.js requires a <body> element.');
    }
    headOrBody.appendChild(script);
    return script;
};
var registerWrapper = function registerWrapper(stripe, startTime) {
    if (!stripe || !stripe._registerWrapper) {
        return;
    }
    stripe._registerWrapper({
        name: 'stripe-js',
        version: "7.9.0",
        startTime: startTime
    });
};
var stripePromise$1 = null;
var onErrorListener = null;
var onLoadListener = null;
var onError = function onError(reject) {
    return function(cause) {
        reject(new Error('Failed to load Stripe.js', {
            cause: cause
        }));
    };
};
var onLoad = function onLoad(resolve, reject) {
    return function() {
        if (window.Stripe) {
            resolve(window.Stripe);
        } else {
            reject(new Error('Stripe.js not available'));
        }
    };
};
var loadScript = function loadScript(params) {
    // Ensure that we only attempt to load Stripe.js at most once
    if (stripePromise$1 !== null) {
        return stripePromise$1;
    }
    stripePromise$1 = new Promise(function(resolve, reject) {
        if ("TURBOPACK compile-time truthy", 1) {
            // Resolve to null when imported server side. This makes the module
            // safe to import in an isomorphic code base.
            resolve(null);
            return;
        }
        //TURBOPACK unreachable
        ;
        var script;
        var _script$parentNode;
    }); // Resets stripePromise on error
    return stripePromise$1["catch"](function(error) {
        stripePromise$1 = null;
        return Promise.reject(error);
    });
};
var initStripe = function initStripe(maybeStripe, args, startTime) {
    if (maybeStripe === null) {
        return null;
    }
    var pk = args[0];
    var isTestKey = pk.match(/^pk_test/); // @ts-expect-error this is not publicly typed
    var version = runtimeVersionToUrlVersion(maybeStripe.version);
    var expectedVersion = RELEASE_TRAIN;
    if (isTestKey && version !== expectedVersion) {
        console.warn("Stripe.js@".concat(version, " was loaded on the page, but @stripe/stripe-js@").concat("7.9.0", " expected Stripe.js@").concat(expectedVersion, ". This may result in unexpected behavior. For more information, see https://docs.stripe.com/sdks/stripejs-versioning"));
    }
    var stripe = maybeStripe.apply(undefined, args);
    registerWrapper(stripe, startTime);
    return stripe;
}; // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
var stripePromise;
var loadCalled = false;
var getStripePromise = function getStripePromise() {
    if (stripePromise) {
        return stripePromise;
    }
    stripePromise = loadScript(null)["catch"](function(error) {
        // clear cache on error
        stripePromise = null;
        return Promise.reject(error);
    });
    return stripePromise;
}; // Execute our own script injection after a tick to give users time to do their
// own script injection.
Promise.resolve().then(function() {
    return getStripePromise();
})["catch"](function(error) {
    if (!loadCalled) {
        console.warn(error);
    }
});
var loadStripe = function loadStripe() {
    for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
        args[_key] = arguments[_key];
    }
    loadCalled = true;
    var startTime = Date.now(); // if previous attempts are unsuccessful, will re-load script
    return getStripePromise().then(function(maybeStripe) {
        return initStripe(maybeStripe, args, startTime);
    });
};
;
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@stripe/stripe-js/lib/index.mjs [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$stripe$2f$stripe$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@stripe/stripe-js/dist/index.mjs [app-ssr] (ecmascript)");
;
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@stripe/react-stripe-js/dist/react-stripe.esm.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AddressElement",
    ()=>AddressElement,
    "AffirmMessageElement",
    ()=>AffirmMessageElement,
    "AfterpayClearpayMessageElement",
    ()=>AfterpayClearpayMessageElement,
    "AuBankAccountElement",
    ()=>AuBankAccountElement,
    "CardCvcElement",
    ()=>CardCvcElement,
    "CardElement",
    ()=>CardElement,
    "CardExpiryElement",
    ()=>CardExpiryElement,
    "CardNumberElement",
    ()=>CardNumberElement,
    "Elements",
    ()=>Elements,
    "ElementsConsumer",
    ()=>ElementsConsumer,
    "EmbeddedCheckout",
    ()=>EmbeddedCheckout,
    "EmbeddedCheckoutProvider",
    ()=>EmbeddedCheckoutProvider,
    "EpsBankElement",
    ()=>EpsBankElement,
    "ExpressCheckoutElement",
    ()=>ExpressCheckoutElement,
    "FpxBankElement",
    ()=>FpxBankElement,
    "IbanElement",
    ()=>IbanElement,
    "IdealBankElement",
    ()=>IdealBankElement,
    "LinkAuthenticationElement",
    ()=>LinkAuthenticationElement,
    "P24BankElement",
    ()=>P24BankElement,
    "PaymentElement",
    ()=>PaymentElement,
    "PaymentMethodMessagingElement",
    ()=>PaymentMethodMessagingElement,
    "PaymentRequestButtonElement",
    ()=>PaymentRequestButtonElement,
    "ShippingAddressElement",
    ()=>ShippingAddressElement,
    "TaxIdElement",
    ()=>TaxIdElement,
    "useElements",
    ()=>useElements,
    "useStripe",
    ()=>useStripe
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/prop-types/index.js [app-ssr] (ecmascript)");
;
;
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpread2(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
            ownKeys(Object(source), true).forEach(function(key) {
                _defineProperty(target, key, source[key]);
            });
        } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
            ownKeys(Object(source)).forEach(function(key) {
                Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
            });
        }
    }
    return target;
}
function _typeof(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function(obj) {
            return typeof obj;
        };
    } else {
        _typeof = function(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
    }
    return _typeof(obj);
}
function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for(i = 0; i < sourceSymbolKeys.length; i++){
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}
function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}
function _iterableToArrayLimit(arr, i) {
    var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
var useAttachEvent = function useAttachEvent(element, event, cb) {
    var cbDefined = !!cb;
    var cbRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef(cb); // In many integrations the callback prop changes on each render.
    // Using a ref saves us from calling element.on/.off every render.
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(function() {
        cbRef.current = cb;
    }, [
        cb
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(function() {
        if (!cbDefined || !element) {
            return function() {};
        }
        var decoratedCb = function decoratedCb() {
            if (cbRef.current) {
                cbRef.current.apply(cbRef, arguments);
            }
        };
        element.on(event, decoratedCb);
        return function() {
            element.off(event, decoratedCb);
        };
    }, [
        cbDefined,
        event,
        element,
        cbRef
    ]);
};
var usePrevious = function usePrevious(value) {
    var ref = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef(value);
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(function() {
        ref.current = value;
    }, [
        value
    ]);
    return ref.current;
};
var isUnknownObject = function isUnknownObject(raw) {
    return raw !== null && _typeof(raw) === 'object';
};
var isPromise = function isPromise(raw) {
    return isUnknownObject(raw) && typeof raw.then === 'function';
}; // We are using types to enforce the `stripe` prop in this lib,
// but in an untyped integration `stripe` could be anything, so we need
// to do some sanity validation to prevent type errors.
var isStripe = function isStripe(raw) {
    return isUnknownObject(raw) && typeof raw.elements === 'function' && typeof raw.createToken === 'function' && typeof raw.createPaymentMethod === 'function' && typeof raw.confirmCardPayment === 'function';
};
var PLAIN_OBJECT_STR = '[object Object]';
var isEqual = function isEqual(left, right) {
    if (!isUnknownObject(left) || !isUnknownObject(right)) {
        return left === right;
    }
    var leftArray = Array.isArray(left);
    var rightArray = Array.isArray(right);
    if (leftArray !== rightArray) return false;
    var leftPlainObject = Object.prototype.toString.call(left) === PLAIN_OBJECT_STR;
    var rightPlainObject = Object.prototype.toString.call(right) === PLAIN_OBJECT_STR;
    if (leftPlainObject !== rightPlainObject) return false; // not sure what sort of special object this is (regexp is one option), so
    // fallback to reference check.
    if (!leftPlainObject && !leftArray) return left === right;
    var leftKeys = Object.keys(left);
    var rightKeys = Object.keys(right);
    if (leftKeys.length !== rightKeys.length) return false;
    var keySet = {};
    for(var i = 0; i < leftKeys.length; i += 1){
        keySet[leftKeys[i]] = true;
    }
    for(var _i = 0; _i < rightKeys.length; _i += 1){
        keySet[rightKeys[_i]] = true;
    }
    var allKeys = Object.keys(keySet);
    if (allKeys.length !== leftKeys.length) {
        return false;
    }
    var l = left;
    var r = right;
    var pred = function pred(key) {
        return isEqual(l[key], r[key]);
    };
    return allKeys.every(pred);
};
var extractAllowedOptionsUpdates = function extractAllowedOptionsUpdates(options, prevOptions, immutableKeys) {
    if (!isUnknownObject(options)) {
        return null;
    }
    return Object.keys(options).reduce(function(newOptions, key) {
        var isUpdated = !isUnknownObject(prevOptions) || !isEqual(options[key], prevOptions[key]);
        if (immutableKeys.includes(key)) {
            if (isUpdated) {
                console.warn("Unsupported prop change: options.".concat(key, " is not a mutable property."));
            }
            return newOptions;
        }
        if (!isUpdated) {
            return newOptions;
        }
        return _objectSpread2(_objectSpread2({}, newOptions || {}), {}, _defineProperty({}, key, options[key]));
    }, null);
};
var INVALID_STRIPE_ERROR$1 = 'Invalid prop `stripe` supplied to `Elements`. We recommend using the `loadStripe` utility from `@stripe/stripe-js`. See https://stripe.com/docs/stripe-js/react#elements-props-stripe for details.'; // We are using types to enforce the `stripe` prop in this lib, but in a real
// integration `stripe` could be anything, so we need to do some sanity
// validation to prevent type errors.
var validateStripe = function validateStripe(maybeStripe) {
    var errorMsg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : INVALID_STRIPE_ERROR$1;
    if (maybeStripe === null || isStripe(maybeStripe)) {
        return maybeStripe;
    }
    throw new Error(errorMsg);
};
var parseStripeProp = function parseStripeProp(raw) {
    var errorMsg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : INVALID_STRIPE_ERROR$1;
    if (isPromise(raw)) {
        return {
            tag: 'async',
            stripePromise: Promise.resolve(raw).then(function(result) {
                return validateStripe(result, errorMsg);
            })
        };
    }
    var stripe = validateStripe(raw, errorMsg);
    if (stripe === null) {
        return {
            tag: 'empty'
        };
    }
    return {
        tag: 'sync',
        stripe: stripe
    };
};
var registerWithStripeJs = function registerWithStripeJs(stripe) {
    if (!stripe || !stripe._registerWrapper || !stripe.registerAppInfo) {
        return;
    }
    stripe._registerWrapper({
        name: 'react-stripe-js',
        version: "4.0.2"
    });
    stripe.registerAppInfo({
        name: 'react-stripe-js',
        version: "4.0.2",
        url: 'https://stripe.com/docs/stripe-js/react'
    });
};
var ElementsContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createContext(null);
ElementsContext.displayName = 'ElementsContext';
var parseElementsContext = function parseElementsContext(ctx, useCase) {
    if (!ctx) {
        throw new Error("Could not find Elements context; You need to wrap the part of your app that ".concat(useCase, " in an <Elements> provider."));
    }
    return ctx;
};
/**
 * The `Elements` provider allows you to use [Element components](https://stripe.com/docs/stripe-js/react#element-components) and access the [Stripe object](https://stripe.com/docs/js/initializing) in any nested component.
 * Render an `Elements` provider at the root of your React app so that it is available everywhere you need it.
 *
 * To use the `Elements` provider, call `loadStripe` from `@stripe/stripe-js` with your publishable key.
 * The `loadStripe` function will asynchronously load the Stripe.js script and initialize a `Stripe` object.
 * Pass the returned `Promise` to `Elements`.
 *
 * @docs https://docs.stripe.com/sdks/stripejs-react?ui=elements#elements-provider
 */ var Elements = function Elements(_ref) {
    var rawStripeProp = _ref.stripe, options = _ref.options, children = _ref.children;
    var parsed = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useMemo(function() {
        return parseStripeProp(rawStripeProp);
    }, [
        rawStripeProp
    ]); // For a sync stripe instance, initialize into context
    var _React$useState = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(function() {
        return {
            stripe: parsed.tag === 'sync' ? parsed.stripe : null,
            elements: parsed.tag === 'sync' ? parsed.stripe.elements(options) : null
        };
    }), _React$useState2 = _slicedToArray(_React$useState, 2), ctx = _React$useState2[0], setContext = _React$useState2[1];
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(function() {
        var isMounted = true;
        var safeSetContext = function safeSetContext(stripe) {
            setContext(function(ctx) {
                // no-op if we already have a stripe instance (https://github.com/stripe/react-stripe-js/issues/296)
                if (ctx.stripe) return ctx;
                return {
                    stripe: stripe,
                    elements: stripe.elements(options)
                };
            });
        }; // For an async stripePromise, store it in context once resolved
        if (parsed.tag === 'async' && !ctx.stripe) {
            parsed.stripePromise.then(function(stripe) {
                if (stripe && isMounted) {
                    // Only update Elements context if the component is still mounted
                    // and stripe is not null. We allow stripe to be null to make
                    // handling SSR easier.
                    safeSetContext(stripe);
                }
            });
        } else if (parsed.tag === 'sync' && !ctx.stripe) {
            // Or, handle a sync stripe instance going from null -> populated
            safeSetContext(parsed.stripe);
        }
        return function() {
            isMounted = false;
        };
    }, [
        parsed,
        ctx,
        options
    ]); // Warn on changes to stripe prop
    var prevStripe = usePrevious(rawStripeProp);
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(function() {
        if (prevStripe !== null && prevStripe !== rawStripeProp) {
            console.warn('Unsupported prop change on Elements: You cannot change the `stripe` prop after setting it.');
        }
    }, [
        prevStripe,
        rawStripeProp
    ]); // Apply updates to elements when options prop has relevant changes
    var prevOptions = usePrevious(options);
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(function() {
        if (!ctx.elements) {
            return;
        }
        var updates = extractAllowedOptionsUpdates(options, prevOptions, [
            'clientSecret',
            'fonts'
        ]);
        if (updates) {
            ctx.elements.update(updates);
        }
    }, [
        options,
        prevOptions,
        ctx.elements
    ]); // Attach react-stripe-js version to stripe.js instance
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(function() {
        registerWithStripeJs(ctx.stripe);
    }, [
        ctx.stripe
    ]);
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(ElementsContext.Provider, {
        value: ctx
    }, children);
};
Elements.propTypes = {
    stripe: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].any,
    options: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].object
};
var useElementsContextWithUseCase = function useElementsContextWithUseCase(useCaseMessage) {
    var ctx = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useContext(ElementsContext);
    return parseElementsContext(ctx, useCaseMessage);
};
/**
 * @docs https://stripe.com/docs/stripe-js/react#useelements-hook
 */ var useElements = function useElements() {
    var _useElementsContextWi = useElementsContextWithUseCase('calls useElements()'), elements = _useElementsContextWi.elements;
    return elements;
};
/**
 * @docs https://stripe.com/docs/stripe-js/react#elements-consumer
 */ var ElementsConsumer = function ElementsConsumer(_ref2) {
    var children = _ref2.children;
    var ctx = useElementsContextWithUseCase('mounts <ElementsConsumer>'); // Assert to satisfy the busted React.FC return type (it should be ReactNode)
    return children(ctx);
};
ElementsConsumer.propTypes = {
    children: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func.isRequired
};
var CheckoutContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createContext(null);
CheckoutContext.displayName = 'CheckoutContext';
({
    stripe: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].any,
    options: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].shape({
        fetchClientSecret: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func.isRequired,
        elementsOptions: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].object
    }).isRequired
});
var useElementsOrCheckoutContextWithUseCase = function useElementsOrCheckoutContextWithUseCase(useCaseString) {
    var checkout = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useContext(CheckoutContext);
    var elements = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useContext(ElementsContext);
    if (checkout) {
        if (elements) {
            throw new Error("You cannot wrap the part of your app that ".concat(useCaseString, " in both <CheckoutProvider> and <Elements> providers."));
        } else {
            return checkout;
        }
    } else {
        return parseElementsContext(elements, useCaseString);
    }
};
var _excluded = [
    "mode"
];
var capitalized = function capitalized(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
var createElementComponent = function createElementComponent(type, isServer) {
    var displayName = "".concat(capitalized(type), "Element");
    var ClientElement = function ClientElement(_ref) {
        var id = _ref.id, className = _ref.className, _ref$options = _ref.options, options = _ref$options === void 0 ? {} : _ref$options, onBlur = _ref.onBlur, onFocus = _ref.onFocus, onReady = _ref.onReady, onChange = _ref.onChange, onEscape = _ref.onEscape, onClick = _ref.onClick, onLoadError = _ref.onLoadError, onLoaderStart = _ref.onLoaderStart, onNetworksChange = _ref.onNetworksChange, onConfirm = _ref.onConfirm, onCancel = _ref.onCancel, onShippingAddressChange = _ref.onShippingAddressChange, onShippingRateChange = _ref.onShippingRateChange, onSavedPaymentMethodRemove = _ref.onSavedPaymentMethodRemove, onSavedPaymentMethodUpdate = _ref.onSavedPaymentMethodUpdate;
        var ctx = useElementsOrCheckoutContextWithUseCase("mounts <".concat(displayName, ">"));
        var elements = 'elements' in ctx ? ctx.elements : null;
        var checkoutState = 'checkoutState' in ctx ? ctx.checkoutState : null;
        var checkoutSdk = (checkoutState === null || checkoutState === void 0 ? void 0 : checkoutState.type) === 'success' ? checkoutState.checkout : null;
        var _React$useState = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(null), _React$useState2 = _slicedToArray(_React$useState, 2), element = _React$useState2[0], setElement = _React$useState2[1];
        var elementRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef(null);
        var domNode = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef(null); // For every event where the merchant provides a callback, call element.on
        // with that callback. If the merchant ever changes the callback, removes
        // the old callback with element.off and then call element.on with the new one.
        useAttachEvent(element, 'blur', onBlur);
        useAttachEvent(element, 'focus', onFocus);
        useAttachEvent(element, 'escape', onEscape);
        useAttachEvent(element, 'click', onClick);
        useAttachEvent(element, 'loaderror', onLoadError);
        useAttachEvent(element, 'loaderstart', onLoaderStart);
        useAttachEvent(element, 'networkschange', onNetworksChange);
        useAttachEvent(element, 'confirm', onConfirm);
        useAttachEvent(element, 'cancel', onCancel);
        useAttachEvent(element, 'shippingaddresschange', onShippingAddressChange);
        useAttachEvent(element, 'shippingratechange', onShippingRateChange);
        useAttachEvent(element, 'savedpaymentmethodremove', onSavedPaymentMethodRemove);
        useAttachEvent(element, 'savedpaymentmethodupdate', onSavedPaymentMethodUpdate);
        useAttachEvent(element, 'change', onChange);
        var readyCallback;
        if (onReady) {
            if (type === 'expressCheckout') {
                // Passes through the event, which includes visible PM types
                readyCallback = onReady;
            } else {
                // For other Elements, pass through the Element itself.
                readyCallback = function readyCallback() {
                    onReady(element);
                };
            }
        }
        useAttachEvent(element, 'ready', readyCallback);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useLayoutEffect(function() {
            if (elementRef.current === null && domNode.current !== null && (elements || checkoutSdk)) {
                var newElement = null;
                if (checkoutSdk) {
                    switch(type){
                        case 'payment':
                            newElement = checkoutSdk.createPaymentElement(options);
                            break;
                        case 'address':
                            if ('mode' in options) {
                                var mode = options.mode, restOptions = _objectWithoutProperties(options, _excluded);
                                if (mode === 'shipping') {
                                    newElement = checkoutSdk.createShippingAddressElement(restOptions);
                                } else if (mode === 'billing') {
                                    newElement = checkoutSdk.createBillingAddressElement(restOptions);
                                } else {
                                    throw new Error("Invalid options.mode. mode must be 'billing' or 'shipping'.");
                                }
                            } else {
                                throw new Error("You must supply options.mode. mode must be 'billing' or 'shipping'.");
                            }
                            break;
                        case 'expressCheckout':
                            newElement = checkoutSdk.createExpressCheckoutElement(options);
                            break;
                        case 'currencySelector':
                            newElement = checkoutSdk.createCurrencySelectorElement();
                            break;
                        case 'taxId':
                            newElement = checkoutSdk.createTaxIdElement(options);
                            break;
                        default:
                            throw new Error("Invalid Element type ".concat(displayName, ". You must use either the <PaymentElement />, <AddressElement options={{mode: 'shipping'}} />, <AddressElement options={{mode: 'billing'}} />, or <ExpressCheckoutElement />."));
                    }
                } else if (elements) {
                    newElement = elements.create(type, options);
                } // Store element in a ref to ensure it's _immediately_ available in cleanup hooks in StrictMode
                elementRef.current = newElement; // Store element in state to facilitate event listener attachment
                setElement(newElement);
                if (newElement) {
                    newElement.mount(domNode.current);
                }
            }
        }, [
            elements,
            checkoutSdk,
            options
        ]);
        var prevOptions = usePrevious(options);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(function() {
            if (!elementRef.current) {
                return;
            }
            var updates = extractAllowedOptionsUpdates(options, prevOptions, [
                'paymentRequest'
            ]);
            if (updates && 'update' in elementRef.current) {
                elementRef.current.update(updates);
            }
        }, [
            options,
            prevOptions
        ]);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useLayoutEffect(function() {
            return function() {
                if (elementRef.current && typeof elementRef.current.destroy === 'function') {
                    try {
                        elementRef.current.destroy();
                        elementRef.current = null;
                    } catch (error) {}
                }
            };
        }, []);
        return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("div", {
            id: id,
            className: className,
            ref: domNode
        });
    }; // Only render the Element wrapper in a server environment.
    var ServerElement = function ServerElement(props) {
        useElementsOrCheckoutContextWithUseCase("mounts <".concat(displayName, ">"));
        var id = props.id, className = props.className;
        return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("div", {
            id: id,
            className: className
        });
    };
    var Element = isServer ? ServerElement : ClientElement;
    Element.propTypes = {
        id: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string,
        className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string,
        onChange: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
        onBlur: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
        onFocus: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
        onReady: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
        onEscape: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
        onClick: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
        onLoadError: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
        onLoaderStart: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
        onNetworksChange: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
        onConfirm: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
        onCancel: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
        onShippingAddressChange: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
        onShippingRateChange: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
        onSavedPaymentMethodRemove: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
        onSavedPaymentMethodUpdate: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
        options: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].object
    };
    Element.displayName = displayName;
    Element.__elementType = type;
    return Element;
};
var isServer = ("TURBOPACK compile-time value", "undefined") === 'undefined';
var EmbeddedCheckoutContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createContext(null);
EmbeddedCheckoutContext.displayName = 'EmbeddedCheckoutProviderContext';
var useEmbeddedCheckoutContext = function useEmbeddedCheckoutContext() {
    var ctx = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useContext(EmbeddedCheckoutContext);
    if (!ctx) {
        throw new Error('<EmbeddedCheckout> must be used within <EmbeddedCheckoutProvider>');
    }
    return ctx;
};
var INVALID_STRIPE_ERROR = 'Invalid prop `stripe` supplied to `EmbeddedCheckoutProvider`. We recommend using the `loadStripe` utility from `@stripe/stripe-js`. See https://stripe.com/docs/stripe-js/react#elements-props-stripe for details.';
var EmbeddedCheckoutProvider = function EmbeddedCheckoutProvider(_ref) {
    var rawStripeProp = _ref.stripe, options = _ref.options, children = _ref.children;
    var parsed = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useMemo(function() {
        return parseStripeProp(rawStripeProp, INVALID_STRIPE_ERROR);
    }, [
        rawStripeProp
    ]);
    var embeddedCheckoutPromise = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef(null);
    var loadedStripe = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef(null);
    var _React$useState = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState({
        embeddedCheckout: null
    }), _React$useState2 = _slicedToArray(_React$useState, 2), ctx = _React$useState2[0], setContext = _React$useState2[1];
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(function() {
        // Don't support any ctx updates once embeddedCheckout or stripe is set.
        if (loadedStripe.current || embeddedCheckoutPromise.current) {
            return;
        }
        var setStripeAndInitEmbeddedCheckout = function setStripeAndInitEmbeddedCheckout(stripe) {
            if (loadedStripe.current || embeddedCheckoutPromise.current) return;
            loadedStripe.current = stripe;
            embeddedCheckoutPromise.current = loadedStripe.current.initEmbeddedCheckout(options).then(function(embeddedCheckout) {
                setContext({
                    embeddedCheckout: embeddedCheckout
                });
            });
        }; // For an async stripePromise, store it once resolved
        if (parsed.tag === 'async' && !loadedStripe.current && (options.clientSecret || options.fetchClientSecret)) {
            parsed.stripePromise.then(function(stripe) {
                if (stripe) {
                    setStripeAndInitEmbeddedCheckout(stripe);
                }
            });
        } else if (parsed.tag === 'sync' && !loadedStripe.current && (options.clientSecret || options.fetchClientSecret)) {
            // Or, handle a sync stripe instance going from null -> populated
            setStripeAndInitEmbeddedCheckout(parsed.stripe);
        }
    }, [
        parsed,
        options,
        ctx,
        loadedStripe
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(function() {
        // cleanup on unmount
        return function() {
            // If embedded checkout is fully initialized, destroy it.
            if (ctx.embeddedCheckout) {
                embeddedCheckoutPromise.current = null;
                ctx.embeddedCheckout.destroy();
            } else if (embeddedCheckoutPromise.current) {
                // If embedded checkout is still initializing, destroy it once
                // it's done. This could be caused by unmounting very quickly
                // after mounting.
                embeddedCheckoutPromise.current.then(function() {
                    embeddedCheckoutPromise.current = null;
                    if (ctx.embeddedCheckout) {
                        ctx.embeddedCheckout.destroy();
                    }
                });
            }
        };
    }, [
        ctx.embeddedCheckout
    ]); // Attach react-stripe-js version to stripe.js instance
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(function() {
        registerWithStripeJs(loadedStripe);
    }, [
        loadedStripe
    ]); // Warn on changes to stripe prop.
    // The stripe prop value can only go from null to non-null once and
    // can't be changed after that.
    var prevStripe = usePrevious(rawStripeProp);
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(function() {
        if (prevStripe !== null && prevStripe !== rawStripeProp) {
            console.warn('Unsupported prop change on EmbeddedCheckoutProvider: You cannot change the `stripe` prop after setting it.');
        }
    }, [
        prevStripe,
        rawStripeProp
    ]); // Warn on changes to options.
    var prevOptions = usePrevious(options);
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(function() {
        if (prevOptions == null) {
            return;
        }
        if (options == null) {
            console.warn('Unsupported prop change on EmbeddedCheckoutProvider: You cannot unset options after setting them.');
            return;
        }
        if (options.clientSecret === undefined && options.fetchClientSecret === undefined) {
            console.warn('Invalid props passed to EmbeddedCheckoutProvider: You must provide one of either `options.fetchClientSecret` or `options.clientSecret`.');
        }
        if (prevOptions.clientSecret != null && options.clientSecret !== prevOptions.clientSecret) {
            console.warn('Unsupported prop change on EmbeddedCheckoutProvider: You cannot change the client secret after setting it. Unmount and create a new instance of EmbeddedCheckoutProvider instead.');
        }
        if (prevOptions.fetchClientSecret != null && options.fetchClientSecret !== prevOptions.fetchClientSecret) {
            console.warn('Unsupported prop change on EmbeddedCheckoutProvider: You cannot change fetchClientSecret after setting it. Unmount and create a new instance of EmbeddedCheckoutProvider instead.');
        }
        if (prevOptions.onComplete != null && options.onComplete !== prevOptions.onComplete) {
            console.warn('Unsupported prop change on EmbeddedCheckoutProvider: You cannot change the onComplete option after setting it.');
        }
        if (prevOptions.onShippingDetailsChange != null && options.onShippingDetailsChange !== prevOptions.onShippingDetailsChange) {
            console.warn('Unsupported prop change on EmbeddedCheckoutProvider: You cannot change the onShippingDetailsChange option after setting it.');
        }
        if (prevOptions.onLineItemsChange != null && options.onLineItemsChange !== prevOptions.onLineItemsChange) {
            console.warn('Unsupported prop change on EmbeddedCheckoutProvider: You cannot change the onLineItemsChange option after setting it.');
        }
    }, [
        prevOptions,
        options
    ]);
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(EmbeddedCheckoutContext.Provider, {
        value: ctx
    }, children);
};
var EmbeddedCheckoutClientElement = function EmbeddedCheckoutClientElement(_ref) {
    var id = _ref.id, className = _ref.className;
    var _useEmbeddedCheckoutC = useEmbeddedCheckoutContext(), embeddedCheckout = _useEmbeddedCheckoutC.embeddedCheckout;
    var isMounted = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef(false);
    var domNode = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef(null);
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useLayoutEffect(function() {
        if (!isMounted.current && embeddedCheckout && domNode.current !== null) {
            embeddedCheckout.mount(domNode.current);
            isMounted.current = true;
        } // Clean up on unmount
        return function() {
            if (isMounted.current && embeddedCheckout) {
                try {
                    embeddedCheckout.unmount();
                    isMounted.current = false;
                } catch (e) {
                // Parent effects are destroyed before child effects, so
                // in cases where both the EmbeddedCheckoutProvider and
                // the EmbeddedCheckout component are removed at the same
                // time, the embeddedCheckout instance will be destroyed,
                // which causes an error when calling unmount.
                }
            }
        };
    }, [
        embeddedCheckout
    ]);
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("div", {
        ref: domNode,
        id: id,
        className: className
    });
}; // Only render the wrapper in a server environment.
var EmbeddedCheckoutServerElement = function EmbeddedCheckoutServerElement(_ref2) {
    var id = _ref2.id, className = _ref2.className;
    // Validate that we are in the right context by calling useEmbeddedCheckoutContext.
    useEmbeddedCheckoutContext();
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("div", {
        id: id,
        className: className
    });
};
var EmbeddedCheckout = ("TURBOPACK compile-time truthy", 1) ? EmbeddedCheckoutServerElement : "TURBOPACK unreachable";
/**
 * @docs https://stripe.com/docs/stripe-js/react#usestripe-hook
 */ var useStripe = function useStripe() {
    var _useElementsOrCheckou = useElementsOrCheckoutContextWithUseCase('calls useStripe()'), stripe = _useElementsOrCheckou.stripe;
    return stripe;
};
/**
 * Requires beta access:
 * Contact [Stripe support](https://support.stripe.com/) for more information.
 *
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */ var AuBankAccountElement = createElementComponent('auBankAccount', isServer);
/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */ var CardElement = createElementComponent('card', isServer);
/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */ var CardNumberElement = createElementComponent('cardNumber', isServer);
/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */ var CardExpiryElement = createElementComponent('cardExpiry', isServer);
/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */ var CardCvcElement = createElementComponent('cardCvc', isServer);
/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */ var FpxBankElement = createElementComponent('fpxBank', isServer);
/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */ var IbanElement = createElementComponent('iban', isServer);
/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */ var IdealBankElement = createElementComponent('idealBank', isServer);
/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */ var P24BankElement = createElementComponent('p24Bank', isServer);
/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */ var EpsBankElement = createElementComponent('epsBank', isServer);
var PaymentElement = createElementComponent('payment', isServer);
/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */ var ExpressCheckoutElement = createElementComponent('expressCheckout', isServer);
/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */ var PaymentRequestButtonElement = createElementComponent('paymentRequestButton', isServer);
/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */ var LinkAuthenticationElement = createElementComponent('linkAuthentication', isServer);
/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */ var AddressElement = createElementComponent('address', isServer);
/**
 * @deprecated
 * Use `AddressElement` instead.
 *
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */ var ShippingAddressElement = createElementComponent('shippingAddress', isServer);
/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */ var PaymentMethodMessagingElement = createElementComponent('paymentMethodMessaging', isServer);
/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */ var AffirmMessageElement = createElementComponent('affirmMessage', isServer);
/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */ var AfterpayClearpayMessageElement = createElementComponent('afterpayClearpayMessage', isServer);
/**
 * Requires beta access:
 * Contact [Stripe support](https://support.stripe.com/) for more information.
 */ var TaxIdElement = createElementComponent('taxId', isServer);
;
}),
];

//# sourceMappingURL=5be21_%40stripe_3b585ab6._.js.map