(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/component/InventoryAlertModal/index.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _this = ("TURBOPACK compile-time value", void 0);
;
var _s = __turbopack_context__.k.signature();
'use client';
;
var InventoryAlertModal = function(param) {
    var show = param.show, onClose = param.onClose, message = param.message, _param_type = param.type, type = _param_type === void 0 ? 'warning' : _param_type;
    _s();
    // Prevent body scroll when modal is open
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "InventoryAlertModal.useEffect": function() {
            if (show) {
                var originalStyle = window.getComputedStyle(document.body).overflow;
                document.body.style.overflow = 'hidden';
                return ({
                    "InventoryAlertModal.useEffect": function() {
                        document.body.style.overflow = originalStyle;
                    }
                })["InventoryAlertModal.useEffect"];
            }
        }
    }["InventoryAlertModal.useEffect"], [
        show
    ]);
    if (!show) return null;
    var isError = type === 'error' || (message === null || message === void 0 ? void 0 : message.toLowerCase().includes('out of stock'));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4",
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-sm max-w-md w-full p-6 border border-gray-200 shadow-lg",
            onClick: function(e) {
                return e.stopPropagation();
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-12 h-12 rounded-full flex items-center justify-center mb-3 ".concat(isError ? 'bg-red-100' : 'bg-orange-100'),
                            children: isError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-6 h-6 text-red-600",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                }, void 0, false, {
                                    fileName: "[project]/src/component/InventoryAlertModal/index.jsx",
                                    lineNumber: 38,
                                    columnNumber: 17
                                }, _this)
                            }, void 0, false, {
                                fileName: "[project]/src/component/InventoryAlertModal/index.jsx",
                                lineNumber: 37,
                                columnNumber: 15
                            }, _this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-6 h-6 text-orange-600",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                }, void 0, false, {
                                    fileName: "[project]/src/component/InventoryAlertModal/index.jsx",
                                    lineNumber: 42,
                                    columnNumber: 17
                                }, _this)
                            }, void 0, false, {
                                fileName: "[project]/src/component/InventoryAlertModal/index.jsx",
                                lineNumber: 41,
                                columnNumber: 15
                            }, _this)
                        }, void 0, false, {
                            fileName: "[project]/src/component/InventoryAlertModal/index.jsx",
                            lineNumber: 33,
                            columnNumber: 11
                        }, _this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-medium mb-2 font-inter ".concat(isError ? 'text-red-900' : 'text-orange-900'),
                            children: isError ? 'Out of Stock' : 'Limited Inventory'
                        }, void 0, false, {
                            fileName: "[project]/src/component/InventoryAlertModal/index.jsx",
                            lineNumber: 46,
                            columnNumber: 11
                        }, _this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-12 h-px ".concat(isError ? 'bg-red-300' : 'bg-orange-300')
                        }, void 0, false, {
                            fileName: "[project]/src/component/InventoryAlertModal/index.jsx",
                            lineNumber: 51,
                            columnNumber: 11
                        }, _this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/component/InventoryAlertModal/index.jsx",
                    lineNumber: 32,
                    columnNumber: 9
                }, _this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm font-inter ".concat(isError ? 'text-red-800' : 'text-gray-700'),
                        children: message
                    }, void 0, false, {
                        fileName: "[project]/src/component/InventoryAlertModal/index.jsx",
                        lineNumber: 56,
                        columnNumber: 11
                    }, _this)
                }, void 0, false, {
                    fileName: "[project]/src/component/InventoryAlertModal/index.jsx",
                    lineNumber: 55,
                    columnNumber: 9
                }, _this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-end",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onClose,
                        className: "px-6 py-2 text-sm uppercase tracking-wider font-inter transition-all duration-200 ".concat(isError ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-gray-900 hover:bg-gray-800 text-white'),
                        children: "OK"
                    }, void 0, false, {
                        fileName: "[project]/src/component/InventoryAlertModal/index.jsx",
                        lineNumber: 65,
                        columnNumber: 11
                    }, _this)
                }, void 0, false, {
                    fileName: "[project]/src/component/InventoryAlertModal/index.jsx",
                    lineNumber: 64,
                    columnNumber: 9
                }, _this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/component/InventoryAlertModal/index.jsx",
            lineNumber: 27,
            columnNumber: 7
        }, _this)
    }, void 0, false, {
        fileName: "[project]/src/component/InventoryAlertModal/index.jsx",
        lineNumber: 23,
        columnNumber: 5
    }, _this);
};
_s(InventoryAlertModal, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = InventoryAlertModal;
const __TURBOPACK__default__export__ = InventoryAlertModal;
var _c;
__turbopack_context__.k.register(_c, "InventoryAlertModal");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/data/filterHelpers.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Helper functions for filtering pins
__turbopack_context__.s([
    "filterPinsByCategory",
    ()=>filterPinsByCategory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
;
var filterPinsByCategory = function(pins, selectedCategory, subCategory) {
    if (subCategory === 'all') return pins;
    if (selectedCategory === 'flags') {
        return pins.filter(function(pin) {
            return pin.continent === subCategory;
        });
    }
    return pins.filter(function(pin) {
        var n = pin.name.toLowerCase();
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
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/component/Charms/CharmTypeTabs.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _this = ("TURBOPACK compile-time value", void 0);
;
;
var CharmTypeTabs = function(param) {
    var charmTypes = param.charmTypes, selectedType = param.selectedType, onTypeChange = param.onTypeChange;
    // Map full labels to short labels for mobile
    var getShortLabel = function(value) {
        var shortLabels = {
            'colorful': 'colorful',
            'bronze': 'bronze',
            'flags': 'flags'
        };
        return shortLabels[value] || value;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex justify-center mb-6  px-6 md:mx-0 md:px-0",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex gap-2 border-b border-gray-200 flex-nowrap justify-center",
            children: charmTypes.map(function(param) {
                var value = param.value, label = param.label;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: function() {
                        return onTypeChange(value);
                    },
                    className: "px-6 py-3 text-xs uppercase tracking-wider transition-all duration-200 font-inter ".concat(selectedType === value ? 'border-b-2 border-blue-700 text-white bg-blue-600 font-medium' : 'border-b-2 border-transparent text-white hover:text-white hover:border-blue-300 hover:bg-blue-500 bg-blue-400'),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "md:hidden",
                            children: getShortLabel(value)
                        }, void 0, false, {
                            fileName: "[project]/src/component/Charms/CharmTypeTabs.jsx",
                            lineNumber: 27,
                            columnNumber: 13
                        }, _this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "hidden md:inline",
                            children: label
                        }, void 0, false, {
                            fileName: "[project]/src/component/Charms/CharmTypeTabs.jsx",
                            lineNumber: 28,
                            columnNumber: 13
                        }, _this)
                    ]
                }, value, true, {
                    fileName: "[project]/src/component/Charms/CharmTypeTabs.jsx",
                    lineNumber: 18,
                    columnNumber: 11
                }, _this);
            })
        }, void 0, false, {
            fileName: "[project]/src/component/Charms/CharmTypeTabs.jsx",
            lineNumber: 16,
            columnNumber: 7
        }, _this)
    }, void 0, false, {
        fileName: "[project]/src/component/Charms/CharmTypeTabs.jsx",
        lineNumber: 15,
        columnNumber: 5
    }, _this);
};
_c = CharmTypeTabs;
const __TURBOPACK__default__export__ = CharmTypeTabs;
var _c;
__turbopack_context__.k.register(_c, "CharmTypeTabs");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/component/Charms/SubCategoryTabs.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _this = ("TURBOPACK compile-time value", void 0);
;
;
var SubCategoryTabs = function(param) {
    var categories = param.categories, selectedCategory = param.selectedCategory, onCategoryChange = param.onCategoryChange;
    if (!categories || categories.length === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex justify-center mb-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex gap-1 border-b border-gray-200 flex-wrap justify-center",
            children: categories.map(function(param) {
                var key = param.key, label = param.label;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: function() {
                        return onCategoryChange(key);
                    },
                    className: "px-4 py-2 text-[10px] uppercase tracking-wider transition-all duration-200 font-inter ".concat(selectedCategory === key ? 'border-b-2 border-blue-700 text-gray-900 font-medium' : 'border-b-2 border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'),
                    children: label
                }, key, false, {
                    fileName: "[project]/src/component/Charms/SubCategoryTabs.jsx",
                    lineNumber: 10,
                    columnNumber: 11
                }, _this);
            })
        }, void 0, false, {
            fileName: "[project]/src/component/Charms/SubCategoryTabs.jsx",
            lineNumber: 8,
            columnNumber: 7
        }, _this)
    }, void 0, false, {
        fileName: "[project]/src/component/Charms/SubCategoryTabs.jsx",
        lineNumber: 7,
        columnNumber: 5
    }, _this);
};
_c = SubCategoryTabs;
const __TURBOPACK__default__export__ = SubCategoryTabs;
var _c;
__turbopack_context__.k.register(_c, "SubCategoryTabs");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/component/Charms/SearchBar.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _this = ("TURBOPACK compile-time value", void 0);
;
;
var SearchBar = function(param) {
    var searchTerm = param.searchTerm, setSearchTerm = param.setSearchTerm, _param_placeholder = param.placeholder, placeholder = _param_placeholder === void 0 ? "Search charms..." : _param_placeholder;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative flex-1 max-w-md w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "text",
                placeholder: placeholder,
                value: searchTerm,
                onChange: function(e) {
                    return setSearchTerm(e.target.value);
                },
                className: "w-full px-4 py-3 pl-10 border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 bg-white text-gray-900 placeholder-gray-400 font-inter text-sm"
            }, void 0, false, {
                fileName: "[project]/src/component/Charms/SearchBar.jsx",
                lineNumber: 6,
                columnNumber: 7
            }, _this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 1.5,
                    d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                }, void 0, false, {
                    fileName: "[project]/src/component/Charms/SearchBar.jsx",
                    lineNumber: 14,
                    columnNumber: 9
                }, _this)
            }, void 0, false, {
                fileName: "[project]/src/component/Charms/SearchBar.jsx",
                lineNumber: 13,
                columnNumber: 7
            }, _this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/component/Charms/SearchBar.jsx",
        lineNumber: 5,
        columnNumber: 5
    }, _this);
};
_c = SearchBar;
const __TURBOPACK__default__export__ = SearchBar;
var _c;
__turbopack_context__.k.register(_c, "SearchBar");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/component/Charms/ResultsCount.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _this = ("TURBOPACK compile-time value", void 0);
;
;
var ResultsCount = function(param) {
    var count = param.count, currentPage = param.currentPage, totalPages = param.totalPages;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center text-sm text-gray-500 font-inter whitespace-nowrap",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            children: [
                count,
                " ",
                count === 1 ? 'item' : 'items',
                totalPages > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "ml-2",
                    children: [
                        "(Page ",
                        currentPage,
                        " of ",
                        totalPages,
                        ")"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/component/Charms/ResultsCount.jsx",
                    lineNumber: 9,
                    columnNumber: 11
                }, _this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/component/Charms/ResultsCount.jsx",
            lineNumber: 6,
            columnNumber: 7
        }, _this)
    }, void 0, false, {
        fileName: "[project]/src/component/Charms/ResultsCount.jsx",
        lineNumber: 5,
        columnNumber: 5
    }, _this);
};
_c = ResultsCount;
const __TURBOPACK__default__export__ = ResultsCount;
var _c;
__turbopack_context__.k.register(_c, "ResultsCount");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/component/Charms/CharmGridItem.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$CurrencyContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/CurrencyContext.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$imagePath$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/imagePath.js [app-client] (ecmascript)");
;
var _this = ("TURBOPACK compile-time value", void 0);
;
var _s = __turbopack_context__.k.signature();
;
;
;
var CharmGridItem = function(param) {
    var charm = param.charm, index = param.index, onAddToCart = param.onAddToCart, isSelected = param.isSelected, onSelect = param.onSelect, _param_isSoldOut = param.isSoldOut, isSoldOut = _param_isSoldOut === void 0 ? false : _param_isSoldOut, charmPrice = param.charmPrice;
    _s();
    var formatPrice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$CurrencyContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCurrency"])().formatPrice;
    var pastelColors = [
        'bg-pink-50',
        'bg-blue-50',
        'bg-purple-50',
        'bg-green-50',
        'bg-yellow-50',
        'bg-orange-50'
    ];
    var pastelBorders = [
        'border-pink-100',
        'border-blue-100',
        'border-purple-100',
        'border-green-100',
        'border-yellow-100',
        'border-orange-100'
    ];
    var colorIndex = index % pastelColors.length;
    // Optimize loading for above-the-fold images (first 6 visible items)
    // These should load with high priority to improve LCP (Largest Contentful Paint)
    var isAboveTheFold = index < 6;
    var loadingStrategy = isAboveTheFold ? 'eager' : 'lazy';
    var fetchPriority = isAboveTheFold ? 'high' : 'low';
    // Calculate scale to prevent layout shift
    var scale = charm.size !== undefined ? charm.size * 0.9 : 0.9;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col group",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "aspect-square mb-3 ".concat(pastelColors[colorIndex], " flex items-center justify-center overflow-hidden md:border ").concat(pastelBorders[colorIndex], " relative"),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$imagePath$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeImagePath"])(charm.src),
                        alt: charm.name,
                        className: "w-full h-full object-contain p-4 transition-opacity duration-200 group-hover:opacity-80 ".concat(isSoldOut ? 'opacity-50' : ''),
                        loading: loadingStrategy,
                        fetchPriority: fetchPriority,
                        decoding: "async",
                        width: "200",
                        height: "200",
                        style: {
                            transform: "scale(".concat(scale, ")"),
                            willChange: isAboveTheFold ? 'transform' : 'auto'
                        },
                        onError: function(e) {
                            var _e_target;
                            if (e.target) {
                                e.target.style.display = 'none';
                            }
                            if ((_e_target = e.target) === null || _e_target === void 0 ? void 0 : _e_target.nextSibling) {
                                e.target.nextSibling.style.display = 'flex';
                            }
                        },
                        onLoad: function(e) {
                            // Force Safari to display the image
                            if (e.target) {
                                e.target.style.visibility = 'visible';
                            }
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/component/Charms/CharmGridItem.jsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, _this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden w-full h-full items-center justify-center text-gray-400",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-4xl",
                            children: "🎁"
                        }, void 0, false, {
                            fileName: "[project]/src/component/Charms/CharmGridItem.jsx",
                            lineNumber: 54,
                            columnNumber: 11
                        }, _this)
                    }, void 0, false, {
                        fileName: "[project]/src/component/Charms/CharmGridItem.jsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, _this),
                    isSoldOut && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-20",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-white text-xl font-medium uppercase tracking-wider font-inter",
                            children: "Sold Out"
                        }, void 0, false, {
                            fileName: "[project]/src/component/Charms/CharmGridItem.jsx",
                            lineNumber: 59,
                            columnNumber: 13
                        }, _this)
                    }, void 0, false, {
                        fileName: "[project]/src/component/Charms/CharmGridItem.jsx",
                        lineNumber: 58,
                        columnNumber: 11
                    }, _this),
                    isSelected && !isSoldOut && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute -top-2 -right-2 bg-gray-900 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium",
                        children: "✓"
                    }, void 0, false, {
                        fileName: "[project]/src/component/Charms/CharmGridItem.jsx",
                        lineNumber: 65,
                        columnNumber: 11
                    }, _this),
                    onAddToCart && !isSoldOut && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: function(e) {
                            e.stopPropagation();
                            onAddToCart(charm);
                        },
                        className: "absolute bottom-2 right-2 md:bottom-0 md:left-0 md:right-0 md:top-auto py-2 px-2 md:py-2 md:px-0 text-gray-900 md:border-t md:border-gray-200 bg-white md:bg-white rounded-full md:rounded-none shadow-md md:shadow-none transition-all duration-200 text-xs uppercase tracking-wider flex items-center justify-center opacity-100 translate-y-0 md:opacity-0 md:translate-y-full md:group-hover:opacity-100 md:group-hover:translate-y-0 hover:bg-gray-50 z-10 font-inter",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-5 h-5 md:hidden",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 1.5,
                                    d: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                }, void 0, false, {
                                    fileName: "[project]/src/component/Charms/CharmGridItem.jsx",
                                    lineNumber: 80,
                                    columnNumber: 15
                                }, _this)
                            }, void 0, false, {
                                fileName: "[project]/src/component/Charms/CharmGridItem.jsx",
                                lineNumber: 79,
                                columnNumber: 13
                            }, _this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "hidden md:inline",
                                children: "Add to Cart"
                            }, void 0, false, {
                                fileName: "[project]/src/component/Charms/CharmGridItem.jsx",
                                lineNumber: 83,
                                columnNumber: 13
                            }, _this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/component/Charms/CharmGridItem.jsx",
                        lineNumber: 71,
                        columnNumber: 11
                    }, _this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/component/Charms/CharmGridItem.jsx",
                lineNumber: 24,
                columnNumber: 7
            }, _this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-sm text-center mb-1 font-light font-inter ".concat(isSoldOut ? 'text-gray-500' : 'text-gray-700'),
                children: charm.name
            }, void 0, false, {
                fileName: "[project]/src/component/Charms/CharmGridItem.jsx",
                lineNumber: 87,
                columnNumber: 7
            }, _this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-sm font-medium font-inter ".concat(isSoldOut ? 'text-gray-500' : 'text-gray-900'),
                    children: formatPrice(charmPrice)
                }, void 0, false, {
                    fileName: "[project]/src/component/Charms/CharmGridItem.jsx",
                    lineNumber: 91,
                    columnNumber: 9
                }, _this)
            }, void 0, false, {
                fileName: "[project]/src/component/Charms/CharmGridItem.jsx",
                lineNumber: 90,
                columnNumber: 7
            }, _this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/component/Charms/CharmGridItem.jsx",
        lineNumber: 21,
        columnNumber: 5
    }, _this);
};
_s(CharmGridItem, "o18h6jzxfJXzdm2nnWcrTIJ7Eso=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$CurrencyContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCurrency"]
    ];
});
_c = CharmGridItem;
const __TURBOPACK__default__export__ = CharmGridItem;
var _c;
__turbopack_context__.k.register(_c, "CharmGridItem");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/component/Charms/CharmGridItemWithInventory.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$inventory$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/inventory.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$Charms$2f$CharmGridItem$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/component/Charms/CharmGridItem.jsx [app-client] (ecmascript)");
;
var _this = ("TURBOPACK compile-time value", void 0);
;
;
;
;
var CharmGridItemWithInventory = function(param) {
    var charm = param.charm, index = param.index, onAddToCart = param.onAddToCart, charmType = param.charmType, cart = param.cart, charmPrice = param.charmPrice;
    // Create a product object for inventory checking
    var product = {
        name: charm.name,
        price: charmPrice,
        totalPrice: charmPrice,
        image: charm.src,
        pin: charm,
        category: charmType,
        type: 'charm'
    };
    // Check inventory availability
    var maxAvailable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$inventory$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMaxAvailableQuantity"])(product, cart);
    var isSoldOut = maxAvailable !== null && maxAvailable === 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$Charms$2f$CharmGridItem$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        charm: charm,
        index: index,
        onAddToCart: onAddToCart,
        isSoldOut: isSoldOut,
        charmPrice: charmPrice
    }, void 0, false, {
        fileName: "[project]/src/component/Charms/CharmGridItemWithInventory.jsx",
        lineNumber: 22,
        columnNumber: 5
    }, _this);
};
_c = CharmGridItemWithInventory;
const __TURBOPACK__default__export__ = CharmGridItemWithInventory;
var _c;
__turbopack_context__.k.register(_c, "CharmGridItemWithInventory");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/component/Charms/SimplePagination.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _this = ("TURBOPACK compile-time value", void 0);
;
;
var SimplePagination = function(param) {
    var currentPage = param.currentPage, totalPages = param.totalPages, onPageChange = param.onPageChange;
    if (totalPages <= 1) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex justify-center items-center gap-1 mb-12",
        children: Array.from({
            length: totalPages
        }, function(_, i) {
            return i + 1;
        }).map(function(page) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: function() {
                    return onPageChange(page);
                },
                className: "px-3 py-1 text-xs transition-all duration-200 font-inter ".concat(currentPage === page ? 'border-b-2 border-gray-900 text-gray-900 font-medium' : 'border-b-2 border-transparent text-gray-400 hover:text-gray-700 hover:border-gray-300'),
                "aria-label": "Go to page ".concat(page),
                children: page
            }, page, false, {
                fileName: "[project]/src/component/Charms/SimplePagination.jsx",
                lineNumber: 9,
                columnNumber: 9
            }, _this);
        })
    }, void 0, false, {
        fileName: "[project]/src/component/Charms/SimplePagination.jsx",
        lineNumber: 7,
        columnNumber: 5
    }, _this);
};
_c = SimplePagination;
const __TURBOPACK__default__export__ = SimplePagination;
var _c;
__turbopack_context__.k.register(_c, "SimplePagination");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/component/Charms/EmptyState.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _this = ("TURBOPACK compile-time value", void 0);
;
;
var EmptyState = function(param) {
    var _param_message = param.message, message = _param_message === void 0 ? "No items found" : _param_message, onClearFilters = param.onClearFilters;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "py-16 text-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-gray-400 mb-4 font-inter",
                children: message
            }, void 0, false, {
                fileName: "[project]/src/component/Charms/EmptyState.jsx",
                lineNumber: 6,
                columnNumber: 7
            }, _this),
            onClearFilters && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onClearFilters,
                className: "text-xs uppercase tracking-wider text-gray-500 hover:text-gray-900 border-b border-transparent hover:border-gray-300 transition-all duration-200 font-inter",
                children: "Clear Filters"
            }, void 0, false, {
                fileName: "[project]/src/component/Charms/EmptyState.jsx",
                lineNumber: 10,
                columnNumber: 9
            }, _this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/component/Charms/EmptyState.jsx",
        lineNumber: 5,
        columnNumber: 5
    }, _this);
};
_c = EmptyState;
const __TURBOPACK__default__export__ = EmptyState;
var _c;
__turbopack_context__.k.register(_c, "EmptyState");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/utils/charms/helpers.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCharmCategory",
    ()=>getCharmCategory,
    "getCharmName",
    ()=>getCharmName,
    "getCharmPrice",
    ()=>getCharmPrice
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$shared$2f$products$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/utils/shared/products.js [app-client] (ecmascript) <locals>");
;
;
;
var getCharmPrice = function(charm, charmType) {
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
var getCharmCategory = function(charmType) {
    return charmType || 'colorful';
};
var getCharmName = function(name) {
    if (!name) return 'Charm';
    // Remove common suffixes if needed
    var formattedName = name;
    formattedName = formattedName.replace(/\s*-\s*(Flag|Colorful Charm|Bronze Charm)$/i, '');
    formattedName = formattedName.replace(/\s+Flag$/i, '');
    return formattedName.trim();
};
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/utils/charms/constants.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
;
var CHARM_TYPES = [
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
var FLAGS_CATEGORIES = [
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
var BRONZE_CATEGORIES = [
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
var COLORFUL_CATEGORIES = [
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
var FILTER_TO_TYPE = {
    'colorful': 'colorful',
    'bronze': 'bronze',
    'flags': 'flags',
    'flag': 'flags'
};
var ITEMS_PER_PAGE = 20;
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/page-components/Charms/index.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_sliced_to_array.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$CartContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/CartContext.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$InventoryAlertModal$2f$index$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/component/InventoryAlertModal/index.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$inventory$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/inventory.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$filterHelpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/filterHelpers.js [app-client] (ecmascript)");
// Components
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$Charms$2f$CharmTypeTabs$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/component/Charms/CharmTypeTabs.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$Charms$2f$SubCategoryTabs$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/component/Charms/SubCategoryTabs.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$Charms$2f$SearchBar$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/component/Charms/SearchBar.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$Charms$2f$ResultsCount$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/component/Charms/ResultsCount.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$Charms$2f$CharmGridItemWithInventory$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/component/Charms/CharmGridItemWithInventory.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$Charms$2f$SimplePagination$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/component/Charms/SimplePagination.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$Charms$2f$EmptyState$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/component/Charms/EmptyState.jsx [app-client] (ecmascript)");
// Utils
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$charms$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/utils/charms/helpers.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$shared$2f$products$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/utils/shared/products.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$charms$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/charms/constants.js [app-client] (ecmascript)");
;
;
var _this = ("TURBOPACK compile-time value", void 0);
;
var _s = __turbopack_context__.k.signature();
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
// Map URL path parameter to internal charm type
var PATH_TO_TYPE = {
    'Bronze': 'bronze',
    'Colorful': 'colorful',
    'flags': 'flags',
    'Flags': 'flags'
};
// Map internal charm type to URL path parameter
var TYPE_TO_PATH = {
    'bronze': 'Bronze',
    'colorful': 'Colorful',
    'flags': 'flags'
};
var Charms = function() {
    _s();
    var params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    var pathType = params === null || params === void 0 ? void 0 : params.type;
    var router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    var _useCart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$CartContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"])(), addToCart = _useCart.addToCart, cart = _useCart.cart;
    // Convert URL path parameter to internal charm type
    var initialCharmType = pathType && PATH_TO_TYPE[pathType] ? PATH_TO_TYPE[pathType] : 'colorful';
    var _useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialCharmType), 2), selectedCharmType = _useState[0], setSelectedCharmType = _useState[1];
    var _useState1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(''), 2), searchTerm = _useState1[0], setSearchTerm = _useState1[1];
    var _useState2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all'), 2), selectedContinent = _useState2[0], setSelectedContinent = _useState2[1];
    var _useState3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all'), 2), selectedBronzeCategory = _useState3[0], setSelectedBronzeCategory = _useState3[1];
    var _useState4 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all'), 2), selectedColorfulCategory = _useState4[0], setSelectedColorfulCategory = _useState4[1];
    var _useState5 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1), 2), bronzeCurrentPage = _useState5[0], setBronzeCurrentPage = _useState5[1];
    var _useState6 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1), 2), colorfulCurrentPage = _useState6[0], setColorfulCurrentPage = _useState6[1];
    var _useState7 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1), 2), flagsCurrentPage = _useState7[0], setFlagsCurrentPage = _useState7[1];
    var _useState8 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false), 2), showInventoryModal = _useState8[0], setShowInventoryModal = _useState8[1];
    var _useState9 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(''), 2), inventoryMessage = _useState9[0], setInventoryMessage = _useState9[1];
    var _useState10 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('error'), 2), inventoryType = _useState10[0], setInventoryType = _useState10[1];
    // Get all charms for selected type
    var getAllCharms = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Charms.useCallback[getAllCharms]": function() {
            var productsWithQuantities = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$shared$2f$products$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getProductsWithQuantities"])();
            if (selectedCharmType === 'colorful') {
                return productsWithQuantities.pins.colorful || [];
            } else if (selectedCharmType === 'bronze') {
                return productsWithQuantities.pins.bronze || [];
            } else if (selectedCharmType === 'flags') {
                return productsWithQuantities.pins.flags || [];
            }
            return [];
        }
    }["Charms.useCallback[getAllCharms]"], [
        selectedCharmType
    ]);
    // Filter charms based on search and category
    var filteredCharms = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Charms.useMemo[filteredCharms]": function() {
            var charms = getAllCharms();
            // Apply search filter
            if (searchTerm) {
                charms = charms.filter({
                    "Charms.useMemo[filteredCharms]": function(charm) {
                        return charm.name.toLowerCase().includes(searchTerm.toLowerCase());
                    }
                }["Charms.useMemo[filteredCharms]"]);
            }
            // Apply category filter using filterHelpers
            var selectedCategory = selectedCharmType === 'flags' ? selectedContinent : selectedCharmType === 'bronze' ? selectedBronzeCategory : selectedColorfulCategory;
            if (selectedCategory !== 'all') {
                charms = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$filterHelpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["filterPinsByCategory"])(charms, selectedCharmType, selectedCategory);
            }
            return charms;
        }
    }["Charms.useMemo[filteredCharms]"], [
        getAllCharms,
        searchTerm,
        selectedCharmType,
        selectedContinent,
        selectedBronzeCategory,
        selectedColorfulCategory
    ]);
    // Pagination state management
    var getCurrentPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Charms.useCallback[getCurrentPage]": function() {
            if (selectedCharmType === 'bronze') return bronzeCurrentPage;
            if (selectedCharmType === 'colorful') return colorfulCurrentPage;
            if (selectedCharmType === 'flags') return flagsCurrentPage;
            return 1;
        }
    }["Charms.useCallback[getCurrentPage]"], [
        selectedCharmType,
        bronzeCurrentPage,
        colorfulCurrentPage,
        flagsCurrentPage
    ]);
    var setCurrentPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Charms.useCallback[setCurrentPage]": function(page) {
            if (selectedCharmType === 'bronze') setBronzeCurrentPage(page);
            if (selectedCharmType === 'colorful') setColorfulCurrentPage(page);
            if (selectedCharmType === 'flags') setFlagsCurrentPage(page);
        }
    }["Charms.useCallback[setCurrentPage]"], [
        selectedCharmType
    ]);
    var currentPage = getCurrentPage();
    var totalPages = Math.ceil(filteredCharms.length / __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$charms$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ITEMS_PER_PAGE"]);
    // Get paginated charms
    var displayedCharms = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Charms.useMemo[displayedCharms]": function() {
            var startIndex = (currentPage - 1) * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$charms$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ITEMS_PER_PAGE"];
            var endIndex = startIndex + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$charms$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ITEMS_PER_PAGE"];
            return filteredCharms.slice(startIndex, endIndex);
        }
    }["Charms.useMemo[displayedCharms]"], [
        filteredCharms,
        currentPage
    ]);
    // Update charm type when URL path parameter changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Charms.useEffect": function() {
            if (pathType && PATH_TO_TYPE[pathType]) {
                var newType = PATH_TO_TYPE[pathType];
                setSelectedCharmType(newType);
            } else if (!pathType) {
                // If no path type, default to colorful
                setSelectedCharmType('colorful');
            }
        }
    }["Charms.useEffect"], [
        pathType
    ]);
    var handleCharmTypeChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Charms.useCallback[handleCharmTypeChange]": function(type) {
            setSelectedCharmType(type);
            setSelectedContinent('all');
            setSelectedBronzeCategory('all');
            setSelectedColorfulCategory('all');
            setBronzeCurrentPage(1);
            setColorfulCurrentPage(1);
            setFlagsCurrentPage(1);
            // Navigate to the new path based on the charm type
            var pathType = TYPE_TO_PATH[type] || 'Colorful';
            router.replace("/Charms/".concat(pathType));
        }
    }["Charms.useCallback[handleCharmTypeChange]"], [
        router
    ]);
    var handleAddToCart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Charms.useCallback[handleAddToCart]": function(charm) {
            var product = {
                id: "charm-".concat(Date.now(), "-").concat(Math.random().toString(36).substr(2, 9)),
                name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$charms$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getCharmName"])(charm.name),
                price: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$charms$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getCharmPrice"])(charm, selectedCharmType),
                totalPrice: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$charms$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getCharmPrice"])(charm, selectedCharmType),
                image: charm.src,
                pin: charm,
                category: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$charms$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getCharmCategory"])(selectedCharmType),
                type: 'charm'
            };
            // Check stock availability before adding to cart
            var maxAvailable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$inventory$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMaxAvailableQuantity"])(product, cart);
            if (maxAvailable !== null && maxAvailable === 0) {
                var charmDisplayName = charm.name || 'this charm';
                var errorMessage = "Oops! We don't have any more ".concat(charmDisplayName, " in stock right now, so you can't add more to your basket.");
                setInventoryMessage(errorMessage);
                setInventoryType('error');
                setShowInventoryModal(true);
                return;
            }
            console.log('📌 Charms page - Adding charm to cart:', {
                charmName: charm.name,
                charmSrc: charm.src,
                category: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$charms$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getCharmCategory"])(selectedCharmType),
                product: product
            });
            addToCart(product);
        }
    }["Charms.useCallback[handleAddToCart]"], [
        selectedCharmType,
        cart,
        addToCart
    ]);
    // Get category tabs based on selected charm type
    var getCategoryTabs = function() {
        if (selectedCharmType === 'flags') return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$charms$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FLAGS_CATEGORIES"];
        if (selectedCharmType === 'bronze') return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$charms$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BRONZE_CATEGORIES"];
        if (selectedCharmType === 'colorful') return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$charms$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COLORFUL_CATEGORIES"];
        return [];
    };
    var getSelectedCategory = function() {
        if (selectedCharmType === 'flags') return selectedContinent;
        if (selectedCharmType === 'bronze') return selectedBronzeCategory;
        if (selectedCharmType === 'colorful') return selectedColorfulCategory;
        return 'all';
    };
    var handleCategoryChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Charms.useCallback[handleCategoryChange]": function(category) {
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
        }
    }["Charms.useCallback[handleCategoryChange]"], [
        selectedCharmType
    ]);
    var handleClearFilters = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Charms.useCallback[handleClearFilters]": function() {
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
        }
    }["Charms.useCallback[handleClearFilters]"], [
        selectedCharmType
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center mb-8 sm:mb-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-title text-gray-900 tracking-title mb-1 md:mb-2",
                                children: "CHARMS"
                            }, void 0, false, {
                                fileName: "[project]/src/page-components/Charms/index.jsx",
                                lineNumber: 235,
                                columnNumber: 11
                            }, _this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-16 sm:w-20 md:w-24 h-px bg-gray-200 mx-auto mb-3 sm:mb-4"
                            }, void 0, false, {
                                fileName: "[project]/src/page-components/Charms/index.jsx",
                                lineNumber: 238,
                                columnNumber: 11
                            }, _this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-500 max-w-2xl mx-auto font-light px-4 font-inter",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/CreateYours",
                                        className: "text-gray-900 hover:text-gray-700 underline transition-colors",
                                        children: "Create"
                                    }, void 0, false, {
                                        fileName: "[project]/src/page-components/Charms/index.jsx",
                                        lineNumber: 240,
                                        columnNumber: 13
                                    }, _this),
                                    " your custom case with charms pre-glued, or buy the case and charms separately and enjoy gluing them yourself."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/page-components/Charms/index.jsx",
                                lineNumber: 239,
                                columnNumber: 11
                            }, _this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/page-components/Charms/index.jsx",
                        lineNumber: 234,
                        columnNumber: 9
                    }, _this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$Charms$2f$CharmTypeTabs$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                charmTypes: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$charms$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHARM_TYPES"],
                                selectedType: selectedCharmType,
                                onTypeChange: handleCharmTypeChange
                            }, void 0, false, {
                                fileName: "[project]/src/page-components/Charms/index.jsx",
                                lineNumber: 246,
                                columnNumber: 11
                            }, _this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$Charms$2f$SubCategoryTabs$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                categories: getCategoryTabs(),
                                selectedCategory: getSelectedCategory(),
                                onCategoryChange: handleCategoryChange
                            }, void 0, false, {
                                fileName: "[project]/src/page-components/Charms/index.jsx",
                                lineNumber: 252,
                                columnNumber: 11
                            }, _this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/page-components/Charms/index.jsx",
                        lineNumber: 245,
                        columnNumber: 9
                    }, _this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-8 flex items-center justify-between gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$Charms$2f$SearchBar$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                searchTerm: searchTerm,
                                setSearchTerm: setSearchTerm,
                                placeholder: "Search charms..."
                            }, void 0, false, {
                                fileName: "[project]/src/page-components/Charms/index.jsx",
                                lineNumber: 261,
                                columnNumber: 11
                            }, _this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$Charms$2f$ResultsCount$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                count: filteredCharms.length,
                                currentPage: currentPage,
                                totalPages: totalPages
                            }, void 0, false, {
                                fileName: "[project]/src/page-components/Charms/index.jsx",
                                lineNumber: 267,
                                columnNumber: 11
                            }, _this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/page-components/Charms/index.jsx",
                        lineNumber: 260,
                        columnNumber: 9
                    }, _this),
                    filteredCharms.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 mb-12 min-h-[400px] sm:min-h-[600px]",
                                children: displayedCharms.map(function(charm, index) {
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$Charms$2f$CharmGridItemWithInventory$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        charm: charm,
                                        index: index,
                                        onAddToCart: handleAddToCart,
                                        charmType: selectedCharmType,
                                        cart: cart,
                                        charmPrice: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$charms$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getCharmPrice"])(charm, selectedCharmType)
                                    }, index, false, {
                                        fileName: "[project]/src/page-components/Charms/index.jsx",
                                        lineNumber: 279,
                                        columnNumber: 17
                                    }, _this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/page-components/Charms/index.jsx",
                                lineNumber: 277,
                                columnNumber: 13
                            }, _this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$Charms$2f$SimplePagination$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                currentPage: currentPage,
                                totalPages: totalPages,
                                onPageChange: setCurrentPage
                            }, void 0, false, {
                                fileName: "[project]/src/page-components/Charms/index.jsx",
                                lineNumber: 291,
                                columnNumber: 13
                            }, _this)
                        ]
                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$Charms$2f$EmptyState$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        message: "No charms found",
                        onClearFilters: handleClearFilters
                    }, void 0, false, {
                        fileName: "[project]/src/page-components/Charms/index.jsx",
                        lineNumber: 298,
                        columnNumber: 11
                    }, _this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/page-components/Charms/index.jsx",
                lineNumber: 232,
                columnNumber: 7
            }, _this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$InventoryAlertModal$2f$index$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                show: showInventoryModal,
                onClose: function() {
                    setShowInventoryModal(false);
                    setInventoryMessage('');
                },
                message: inventoryMessage,
                type: inventoryType
            }, void 0, false, {
                fileName: "[project]/src/page-components/Charms/index.jsx",
                lineNumber: 306,
                columnNumber: 7
            }, _this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/page-components/Charms/index.jsx",
        lineNumber: 231,
        columnNumber: 5
    }, _this);
};
_s(Charms, "7fMXpBXCGPhmBQ1soMLpQjyTNHY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$CartContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"]
    ];
});
_c = Charms;
const __TURBOPACK__default__export__ = Charms;
var _c;
__turbopack_context__.k.register(_c, "Charms");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_9d040e45._.js.map