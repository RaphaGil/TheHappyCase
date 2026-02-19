(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/component/Hero/index.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_async_to_generator.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_sliced_to_array.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-client] (ecmascript) <export __generator as _>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$imagePath$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/imagePath.js [app-client] (ecmascript)");
;
;
;
;
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
// Defer slick carousel CSS - load asynchronously if needed
// import 'slick-carousel/slick/slick.css'; 
// import 'slick-carousel/slick/slick-theme.css';
// Use normalizeImagePath utility for proper path resolution in both dev and production
var videoSrc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$imagePath$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeImagePath"])('/assets/videos/hero.webm');
function Hero() {
    _s();
    var videoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    var router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    var _useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false), 2), buttonVisible = _useState[0], setButtonVisible = _useState[1];
    var _useState1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false), 2), videoLoaded = _useState1[0], setVideoLoaded = _useState1[1];
    var _useState2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false), 2), videoError = _useState2[0], setVideoError = _useState2[1];
    var handleStartDesigning = function() {
        window.scrollTo({
            top: 0,
            behavior: 'instant'
        });
        router.push('/CreateYours');
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Hero.useEffect": function() {
            // Start fade-in after title animations complete
            // Last title delay (300ms) + animation duration (1200ms) + small buffer (200ms) = 1700ms
            var timer = setTimeout({
                "Hero.useEffect.timer": function() {
                    setButtonVisible(true);
                }
            }["Hero.useEffect.timer"], 1700);
            return ({
                "Hero.useEffect": function() {
                    return clearTimeout(timer);
                }
            })["Hero.useEffect"];
        }
    }["Hero.useEffect"], []);
    // Optimized video loading - only load when needed
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Hero.useEffect": function() {
            var video = videoRef.current;
            if (!video) return;
            var loadTimeout;
            var isMounted = true;
            var hasLoaded = false;
            var hasError = false;
            // Set a timeout to prevent infinite loading
            loadTimeout = setTimeout({
                "Hero.useEffect": function() {
                    if (isMounted && !hasLoaded && !hasError) {
                        console.warn('Video loading timeout - continuing without video');
                        hasError = true;
                        setVideoError(true);
                    }
                }
            }["Hero.useEffect"], 5000); // 5 second timeout
            // Safari-specific: Set playback rate after video is loaded
            var setPlaybackRate = {
                "Hero.useEffect.setPlaybackRate": function() {
                    if (video.readyState >= 2) {
                        video.playbackRate = 0.5;
                    }
                }
            }["Hero.useEffect.setPlaybackRate"];
            // Try to play once - if it fails, browser autoplay policy is blocking it
            var playVideo = {
                "Hero.useEffect.playVideo": function() {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({
                        "Hero.useEffect.playVideo": function() {
                            var error;
                            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, {
                                "Hero.useEffect.playVideo": function(_state) {
                                    switch(_state.label){
                                        case 0:
                                            if (!isMounted) return [
                                                2
                                            ];
                                            _state.label = 1;
                                        case 1:
                                            _state.trys.push([
                                                1,
                                                3,
                                                ,
                                                4
                                            ]);
                                            setPlaybackRate();
                                            return [
                                                4,
                                                video.play()
                                            ];
                                        case 2:
                                            _state.sent();
                                            if (isMounted) {
                                                hasLoaded = true;
                                                setVideoLoaded(true);
                                            }
                                            clearTimeout(loadTimeout);
                                            return [
                                                3,
                                                4
                                            ];
                                        case 3:
                                            error = _state.sent();
                                            // Silently handle autoplay blocking - this is expected behavior
                                            if (isMounted) {
                                                hasLoaded = true;
                                                setVideoLoaded(true);
                                            }
                                            clearTimeout(loadTimeout);
                                            return [
                                                3,
                                                4
                                            ];
                                        case 4:
                                            return [
                                                2
                                            ];
                                    }
                                }
                            }["Hero.useEffect.playVideo"]);
                        }
                    }["Hero.useEffect.playVideo"])();
                }
            }["Hero.useEffect.playVideo"];
            // Handle video loaded successfully
            var handleCanPlay = {
                "Hero.useEffect.handleCanPlay": function() {
                    if (!isMounted) return;
                    hasLoaded = true;
                    setVideoLoaded(true);
                    clearTimeout(loadTimeout);
                    playVideo();
                }
            }["Hero.useEffect.handleCanPlay"];
            // Handle video errors
            var handleError = {
                "Hero.useEffect.handleError": function() {
                    if (!isMounted) return;
                    hasError = true;
                    setVideoError(true);
                    clearTimeout(loadTimeout);
                }
            }["Hero.useEffect.handleError"];
            // Safari: Wait for video to be ready before setting playback rate
            video.addEventListener('loadedmetadata', setPlaybackRate, {
                once: true
            });
            video.addEventListener('canplay', handleCanPlay, {
                once: true
            });
            video.addEventListener('canplaythrough', handleCanPlay, {
                once: true
            });
            video.addEventListener('error', handleError, {
                once: true
            });
            // Start loading the video (lazy load)
            if (video.readyState === 0) {
                video.load();
            } else if (video.readyState >= 2) {
                handleCanPlay();
            }
            return ({
                "Hero.useEffect": function() {
                    isMounted = false;
                    clearTimeout(loadTimeout);
                    video.removeEventListener('loadedmetadata', setPlaybackRate);
                    video.removeEventListener('canplay', handleCanPlay);
                    video.removeEventListener('canplaythrough', handleCanPlay);
                    video.removeEventListener('error', handleError);
                }
            })["Hero.useEffect"];
        }
    }["Hero.useEffect"], []); // Only run once on mount
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "w-full h-[80vh] md:h-[80vh] relative overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 w-full h-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                        ref: videoRef,
                        autoPlay: true,
                        muted: true,
                        playsInline: true,
                        loop: true,
                        preload: "metadata",
                        className: "w-full h-full object-cover",
                        onError: function(e) {
                            console.error('❌ Video error:', e);
                            console.error('❌ Video src:', e.target.src);
                            console.error('❌ Video error details:', e.target.error);
                            setVideoError(true);
                        },
                        onLoadedData: function() {
                            setVideoLoaded(true);
                        },
                        style: {
                            zIndex: 1,
                            minHeight: '100vh',
                            minWidth: '100vw',
                            opacity: videoLoaded ? 1 : 0,
                            transition: 'opacity 0.5s ease-in'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("source", {
                                src: videoSrc,
                                type: "video/mp4"
                            }, void 0, false, {
                                fileName: "[project]/src/component/Hero/index.jsx",
                                lineNumber: 153,
                                columnNumber: 11
                            }, this),
                            "Your browser does not support the video tag."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/component/Hero/index.jsx",
                        lineNumber: 128,
                        columnNumber: 9
                    }, this),
                    videoError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 w-full h-full bg-gradient-to-br from-blue-900 to-blue-700 z-0"
                    }, void 0, false, {
                        fileName: "[project]/src/component/Hero/index.jsx",
                        lineNumber: 159,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-black/50 z-10"
                    }, void 0, false, {
                        fileName: "[project]/src/component/Hero/index.jsx",
                        lineNumber: 163,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/component/Hero/index.jsx",
                lineNumber: 126,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-20 h-full flex items-end justify-center lg:justify-start",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col items-center text-center lg:items-start lg:text-left px-4 mb-10 lg:px-10 lg:ml-10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-title sm:text-title-lg md:text-title-xl lg:text-title-xl font-light text-white font-inter tracking-title",
                            style: {
                                textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)'
                            },
                            children: "Create Your Own Custom"
                        }, void 0, false, {
                            fileName: "[project]/src/component/Hero/index.jsx",
                            lineNumber: 169,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-title sm:text-title-lg md:text-title-xl lg:text-title-xl font-light text-white mb-4 font-inter tracking-title",
                            style: {
                                textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)'
                            },
                            children: "Passport Case"
                        }, void 0, false, {
                            fileName: "[project]/src/component/Hero/index.jsx",
                            lineNumber: 175,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleStartDesigning,
                            className: "px-8 py-3 text-sm uppercase tracking-wider shadow-lg w-fit font-inter bg-btn-primary-blue hover:bg-btn-primary-blue-hover text-btn-primary-blue-text border border-btn-primary-blue-border hover:border-btn-primary-blue-hover transition-opacity duration-700 ease-out ".concat(buttonVisible ? 'opacity-100' : 'opacity-0'),
                            children: "Shop Now"
                        }, void 0, false, {
                            fileName: "[project]/src/component/Hero/index.jsx",
                            lineNumber: 181,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/component/Hero/index.jsx",
                    lineNumber: 168,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/component/Hero/index.jsx",
                lineNumber: 167,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/component/Hero/index.jsx",
        lineNumber: 124,
        columnNumber: 5
    }, this);
}
_s(Hero, "w39EVfisojB0J6j/SnTDp7YGoO8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = Hero;
const __TURBOPACK__default__export__ = Hero;
var _c;
__turbopack_context__.k.register(_c, "Hero");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/component/WhatWeDo/components/DesignIdeasGrid.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_sliced_to_array.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_to_consumable_array.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useScrollAnimation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useScrollAnimation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$imagePath$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/imagePath.js [app-client] (ecmascript)");
;
;
;
var _this = ("TURBOPACK compile-time value", void 0);
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
var DesignIdeasGrid = function(param) {
    var images = param.images;
    _s();
    var _useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set()), 2), visibleImages = _useState[0], setVisibleImages = _useState[1];
    var _useScrollAnimation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useScrollAnimation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollAnimation"])({
        threshold: 0.1
    }), 2), sectionRef = _useScrollAnimation[0], sectionVisible = _useScrollAnimation[1];
    var imageTexts = [
        'Colorful Charms',
        'Bronze Charms',
        'Mixed Charms',
        'Flags'
    ];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DesignIdeasGrid.useEffect": function() {
            if (!sectionVisible) return;
            var timers = [];
            images.forEach({
                "DesignIdeasGrid.useEffect": function(_, index) {
                    // Staggered animation delay for each image
                    var delay = 500 + index * 100; // Start at 500ms, add 100ms per image
                    var timer = setTimeout({
                        "DesignIdeasGrid.useEffect.timer": function() {
                            setVisibleImages({
                                "DesignIdeasGrid.useEffect.timer": function(prev) {
                                    return new Set((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(prev).concat([
                                        index
                                    ]));
                                }
                            }["DesignIdeasGrid.useEffect.timer"]);
                        }
                    }["DesignIdeasGrid.useEffect.timer"], delay);
                    timers.push(timer);
                }
            }["DesignIdeasGrid.useEffect"]);
            return ({
                "DesignIdeasGrid.useEffect": function() {
                    timers.forEach({
                        "DesignIdeasGrid.useEffect": function(timer) {
                            return clearTimeout(timer);
                        }
                    }["DesignIdeasGrid.useEffect"]);
                }
            })["DesignIdeasGrid.useEffect"];
        }
    }["DesignIdeasGrid.useEffect"], [
        images,
        sectionVisible
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: sectionRef,
        className: "w-full mb-12 md:mb-16",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 w-full px-0",
            children: images.map(function(image, index) {
                var isVisible = visibleImages.has(index);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "group bg-white transition-all duration-700 ease-out  overflow-hidden ".concat(isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative w-full aspect-square overflow-hidden sm:min-h-[300px] ",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$imagePath$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeImagePath"])(image),
                                className: "absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110",
                                alt: "Design Idea ".concat(index + 1),
                                loading: index < 2 ? "eager" : "lazy",
                                fetchPriority: index < 2 ? "high" : "auto",
                                decoding: "async",
                                width: "400",
                                height: "400"
                            }, void 0, false, {
                                fileName: "[project]/src/component/WhatWeDo/components/DesignIdeasGrid.jsx",
                                lineNumber: 42,
                                columnNumber: 17
                            }, _this)
                        }, void 0, false, {
                            fileName: "[project]/src/component/WhatWeDo/components/DesignIdeasGrid.jsx",
                            lineNumber: 41,
                            columnNumber: 15
                        }, _this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white py-3 md:py-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-900 text-center text-md md:text-base font-light leading-tight font-inter",
                                children: imageTexts[index] || ''
                            }, void 0, false, {
                                fileName: "[project]/src/component/WhatWeDo/components/DesignIdeasGrid.jsx",
                                lineNumber: 55,
                                columnNumber: 17
                            }, _this)
                        }, void 0, false, {
                            fileName: "[project]/src/component/WhatWeDo/components/DesignIdeasGrid.jsx",
                            lineNumber: 54,
                            columnNumber: 15
                        }, _this)
                    ]
                }, index, true, {
                    fileName: "[project]/src/component/WhatWeDo/components/DesignIdeasGrid.jsx",
                    lineNumber: 35,
                    columnNumber: 13
                }, _this);
            })
        }, void 0, false, {
            fileName: "[project]/src/component/WhatWeDo/components/DesignIdeasGrid.jsx",
            lineNumber: 31,
            columnNumber: 7
        }, _this)
    }, void 0, false, {
        fileName: "[project]/src/component/WhatWeDo/components/DesignIdeasGrid.jsx",
        lineNumber: 30,
        columnNumber: 5
    }, _this);
};
_s(DesignIdeasGrid, "lZ5NSe0QSmZnNkjjeeQ+Ad3f1nM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useScrollAnimation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollAnimation"]
    ];
});
_c = DesignIdeasGrid;
const __TURBOPACK__default__export__ = DesignIdeasGrid;
var _c;
__turbopack_context__.k.register(_c, "DesignIdeasGrid");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/component/WhatWeDo/components/PerfectGiftSection.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_sliced_to_array.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useScrollAnimation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useScrollAnimation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$imagePath$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/imagePath.js [app-client] (ecmascript)");
;
;
var _this = ("TURBOPACK compile-time value", void 0);
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
var PerfectGiftSection = function(param) {
    var image = param.image;
    _s();
    var _useScrollAnimation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useScrollAnimation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollAnimation"])({
        threshold: 0.1
    }), 2), sectionRef = _useScrollAnimation[0], sectionVisible = _useScrollAnimation[1];
    var _useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0), 2), customerCount = _useState[0], setCustomerCount = _useState[1];
    var normalizedImage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$imagePath$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeImagePath"])(image);
    var title = "The Perfect Gift for Every Moment";
    var description = "Created with love for all the travelers who carry their stories around the world.";
    // Animated counter for happy customers - starts when section is visible
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PerfectGiftSection.useEffect": function() {
            if (!sectionVisible) return;
            var targetCount = 25;
            var duration = 2000; // 2 seconds
            var steps = 60;
            var increment = targetCount / steps;
            var stepDuration = duration / steps;
            var currentStep = 0;
            var counterInterval = setInterval({
                "PerfectGiftSection.useEffect.counterInterval": function() {
                    currentStep++;
                    var newCount = Math.min(Math.floor(increment * currentStep), targetCount);
                    setCustomerCount(newCount);
                    if (newCount >= targetCount) {
                        clearInterval(counterInterval);
                        setCustomerCount(targetCount);
                    }
                }
            }["PerfectGiftSection.useEffect.counterInterval"], stepDuration);
            return ({
                "PerfectGiftSection.useEffect": function() {
                    return clearInterval(counterInterval);
                }
            })["PerfectGiftSection.useEffect"];
        }
    }["PerfectGiftSection.useEffect"], [
        sectionVisible
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: sectionRef,
        className: "w-full flex flex-col md:flex-row items-stretch",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-full md:w-1/2 h-[400px] sm:h-[450px] md:h-[650px] lg:h-[700px] xl:h-[750px] overflow-hidden bg-gray-100",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: normalizedImage,
                        className: "absolute inset-0 w-full h-full object-cover",
                        alt: "Perfect Gift",
                        loading: "lazy",
                        fetchPriority: "low",
                        decoding: "async",
                        width: "1200",
                        height: "800",
                        onError: function(e) {
                            e.target.style.display = 'none';
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/component/WhatWeDo/components/PerfectGiftSection.jsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, _this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60 md:hidden flex items-center justify-center z-10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "container mx-auto px-4 sm:px-6 max-w-4xl text-center space-y-4 sm:space-y-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-subtitle-lg font-light text-white mb-4 sm:mb-5 font-inter tracking-title",
                                    style: {
                                        textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)'
                                    },
                                    children: title
                                }, void 0, false, {
                                    fileName: "[project]/src/component/WhatWeDo/components/PerfectGiftSection.jsx",
                                    lineNumber: 61,
                                    columnNumber: 13
                                }, _this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg text-white leading-relaxed font-light font-inter px-2 sm:px-4 mb-6",
                                    style: {
                                        textShadow: '1px 1px 4px rgba(0, 0, 0, 0.5)'
                                    },
                                    children: description
                                }, void 0, false, {
                                    fileName: "[project]/src/component/WhatWeDo/components/PerfectGiftSection.jsx",
                                    lineNumber: 64,
                                    columnNumber: 13
                                }, _this),
                                sectionVisible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col items-center gap-4 text-white mt-6",
                                    style: {
                                        textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-2xl font-light font-inter",
                                                    children: [
                                                        customerCount,
                                                        "+"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/component/WhatWeDo/components/PerfectGiftSection.jsx",
                                                    lineNumber: 72,
                                                    columnNumber: 19
                                                }, _this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm font-light font-inter",
                                                    children: "Happy Customers"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/component/WhatWeDo/components/PerfectGiftSection.jsx",
                                                    lineNumber: 75,
                                                    columnNumber: 19
                                                }, _this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/component/WhatWeDo/components/PerfectGiftSection.jsx",
                                            lineNumber: 71,
                                            columnNumber: 17
                                        }, _this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "https://www.etsy.com/shop/TheHappyCaseShop?ref=dashboard-header",
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "flex items-center gap-2 hover:opacity-80 transition-opacity",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm font-light font-inter",
                                                    children: "Reviews on Etsy"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/component/WhatWeDo/components/PerfectGiftSection.jsx",
                                                    lineNumber: 85,
                                                    columnNumber: 19
                                                }, _this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "w-4 h-4",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    viewBox: "0 0 24 24",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: 2,
                                                        d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/component/WhatWeDo/components/PerfectGiftSection.jsx",
                                                        lineNumber: 94,
                                                        columnNumber: 21
                                                    }, _this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/component/WhatWeDo/components/PerfectGiftSection.jsx",
                                                    lineNumber: 88,
                                                    columnNumber: 19
                                                }, _this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/component/WhatWeDo/components/PerfectGiftSection.jsx",
                                            lineNumber: 79,
                                            columnNumber: 17
                                        }, _this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/component/WhatWeDo/components/PerfectGiftSection.jsx",
                                    lineNumber: 70,
                                    columnNumber: 15
                                }, _this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/component/WhatWeDo/components/PerfectGiftSection.jsx",
                            lineNumber: 60,
                            columnNumber: 11
                        }, _this)
                    }, void 0, false, {
                        fileName: "[project]/src/component/WhatWeDo/components/PerfectGiftSection.jsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, _this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/component/WhatWeDo/components/PerfectGiftSection.jsx",
                lineNumber: 43,
                columnNumber: 7
            }, _this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hidden md:flex md:w-1/2 items-center justify-center bg-white",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container mx-auto px-6 md:px-8 lg:px-12 xl:px-16 py-12 lg:py-16 space-y-6 lg:space-y-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-subtitle-lg md:text-title font-light text-gray-900 mb-6 font-inter tracking-title",
                            children: title
                        }, void 0, false, {
                            fileName: "[project]/src/component/WhatWeDo/components/PerfectGiftSection.jsx",
                            lineNumber: 106,
                            columnNumber: 11
                        }, _this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-lg lg:text-xl xl:text-2xl text-gray-700 leading-relaxed font-light font-inter",
                            children: description
                        }, void 0, false, {
                            fileName: "[project]/src/component/WhatWeDo/components/PerfectGiftSection.jsx",
                            lineNumber: 109,
                            columnNumber: 11
                        }, _this),
                        sectionVisible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-row items-center gap-6 pt-4 border-t border-gray-200 mt-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-3xl font-light font-inter text-gray-900",
                                            children: [
                                                customerCount,
                                                "+"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/component/WhatWeDo/components/PerfectGiftSection.jsx",
                                            lineNumber: 117,
                                            columnNumber: 17
                                        }, _this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-base font-light font-inter text-gray-700",
                                            children: "Happy Customers"
                                        }, void 0, false, {
                                            fileName: "[project]/src/component/WhatWeDo/components/PerfectGiftSection.jsx",
                                            lineNumber: 120,
                                            columnNumber: 17
                                        }, _this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/component/WhatWeDo/components/PerfectGiftSection.jsx",
                                    lineNumber: 116,
                                    columnNumber: 15
                                }, _this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-px h-6 bg-gray-300"
                                }, void 0, false, {
                                    fileName: "[project]/src/component/WhatWeDo/components/PerfectGiftSection.jsx",
                                    lineNumber: 124,
                                    columnNumber: 15
                                }, _this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "https://www.etsy.com/shop/TheHappyCaseShop?ref=dashboard-header",
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    className: "flex items-center gap-2 hover:opacity-80 transition-opacity text-gray-700 hover:text-gray-900",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-base font-light font-inter",
                                            children: "Reviews on Etsy"
                                        }, void 0, false, {
                                            fileName: "[project]/src/component/WhatWeDo/components/PerfectGiftSection.jsx",
                                            lineNumber: 131,
                                            columnNumber: 17
                                        }, _this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "w-4 h-4",
                                            fill: "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                                d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                            }, void 0, false, {
                                                fileName: "[project]/src/component/WhatWeDo/components/PerfectGiftSection.jsx",
                                                lineNumber: 140,
                                                columnNumber: 19
                                            }, _this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/component/WhatWeDo/components/PerfectGiftSection.jsx",
                                            lineNumber: 134,
                                            columnNumber: 17
                                        }, _this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/component/WhatWeDo/components/PerfectGiftSection.jsx",
                                    lineNumber: 125,
                                    columnNumber: 15
                                }, _this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/component/WhatWeDo/components/PerfectGiftSection.jsx",
                            lineNumber: 115,
                            columnNumber: 13
                        }, _this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/component/WhatWeDo/components/PerfectGiftSection.jsx",
                    lineNumber: 105,
                    columnNumber: 9
                }, _this)
            }, void 0, false, {
                fileName: "[project]/src/component/WhatWeDo/components/PerfectGiftSection.jsx",
                lineNumber: 104,
                columnNumber: 7
            }, _this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/component/WhatWeDo/components/PerfectGiftSection.jsx",
        lineNumber: 41,
        columnNumber: 5
    }, _this);
};
_s(PerfectGiftSection, "1XHdwG1qbvM3kvjstltnuz4D7Gs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useScrollAnimation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollAnimation"]
    ];
});
_c = PerfectGiftSection;
const __TURBOPACK__default__export__ = PerfectGiftSection;
var _c;
__turbopack_context__.k.register(_c, "PerfectGiftSection");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/component/WhatWeDo/components/TwoBigImagesSection.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useScrollAnimation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useScrollAnimation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$imagePath$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/imagePath.js [app-client] (ecmascript)");
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
var TwoBigImagesSection = function(param) {
    var image1 = param.image1, image2 = param.image2;
    _s();
    var _useScrollAnimation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useScrollAnimation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollAnimation"])({
        threshold: 0.1
    }), 1), sectionRef = _useScrollAnimation[0];
    var router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    var normalizedImage1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$imagePath$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeImagePath"])(image1);
    var normalizedImage2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$imagePath$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeImagePath"])(image2);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: sectionRef,
        className: "w-full",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative w-full h-[400px] sm:h-[500px] md:h-[700px] lg:h-[800px] overflow-hidden bg-gray-100",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: normalizedImage1,
                            className: "absolute inset-0 w-full h-full object-cover",
                            alt: "Design idea",
                            loading: "lazy",
                            fetchPriority: "low",
                            decoding: "async",
                            width: "1200",
                            height: "800",
                            onError: function(e) {
                                e.target.style.display = 'none';
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/component/WhatWeDo/components/TwoBigImagesSection.jsx",
                            lineNumber: 19,
                            columnNumber: 11
                        }, _this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute bottom-0 left-0 right-0 flex items-end justify-center z-10 pb-6 md:pb-8",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: function() {
                                    window.scrollTo({
                                        top: 0,
                                        behavior: 'instant'
                                    });
                                    router.push('/CreateYours');
                                },
                                className: "px-8 py-3 text-sm uppercase tracking-wider font-inter bg-btn-primary-blue hover:bg-btn-primary-blue-hover text-btn-primary-blue-text border border-btn-primary-blue-border hover:border-btn-primary-blue-hover transition-all duration-200 shadow-lg",
                                children: "PERSONALISE"
                            }, void 0, false, {
                                fileName: "[project]/src/component/WhatWeDo/components/TwoBigImagesSection.jsx",
                                lineNumber: 35,
                                columnNumber: 13
                            }, _this)
                        }, void 0, false, {
                            fileName: "[project]/src/component/WhatWeDo/components/TwoBigImagesSection.jsx",
                            lineNumber: 34,
                            columnNumber: 11
                        }, _this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/component/WhatWeDo/components/TwoBigImagesSection.jsx",
                    lineNumber: 18,
                    columnNumber: 9
                }, _this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative w-full h-[400px] sm:h-[500px] md:h-[700px] lg:h-[800px] overflow-hidden bg-gray-100",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: normalizedImage2,
                            className: "absolute inset-0 w-full h-full object-cover",
                            alt: "Design idea",
                            loading: "lazy",
                            fetchPriority: "low",
                            decoding: "async",
                            width: "1200",
                            height: "800",
                            onError: function(e) {
                                e.target.style.display = 'none';
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/component/WhatWeDo/components/TwoBigImagesSection.jsx",
                            lineNumber: 49,
                            columnNumber: 11
                        }, _this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute bottom-0 left-0 right-0 flex items-end justify-center z-10 pb-6 md:pb-8",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: function() {
                                    window.scrollTo({
                                        top: 0,
                                        behavior: 'instant'
                                    });
                                    router.push('/CreateYours');
                                },
                                className: "px-8 py-3 text-sm uppercase tracking-wider font-inter bg-btn-primary-blue hover:bg-btn-primary-blue-hover text-btn-primary-blue-text border border-btn-primary-blue-border hover:border-btn-primary-blue-hover transition-all duration-200 shadow-lg",
                                children: "PERSONALISE"
                            }, void 0, false, {
                                fileName: "[project]/src/component/WhatWeDo/components/TwoBigImagesSection.jsx",
                                lineNumber: 65,
                                columnNumber: 13
                            }, _this)
                        }, void 0, false, {
                            fileName: "[project]/src/component/WhatWeDo/components/TwoBigImagesSection.jsx",
                            lineNumber: 64,
                            columnNumber: 11
                        }, _this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/component/WhatWeDo/components/TwoBigImagesSection.jsx",
                    lineNumber: 48,
                    columnNumber: 9
                }, _this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/component/WhatWeDo/components/TwoBigImagesSection.jsx",
            lineNumber: 16,
            columnNumber: 7
        }, _this)
    }, void 0, false, {
        fileName: "[project]/src/component/WhatWeDo/components/TwoBigImagesSection.jsx",
        lineNumber: 15,
        columnNumber: 5
    }, _this);
};
_s(TwoBigImagesSection, "1qaSK06WDXQKbPGZzkBWZ5Erf+A=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useScrollAnimation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollAnimation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = TwoBigImagesSection;
const __TURBOPACK__default__export__ = TwoBigImagesSection;
var _c;
__turbopack_context__.k.register(_c, "TwoBigImagesSection");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_component_bfa6a4fb._.js.map