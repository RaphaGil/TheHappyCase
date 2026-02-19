module.exports = [
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/InventoryAlertModal/index.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
const InventoryAlertModal = ({ show, onClose, message, type = 'warning' })=>{
    // Prevent body scroll when modal is open
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (show) {
            const originalStyle = window.getComputedStyle(document.body).overflow;
            document.body.style.overflow = 'hidden';
            return ()=>{
                document.body.style.overflow = originalStyle;
            };
        }
    }, [
        show
    ]);
    if (!show) return null;
    const isError = type === 'error' || message?.toLowerCase().includes('out of stock');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4",
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-sm max-w-md w-full p-6 border border-gray-200 shadow-lg",
            onClick: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `w-12 h-12 rounded-full flex items-center justify-center mb-3 ${isError ? 'bg-red-100' : 'bg-orange-100'}`,
                            children: isError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-6 h-6 text-red-600",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/InventoryAlertModal/index.jsx",
                                    lineNumber: 36,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/InventoryAlertModal/index.jsx",
                                lineNumber: 35,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-6 h-6 text-orange-600",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/InventoryAlertModal/index.jsx",
                                    lineNumber: 40,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/InventoryAlertModal/index.jsx",
                                lineNumber: 39,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/InventoryAlertModal/index.jsx",
                            lineNumber: 31,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: `text-lg font-medium mb-2 font-inter ${isError ? 'text-red-900' : 'text-orange-900'}`,
                            children: isError ? 'Out of Stock' : 'Limited Inventory'
                        }, void 0, false, {
                            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/InventoryAlertModal/index.jsx",
                            lineNumber: 44,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `w-12 h-px ${isError ? 'bg-red-300' : 'bg-orange-300'}`
                        }, void 0, false, {
                            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/InventoryAlertModal/index.jsx",
                            lineNumber: 49,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/InventoryAlertModal/index.jsx",
                    lineNumber: 30,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: `text-sm font-inter ${isError ? 'text-red-800' : 'text-gray-700'}`,
                        children: message
                    }, void 0, false, {
                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/InventoryAlertModal/index.jsx",
                        lineNumber: 54,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/InventoryAlertModal/index.jsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-end",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onClose,
                        className: `px-6 py-2 text-sm uppercase tracking-wider font-inter transition-all duration-200 ${isError ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-gray-900 hover:bg-gray-800 text-white'}`,
                        children: "OK"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/InventoryAlertModal/index.jsx",
                        lineNumber: 63,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/InventoryAlertModal/index.jsx",
                    lineNumber: 62,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/InventoryAlertModal/index.jsx",
            lineNumber: 25,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/InventoryAlertModal/index.jsx",
        lineNumber: 21,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = InventoryAlertModal;
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/data/filterHelpers.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Helper functions for filtering pins
__turbopack_context__.s([
    "filterPinsByCategory",
    ()=>filterPinsByCategory
]);
const filterPinsByCategory = (pins, selectedCategory, subCategory)=>{
    if (subCategory === 'all') return pins;
    if (selectedCategory === 'flags') {
        return pins.filter((pin)=>pin.continent === subCategory);
    }
    return pins.filter((pin)=>{
        const n = pin.name.toLowerCase();
        if (selectedCategory === 'colorful') {
            if (subCategory === 'travel') {
                return n.includes('airplane') || n.includes('passport') || n.includes('suitcase') || n.includes('map') || n.includes('boarding') || n.includes('adventure') || n.includes('vacation') || n.includes('combi');
            }
            if (subCategory === 'disney') {
                return n.includes('disney') || n.includes('pluto') || n.includes('minnie') || n.includes('round') || n.includes('mickey') || n.includes('daisy') || n.includes('duck') || n.includes('guufy');
            }
            if (subCategory === 'drinks') {
                return n.includes('beer') || n.includes('wine') || n.includes('coffee');
            }
            if (subCategory === 'inspiration') {
                return n.includes('be a good human') || n.includes('dream big') || n.includes('be kind') || n.includes('ticket to happiness') || n.includes('be happy');
            }
            if (subCategory === 'hearts') {
                return n.includes('heart');
            }
            if (subCategory === 'nature') {
                return n.includes('leaf') || n.includes('coconut') || n.includes('wave');
            }
            if (subCategory === 'camera') {
                return n.includes('camera');
            }
        }
        if (selectedCategory === 'bronze') {
            if (subCategory === 'travel') {
                return n.includes('airplane') || n.includes('globe') || n.includes('passport') || n.includes('luggage') || n.includes('taxi') || n.includes('liberty') || n.includes('london') || n.includes('eiffel') || n.includes('bigben') || n.includes('pisa') || n.includes('pyramid') || n.includes('arc') || n.includes('triomphe') || n.includes('binoculars');
            }
            if (subCategory === 'animals') {
                return n.includes('kangaroo') || n.includes('koala') || n.includes('llama') || n.includes('squirrel') || n.includes('paw') || n.includes('dog');
            }
            if (subCategory === 'love') {
                return n.includes('heart') || n.includes('love');
            }
            if (subCategory === 'nature') {
                return n.includes('leaf') || n.includes('butterfly') || n.includes('maple') || n.includes('flipflop');
            }
            if (subCategory === 'symbols') {
                return n.includes('cardinal') || n.includes('hamsa') || n.includes('mummy') || n.includes('journey') || n.includes('jesus') || n.includes('camera') || n.includes('thailand') || n.includes('india') || n.includes('canada');
            }
        }
        // If no match found, return false (don't show the pin)
        return false;
    });
};
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Charms/CharmTypeTabs.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
const CharmTypeTabs = ({ charmTypes, selectedType, onTypeChange })=>{
    // Map full labels to short labels for mobile
    const getShortLabel = (value)=>{
        const shortLabels = {
            'colorful': 'colorful',
            'bronze': 'bronze',
            'flags': 'flags'
        };
        return shortLabels[value] || value;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex justify-center mb-6  px-6 md:mx-0 md:px-0",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex gap-2 border-b border-gray-200 flex-nowrap justify-center",
            children: charmTypes.map(({ value, label })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>onTypeChange(value),
                    className: `px-6 py-3 text-xs uppercase tracking-wider transition-all duration-200 font-inter ${selectedType === value ? 'border-b-2 border-blue-700 text-white bg-blue-600 font-medium' : 'border-b-2 border-transparent text-white hover:text-white hover:border-blue-300 hover:bg-blue-500 bg-blue-400'}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "md:hidden",
                            children: getShortLabel(value)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Charms/CharmTypeTabs.jsx",
                            lineNumber: 27,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "hidden md:inline",
                            children: label
                        }, void 0, false, {
                            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Charms/CharmTypeTabs.jsx",
                            lineNumber: 28,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, value, true, {
                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Charms/CharmTypeTabs.jsx",
                    lineNumber: 18,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)))
        }, void 0, false, {
            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Charms/CharmTypeTabs.jsx",
            lineNumber: 16,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Charms/CharmTypeTabs.jsx",
        lineNumber: 15,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = CharmTypeTabs;
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Charms/SubCategoryTabs.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
const SubCategoryTabs = ({ categories, selectedCategory, onCategoryChange })=>{
    if (!categories || categories.length === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex justify-center mb-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex gap-1 border-b border-gray-200 flex-wrap justify-center",
            children: categories.map(({ key, label })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>onCategoryChange(key),
                    className: `px-4 py-2 text-[10px] uppercase tracking-wider transition-all duration-200 font-inter ${selectedCategory === key ? 'border-b-2 border-blue-700 text-gray-900 font-medium' : 'border-b-2 border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'}`,
                    children: label
                }, key, false, {
                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Charms/SubCategoryTabs.jsx",
                    lineNumber: 10,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)))
        }, void 0, false, {
            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Charms/SubCategoryTabs.jsx",
            lineNumber: 8,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Charms/SubCategoryTabs.jsx",
        lineNumber: 7,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = SubCategoryTabs;
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Charms/SearchBar.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
const SearchBar = ({ searchTerm, setSearchTerm, placeholder = "Search charms..." })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative flex-1 max-w-md w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "text",
                placeholder: placeholder,
                value: searchTerm,
                onChange: (e)=>setSearchTerm(e.target.value),
                className: "w-full px-4 py-3 pl-10 border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 bg-white text-gray-900 placeholder-gray-400 font-inter text-sm"
            }, void 0, false, {
                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Charms/SearchBar.jsx",
                lineNumber: 6,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 1.5,
                    d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                }, void 0, false, {
                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Charms/SearchBar.jsx",
                    lineNumber: 14,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Charms/SearchBar.jsx",
                lineNumber: 13,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Charms/SearchBar.jsx",
        lineNumber: 5,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = SearchBar;
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Charms/ResultsCount.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
const ResultsCount = ({ count, currentPage, totalPages })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center text-sm text-gray-500 font-inter whitespace-nowrap",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            children: [
                count,
                " ",
                count === 1 ? 'item' : 'items',
                totalPages > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "ml-2",
                    children: [
                        "(Page ",
                        currentPage,
                        " of ",
                        totalPages,
                        ")"
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Charms/ResultsCount.jsx",
                    lineNumber: 9,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Charms/ResultsCount.jsx",
            lineNumber: 6,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Charms/ResultsCount.jsx",
        lineNumber: 5,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = ResultsCount;
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Charms/CharmGridItem.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$context$2f$CurrencyContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/context/CurrencyContext.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$utils$2f$imagePath$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/utils/imagePath.js [app-ssr] (ecmascript)");
;
;
;
;
const CharmGridItem = ({ charm, index, onAddToCart, isSelected, onSelect, isSoldOut = false, charmPrice })=>{
    const { formatPrice } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$context$2f$CurrencyContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCurrency"])();
    const pastelColors = [
        'bg-pink-50',
        'bg-blue-50',
        'bg-purple-50',
        'bg-green-50',
        'bg-yellow-50',
        'bg-orange-50'
    ];
    const pastelBorders = [
        'border-pink-100',
        'border-blue-100',
        'border-purple-100',
        'border-green-100',
        'border-yellow-100',
        'border-orange-100'
    ];
    const colorIndex = index % pastelColors.length;
    // Optimize loading for above-the-fold images (first 6 visible items)
    // These should load with high priority to improve LCP (Largest Contentful Paint)
    const isAboveTheFold = index < 6;
    const loadingStrategy = isAboveTheFold ? 'eager' : 'lazy';
    const fetchPriority = isAboveTheFold ? 'high' : 'low';
    // Calculate scale to prevent layout shift
    const scale = charm.size !== undefined ? charm.size * 0.9 : 0.9;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col group",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `aspect-square mb-3 ${pastelColors[colorIndex]} flex items-center justify-center overflow-hidden md:border ${pastelBorders[colorIndex]} relative`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$utils$2f$imagePath$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizeImagePath"])(charm.src),
                        alt: charm.name,
                        className: `w-full h-full object-contain p-4 transition-opacity duration-200 group-hover:opacity-80 ${isSoldOut ? 'opacity-50' : ''}`,
                        loading: loadingStrategy,
                        fetchPriority: fetchPriority,
                        decoding: "async",
                        width: "200",
                        height: "200",
                        style: {
                            transform: `scale(${scale})`,
                            willChange: isAboveTheFold ? 'transform' : 'auto'
                        },
                        onError: (e)=>{
                            if (e.target) {
                                e.target.style.display = 'none';
                            }
                            if (e.target?.nextSibling) {
                                e.target.nextSibling.style.display = 'flex';
                            }
                        },
                        onLoad: (e)=>{
                            // Force Safari to display the image
                            if (e.target) {
                                e.target.style.visibility = 'visible';
                            }
                        }
                    }, void 0, false, {
                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Charms/CharmGridItem.jsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden w-full h-full items-center justify-center text-gray-400",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-4xl",
                            children: "🎁"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Charms/CharmGridItem.jsx",
                            lineNumber: 54,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Charms/CharmGridItem.jsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    isSoldOut && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-20",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-white text-xl font-medium uppercase tracking-wider font-inter",
                            children: "Sold Out"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Charms/CharmGridItem.jsx",
                            lineNumber: 59,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Charms/CharmGridItem.jsx",
                        lineNumber: 58,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    isSelected && !isSoldOut && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute -top-2 -right-2 bg-gray-900 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium",
                        children: "✓"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Charms/CharmGridItem.jsx",
                        lineNumber: 65,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    onAddToCart && !isSoldOut && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: (e)=>{
                            e.stopPropagation();
                            onAddToCart(charm);
                        },
                        className: "absolute bottom-2 right-2 md:bottom-0 md:left-0 md:right-0 md:top-auto py-2 px-2 md:py-2 md:px-0 text-gray-900 md:border-t md:border-gray-200 bg-white md:bg-white rounded-full md:rounded-none shadow-md md:shadow-none transition-all duration-200 text-xs uppercase tracking-wider flex items-center justify-center opacity-100 translate-y-0 md:opacity-0 md:translate-y-full md:group-hover:opacity-100 md:group-hover:translate-y-0 hover:bg-gray-50 z-10 font-inter",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-5 h-5 md:hidden",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 1.5,
                                    d: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Charms/CharmGridItem.jsx",
                                    lineNumber: 80,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Charms/CharmGridItem.jsx",
                                lineNumber: 79,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "hidden md:inline",
                                children: "Add to Cart"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Charms/CharmGridItem.jsx",
                                lineNumber: 83,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Charms/CharmGridItem.jsx",
                        lineNumber: 71,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Charms/CharmGridItem.jsx",
                lineNumber: 24,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: `text-sm text-center mb-1 font-light font-inter ${isSoldOut ? 'text-gray-500' : 'text-gray-700'}`,
                children: charm.name
            }, void 0, false, {
                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Charms/CharmGridItem.jsx",
                lineNumber: 87,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: `text-sm font-medium font-inter ${isSoldOut ? 'text-gray-500' : 'text-gray-900'}`,
                    children: formatPrice(charmPrice)
                }, void 0, false, {
                    fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Charms/CharmGridItem.jsx",
                    lineNumber: 91,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Charms/CharmGridItem.jsx",
                lineNumber: 90,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Charms/CharmGridItem.jsx",
        lineNumber: 21,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = CharmGridItem;
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Charms/CharmGridItemWithInventory.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$utils$2f$inventory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/utils/inventory.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$component$2f$Charms$2f$CharmGridItem$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Charms/CharmGridItem.jsx [app-ssr] (ecmascript)");
;
;
;
;
const CharmGridItemWithInventory = ({ charm, index, onAddToCart, charmType, cart, charmPrice })=>{
    // Create a product object for inventory checking
    const product = {
        name: charm.name,
        price: charmPrice,
        totalPrice: charmPrice,
        image: charm.src,
        pin: charm,
        category: charmType,
        type: 'charm'
    };
    // Check inventory availability
    const maxAvailable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$utils$2f$inventory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getMaxAvailableQuantity"])(product, cart);
    const isSoldOut = maxAvailable !== null && maxAvailable === 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$component$2f$Charms$2f$CharmGridItem$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        charm: charm,
        index: index,
        onAddToCart: onAddToCart,
        isSoldOut: isSoldOut,
        charmPrice: charmPrice
    }, void 0, false, {
        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Charms/CharmGridItemWithInventory.jsx",
        lineNumber: 22,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = CharmGridItemWithInventory;
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Charms/SimplePagination.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
const SimplePagination = ({ currentPage, totalPages, onPageChange })=>{
    if (totalPages <= 1) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex justify-center items-center gap-1 mb-12",
        children: Array.from({
            length: totalPages
        }, (_, i)=>i + 1).map((page)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>onPageChange(page),
                className: `px-3 py-1 text-xs transition-all duration-200 font-inter ${currentPage === page ? 'border-b-2 border-gray-900 text-gray-900 font-medium' : 'border-b-2 border-transparent text-gray-400 hover:text-gray-700 hover:border-gray-300'}`,
                "aria-label": `Go to page ${page}`,
                children: page
            }, page, false, {
                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Charms/SimplePagination.jsx",
                lineNumber: 9,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)))
    }, void 0, false, {
        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Charms/SimplePagination.jsx",
        lineNumber: 7,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = SimplePagination;
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Charms/EmptyState.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
const EmptyState = ({ message = "No items found", onClearFilters })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "py-16 text-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-gray-400 mb-4 font-inter",
                children: message
            }, void 0, false, {
                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Charms/EmptyState.jsx",
                lineNumber: 6,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            onClearFilters && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onClearFilters,
                className: "text-xs uppercase tracking-wider text-gray-500 hover:text-gray-900 border-b border-transparent hover:border-gray-300 transition-all duration-200 font-inter",
                children: "Clear Filters"
            }, void 0, false, {
                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Charms/EmptyState.jsx",
                lineNumber: 10,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Charms/EmptyState.jsx",
        lineNumber: 5,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = EmptyState;
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/utils/charms/helpers.js [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCharmCategory",
    ()=>getCharmCategory,
    "getCharmName",
    ()=>getCharmName,
    "getCharmPrice",
    ()=>getCharmPrice
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$utils$2f$shared$2f$products$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/utils/shared/products.js [app-ssr] (ecmascript) <locals>");
;
;
const getCharmPrice = (charm, charmType)=>{
    // If charm has a price property, use it
    if (charm.price !== undefined && charm.price !== null) {
        return charm.price;
    }
    // Otherwise, use default prices based on type
    if (charmType === 'bronze') {
        return 1.50;
    } else if (charmType === 'colorful' || charmType === 'flags') {
        return 2.00;
    }
    // Default fallback
    return 2.00;
};
const getCharmCategory = (charmType)=>{
    return charmType || 'colorful';
};
const getCharmName = (name)=>{
    if (!name) return 'Charm';
    // Remove common suffixes if needed
    let formattedName = name;
    formattedName = formattedName.replace(/\s*-\s*(Flag|Colorful Charm|Bronze Charm)$/i, '');
    formattedName = formattedName.replace(/\s+Flag$/i, '');
    return formattedName.trim();
};
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/utils/charms/constants.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Charm type options
__turbopack_context__.s([
    "BRONZE_CATEGORIES",
    ()=>BRONZE_CATEGORIES,
    "CHARM_TYPES",
    ()=>CHARM_TYPES,
    "COLORFUL_CATEGORIES",
    ()=>COLORFUL_CATEGORIES,
    "FILTER_TO_TYPE",
    ()=>FILTER_TO_TYPE,
    "FLAGS_CATEGORIES",
    ()=>FLAGS_CATEGORIES,
    "ITEMS_PER_PAGE",
    ()=>ITEMS_PER_PAGE
]);
const CHARM_TYPES = [
    {
        value: 'colorful',
        label: 'Colorful Charms'
    },
    {
        value: 'bronze',
        label: 'Bronze Charms'
    },
    {
        value: 'flags',
        label: 'Flags Collection'
    }
];
const FLAGS_CATEGORIES = [
    {
        key: 'all',
        label: 'ALL'
    },
    {
        key: 'europe',
        label: 'EUROPE'
    },
    {
        key: 'americas',
        label: 'AMERICAS'
    },
    {
        key: 'africa',
        label: 'AFRICA'
    },
    {
        key: 'asia',
        label: 'ASIA'
    },
    {
        key: 'special',
        label: 'SPECIAL'
    }
];
const BRONZE_CATEGORIES = [
    {
        key: 'all',
        label: 'ALL'
    },
    {
        key: 'travel',
        label: 'TRAVEL'
    },
    {
        key: 'animals',
        label: 'ANIMALS'
    },
    {
        key: 'love',
        label: 'LOVE'
    },
    {
        key: 'nature',
        label: 'NATURE'
    },
    {
        key: 'symbols',
        label: 'SYMBOLS'
    }
];
const COLORFUL_CATEGORIES = [
    {
        key: 'all',
        label: 'ALL'
    },
    {
        key: 'travel',
        label: 'TRAVEL'
    },
    {
        key: 'disney',
        label: 'DISNEY'
    },
    {
        key: 'drinks',
        label: 'DRINKS'
    },
    {
        key: 'inspiration',
        label: 'INSPIRATION'
    },
    {
        key: 'hearts',
        label: 'HEARTS'
    },
    {
        key: 'nature',
        label: 'NATURE'
    },
    {
        key: 'camera',
        label: 'CAMERA'
    }
];
const FILTER_TO_TYPE = {
    'colorful': 'colorful',
    'bronze': 'bronze',
    'flags': 'flags',
    'flag': 'flags'
};
const ITEMS_PER_PAGE = 20;
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/page-components/Charms/index.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$context$2f$CartContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/context/CartContext.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$component$2f$InventoryAlertModal$2f$index$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/InventoryAlertModal/index.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$utils$2f$inventory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/utils/inventory.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$data$2f$filterHelpers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/data/filterHelpers.js [app-ssr] (ecmascript)");
// Components
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$component$2f$Charms$2f$CharmTypeTabs$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Charms/CharmTypeTabs.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$component$2f$Charms$2f$SubCategoryTabs$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Charms/SubCategoryTabs.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$component$2f$Charms$2f$SearchBar$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Charms/SearchBar.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$component$2f$Charms$2f$ResultsCount$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Charms/ResultsCount.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$component$2f$Charms$2f$CharmGridItemWithInventory$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Charms/CharmGridItemWithInventory.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$component$2f$Charms$2f$SimplePagination$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Charms/SimplePagination.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$component$2f$Charms$2f$EmptyState$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/component/Charms/EmptyState.jsx [app-ssr] (ecmascript)");
// Utils
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$utils$2f$charms$2f$helpers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/utils/charms/helpers.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$utils$2f$shared$2f$products$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/utils/shared/products.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$utils$2f$charms$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/utils/charms/constants.js [app-ssr] (ecmascript)");
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
// Map URL path parameter to internal charm type
const PATH_TO_TYPE = {
    'Bronze': 'bronze',
    'Colorful': 'colorful',
    'flags': 'flags',
    'Flags': 'flags'
};
// Map internal charm type to URL path parameter
const TYPE_TO_PATH = {
    'bronze': 'Bronze',
    'colorful': 'Colorful',
    'flags': 'flags'
};
const Charms = ()=>{
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useParams"])();
    const pathType = params?.type;
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { addToCart, cart } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$context$2f$CartContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCart"])();
    // Convert URL path parameter to internal charm type
    const initialCharmType = pathType && PATH_TO_TYPE[pathType] ? PATH_TO_TYPE[pathType] : 'colorful';
    const [selectedCharmType, setSelectedCharmType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialCharmType);
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [selectedContinent, setSelectedContinent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('all');
    const [selectedBronzeCategory, setSelectedBronzeCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('all');
    const [selectedColorfulCategory, setSelectedColorfulCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('all');
    const [bronzeCurrentPage, setBronzeCurrentPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [colorfulCurrentPage, setColorfulCurrentPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [flagsCurrentPage, setFlagsCurrentPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [showInventoryModal, setShowInventoryModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [inventoryMessage, setInventoryMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [inventoryType, setInventoryType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('error');
    // Get all charms for selected type
    const getAllCharms = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const productsWithQuantities = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$utils$2f$shared$2f$products$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getProductsWithQuantities"])();
        if (selectedCharmType === 'colorful') {
            return productsWithQuantities.pins.colorful || [];
        } else if (selectedCharmType === 'bronze') {
            return productsWithQuantities.pins.bronze || [];
        } else if (selectedCharmType === 'flags') {
            return productsWithQuantities.pins.flags || [];
        }
        return [];
    }, [
        selectedCharmType
    ]);
    // Filter charms based on search and category
    const filteredCharms = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        let charms = getAllCharms();
        // Apply search filter
        if (searchTerm) {
            charms = charms.filter((charm)=>charm.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        // Apply category filter using filterHelpers
        const selectedCategory = selectedCharmType === 'flags' ? selectedContinent : selectedCharmType === 'bronze' ? selectedBronzeCategory : selectedColorfulCategory;
        if (selectedCategory !== 'all') {
            charms = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$data$2f$filterHelpers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["filterPinsByCategory"])(charms, selectedCharmType, selectedCategory);
        }
        return charms;
    }, [
        getAllCharms,
        searchTerm,
        selectedCharmType,
        selectedContinent,
        selectedBronzeCategory,
        selectedColorfulCategory
    ]);
    // Pagination state management
    const getCurrentPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (selectedCharmType === 'bronze') return bronzeCurrentPage;
        if (selectedCharmType === 'colorful') return colorfulCurrentPage;
        if (selectedCharmType === 'flags') return flagsCurrentPage;
        return 1;
    }, [
        selectedCharmType,
        bronzeCurrentPage,
        colorfulCurrentPage,
        flagsCurrentPage
    ]);
    const setCurrentPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((page)=>{
        if (selectedCharmType === 'bronze') setBronzeCurrentPage(page);
        if (selectedCharmType === 'colorful') setColorfulCurrentPage(page);
        if (selectedCharmType === 'flags') setFlagsCurrentPage(page);
    }, [
        selectedCharmType
    ]);
    const currentPage = getCurrentPage();
    const totalPages = Math.ceil(filteredCharms.length / __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$utils$2f$charms$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ITEMS_PER_PAGE"]);
    // Get paginated charms
    const displayedCharms = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const startIndex = (currentPage - 1) * __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$utils$2f$charms$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ITEMS_PER_PAGE"];
        const endIndex = startIndex + __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$utils$2f$charms$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ITEMS_PER_PAGE"];
        return filteredCharms.slice(startIndex, endIndex);
    }, [
        filteredCharms,
        currentPage
    ]);
    // Update charm type when URL path parameter changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (pathType && PATH_TO_TYPE[pathType]) {
            const newType = PATH_TO_TYPE[pathType];
            setSelectedCharmType(newType);
        } else if (!pathType) {
            // If no path type, default to colorful
            setSelectedCharmType('colorful');
        }
    }, [
        pathType
    ]);
    const handleCharmTypeChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((type)=>{
        setSelectedCharmType(type);
        setSelectedContinent('all');
        setSelectedBronzeCategory('all');
        setSelectedColorfulCategory('all');
        setBronzeCurrentPage(1);
        setColorfulCurrentPage(1);
        setFlagsCurrentPage(1);
        // Navigate to the new path based on the charm type
        const pathType = TYPE_TO_PATH[type] || 'Colorful';
        router.replace(`/Charms/${pathType}`);
    }, [
        router
    ]);
    const handleAddToCart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((charm)=>{
        const product = {
            id: `charm-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$utils$2f$charms$2f$helpers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getCharmName"])(charm.name),
            price: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$utils$2f$charms$2f$helpers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getCharmPrice"])(charm, selectedCharmType),
            totalPrice: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$utils$2f$charms$2f$helpers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getCharmPrice"])(charm, selectedCharmType),
            image: charm.src,
            pin: charm,
            category: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$utils$2f$charms$2f$helpers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getCharmCategory"])(selectedCharmType),
            type: 'charm'
        };
        // Check stock availability before adding to cart
        const maxAvailable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$utils$2f$inventory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getMaxAvailableQuantity"])(product, cart);
        if (maxAvailable !== null && maxAvailable === 0) {
            const charmDisplayName = charm.name || 'this charm';
            const errorMessage = `Oops! We don't have any more ${charmDisplayName} in stock right now, so you can't add more to your basket.`;
            setInventoryMessage(errorMessage);
            setInventoryType('error');
            setShowInventoryModal(true);
            return;
        }
        console.log('📌 Charms page - Adding charm to cart:', {
            charmName: charm.name,
            charmSrc: charm.src,
            category: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$utils$2f$charms$2f$helpers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getCharmCategory"])(selectedCharmType),
            product: product
        });
        addToCart(product);
    }, [
        selectedCharmType,
        cart,
        addToCart
    ]);
    // Get category tabs based on selected charm type
    const getCategoryTabs = ()=>{
        if (selectedCharmType === 'flags') return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$utils$2f$charms$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FLAGS_CATEGORIES"];
        if (selectedCharmType === 'bronze') return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$utils$2f$charms$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BRONZE_CATEGORIES"];
        if (selectedCharmType === 'colorful') return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$utils$2f$charms$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORFUL_CATEGORIES"];
        return [];
    };
    const getSelectedCategory = ()=>{
        if (selectedCharmType === 'flags') return selectedContinent;
        if (selectedCharmType === 'bronze') return selectedBronzeCategory;
        if (selectedCharmType === 'colorful') return selectedColorfulCategory;
        return 'all';
    };
    const handleCategoryChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((category)=>{
        if (selectedCharmType === 'flags') {
            setSelectedContinent(category);
            setFlagsCurrentPage(1);
        } else if (selectedCharmType === 'bronze') {
            setSelectedBronzeCategory(category);
            setBronzeCurrentPage(1);
        } else if (selectedCharmType === 'colorful') {
            setSelectedColorfulCategory(category);
            setColorfulCurrentPage(1);
        }
    }, [
        selectedCharmType
    ]);
    const handleClearFilters = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setSearchTerm('');
        if (selectedCharmType === 'flags') {
            setSelectedContinent('all');
            setFlagsCurrentPage(1);
        } else if (selectedCharmType === 'bronze') {
            setSelectedBronzeCategory('all');
            setBronzeCurrentPage(1);
        } else if (selectedCharmType === 'colorful') {
            setSelectedColorfulCategory('all');
            setColorfulCurrentPage(1);
        }
    }, [
        selectedCharmType
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center mb-8 sm:mb-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-title text-gray-900 tracking-title mb-1 md:mb-2",
                                children: "CHARMS"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/page-components/Charms/index.jsx",
                                lineNumber: 235,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-16 sm:w-20 md:w-24 h-px bg-gray-200 mx-auto mb-3 sm:mb-4"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/page-components/Charms/index.jsx",
                                lineNumber: 238,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-500 max-w-2xl mx-auto font-light px-4 font-inter",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/CreateYours",
                                        className: "text-gray-900 hover:text-gray-700 underline transition-colors",
                                        children: "Create"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/page-components/Charms/index.jsx",
                                        lineNumber: 240,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    " your custom case with charms pre-glued, or buy the case and charms separately and enjoy gluing them yourself."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/page-components/Charms/index.jsx",
                                lineNumber: 239,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/page-components/Charms/index.jsx",
                        lineNumber: 234,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$component$2f$Charms$2f$CharmTypeTabs$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                charmTypes: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$utils$2f$charms$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CHARM_TYPES"],
                                selectedType: selectedCharmType,
                                onTypeChange: handleCharmTypeChange
                            }, void 0, false, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/page-components/Charms/index.jsx",
                                lineNumber: 246,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$component$2f$Charms$2f$SubCategoryTabs$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                categories: getCategoryTabs(),
                                selectedCategory: getSelectedCategory(),
                                onCategoryChange: handleCategoryChange
                            }, void 0, false, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/page-components/Charms/index.jsx",
                                lineNumber: 252,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/page-components/Charms/index.jsx",
                        lineNumber: 245,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-8 flex items-center justify-between gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$component$2f$Charms$2f$SearchBar$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                searchTerm: searchTerm,
                                setSearchTerm: setSearchTerm,
                                placeholder: "Search charms..."
                            }, void 0, false, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/page-components/Charms/index.jsx",
                                lineNumber: 261,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$component$2f$Charms$2f$ResultsCount$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                count: filteredCharms.length,
                                currentPage: currentPage,
                                totalPages: totalPages
                            }, void 0, false, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/page-components/Charms/index.jsx",
                                lineNumber: 267,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/page-components/Charms/index.jsx",
                        lineNumber: 260,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    filteredCharms.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 mb-12 min-h-[400px] sm:min-h-[600px]",
                                children: displayedCharms.map((charm, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$component$2f$Charms$2f$CharmGridItemWithInventory$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        charm: charm,
                                        index: index,
                                        onAddToCart: handleAddToCart,
                                        charmType: selectedCharmType,
                                        cart: cart,
                                        charmPrice: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$utils$2f$charms$2f$helpers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getCharmPrice"])(charm, selectedCharmType)
                                    }, index, false, {
                                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/page-components/Charms/index.jsx",
                                        lineNumber: 279,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/page-components/Charms/index.jsx",
                                lineNumber: 277,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$component$2f$Charms$2f$SimplePagination$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                currentPage: currentPage,
                                totalPages: totalPages,
                                onPageChange: setCurrentPage
                            }, void 0, false, {
                                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/page-components/Charms/index.jsx",
                                lineNumber: 291,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$component$2f$Charms$2f$EmptyState$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        message: "No charms found",
                        onClearFilters: handleClearFilters
                    }, void 0, false, {
                        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/page-components/Charms/index.jsx",
                        lineNumber: 298,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/page-components/Charms/index.jsx",
                lineNumber: 232,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$src$2f$component$2f$InventoryAlertModal$2f$index$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                show: showInventoryModal,
                onClose: ()=>{
                    setShowInventoryModal(false);
                    setInventoryMessage('');
                },
                message: inventoryMessage,
                type: inventoryType
            }, void 0, false, {
                fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/page-components/Charms/index.jsx",
                lineNumber: 306,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/HappyCase/TheHappy/TheHappyCase/src/page-components/Charms/index.jsx",
        lineNumber: 231,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = Charms;
}),
];

//# sourceMappingURL=Desktop_HappyCase_TheHappy_TheHappyCase_src_85f9cbd0._.js.map