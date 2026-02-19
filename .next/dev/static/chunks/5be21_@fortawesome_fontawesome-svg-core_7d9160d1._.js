(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@fortawesome/fontawesome-svg-core/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "api",
    ()=>api,
    "config",
    ()=>config$1,
    "counter",
    ()=>counter,
    "dom",
    ()=>dom$1,
    "findIconDefinition",
    ()=>findIconDefinition$1,
    "icon",
    ()=>icon,
    "layer",
    ()=>layer,
    "library",
    ()=>library$1,
    "noAuto",
    ()=>noAuto$1,
    "parse",
    ()=>parse$1,
    "text",
    ()=>text,
    "toHtml",
    ()=>toHtml$1
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_call_check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_class_call_check.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_create_class$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_create_class.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_sliced_to_array.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_to_consumable_array.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
;
;
;
;
;
/*!
 * Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2024 Fonticons, Inc.
 */ function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[r] = t, e;
}
function _inherits(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
    t.prototype = Object.create(e && e.prototype, {
        constructor: {
            value: t,
            writable: !0,
            configurable: !0
        }
    }), Object.defineProperty(t, "prototype", {
        writable: !1
    }), e && _setPrototypeOf(t, e);
}
function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r) {
            return Object.getOwnPropertyDescriptor(e, r).enumerable;
        })), t.push.apply(t, o);
    }
    return t;
}
function _objectSpread2(e) {
    for(var r = 1; r < arguments.length; r++){
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
            _defineProperty(e, r, t[r]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
        });
    }
    return e;
}
function _setPrototypeOf(t, e) {
    return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(t, e) {
        return t.__proto__ = e, t;
    }, _setPrototypeOf(t, e);
}
function _toPrimitive(t, r) {
    if ("object" != (typeof t === "undefined" ? "undefined" : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(t)) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != (typeof i === "undefined" ? "undefined" : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(i))) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == (typeof i === "undefined" ? "undefined" : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(i)) ? i : i + "";
}
function _wrapRegExp() {
    _wrapRegExp = function _wrapRegExp(e, r) {
        return new BabelRegExp(e, void 0, r);
    };
    var e = RegExp.prototype, r = new WeakMap();
    function BabelRegExp(e, t, p) {
        var o = RegExp(e, t);
        return r.set(o, p || r.get(e)), _setPrototypeOf(o, BabelRegExp.prototype);
    }
    function buildGroups(e, t) {
        var p = r.get(t);
        return Object.keys(p).reduce(function(r, t) {
            var o = p[t];
            if ("number" == typeof o) r[t] = e[o];
            else {
                for(var i = 0; void 0 === e[o[i]] && i + 1 < o.length;)i++;
                r[t] = e[o[i]];
            }
            return r;
        }, Object.create(null));
    }
    return _inherits(BabelRegExp, RegExp), BabelRegExp.prototype.exec = function(r) {
        var t = e.exec.call(this, r);
        if (t) {
            t.groups = buildGroups(t, this);
            var p = t.indices;
            p && (p.groups = buildGroups(p, this));
        }
        return t;
    }, BabelRegExp.prototype[Symbol.replace] = function(t, p) {
        if ("string" == typeof p) {
            var o = r.get(this);
            return e[Symbol.replace].call(this, t, p.replace(/\$<([^>]+)>/g, function(e, r) {
                var _$t = o[r];
                return "$" + (Array.isArray(_$t) ? _$t.join("$") : _$t);
            }));
        }
        if ("function" == typeof p) {
            var i = this;
            return e[Symbol.replace].call(this, t, function() {
                var e = arguments;
                return "object" != (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(e[e.length - 1]) && (e = [].slice.call(e)).push(buildGroups(e, i)), p.apply(this, e);
            });
        }
        return e[Symbol.replace].call(this, t, p);
    }, _wrapRegExp.apply(this, arguments);
}
var noop = function() {};
var _WINDOW = {};
var _DOCUMENT = {};
var _MUTATION_OBSERVER = null;
var _PERFORMANCE = {
    mark: noop,
    measure: noop
};
try {
    if (typeof window !== 'undefined') _WINDOW = window;
    if (typeof document !== 'undefined') _DOCUMENT = document;
    if (typeof MutationObserver !== 'undefined') _MUTATION_OBSERVER = MutationObserver;
    if (typeof performance !== 'undefined') _PERFORMANCE = performance;
} catch (e) {}
var _ref = _WINDOW.navigator || {}, _ref_userAgent = _ref.userAgent, userAgent = _ref_userAgent === void 0 ? '' : _ref_userAgent;
var WINDOW = _WINDOW;
var DOCUMENT = _DOCUMENT;
var MUTATION_OBSERVER = _MUTATION_OBSERVER;
var PERFORMANCE = _PERFORMANCE;
var IS_BROWSER = !!WINDOW.document;
var IS_DOM = !!DOCUMENT.documentElement && !!DOCUMENT.head && typeof DOCUMENT.addEventListener === 'function' && typeof DOCUMENT.createElement === 'function';
var IS_IE = ~userAgent.indexOf('MSIE') || ~userAgent.indexOf('Trident/');
var p = /fa(s|r|l|t|d|dr|dl|dt|b|k|kd|ss|sr|sl|st|sds|sdr|sdl|sdt)?[\-\ ]/, g = /Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit)?.*/i;
var S = {
    classic: {
        fa: "solid",
        fas: "solid",
        "fa-solid": "solid",
        far: "regular",
        "fa-regular": "regular",
        fal: "light",
        "fa-light": "light",
        fat: "thin",
        "fa-thin": "thin",
        fab: "brands",
        "fa-brands": "brands"
    },
    duotone: {
        fa: "solid",
        fad: "solid",
        "fa-solid": "solid",
        "fa-duotone": "solid",
        fadr: "regular",
        "fa-regular": "regular",
        fadl: "light",
        "fa-light": "light",
        fadt: "thin",
        "fa-thin": "thin"
    },
    sharp: {
        fa: "solid",
        fass: "solid",
        "fa-solid": "solid",
        fasr: "regular",
        "fa-regular": "regular",
        fasl: "light",
        "fa-light": "light",
        fast: "thin",
        "fa-thin": "thin"
    },
    "sharp-duotone": {
        fa: "solid",
        fasds: "solid",
        "fa-solid": "solid",
        fasdr: "regular",
        "fa-regular": "regular",
        fasdl: "light",
        "fa-light": "light",
        fasdt: "thin",
        "fa-thin": "thin"
    }
}, A = {
    GROUP: "duotone-group",
    SWAP_OPACITY: "swap-opacity",
    PRIMARY: "primary",
    SECONDARY: "secondary"
}, P = [
    "fa-classic",
    "fa-duotone",
    "fa-sharp",
    "fa-sharp-duotone"
];
var s = "classic", t = "duotone", r = "sharp", o = "sharp-duotone", L = [
    s,
    t,
    r,
    o
];
var G = {
    classic: {
        900: "fas",
        400: "far",
        normal: "far",
        300: "fal",
        100: "fat"
    },
    duotone: {
        900: "fad",
        400: "fadr",
        300: "fadl",
        100: "fadt"
    },
    sharp: {
        900: "fass",
        400: "fasr",
        300: "fasl",
        100: "fast"
    },
    "sharp-duotone": {
        900: "fasds",
        400: "fasdr",
        300: "fasdl",
        100: "fasdt"
    }
};
var lt = {
    "Font Awesome 6 Free": {
        900: "fas",
        400: "far"
    },
    "Font Awesome 6 Pro": {
        900: "fas",
        400: "far",
        normal: "far",
        300: "fal",
        100: "fat"
    },
    "Font Awesome 6 Brands": {
        400: "fab",
        normal: "fab"
    },
    "Font Awesome 6 Duotone": {
        900: "fad",
        400: "fadr",
        normal: "fadr",
        300: "fadl",
        100: "fadt"
    },
    "Font Awesome 6 Sharp": {
        900: "fass",
        400: "fasr",
        normal: "fasr",
        300: "fasl",
        100: "fast"
    },
    "Font Awesome 6 Sharp Duotone": {
        900: "fasds",
        400: "fasdr",
        normal: "fasdr",
        300: "fasdl",
        100: "fasdt"
    }
};
var pt = new Map([
    [
        "classic",
        {
            defaultShortPrefixId: "fas",
            defaultStyleId: "solid",
            styleIds: [
                "solid",
                "regular",
                "light",
                "thin",
                "brands"
            ],
            futureStyleIds: [],
            defaultFontWeight: 900
        }
    ],
    [
        "sharp",
        {
            defaultShortPrefixId: "fass",
            defaultStyleId: "solid",
            styleIds: [
                "solid",
                "regular",
                "light",
                "thin"
            ],
            futureStyleIds: [],
            defaultFontWeight: 900
        }
    ],
    [
        "duotone",
        {
            defaultShortPrefixId: "fad",
            defaultStyleId: "solid",
            styleIds: [
                "solid",
                "regular",
                "light",
                "thin"
            ],
            futureStyleIds: [],
            defaultFontWeight: 900
        }
    ],
    [
        "sharp-duotone",
        {
            defaultShortPrefixId: "fasds",
            defaultStyleId: "solid",
            styleIds: [
                "solid",
                "regular",
                "light",
                "thin"
            ],
            futureStyleIds: [],
            defaultFontWeight: 900
        }
    ]
]), xt = {
    classic: {
        solid: "fas",
        regular: "far",
        light: "fal",
        thin: "fat",
        brands: "fab"
    },
    duotone: {
        solid: "fad",
        regular: "fadr",
        light: "fadl",
        thin: "fadt"
    },
    sharp: {
        solid: "fass",
        regular: "fasr",
        light: "fasl",
        thin: "fast"
    },
    "sharp-duotone": {
        solid: "fasds",
        regular: "fasdr",
        light: "fasdl",
        thin: "fasdt"
    }
};
var Ft = [
    "fak",
    "fa-kit",
    "fakd",
    "fa-kit-duotone"
], St = {
    kit: {
        fak: "kit",
        "fa-kit": "kit"
    },
    "kit-duotone": {
        fakd: "kit-duotone",
        "fa-kit-duotone": "kit-duotone"
    }
}, At = [
    "kit"
];
var Ct = {
    kit: {
        "fa-kit": "fak"
    },
    "kit-duotone": {
        "fa-kit-duotone": "fakd"
    }
};
var Lt = [
    "fak",
    "fakd"
], Wt = {
    kit: {
        fak: "fa-kit"
    },
    "kit-duotone": {
        fakd: "fa-kit-duotone"
    }
};
var Et = {
    kit: {
        kit: "fak"
    },
    "kit-duotone": {
        "kit-duotone": "fakd"
    }
};
var t$1 = {
    GROUP: "duotone-group",
    SWAP_OPACITY: "swap-opacity",
    PRIMARY: "primary",
    SECONDARY: "secondary"
}, r$1 = [
    "fa-classic",
    "fa-duotone",
    "fa-sharp",
    "fa-sharp-duotone"
];
var bt$1 = [
    "fak",
    "fa-kit",
    "fakd",
    "fa-kit-duotone"
];
var Yt = {
    "Font Awesome Kit": {
        400: "fak",
        normal: "fak"
    },
    "Font Awesome Kit Duotone": {
        400: "fakd",
        normal: "fakd"
    }
};
var ua = {
    classic: {
        "fa-brands": "fab",
        "fa-duotone": "fad",
        "fa-light": "fal",
        "fa-regular": "far",
        "fa-solid": "fas",
        "fa-thin": "fat"
    },
    duotone: {
        "fa-regular": "fadr",
        "fa-light": "fadl",
        "fa-thin": "fadt"
    },
    sharp: {
        "fa-solid": "fass",
        "fa-regular": "fasr",
        "fa-light": "fasl",
        "fa-thin": "fast"
    },
    "sharp-duotone": {
        "fa-solid": "fasds",
        "fa-regular": "fasdr",
        "fa-light": "fasdl",
        "fa-thin": "fasdt"
    }
}, I$1 = {
    classic: [
        "fas",
        "far",
        "fal",
        "fat",
        "fad"
    ],
    duotone: [
        "fadr",
        "fadl",
        "fadt"
    ],
    sharp: [
        "fass",
        "fasr",
        "fasl",
        "fast"
    ],
    "sharp-duotone": [
        "fasds",
        "fasdr",
        "fasdl",
        "fasdt"
    ]
}, ga = {
    classic: {
        fab: "fa-brands",
        fad: "fa-duotone",
        fal: "fa-light",
        far: "fa-regular",
        fas: "fa-solid",
        fat: "fa-thin"
    },
    duotone: {
        fadr: "fa-regular",
        fadl: "fa-light",
        fadt: "fa-thin"
    },
    sharp: {
        fass: "fa-solid",
        fasr: "fa-regular",
        fasl: "fa-light",
        fast: "fa-thin"
    },
    "sharp-duotone": {
        fasds: "fa-solid",
        fasdr: "fa-regular",
        fasdl: "fa-light",
        fasdt: "fa-thin"
    }
}, x = [
    "fa-solid",
    "fa-regular",
    "fa-light",
    "fa-thin",
    "fa-duotone",
    "fa-brands"
], Ia = [
    "fa",
    "fas",
    "far",
    "fal",
    "fat",
    "fad",
    "fadr",
    "fadl",
    "fadt",
    "fab",
    "fass",
    "fasr",
    "fasl",
    "fast",
    "fasds",
    "fasdr",
    "fasdl",
    "fasdt"
].concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(r$1), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(x)), m$1 = [
    "solid",
    "regular",
    "light",
    "thin",
    "duotone",
    "brands"
], c$1 = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10
], F$1 = c$1.concat([
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20
]), ma = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(Object.keys(I$1)).concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(m$1), [
    "2xs",
    "xs",
    "sm",
    "lg",
    "xl",
    "2xl",
    "beat",
    "border",
    "fade",
    "beat-fade",
    "bounce",
    "flip-both",
    "flip-horizontal",
    "flip-vertical",
    "flip",
    "fw",
    "inverse",
    "layers-counter",
    "layers-text",
    "layers",
    "li",
    "pull-left",
    "pull-right",
    "pulse",
    "rotate-180",
    "rotate-270",
    "rotate-90",
    "rotate-by",
    "shake",
    "spin-pulse",
    "spin-reverse",
    "spin",
    "stack-1x",
    "stack-2x",
    "stack",
    "ul",
    t$1.GROUP,
    t$1.SWAP_OPACITY,
    t$1.PRIMARY,
    t$1.SECONDARY
]).concat(c$1.map(function(a) {
    return "".concat(a, "x");
})).concat(F$1.map(function(a) {
    return "w-".concat(a);
}));
var wa = {
    "Font Awesome 5 Free": {
        900: "fas",
        400: "far"
    },
    "Font Awesome 5 Pro": {
        900: "fas",
        400: "far",
        normal: "far",
        300: "fal"
    },
    "Font Awesome 5 Brands": {
        400: "fab",
        normal: "fab"
    },
    "Font Awesome 5 Duotone": {
        900: "fad"
    }
};
var NAMESPACE_IDENTIFIER = '___FONT_AWESOME___';
var UNITS_IN_GRID = 16;
var DEFAULT_CSS_PREFIX = 'fa';
var DEFAULT_REPLACEMENT_CLASS = 'svg-inline--fa';
var DATA_FA_I2SVG = 'data-fa-i2svg';
var DATA_FA_PSEUDO_ELEMENT = 'data-fa-pseudo-element';
var DATA_FA_PSEUDO_ELEMENT_PENDING = 'data-fa-pseudo-element-pending';
var DATA_PREFIX = 'data-prefix';
var DATA_ICON = 'data-icon';
var HTML_CLASS_I2SVG_BASE_CLASS = 'fontawesome-i2svg';
var MUTATION_APPROACH_ASYNC = 'async';
var TAGNAMES_TO_SKIP_FOR_PSEUDOELEMENTS = [
    'HTML',
    'HEAD',
    'STYLE',
    'SCRIPT'
];
var PRODUCTION = function() {
    try {
        return ("TURBOPACK compile-time value", "development") === 'production';
    } catch (e$$1) {
        return false;
    }
}();
function familyProxy(obj) {
    // Defaults to the classic family if family is not available
    return new Proxy(obj, {
        get: function get(target, prop) {
            return prop in target ? target[prop] : target[s];
        }
    });
}
var _PREFIX_TO_STYLE = _objectSpread2({}, S);
// We changed FACSSClassesToStyleId in the icons repo to be canonical and as such, "classic" family does not have any
// duotone styles.  But we do still need duotone in _PREFIX_TO_STYLE below, so we are manually adding
// {'fa-duotone': 'duotone'}
_PREFIX_TO_STYLE[s] = _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, {
    'fa-duotone': 'duotone'
}), S[s]), St['kit']), St['kit-duotone']);
var PREFIX_TO_STYLE = familyProxy(_PREFIX_TO_STYLE);
var _STYLE_TO_PREFIX = _objectSpread2({}, xt);
// We changed FAStyleIdToShortPrefixId in the icons repo to be canonical and as such, "classic" family does not have any
// duotone styles.  But we do still need duotone in _STYLE_TO_PREFIX below, so we are manually adding {duotone: 'fad'}
_STYLE_TO_PREFIX[s] = _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, {
    duotone: 'fad'
}), _STYLE_TO_PREFIX[s]), Et['kit']), Et['kit-duotone']);
var STYLE_TO_PREFIX = familyProxy(_STYLE_TO_PREFIX);
var _PREFIX_TO_LONG_STYLE = _objectSpread2({}, ga);
_PREFIX_TO_LONG_STYLE[s] = _objectSpread2(_objectSpread2({}, _PREFIX_TO_LONG_STYLE[s]), Wt['kit']);
var PREFIX_TO_LONG_STYLE = familyProxy(_PREFIX_TO_LONG_STYLE);
var _LONG_STYLE_TO_PREFIX = _objectSpread2({}, ua);
_LONG_STYLE_TO_PREFIX[s] = _objectSpread2(_objectSpread2({}, _LONG_STYLE_TO_PREFIX[s]), Ct['kit']);
var LONG_STYLE_TO_PREFIX = familyProxy(_LONG_STYLE_TO_PREFIX);
var ICON_SELECTION_SYNTAX_PATTERN = p; // eslint-disable-line no-useless-escape
var LAYERS_TEXT_CLASSNAME = 'fa-layers-text';
var FONT_FAMILY_PATTERN = g;
var _FONT_WEIGHT_TO_PREFIX = _objectSpread2({}, G);
var FONT_WEIGHT_TO_PREFIX = familyProxy(_FONT_WEIGHT_TO_PREFIX);
var ATTRIBUTES_WATCHED_FOR_MUTATION = [
    'class',
    'data-prefix',
    'data-icon',
    'data-fa-transform',
    'data-fa-mask'
];
var DUOTONE_CLASSES = A;
var RESERVED_CLASSES = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(At).concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(ma));
var initial = WINDOW.FontAwesomeConfig || {};
function getAttrConfig(attr) {
    var element = DOCUMENT.querySelector('script[' + attr + ']');
    if (element) {
        return element.getAttribute(attr);
    }
}
function coerce(val) {
    // Getting an empty string will occur if the attribute is set on the HTML tag but without a value
    // We'll assume that this is an indication that it should be toggled to true
    if (val === '') return true;
    if (val === 'false') return false;
    if (val === 'true') return true;
    return val;
}
if (DOCUMENT && typeof DOCUMENT.querySelector === 'function') {
    var attrs = [
        [
            'data-family-prefix',
            'familyPrefix'
        ],
        [
            'data-css-prefix',
            'cssPrefix'
        ],
        [
            'data-family-default',
            'familyDefault'
        ],
        [
            'data-style-default',
            'styleDefault'
        ],
        [
            'data-replacement-class',
            'replacementClass'
        ],
        [
            'data-auto-replace-svg',
            'autoReplaceSvg'
        ],
        [
            'data-auto-add-css',
            'autoAddCss'
        ],
        [
            'data-auto-a11y',
            'autoA11y'
        ],
        [
            'data-search-pseudo-elements',
            'searchPseudoElements'
        ],
        [
            'data-observe-mutations',
            'observeMutations'
        ],
        [
            'data-mutate-approach',
            'mutateApproach'
        ],
        [
            'data-keep-original-source',
            'keepOriginalSource'
        ],
        [
            'data-measure-performance',
            'measurePerformance'
        ],
        [
            'data-show-missing-icons',
            'showMissingIcons'
        ]
    ];
    attrs.forEach(function(_ref) {
        var _$_ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(_ref, 2), attr = _$_ref[0], key = _$_ref[1];
        var val = coerce(getAttrConfig(attr));
        if (val !== undefined && val !== null) {
            initial[key] = val;
        }
    });
}
var _default = {
    styleDefault: 'solid',
    familyDefault: s,
    cssPrefix: DEFAULT_CSS_PREFIX,
    replacementClass: DEFAULT_REPLACEMENT_CLASS,
    autoReplaceSvg: true,
    autoAddCss: true,
    autoA11y: true,
    searchPseudoElements: false,
    observeMutations: true,
    mutateApproach: 'async',
    keepOriginalSource: true,
    measurePerformance: false,
    showMissingIcons: true
};
// familyPrefix is deprecated but we must still support it if present
if (initial.familyPrefix) {
    initial.cssPrefix = initial.familyPrefix;
}
var _config = _objectSpread2(_objectSpread2({}, _default), initial);
if (!_config.autoReplaceSvg) _config.observeMutations = false;
var config = {};
Object.keys(_default).forEach(function(key) {
    Object.defineProperty(config, key, {
        enumerable: true,
        set: function set(val) {
            _config[key] = val;
            _onChangeCb.forEach(function(cb) {
                return cb(config);
            });
        },
        get: function get() {
            return _config[key];
        }
    });
});
// familyPrefix is deprecated as of 6.2.0 and should be removed in 7.0.0
Object.defineProperty(config, 'familyPrefix', {
    enumerable: true,
    set: function set(val) {
        _config.cssPrefix = val;
        _onChangeCb.forEach(function(cb) {
            return cb(config);
        });
    },
    get: function get() {
        return _config.cssPrefix;
    }
});
WINDOW.FontAwesomeConfig = config;
var _onChangeCb = [];
function onChange(cb) {
    _onChangeCb.push(cb);
    return function() {
        _onChangeCb.splice(_onChangeCb.indexOf(cb), 1);
    };
}
var d$2 = UNITS_IN_GRID;
var meaninglessTransform = {
    size: 16,
    x: 0,
    y: 0,
    rotate: 0,
    flipX: false,
    flipY: false
};
function insertCss(css) {
    if (!css || !IS_DOM) {
        return;
    }
    var style = DOCUMENT.createElement('style');
    style.setAttribute('type', 'text/css');
    style.innerHTML = css;
    var headChildren = DOCUMENT.head.childNodes;
    var beforeChild = null;
    for(var i = headChildren.length - 1; i > -1; i--){
        var child = headChildren[i];
        var tagName = (child.tagName || '').toUpperCase();
        if ([
            'STYLE',
            'LINK'
        ].indexOf(tagName) > -1) {
            beforeChild = child;
        }
    }
    DOCUMENT.head.insertBefore(style, beforeChild);
    return css;
}
var idPool = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
function nextUniqueId() {
    var size = 12;
    var id = '';
    while(size-- > 0){
        id += idPool[Math.random() * 62 | 0];
    }
    return id;
}
function toArray(obj) {
    var array = [];
    for(var i = (obj || []).length >>> 0; i--;){
        array[i] = obj[i];
    }
    return array;
}
function classArray(node) {
    if (node.classList) {
        return toArray(node.classList);
    } else {
        return (node.getAttribute('class') || '').split(' ').filter(function(i) {
            return i;
        });
    }
}
function htmlEscape(str) {
    return "".concat(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function joinAttributes(attributes) {
    return Object.keys(attributes || {}).reduce(function(acc, attributeName) {
        return acc + "".concat(attributeName, "=\"").concat(htmlEscape(attributes[attributeName]), "\" ");
    }, '').trim();
}
function joinStyles(styles) {
    return Object.keys(styles || {}).reduce(function(acc, styleName) {
        return acc + "".concat(styleName, ": ").concat(styles[styleName].trim(), ";");
    }, '');
}
function transformIsMeaningful(transform) {
    return transform.size !== meaninglessTransform.size || transform.x !== meaninglessTransform.x || transform.y !== meaninglessTransform.y || transform.rotate !== meaninglessTransform.rotate || transform.flipX || transform.flipY;
}
function transformForSvg(_ref) {
    var transform = _ref.transform, containerWidth = _ref.containerWidth, iconWidth = _ref.iconWidth;
    var outer = {
        transform: "translate(".concat(containerWidth / 2, " 256)")
    };
    var innerTranslate = "translate(".concat(transform.x * 32, ", ").concat(transform.y * 32, ") ");
    var innerScale = "scale(".concat(transform.size / 16 * (transform.flipX ? -1 : 1), ", ").concat(transform.size / 16 * (transform.flipY ? -1 : 1), ") ");
    var innerRotate = "rotate(".concat(transform.rotate, " 0 0)");
    var inner = {
        transform: "".concat(innerTranslate, " ").concat(innerScale, " ").concat(innerRotate)
    };
    var path = {
        transform: "translate(".concat(iconWidth / 2 * -1, " -256)")
    };
    return {
        outer: outer,
        inner: inner,
        path: path
    };
}
function transformForCss(_ref2) {
    var transform = _ref2.transform, _ref2_width = _ref2.width, width = _ref2_width === void 0 ? UNITS_IN_GRID : _ref2_width, _ref2_height = _ref2.height, height = _ref2_height === void 0 ? UNITS_IN_GRID : _ref2_height, _ref2_startCentered = _ref2.startCentered, startCentered = _ref2_startCentered === void 0 ? false : _ref2_startCentered;
    var val = '';
    if (startCentered && IS_IE) {
        val += "translate(".concat(transform.x / d$2 - width / 2, "em, ").concat(transform.y / d$2 - height / 2, "em) ");
    } else if (startCentered) {
        val += "translate(calc(-50% + ".concat(transform.x / d$2, "em), calc(-50% + ").concat(transform.y / d$2, "em)) ");
    } else {
        val += "translate(".concat(transform.x / d$2, "em, ").concat(transform.y / d$2, "em) ");
    }
    val += "scale(".concat(transform.size / d$2 * (transform.flipX ? -1 : 1), ", ").concat(transform.size / d$2 * (transform.flipY ? -1 : 1), ") ");
    val += "rotate(".concat(transform.rotate, "deg) ");
    return val;
}
var baseStyles = ":root, :host {\n  --fa-font-solid: normal 900 1em/1 \"Font Awesome 6 Free\";\n  --fa-font-regular: normal 400 1em/1 \"Font Awesome 6 Free\";\n  --fa-font-light: normal 300 1em/1 \"Font Awesome 6 Pro\";\n  --fa-font-thin: normal 100 1em/1 \"Font Awesome 6 Pro\";\n  --fa-font-duotone: normal 900 1em/1 \"Font Awesome 6 Duotone\";\n  --fa-font-duotone-regular: normal 400 1em/1 \"Font Awesome 6 Duotone\";\n  --fa-font-duotone-light: normal 300 1em/1 \"Font Awesome 6 Duotone\";\n  --fa-font-duotone-thin: normal 100 1em/1 \"Font Awesome 6 Duotone\";\n  --fa-font-brands: normal 400 1em/1 \"Font Awesome 6 Brands\";\n  --fa-font-sharp-solid: normal 900 1em/1 \"Font Awesome 6 Sharp\";\n  --fa-font-sharp-regular: normal 400 1em/1 \"Font Awesome 6 Sharp\";\n  --fa-font-sharp-light: normal 300 1em/1 \"Font Awesome 6 Sharp\";\n  --fa-font-sharp-thin: normal 100 1em/1 \"Font Awesome 6 Sharp\";\n  --fa-font-sharp-duotone-solid: normal 900 1em/1 \"Font Awesome 6 Sharp Duotone\";\n  --fa-font-sharp-duotone-regular: normal 400 1em/1 \"Font Awesome 6 Sharp Duotone\";\n  --fa-font-sharp-duotone-light: normal 300 1em/1 \"Font Awesome 6 Sharp Duotone\";\n  --fa-font-sharp-duotone-thin: normal 100 1em/1 \"Font Awesome 6 Sharp Duotone\";\n}\n\nsvg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {\n  overflow: visible;\n  box-sizing: content-box;\n}\n\n.svg-inline--fa {\n  display: var(--fa-display, inline-block);\n  height: 1em;\n  overflow: visible;\n  vertical-align: -0.125em;\n}\n.svg-inline--fa.fa-2xs {\n  vertical-align: 0.1em;\n}\n.svg-inline--fa.fa-xs {\n  vertical-align: 0em;\n}\n.svg-inline--fa.fa-sm {\n  vertical-align: -0.0714285705em;\n}\n.svg-inline--fa.fa-lg {\n  vertical-align: -0.2em;\n}\n.svg-inline--fa.fa-xl {\n  vertical-align: -0.25em;\n}\n.svg-inline--fa.fa-2xl {\n  vertical-align: -0.3125em;\n}\n.svg-inline--fa.fa-pull-left {\n  margin-right: var(--fa-pull-margin, 0.3em);\n  width: auto;\n}\n.svg-inline--fa.fa-pull-right {\n  margin-left: var(--fa-pull-margin, 0.3em);\n  width: auto;\n}\n.svg-inline--fa.fa-li {\n  width: var(--fa-li-width, 2em);\n  top: 0.25em;\n}\n.svg-inline--fa.fa-fw {\n  width: var(--fa-fw-width, 1.25em);\n}\n\n.fa-layers svg.svg-inline--fa {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.fa-layers-counter, .fa-layers-text {\n  display: inline-block;\n  position: absolute;\n  text-align: center;\n}\n\n.fa-layers {\n  display: inline-block;\n  height: 1em;\n  position: relative;\n  text-align: center;\n  vertical-align: -0.125em;\n  width: 1em;\n}\n.fa-layers svg.svg-inline--fa {\n  transform-origin: center center;\n}\n\n.fa-layers-text {\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  transform-origin: center center;\n}\n\n.fa-layers-counter {\n  background-color: var(--fa-counter-background-color, #ff253a);\n  border-radius: var(--fa-counter-border-radius, 1em);\n  box-sizing: border-box;\n  color: var(--fa-inverse, #fff);\n  line-height: var(--fa-counter-line-height, 1);\n  max-width: var(--fa-counter-max-width, 5em);\n  min-width: var(--fa-counter-min-width, 1.5em);\n  overflow: hidden;\n  padding: var(--fa-counter-padding, 0.25em 0.5em);\n  right: var(--fa-right, 0);\n  text-overflow: ellipsis;\n  top: var(--fa-top, 0);\n  transform: scale(var(--fa-counter-scale, 0.25));\n  transform-origin: top right;\n}\n\n.fa-layers-bottom-right {\n  bottom: var(--fa-bottom, 0);\n  right: var(--fa-right, 0);\n  top: auto;\n  transform: scale(var(--fa-layers-scale, 0.25));\n  transform-origin: bottom right;\n}\n\n.fa-layers-bottom-left {\n  bottom: var(--fa-bottom, 0);\n  left: var(--fa-left, 0);\n  right: auto;\n  top: auto;\n  transform: scale(var(--fa-layers-scale, 0.25));\n  transform-origin: bottom left;\n}\n\n.fa-layers-top-right {\n  top: var(--fa-top, 0);\n  right: var(--fa-right, 0);\n  transform: scale(var(--fa-layers-scale, 0.25));\n  transform-origin: top right;\n}\n\n.fa-layers-top-left {\n  left: var(--fa-left, 0);\n  right: auto;\n  top: var(--fa-top, 0);\n  transform: scale(var(--fa-layers-scale, 0.25));\n  transform-origin: top left;\n}\n\n.fa-1x {\n  font-size: 1em;\n}\n\n.fa-2x {\n  font-size: 2em;\n}\n\n.fa-3x {\n  font-size: 3em;\n}\n\n.fa-4x {\n  font-size: 4em;\n}\n\n.fa-5x {\n  font-size: 5em;\n}\n\n.fa-6x {\n  font-size: 6em;\n}\n\n.fa-7x {\n  font-size: 7em;\n}\n\n.fa-8x {\n  font-size: 8em;\n}\n\n.fa-9x {\n  font-size: 9em;\n}\n\n.fa-10x {\n  font-size: 10em;\n}\n\n.fa-2xs {\n  font-size: 0.625em;\n  line-height: 0.1em;\n  vertical-align: 0.225em;\n}\n\n.fa-xs {\n  font-size: 0.75em;\n  line-height: 0.0833333337em;\n  vertical-align: 0.125em;\n}\n\n.fa-sm {\n  font-size: 0.875em;\n  line-height: 0.0714285718em;\n  vertical-align: 0.0535714295em;\n}\n\n.fa-lg {\n  font-size: 1.25em;\n  line-height: 0.05em;\n  vertical-align: -0.075em;\n}\n\n.fa-xl {\n  font-size: 1.5em;\n  line-height: 0.0416666682em;\n  vertical-align: -0.125em;\n}\n\n.fa-2xl {\n  font-size: 2em;\n  line-height: 0.03125em;\n  vertical-align: -0.1875em;\n}\n\n.fa-fw {\n  text-align: center;\n  width: 1.25em;\n}\n\n.fa-ul {\n  list-style-type: none;\n  margin-left: var(--fa-li-margin, 2.5em);\n  padding-left: 0;\n}\n.fa-ul > li {\n  position: relative;\n}\n\n.fa-li {\n  left: calc(-1 * var(--fa-li-width, 2em));\n  position: absolute;\n  text-align: center;\n  width: var(--fa-li-width, 2em);\n  line-height: inherit;\n}\n\n.fa-border {\n  border-color: var(--fa-border-color, #eee);\n  border-radius: var(--fa-border-radius, 0.1em);\n  border-style: var(--fa-border-style, solid);\n  border-width: var(--fa-border-width, 0.08em);\n  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);\n}\n\n.fa-pull-left {\n  float: left;\n  margin-right: var(--fa-pull-margin, 0.3em);\n}\n\n.fa-pull-right {\n  float: right;\n  margin-left: var(--fa-pull-margin, 0.3em);\n}\n\n.fa-beat {\n  animation-name: fa-beat;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, ease-in-out);\n}\n\n.fa-bounce {\n  animation-name: fa-bounce;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));\n}\n\n.fa-fade {\n  animation-name: fa-fade;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n}\n\n.fa-beat-fade {\n  animation-name: fa-beat-fade;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n}\n\n.fa-flip {\n  animation-name: fa-flip;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, ease-in-out);\n}\n\n.fa-shake {\n  animation-name: fa-shake;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, linear);\n}\n\n.fa-spin {\n  animation-name: fa-spin;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 2s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, linear);\n}\n\n.fa-spin-reverse {\n  --fa-animation-direction: reverse;\n}\n\n.fa-pulse,\n.fa-spin-pulse {\n  animation-name: fa-spin;\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, steps(8));\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .fa-beat,\n.fa-bounce,\n.fa-fade,\n.fa-beat-fade,\n.fa-flip,\n.fa-pulse,\n.fa-shake,\n.fa-spin,\n.fa-spin-pulse {\n    animation-delay: -1ms;\n    animation-duration: 1ms;\n    animation-iteration-count: 1;\n    transition-delay: 0s;\n    transition-duration: 0s;\n  }\n}\n@keyframes fa-beat {\n  0%, 90% {\n    transform: scale(1);\n  }\n  45% {\n    transform: scale(var(--fa-beat-scale, 1.25));\n  }\n}\n@keyframes fa-bounce {\n  0% {\n    transform: scale(1, 1) translateY(0);\n  }\n  10% {\n    transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n  }\n  30% {\n    transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n  }\n  50% {\n    transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n  }\n  57% {\n    transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n  }\n  64% {\n    transform: scale(1, 1) translateY(0);\n  }\n  100% {\n    transform: scale(1, 1) translateY(0);\n  }\n}\n@keyframes fa-fade {\n  50% {\n    opacity: var(--fa-fade-opacity, 0.4);\n  }\n}\n@keyframes fa-beat-fade {\n  0%, 100% {\n    opacity: var(--fa-beat-fade-opacity, 0.4);\n    transform: scale(1);\n  }\n  50% {\n    opacity: 1;\n    transform: scale(var(--fa-beat-fade-scale, 1.125));\n  }\n}\n@keyframes fa-flip {\n  50% {\n    transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n  }\n}\n@keyframes fa-shake {\n  0% {\n    transform: rotate(-15deg);\n  }\n  4% {\n    transform: rotate(15deg);\n  }\n  8%, 24% {\n    transform: rotate(-18deg);\n  }\n  12%, 28% {\n    transform: rotate(18deg);\n  }\n  16% {\n    transform: rotate(-22deg);\n  }\n  20% {\n    transform: rotate(22deg);\n  }\n  32% {\n    transform: rotate(-12deg);\n  }\n  36% {\n    transform: rotate(12deg);\n  }\n  40%, 100% {\n    transform: rotate(0deg);\n  }\n}\n@keyframes fa-spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n.fa-rotate-90 {\n  transform: rotate(90deg);\n}\n\n.fa-rotate-180 {\n  transform: rotate(180deg);\n}\n\n.fa-rotate-270 {\n  transform: rotate(270deg);\n}\n\n.fa-flip-horizontal {\n  transform: scale(-1, 1);\n}\n\n.fa-flip-vertical {\n  transform: scale(1, -1);\n}\n\n.fa-flip-both,\n.fa-flip-horizontal.fa-flip-vertical {\n  transform: scale(-1, -1);\n}\n\n.fa-rotate-by {\n  transform: rotate(var(--fa-rotate-angle, 0));\n}\n\n.fa-stack {\n  display: inline-block;\n  vertical-align: middle;\n  height: 2em;\n  position: relative;\n  width: 2.5em;\n}\n\n.fa-stack-1x,\n.fa-stack-2x {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n  z-index: var(--fa-stack-z-index, auto);\n}\n\n.svg-inline--fa.fa-stack-1x {\n  height: 1em;\n  width: 1.25em;\n}\n.svg-inline--fa.fa-stack-2x {\n  height: 2em;\n  width: 2.5em;\n}\n\n.fa-inverse {\n  color: var(--fa-inverse, #fff);\n}\n\n.sr-only,\n.fa-sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n\n.sr-only-focusable:not(:focus),\n.fa-sr-only-focusable:not(:focus) {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n\n.svg-inline--fa .fa-primary {\n  fill: var(--fa-primary-color, currentColor);\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa .fa-secondary {\n  fill: var(--fa-secondary-color, currentColor);\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-primary {\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-secondary {\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa mask .fa-primary,\n.svg-inline--fa mask .fa-secondary {\n  fill: black;\n}";
function css() {
    var dcp = DEFAULT_CSS_PREFIX;
    var drc = DEFAULT_REPLACEMENT_CLASS;
    var fp = config.cssPrefix;
    var rc = config.replacementClass;
    var s = baseStyles;
    if (fp !== dcp || rc !== drc) {
        var dPatt = new RegExp("\\.".concat(dcp, "\\-"), 'g');
        var customPropPatt = new RegExp("\\--".concat(dcp, "\\-"), 'g');
        var rPatt = new RegExp("\\.".concat(drc), 'g');
        s = s.replace(dPatt, ".".concat(fp, "-")).replace(customPropPatt, "--".concat(fp, "-")).replace(rPatt, ".".concat(rc));
    }
    return s;
}
var _cssInserted = false;
function ensureCss() {
    if (config.autoAddCss && !_cssInserted) {
        insertCss(css());
        _cssInserted = true;
    }
}
var InjectCSS = {
    mixout: function mixout() {
        return {
            dom: {
                css: css,
                insertCss: ensureCss
            }
        };
    },
    hooks: function hooks() {
        return {
            beforeDOMElementCreation: function beforeDOMElementCreation() {
                ensureCss();
            },
            beforeI2svg: function beforeI2svg() {
                ensureCss();
            }
        };
    }
};
var w = WINDOW || {};
if (!w[NAMESPACE_IDENTIFIER]) w[NAMESPACE_IDENTIFIER] = {};
if (!w[NAMESPACE_IDENTIFIER].styles) w[NAMESPACE_IDENTIFIER].styles = {};
if (!w[NAMESPACE_IDENTIFIER].hooks) w[NAMESPACE_IDENTIFIER].hooks = {};
if (!w[NAMESPACE_IDENTIFIER].shims) w[NAMESPACE_IDENTIFIER].shims = [];
var namespace = w[NAMESPACE_IDENTIFIER];
var functions = [];
var listener = function listener1() {
    DOCUMENT.removeEventListener('DOMContentLoaded', listener);
    loaded = 1;
    functions.map(function(fn) {
        return fn();
    });
};
var loaded = false;
if (IS_DOM) {
    loaded = (DOCUMENT.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(DOCUMENT.readyState);
    if (!loaded) DOCUMENT.addEventListener('DOMContentLoaded', listener);
}
function domready(fn) {
    if (!IS_DOM) return;
    loaded ? setTimeout(fn, 0) : functions.push(fn);
}
function toHtml(abstractNodes) {
    var tag = abstractNodes.tag, _abstractNodes_attributes = abstractNodes.attributes, attributes = _abstractNodes_attributes === void 0 ? {} : _abstractNodes_attributes, _abstractNodes_children = abstractNodes.children, children = _abstractNodes_children === void 0 ? [] : _abstractNodes_children;
    if (typeof abstractNodes === 'string') {
        return htmlEscape(abstractNodes);
    } else {
        return "<".concat(tag, " ").concat(joinAttributes(attributes), ">").concat(children.map(toHtml).join(''), "</").concat(tag, ">");
    }
}
function iconFromMapping(mapping, prefix, iconName) {
    if (mapping && mapping[prefix] && mapping[prefix][iconName]) {
        return {
            prefix: prefix,
            iconName: iconName,
            icon: mapping[prefix][iconName]
        };
    }
}
/**
 * Internal helper to bind a function known to have 4 arguments
 * to a given context.
 */ var bindInternal4 = function bindInternal4(func, thisContext) {
    return function(a, b, c, d) {
        return func.call(thisContext, a, b, c, d);
    };
};
/**
 * # Reduce
 *
 * A fast object `.reduce()` implementation.
 *
 * @param  {Object}   subject      The object to reduce over.
 * @param  {Function} fn           The reducer function.
 * @param  {mixed}    initialValue The initial value for the reducer, defaults to subject[0].
 * @param  {Object}   thisContext  The context for the reducer.
 * @return {mixed}                 The final result.
 */ var reduce = function fastReduceObject(subject, fn, initialValue, thisContext) {
    var keys = Object.keys(subject), length = keys.length, iterator = thisContext !== undefined ? bindInternal4(fn, thisContext) : fn, i, key, result;
    if (initialValue === undefined) {
        i = 1;
        result = subject[keys[0]];
    } else {
        i = 0;
        result = initialValue;
    }
    for(; i < length; i++){
        key = keys[i];
        result = iterator(result, subject[key], key, subject);
    }
    return result;
};
/**
 * ucs2decode() and codePointAt() are both works of Mathias Bynens and licensed under MIT
 *
 * Copyright Mathias Bynens <https://mathiasbynens.be/>

 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:

 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */ function ucs2decode(string) {
    var output = [];
    var counter = 0;
    var length = string.length;
    while(counter < length){
        var value = string.charCodeAt(counter++);
        if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
            var extra = string.charCodeAt(counter++);
            if ((extra & 0xFC00) == 0xDC00) {
                // eslint-disable-line eqeqeq
                output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
            } else {
                output.push(value);
                counter--;
            }
        } else {
            output.push(value);
        }
    }
    return output;
}
function toHex(unicode) {
    var decoded = ucs2decode(unicode);
    return decoded.length === 1 ? decoded[0].toString(16) : null;
}
function codePointAt(string, index) {
    var size = string.length;
    var first = string.charCodeAt(index);
    var second;
    if (first >= 0xD800 && first <= 0xDBFF && size > index + 1) {
        second = string.charCodeAt(index + 1);
        if (second >= 0xDC00 && second <= 0xDFFF) {
            return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
        }
    }
    return first;
}
function normalizeIcons(icons) {
    return Object.keys(icons).reduce(function(acc, iconName) {
        var icon = icons[iconName];
        var expanded = !!icon.icon;
        if (expanded) {
            acc[icon.iconName] = icon.icon;
        } else {
            acc[iconName] = icon;
        }
        return acc;
    }, {});
}
function defineIcons(prefix, icons) {
    var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var _params_skipHooks = params.skipHooks, skipHooks = _params_skipHooks === void 0 ? false : _params_skipHooks;
    var normalized = normalizeIcons(icons);
    if (typeof namespace.hooks.addPack === 'function' && !skipHooks) {
        namespace.hooks.addPack(prefix, normalizeIcons(icons));
    } else {
        namespace.styles[prefix] = _objectSpread2(_objectSpread2({}, namespace.styles[prefix] || {}), normalized);
    }
    /**
   * Font Awesome 4 used the prefix of `fa` for all icons. With the introduction
   * of new styles we needed to differentiate between them. Prefix `fa` is now an alias
   * for `fas` so we'll ease the upgrade process for our users by automatically defining
   * this as well.
   */ if (prefix === 'fas') {
        defineIcons('fa', icons);
    }
}
var duotonePathRe = [
    /*#__PURE__*/ _wrapRegExp(/path d="([^"]+)".*path d="([^"]+)"/, {
        d1: 1,
        d2: 2
    }),
    /*#__PURE__*/ _wrapRegExp(/path class="([^"]+)".*d="([^"]+)".*path class="([^"]+)".*d="([^"]+)"/, {
        cls1: 1,
        d1: 2,
        cls2: 3,
        d2: 4
    }),
    /*#__PURE__*/ _wrapRegExp(/path class="([^"]+)".*d="([^"]+)"/, {
        cls1: 1,
        d1: 2
    })
];
var styles = namespace.styles, shims = namespace.shims;
var FAMILY_NAMES = Object.keys(PREFIX_TO_LONG_STYLE);
var PREFIXES_FOR_FAMILY = FAMILY_NAMES.reduce(function(acc, familyId) {
    acc[familyId] = Object.keys(PREFIX_TO_LONG_STYLE[familyId]);
    return acc;
}, {});
var _defaultUsablePrefix = null;
var _byUnicode = {};
var _byLigature = {};
var _byOldName = {};
var _byOldUnicode = {};
var _byAlias = {};
function isReserved(name) {
    return ~RESERVED_CLASSES.indexOf(name);
}
function getIconName(cssPrefix, cls) {
    var parts = cls.split('-');
    var prefix = parts[0];
    var iconName = parts.slice(1).join('-');
    if (prefix === cssPrefix && iconName !== '' && !isReserved(iconName)) {
        return iconName;
    } else {
        return null;
    }
}
var build = function() {
    var lookup = function(reducer) {
        return reduce(styles, function(o$$1, style, prefix) {
            o$$1[prefix] = reduce(style, reducer, {});
            return o$$1;
        }, {});
    };
    _byUnicode = lookup(function(acc, icon, iconName) {
        if (icon[3]) {
            acc[icon[3]] = iconName;
        }
        if (icon[2]) {
            var aliases = icon[2].filter(function(a$$1) {
                return typeof a$$1 === 'number';
            });
            aliases.forEach(function(alias) {
                acc[alias.toString(16)] = iconName;
            });
        }
        return acc;
    });
    _byLigature = lookup(function(acc, icon, iconName) {
        acc[iconName] = iconName;
        if (icon[2]) {
            var aliases = icon[2].filter(function(a$$1) {
                return typeof a$$1 === 'string';
            });
            aliases.forEach(function(alias) {
                acc[alias] = iconName;
            });
        }
        return acc;
    });
    _byAlias = lookup(function(acc, icon, iconName) {
        var aliases = icon[2];
        acc[iconName] = iconName;
        aliases.forEach(function(alias) {
            acc[alias] = iconName;
        });
        return acc;
    });
    // If we have a Kit, we can't determine if regular is available since we
    // could be auto-fetching it. We'll have to assume that it is available.
    var hasRegular = 'far' in styles || config.autoFetchSvg;
    var shimLookups = reduce(shims, function(acc, shim) {
        var maybeNameMaybeUnicode = shim[0];
        var prefix = shim[1];
        var iconName = shim[2];
        if (prefix === 'far' && !hasRegular) {
            prefix = 'fas';
        }
        if (typeof maybeNameMaybeUnicode === 'string') {
            acc.names[maybeNameMaybeUnicode] = {
                prefix: prefix,
                iconName: iconName
            };
        }
        if (typeof maybeNameMaybeUnicode === 'number') {
            acc.unicodes[maybeNameMaybeUnicode.toString(16)] = {
                prefix: prefix,
                iconName: iconName
            };
        }
        return acc;
    }, {
        names: {},
        unicodes: {}
    });
    _byOldName = shimLookups.names;
    _byOldUnicode = shimLookups.unicodes;
    _defaultUsablePrefix = getCanonicalPrefix(config.styleDefault, {
        family: config.familyDefault
    });
};
onChange(function(c$$1) {
    _defaultUsablePrefix = getCanonicalPrefix(c$$1.styleDefault, {
        family: config.familyDefault
    });
});
build();
function byUnicode(prefix, unicode) {
    return (_byUnicode[prefix] || {})[unicode];
}
function byLigature(prefix, ligature) {
    return (_byLigature[prefix] || {})[ligature];
}
function byAlias(prefix, alias) {
    return (_byAlias[prefix] || {})[alias];
}
function byOldName(name) {
    return _byOldName[name] || {
        prefix: null,
        iconName: null
    };
}
function byOldUnicode(unicode) {
    var oldUnicode = _byOldUnicode[unicode];
    var newUnicode = byUnicode('fas', unicode);
    return oldUnicode || (newUnicode ? {
        prefix: 'fas',
        iconName: newUnicode
    } : null) || {
        prefix: null,
        iconName: null
    };
}
function getDefaultUsablePrefix() {
    return _defaultUsablePrefix;
}
var emptyCanonicalIcon = function() {
    return {
        prefix: null,
        iconName: null,
        rest: []
    };
};
function getFamilyId(values) {
    var family = s;
    var famProps = FAMILY_NAMES.reduce(function(acc, familyId) {
        acc[familyId] = "".concat(config.cssPrefix, "-").concat(familyId);
        return acc;
    }, {});
    L.forEach(function(familyId) {
        if (values.includes(famProps[familyId]) || values.some(function(v$$1) {
            return PREFIXES_FOR_FAMILY[familyId].includes(v$$1);
        })) {
            family = familyId;
        }
    });
    return family;
}
function getCanonicalPrefix(styleOrPrefix) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var _params_family = params.family, family = _params_family === void 0 ? s : _params_family;
    var style = PREFIX_TO_STYLE[family][styleOrPrefix];
    // handles the exception of passing in only a family of 'duotone' with no style
    if (family === t && !styleOrPrefix) {
        return 'fad';
    }
    var prefix = STYLE_TO_PREFIX[family][styleOrPrefix] || STYLE_TO_PREFIX[family][style];
    var defined = styleOrPrefix in namespace.styles ? styleOrPrefix : null;
    var result = prefix || defined || null;
    return result;
}
function moveNonFaClassesToRest(classNames) {
    var rest = [];
    var iconName = null;
    classNames.forEach(function(cls) {
        var result = getIconName(config.cssPrefix, cls);
        if (result) {
            iconName = result;
        } else if (cls) {
            rest.push(cls);
        }
    });
    return {
        iconName: iconName,
        rest: rest
    };
}
function sortedUniqueValues(arr) {
    return arr.sort().filter(function(value, index, arr) {
        return arr.indexOf(value) === index;
    });
}
function getCanonicalIcon(values) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var _params_skipLookups = params.skipLookups, skipLookups = _params_skipLookups === void 0 ? false : _params_skipLookups;
    var givenPrefix = null;
    var faCombinedClasses = Ia.concat(bt$1);
    var faStyleOrFamilyClasses = sortedUniqueValues(values.filter(function(cls) {
        return faCombinedClasses.includes(cls);
    }));
    var nonStyleOrFamilyClasses = sortedUniqueValues(values.filter(function(cls) {
        return !Ia.includes(cls);
    }));
    var faStyles = faStyleOrFamilyClasses.filter(function(cls) {
        givenPrefix = cls;
        return !P.includes(cls);
    });
    var _faStyles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(faStyles, 1), tmp = _faStyles[0], styleFromValues = tmp === void 0 ? null : tmp;
    var family = getFamilyId(faStyleOrFamilyClasses);
    var canonical = _objectSpread2(_objectSpread2({}, moveNonFaClassesToRest(nonStyleOrFamilyClasses)), {}, {
        prefix: getCanonicalPrefix(styleFromValues, {
            family: family
        })
    });
    return _objectSpread2(_objectSpread2(_objectSpread2({}, canonical), getDefaultCanonicalPrefix({
        values: values,
        family: family,
        styles: styles,
        config: config,
        canonical: canonical,
        givenPrefix: givenPrefix
    })), applyShimAndAlias(skipLookups, givenPrefix, canonical));
}
function applyShimAndAlias(skipLookups, givenPrefix, canonical) {
    var prefix = canonical.prefix, iconName = canonical.iconName;
    if (skipLookups || !prefix || !iconName) {
        return {
            prefix: prefix,
            iconName: iconName
        };
    }
    var shim = givenPrefix === 'fa' ? byOldName(iconName) : {};
    var aliasIconName = byAlias(prefix, iconName);
    iconName = shim.iconName || aliasIconName || iconName;
    prefix = shim.prefix || prefix;
    if (prefix === 'far' && !styles['far'] && styles['fas'] && !config.autoFetchSvg) {
        // Allow a fallback from the regular style to solid if regular is not available
        // but only if we aren't auto-fetching SVGs
        prefix = 'fas';
    }
    return {
        prefix: prefix,
        iconName: iconName
    };
}
var newCanonicalFamilies = L.filter(function(familyId) {
    return familyId !== s || familyId !== t;
});
var newCanonicalStyles = Object.keys(ga).filter(function(key) {
    return key !== s;
}).map(function(key) {
    return Object.keys(ga[key]);
}).flat();
function getDefaultCanonicalPrefix(prefixOptions) {
    var values = prefixOptions.values, family = prefixOptions.family, canonical = prefixOptions.canonical, _prefixOptions_givenPrefix = prefixOptions.givenPrefix, givenPrefix = _prefixOptions_givenPrefix === void 0 ? '' : _prefixOptions_givenPrefix, _prefixOptions_styles = prefixOptions.styles, styles = _prefixOptions_styles === void 0 ? {} : _prefixOptions_styles, tmp = prefixOptions.config, config$$1 = tmp === void 0 ? {} : tmp;
    var isDuotoneFamily = family === t;
    var valuesHasDuotone = values.includes('fa-duotone') || values.includes('fad');
    var defaultFamilyIsDuotone = config$$1.familyDefault === 'duotone';
    var canonicalPrefixIsDuotone = canonical.prefix === 'fad' || canonical.prefix === 'fa-duotone';
    if (!isDuotoneFamily && (valuesHasDuotone || defaultFamilyIsDuotone || canonicalPrefixIsDuotone)) {
        canonical.prefix = 'fad';
    }
    if (values.includes('fa-brands') || values.includes('fab')) {
        canonical.prefix = 'fab';
    }
    if (!canonical.prefix && newCanonicalFamilies.includes(family)) {
        var validPrefix = Object.keys(styles).find(function(key) {
            return newCanonicalStyles.includes(key);
        });
        if (validPrefix || config$$1.autoFetchSvg) {
            var defaultPrefix = pt.get(family).defaultShortPrefixId;
            canonical.prefix = defaultPrefix;
            canonical.iconName = byAlias(canonical.prefix, canonical.iconName) || canonical.iconName;
        }
    }
    if (canonical.prefix === 'fa' || givenPrefix === 'fa') {
        // The fa prefix is not canonical. So if it has made it through until this point
        // we will shift it to the correct prefix.
        canonical.prefix = getDefaultUsablePrefix() || 'fas';
    }
    return canonical;
}
var Library = /*#__PURE__*/ function() {
    "use strict";
    function Library() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_call_check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, Library);
        this.definitions = {};
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_create_class$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(Library, [
        {
            key: "add",
            value: function add() {
                var _this = this;
                for(var _len = arguments.length, definitions = new Array(_len), _key = 0; _key < _len; _key++){
                    definitions[_key] = arguments[_key];
                }
                var additions = definitions.reduce(this._pullDefinitions, {});
                Object.keys(additions).forEach(function(key) {
                    _this.definitions[key] = _objectSpread2(_objectSpread2({}, _this.definitions[key] || {}), additions[key]);
                    defineIcons(key, additions[key]);
                    // TODO can we stop doing this? We can't get the icons by 'fa-solid' any longer so this probably needs to change
                    var longPrefix = PREFIX_TO_LONG_STYLE[s][key];
                    if (longPrefix) defineIcons(longPrefix, additions[key]);
                    build();
                });
            }
        },
        {
            key: "reset",
            value: function reset() {
                this.definitions = {};
            }
        },
        {
            key: "_pullDefinitions",
            value: function _pullDefinitions(additions, definition) {
                var normalized = definition.prefix && definition.iconName && definition.icon ? {
                    0: definition
                } : definition;
                Object.keys(normalized).map(function(key) {
                    var _normalized_key = normalized[key], prefix = _normalized_key.prefix, iconName = _normalized_key.iconName, icon = _normalized_key.icon;
                    var aliases = icon[2];
                    if (!additions[prefix]) additions[prefix] = {};
                    if (aliases.length > 0) {
                        aliases.forEach(function(alias) {
                            if (typeof alias === 'string') {
                                additions[prefix][alias] = icon;
                            }
                        });
                    }
                    additions[prefix][iconName] = icon;
                });
                return additions;
            }
        }
    ]);
    return Library;
}();
var _plugins = [];
var _hooks = {};
var providers = {};
var defaultProviderKeys = Object.keys(providers);
function registerPlugins(nextPlugins, _ref) {
    var obj = _ref.mixoutsTo;
    _plugins = nextPlugins;
    _hooks = {};
    Object.keys(providers).forEach(function(k) {
        if (defaultProviderKeys.indexOf(k) === -1) {
            delete providers[k];
        }
    });
    _plugins.forEach(function(plugin) {
        var mixout = plugin.mixout ? plugin.mixout() : {};
        Object.keys(mixout).forEach(function(tk) {
            if (typeof mixout[tk] === 'function') {
                obj[tk] = mixout[tk];
            }
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(mixout[tk]) === 'object') {
                Object.keys(mixout[tk]).forEach(function(sk) {
                    if (!obj[tk]) {
                        obj[tk] = {};
                    }
                    obj[tk][sk] = mixout[tk][sk];
                });
            }
        });
        if (plugin.hooks) {
            var hooks = plugin.hooks();
            Object.keys(hooks).forEach(function(hook) {
                if (!_hooks[hook]) {
                    _hooks[hook] = [];
                }
                _hooks[hook].push(hooks[hook]);
            });
        }
        if (plugin.provides) {
            plugin.provides(providers);
        }
    });
    return obj;
}
function chainHooks(hook, accumulator) {
    for(var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++){
        args[_key - 2] = arguments[_key];
    }
    var hookFns = _hooks[hook] || [];
    hookFns.forEach(function(hookFn) {
        accumulator = hookFn.apply(null, [
            accumulator
        ].concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(args))); // eslint-disable-line no-useless-call
    });
    return accumulator;
}
function callHooks(hook) {
    for(var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++){
        args[_key2 - 1] = arguments[_key2];
    }
    var hookFns = _hooks[hook] || [];
    hookFns.forEach(function(hookFn) {
        hookFn.apply(null, args);
    });
    return undefined;
}
function callProvided() {
    var hook = arguments[0];
    var args = Array.prototype.slice.call(arguments, 1);
    return providers[hook] ? providers[hook].apply(null, args) : undefined;
}
function findIconDefinition(iconLookup) {
    if (iconLookup.prefix === 'fa') {
        iconLookup.prefix = 'fas';
    }
    var iconName = iconLookup.iconName;
    var prefix = iconLookup.prefix || getDefaultUsablePrefix();
    if (!iconName) return;
    iconName = byAlias(prefix, iconName) || iconName;
    return iconFromMapping(library.definitions, prefix, iconName) || iconFromMapping(namespace.styles, prefix, iconName);
}
var library = new Library();
var noAuto = function() {
    config.autoReplaceSvg = false;
    config.observeMutations = false;
    callHooks('noAuto');
};
var dom = {
    i2svg: function i2svg() {
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        if (IS_DOM) {
            callHooks('beforeI2svg', params);
            callProvided('pseudoElements2svg', params);
            return callProvided('i2svg', params);
        } else {
            return Promise.reject(new Error('Operation requires a DOM of some kind.'));
        }
    },
    watch: function watch() {
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var autoReplaceSvgRoot = params.autoReplaceSvgRoot;
        if (config.autoReplaceSvg === false) {
            config.autoReplaceSvg = true;
        }
        config.observeMutations = true;
        domready(function() {
            autoReplace({
                autoReplaceSvgRoot: autoReplaceSvgRoot
            });
            callHooks('watch', params);
        });
    }
};
var parse = {
    icon: function(icon) {
        if (icon === null) {
            return null;
        }
        if ((typeof icon === "undefined" ? "undefined" : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(icon)) === 'object' && icon.prefix && icon.iconName) {
            return {
                prefix: icon.prefix,
                iconName: byAlias(icon.prefix, icon.iconName) || icon.iconName
            };
        }
        if (Array.isArray(icon) && icon.length === 2) {
            var iconName = icon[1].indexOf('fa-') === 0 ? icon[1].slice(3) : icon[1];
            var prefix = getCanonicalPrefix(icon[0]);
            return {
                prefix: prefix,
                iconName: byAlias(prefix, iconName) || iconName
            };
        }
        if (typeof icon === 'string' && (icon.indexOf("".concat(config.cssPrefix, "-")) > -1 || icon.match(ICON_SELECTION_SYNTAX_PATTERN))) {
            var canonicalIcon = getCanonicalIcon(icon.split(' '), {
                skipLookups: true
            });
            return {
                prefix: canonicalIcon.prefix || getDefaultUsablePrefix(),
                iconName: byAlias(canonicalIcon.prefix, canonicalIcon.iconName) || canonicalIcon.iconName
            };
        }
        if (typeof icon === 'string') {
            var prefix1 = getDefaultUsablePrefix();
            return {
                prefix: prefix1,
                iconName: byAlias(prefix1, icon) || icon
            };
        }
    }
};
var api = {
    noAuto: noAuto,
    config: config,
    dom: dom,
    parse: parse,
    library: library,
    findIconDefinition: findIconDefinition,
    toHtml: toHtml
};
var autoReplace = function autoReplace() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _params_autoReplaceSvgRoot = params.autoReplaceSvgRoot, autoReplaceSvgRoot = _params_autoReplaceSvgRoot === void 0 ? DOCUMENT : _params_autoReplaceSvgRoot;
    if ((Object.keys(namespace.styles).length > 0 || config.autoFetchSvg) && IS_DOM && config.autoReplaceSvg) api.dom.i2svg({
        node: autoReplaceSvgRoot
    });
};
function domVariants(val, abstractCreator) {
    Object.defineProperty(val, 'abstract', {
        get: abstractCreator
    });
    Object.defineProperty(val, 'html', {
        get: function get() {
            return val.abstract.map(function(a) {
                return toHtml(a);
            });
        }
    });
    Object.defineProperty(val, 'node', {
        get: function get() {
            if (!IS_DOM) return;
            var container = DOCUMENT.createElement('div');
            container.innerHTML = val.html;
            return container.children;
        }
    });
    return val;
}
function asIcon(_ref) {
    var children = _ref.children, main = _ref.main, mask = _ref.mask, attributes = _ref.attributes, styles = _ref.styles, transform = _ref.transform;
    if (transformIsMeaningful(transform) && main.found && !mask.found) {
        var width = main.width, height = main.height;
        var offset = {
            x: width / height / 2,
            y: 0.5
        };
        attributes['style'] = joinStyles(_objectSpread2(_objectSpread2({}, styles), {}, {
            'transform-origin': "".concat(offset.x + transform.x / 16, "em ").concat(offset.y + transform.y / 16, "em")
        }));
    }
    return [
        {
            tag: 'svg',
            attributes: attributes,
            children: children
        }
    ];
}
function asSymbol(_ref) {
    var prefix = _ref.prefix, iconName = _ref.iconName, children = _ref.children, attributes = _ref.attributes, symbol = _ref.symbol;
    var id = symbol === true ? "".concat(prefix, "-").concat(config.cssPrefix, "-").concat(iconName) : symbol;
    return [
        {
            tag: 'svg',
            attributes: {
                style: 'display: none;'
            },
            children: [
                {
                    tag: 'symbol',
                    attributes: _objectSpread2(_objectSpread2({}, attributes), {}, {
                        id: id
                    }),
                    children: children
                }
            ]
        }
    ];
}
function makeInlineSvgAbstract(params) {
    var _params_icons = params.icons, main = _params_icons.main, mask = _params_icons.mask, prefix = params.prefix, iconName = params.iconName, transform = params.transform, symbol = params.symbol, title = params.title, maskId = params.maskId, titleId = params.titleId, extra = params.extra, _params_watchable = params.watchable, watchable = _params_watchable === void 0 ? false : _params_watchable;
    var _ref = mask.found ? mask : main, width = _ref.width, height = _ref.height;
    var isUploadedIcon = Lt.includes(prefix);
    var attrClass = [
        config.replacementClass,
        iconName ? "".concat(config.cssPrefix, "-").concat(iconName) : ''
    ].filter(function(c$$1) {
        return extra.classes.indexOf(c$$1) === -1;
    }).filter(function(c$$1) {
        return c$$1 !== '' || !!c$$1;
    }).concat(extra.classes).join(' ');
    var content = {
        children: [],
        attributes: _objectSpread2(_objectSpread2({}, extra.attributes), {}, {
            'data-prefix': prefix,
            'data-icon': iconName,
            'class': attrClass,
            'role': extra.attributes.role || 'img',
            'xmlns': 'http://www.w3.org/2000/svg',
            'viewBox': "0 0 ".concat(width, " ").concat(height)
        })
    };
    var uploadedIconWidthStyle = isUploadedIcon && !~extra.classes.indexOf('fa-fw') ? {
        width: "".concat(width / height * 16 * 0.0625, "em")
    } : {};
    if (watchable) {
        content.attributes[DATA_FA_I2SVG] = '';
    }
    if (title) {
        content.children.push({
            tag: 'title',
            attributes: {
                id: content.attributes['aria-labelledby'] || "title-".concat(titleId || nextUniqueId())
            },
            children: [
                title
            ]
        });
        delete content.attributes.title;
    }
    var args = _objectSpread2(_objectSpread2({}, content), {}, {
        prefix: prefix,
        iconName: iconName,
        main: main,
        mask: mask,
        maskId: maskId,
        transform: transform,
        symbol: symbol,
        styles: _objectSpread2(_objectSpread2({}, uploadedIconWidthStyle), extra.styles)
    });
    var _ref1 = mask.found && main.found ? callProvided('generateAbstractMask', args) || {
        children: [],
        attributes: {}
    } : callProvided('generateAbstractIcon', args) || {
        children: [],
        attributes: {}
    }, children = _ref1.children, attributes = _ref1.attributes;
    args.children = children;
    args.attributes = attributes;
    if (symbol) {
        return asSymbol(args);
    } else {
        return asIcon(args);
    }
}
function makeLayersTextAbstract(params) {
    var content = params.content, width = params.width, height = params.height, transform = params.transform, title = params.title, extra = params.extra, _params_watchable = params.watchable, watchable = _params_watchable === void 0 ? false : _params_watchable;
    var attributes = _objectSpread2(_objectSpread2(_objectSpread2({}, extra.attributes), title ? {
        'title': title
    } : {}), {}, {
        'class': extra.classes.join(' ')
    });
    if (watchable) {
        attributes[DATA_FA_I2SVG] = '';
    }
    var styles = _objectSpread2({}, extra.styles);
    if (transformIsMeaningful(transform)) {
        styles['transform'] = transformForCss({
            transform: transform,
            startCentered: true,
            width: width,
            height: height
        });
        styles['-webkit-transform'] = styles['transform'];
    }
    var styleString = joinStyles(styles);
    if (styleString.length > 0) {
        attributes['style'] = styleString;
    }
    var val = [];
    val.push({
        tag: 'span',
        attributes: attributes,
        children: [
            content
        ]
    });
    if (title) {
        val.push({
            tag: 'span',
            attributes: {
                class: 'sr-only'
            },
            children: [
                title
            ]
        });
    }
    return val;
}
function makeLayersCounterAbstract(params) {
    var content = params.content, title = params.title, extra = params.extra;
    var attributes = _objectSpread2(_objectSpread2(_objectSpread2({}, extra.attributes), title ? {
        'title': title
    } : {}), {}, {
        'class': extra.classes.join(' ')
    });
    var styleString = joinStyles(extra.styles);
    if (styleString.length > 0) {
        attributes['style'] = styleString;
    }
    var val = [];
    val.push({
        tag: 'span',
        attributes: attributes,
        children: [
            content
        ]
    });
    if (title) {
        val.push({
            tag: 'span',
            attributes: {
                class: 'sr-only'
            },
            children: [
                title
            ]
        });
    }
    return val;
}
var styles$1 = namespace.styles;
function asFoundIcon(icon) {
    var width = icon[0];
    var height = icon[1];
    var _icon_slice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(icon.slice(4), 1), vectorData = _icon_slice[0];
    var element = null;
    if (Array.isArray(vectorData)) {
        element = {
            tag: 'g',
            attributes: {
                class: "".concat(config.cssPrefix, "-").concat(DUOTONE_CLASSES.GROUP)
            },
            children: [
                {
                    tag: 'path',
                    attributes: {
                        class: "".concat(config.cssPrefix, "-").concat(DUOTONE_CLASSES.SECONDARY),
                        fill: 'currentColor',
                        d: vectorData[0]
                    }
                },
                {
                    tag: 'path',
                    attributes: {
                        class: "".concat(config.cssPrefix, "-").concat(DUOTONE_CLASSES.PRIMARY),
                        fill: 'currentColor',
                        d: vectorData[1]
                    }
                }
            ]
        };
    } else {
        element = {
            tag: 'path',
            attributes: {
                fill: 'currentColor',
                d: vectorData
            }
        };
    }
    return {
        found: true,
        width: width,
        height: height,
        icon: element
    };
}
var missingIconResolutionMixin = {
    found: false,
    width: 512,
    height: 512
};
function maybeNotifyMissing(iconName, prefix) {
    if (!PRODUCTION && !config.showMissingIcons && iconName) {
        console.error("Icon with name \"".concat(iconName, "\" and prefix \"").concat(prefix, "\" is missing."));
    }
}
function findIcon(iconName, prefix) {
    var givenPrefix = prefix;
    if (prefix === 'fa' && config.styleDefault !== null) {
        prefix = getDefaultUsablePrefix();
    }
    return new Promise(function(resolve, reject) {
        if (givenPrefix === 'fa') {
            var shim = byOldName(iconName) || {};
            iconName = shim.iconName || iconName;
            prefix = shim.prefix || prefix;
        }
        if (iconName && prefix && styles$1[prefix] && styles$1[prefix][iconName]) {
            var icon = styles$1[prefix][iconName];
            return resolve(asFoundIcon(icon));
        }
        maybeNotifyMissing(iconName, prefix);
        resolve(_objectSpread2(_objectSpread2({}, missingIconResolutionMixin), {}, {
            icon: config.showMissingIcons && iconName ? callProvided('missingIconAbstract') || {} : {}
        }));
    });
}
var noop$1 = function() {};
var p$2 = config.measurePerformance && PERFORMANCE && PERFORMANCE.mark && PERFORMANCE.measure ? PERFORMANCE : {
    mark: noop$1,
    measure: noop$1
};
var preamble = "FA \"6.7.2\"";
var begin = function(name) {
    p$2.mark("".concat(preamble, " ").concat(name, " begins"));
    return function() {
        return end(name);
    };
};
var end = function(name) {
    p$2.mark("".concat(preamble, " ").concat(name, " ends"));
    p$2.measure("".concat(preamble, " ").concat(name), "".concat(preamble, " ").concat(name, " begins"), "".concat(preamble, " ").concat(name, " ends"));
};
var perf = {
    begin: begin,
    end: end
};
var noop$2 = function() {};
function isWatched(node) {
    var i2svg = node.getAttribute ? node.getAttribute(DATA_FA_I2SVG) : null;
    return typeof i2svg === 'string';
}
function hasPrefixAndIcon(node) {
    var prefix = node.getAttribute ? node.getAttribute(DATA_PREFIX) : null;
    var icon = node.getAttribute ? node.getAttribute(DATA_ICON) : null;
    return prefix && icon;
}
function hasBeenReplaced(node) {
    return node && node.classList && node.classList.contains && node.classList.contains(config.replacementClass);
}
function getMutator() {
    if (config.autoReplaceSvg === true) {
        return mutators.replace;
    }
    var mutator = mutators[config.autoReplaceSvg];
    return mutator || mutators.replace;
}
function createElementNS(tag) {
    return DOCUMENT.createElementNS('http://www.w3.org/2000/svg', tag);
}
function createElement(tag) {
    return DOCUMENT.createElement(tag);
}
function convertSVG(abstractObj) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var _params_ceFn = params.ceFn, ceFn = _params_ceFn === void 0 ? abstractObj.tag === 'svg' ? createElementNS : createElement : _params_ceFn;
    if (typeof abstractObj === 'string') {
        return DOCUMENT.createTextNode(abstractObj);
    }
    var tag = ceFn(abstractObj.tag);
    Object.keys(abstractObj.attributes || []).forEach(function(key) {
        tag.setAttribute(key, abstractObj.attributes[key]);
    });
    var children = abstractObj.children || [];
    children.forEach(function(child) {
        tag.appendChild(convertSVG(child, {
            ceFn: ceFn
        }));
    });
    return tag;
}
function nodeAsComment(node) {
    var comment = " ".concat(node.outerHTML, " ");
    /* BEGIN.ATTRIBUTION */ comment = "".concat(comment, "Font Awesome fontawesome.com ");
    /* END.ATTRIBUTION */ return comment;
}
var mutators = {
    replace: function replace(mutation) {
        var node = mutation[0];
        if (node.parentNode) {
            mutation[1].forEach(function(abstract) {
                node.parentNode.insertBefore(convertSVG(abstract), node);
            });
            if (node.getAttribute(DATA_FA_I2SVG) === null && config.keepOriginalSource) {
                var comment = DOCUMENT.createComment(nodeAsComment(node));
                node.parentNode.replaceChild(comment, node);
            } else {
                node.remove();
            }
        }
    },
    nest: function nest(mutation) {
        var node = mutation[0];
        var abstract = mutation[1];
        // If we already have a replaced node we do not want to continue nesting within it.
        // Short-circuit to the standard replacement
        if (~classArray(node).indexOf(config.replacementClass)) {
            return mutators.replace(mutation);
        }
        var forSvg = new RegExp("".concat(config.cssPrefix, "-.*"));
        delete abstract[0].attributes.id;
        if (abstract[0].attributes.class) {
            var splitClasses = abstract[0].attributes.class.split(' ').reduce(function(acc, cls) {
                if (cls === config.replacementClass || cls.match(forSvg)) {
                    acc.toSvg.push(cls);
                } else {
                    acc.toNode.push(cls);
                }
                return acc;
            }, {
                toNode: [],
                toSvg: []
            });
            abstract[0].attributes.class = splitClasses.toSvg.join(' ');
            if (splitClasses.toNode.length === 0) {
                node.removeAttribute('class');
            } else {
                node.setAttribute('class', splitClasses.toNode.join(' '));
            }
        }
        var newInnerHTML = abstract.map(function(a) {
            return toHtml(a);
        }).join('\n');
        node.setAttribute(DATA_FA_I2SVG, '');
        node.innerHTML = newInnerHTML;
    }
};
function performOperationSync(op) {
    op();
}
function perform(mutations, callback) {
    var callbackFunction = typeof callback === 'function' ? callback : noop$2;
    if (mutations.length === 0) {
        callbackFunction();
    } else {
        var frame = performOperationSync;
        if (config.mutateApproach === MUTATION_APPROACH_ASYNC) {
            frame = WINDOW.requestAnimationFrame || performOperationSync;
        }
        frame(function() {
            var mutator = getMutator();
            var mark = perf.begin('mutate');
            mutations.map(mutator);
            mark();
            callbackFunction();
        });
    }
}
var disabled = false;
function disableObservation() {
    disabled = true;
}
function enableObservation() {
    disabled = false;
}
var mo = null;
function observe(options) {
    if (!MUTATION_OBSERVER) {
        return;
    }
    if (!config.observeMutations) {
        return;
    }
    var _options_treeCallback = options.treeCallback, treeCallback = _options_treeCallback === void 0 ? noop$2 : _options_treeCallback, _options_nodeCallback = options.nodeCallback, nodeCallback = _options_nodeCallback === void 0 ? noop$2 : _options_nodeCallback, _options_pseudoElementsCallback = options.pseudoElementsCallback, pseudoElementsCallback = _options_pseudoElementsCallback === void 0 ? noop$2 : _options_pseudoElementsCallback, _options_observeMutationsRoot = options.observeMutationsRoot, observeMutationsRoot = _options_observeMutationsRoot === void 0 ? DOCUMENT : _options_observeMutationsRoot;
    mo = new MUTATION_OBSERVER(function(objects) {
        if (disabled) return;
        var defaultPrefix = getDefaultUsablePrefix();
        toArray(objects).forEach(function(mutationRecord) {
            if (mutationRecord.type === 'childList' && mutationRecord.addedNodes.length > 0 && !isWatched(mutationRecord.addedNodes[0])) {
                if (config.searchPseudoElements) {
                    pseudoElementsCallback(mutationRecord.target);
                }
                treeCallback(mutationRecord.target);
            }
            if (mutationRecord.type === 'attributes' && mutationRecord.target.parentNode && config.searchPseudoElements) {
                pseudoElementsCallback(mutationRecord.target.parentNode);
            }
            if (mutationRecord.type === 'attributes' && isWatched(mutationRecord.target) && ~ATTRIBUTES_WATCHED_FOR_MUTATION.indexOf(mutationRecord.attributeName)) {
                if (mutationRecord.attributeName === 'class' && hasPrefixAndIcon(mutationRecord.target)) {
                    var _getCanonicalIcon = getCanonicalIcon(classArray(mutationRecord.target)), prefix = _getCanonicalIcon.prefix, iconName = _getCanonicalIcon.iconName;
                    mutationRecord.target.setAttribute(DATA_PREFIX, prefix || defaultPrefix);
                    if (iconName) mutationRecord.target.setAttribute(DATA_ICON, iconName);
                } else if (hasBeenReplaced(mutationRecord.target)) {
                    nodeCallback(mutationRecord.target);
                }
            }
        });
    });
    if (!IS_DOM) return;
    mo.observe(observeMutationsRoot, {
        childList: true,
        attributes: true,
        characterData: true,
        subtree: true
    });
}
function disconnect() {
    if (!mo) return;
    mo.disconnect();
}
function styleParser(node) {
    var style = node.getAttribute('style');
    var val = [];
    if (style) {
        val = style.split(';').reduce(function(acc, style) {
            var styles = style.split(':');
            var prop = styles[0];
            var value = styles.slice(1);
            if (prop && value.length > 0) {
                acc[prop] = value.join(':').trim();
            }
            return acc;
        }, {});
    }
    return val;
}
function classParser(node) {
    var existingPrefix = node.getAttribute('data-prefix');
    var existingIconName = node.getAttribute('data-icon');
    var innerText = node.innerText !== undefined ? node.innerText.trim() : '';
    var val = getCanonicalIcon(classArray(node));
    if (!val.prefix) {
        val.prefix = getDefaultUsablePrefix();
    }
    if (existingPrefix && existingIconName) {
        val.prefix = existingPrefix;
        val.iconName = existingIconName;
    }
    if (val.iconName && val.prefix) {
        return val;
    }
    if (val.prefix && innerText.length > 0) {
        val.iconName = byLigature(val.prefix, node.innerText) || byUnicode(val.prefix, toHex(node.innerText));
    }
    if (!val.iconName && config.autoFetchSvg && node.firstChild && node.firstChild.nodeType === Node.TEXT_NODE) {
        val.iconName = node.firstChild.data;
    }
    return val;
}
function attributesParser(node) {
    var extraAttributes = toArray(node.attributes).reduce(function(acc, attr) {
        if (acc.name !== 'class' && acc.name !== 'style') {
            acc[attr.name] = attr.value;
        }
        return acc;
    }, {});
    var title = node.getAttribute('title');
    var titleId = node.getAttribute('data-fa-title-id');
    if (config.autoA11y) {
        if (title) {
            extraAttributes['aria-labelledby'] = "".concat(config.replacementClass, "-title-").concat(titleId || nextUniqueId());
        } else {
            extraAttributes['aria-hidden'] = 'true';
            extraAttributes['focusable'] = 'false';
        }
    }
    return extraAttributes;
}
function blankMeta() {
    return {
        iconName: null,
        title: null,
        titleId: null,
        prefix: null,
        transform: meaninglessTransform,
        symbol: false,
        mask: {
            iconName: null,
            prefix: null,
            rest: []
        },
        maskId: null,
        extra: {
            classes: [],
            styles: {},
            attributes: {}
        }
    };
}
function parseMeta(node) {
    var parser = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        styleParser: true
    };
    var _classParser = classParser(node), iconName = _classParser.iconName, prefix = _classParser.prefix, extraClasses = _classParser.rest;
    var extraAttributes = attributesParser(node);
    var pluginMeta = chainHooks('parseNodeAttributes', {}, node);
    var extraStyles = parser.styleParser ? styleParser(node) : [];
    return _objectSpread2({
        iconName: iconName,
        title: node.getAttribute('title'),
        titleId: node.getAttribute('data-fa-title-id'),
        prefix: prefix,
        transform: meaninglessTransform,
        mask: {
            iconName: null,
            prefix: null,
            rest: []
        },
        maskId: null,
        symbol: false,
        extra: {
            classes: extraClasses,
            styles: extraStyles,
            attributes: extraAttributes
        }
    }, pluginMeta);
}
var styles$2 = namespace.styles;
function generateMutation(node) {
    var nodeMeta = config.autoReplaceSvg === 'nest' ? parseMeta(node, {
        styleParser: false
    }) : parseMeta(node);
    if (~nodeMeta.extra.classes.indexOf(LAYERS_TEXT_CLASSNAME)) {
        return callProvided('generateLayersText', node, nodeMeta);
    } else {
        return callProvided('generateSvgReplacementMutation', node, nodeMeta);
    }
}
function getKnownPrefixes() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(Ft).concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(Ia));
}
function onTree(root) {
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    if (!IS_DOM) return Promise.resolve();
    var htmlClassList = DOCUMENT.documentElement.classList;
    var hclAdd = function(suffix) {
        return htmlClassList.add("".concat(HTML_CLASS_I2SVG_BASE_CLASS, "-").concat(suffix));
    };
    var hclRemove = function(suffix) {
        return htmlClassList.remove("".concat(HTML_CLASS_I2SVG_BASE_CLASS, "-").concat(suffix));
    };
    var prefixes = config.autoFetchSvg ? getKnownPrefixes() : P.concat(Object.keys(styles$2));
    if (!prefixes.includes('fa')) {
        prefixes.push('fa');
    }
    var prefixesDomQuery = [
        ".".concat(LAYERS_TEXT_CLASSNAME, ":not([").concat(DATA_FA_I2SVG, "])")
    ].concat(prefixes.map(function(p$$1) {
        return ".".concat(p$$1, ":not([").concat(DATA_FA_I2SVG, "])");
    })).join(', ');
    if (prefixesDomQuery.length === 0) {
        return Promise.resolve();
    }
    var candidates = [];
    try {
        candidates = toArray(root.querySelectorAll(prefixesDomQuery));
    } catch (e$$1) {
    // noop
    }
    if (candidates.length > 0) {
        hclAdd('pending');
        hclRemove('complete');
    } else {
        return Promise.resolve();
    }
    var mark = perf.begin('onTree');
    var mutations = candidates.reduce(function(acc, node) {
        try {
            var mutation = generateMutation(node);
            if (mutation) {
                acc.push(mutation);
            }
        } catch (e$$1) {
            if (!PRODUCTION) {
                if (e$$1.name === 'MissingIcon') {
                    console.error(e$$1);
                }
            }
        }
        return acc;
    }, []);
    return new Promise(function(resolve, reject) {
        Promise.all(mutations).then(function(resolvedMutations) {
            perform(resolvedMutations, function() {
                hclAdd('active');
                hclAdd('complete');
                hclRemove('pending');
                if (typeof callback === 'function') callback();
                mark();
                resolve();
            });
        }).catch(function(e$$1) {
            mark();
            reject(e$$1);
        });
    });
}
function onNode(node) {
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    generateMutation(node).then(function(mutation) {
        if (mutation) {
            perform([
                mutation
            ], callback);
        }
    });
}
function resolveIcons(next) {
    return function(maybeIconDefinition) {
        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var iconDefinition = (maybeIconDefinition || {}).icon ? maybeIconDefinition : findIconDefinition(maybeIconDefinition || {});
        var mask = params.mask;
        if (mask) {
            mask = (mask || {}).icon ? mask : findIconDefinition(mask || {});
        }
        return next(iconDefinition, _objectSpread2(_objectSpread2({}, params), {}, {
            mask: mask
        }));
    };
}
var render = function render(iconDefinition) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var _params_transform = params.transform, transform = _params_transform === void 0 ? meaninglessTransform : _params_transform, _params_symbol = params.symbol, symbol = _params_symbol === void 0 ? false : _params_symbol, _params_mask = params.mask, mask = _params_mask === void 0 ? null : _params_mask, _params_maskId = params.maskId, maskId = _params_maskId === void 0 ? null : _params_maskId, _params_title = params.title, title = _params_title === void 0 ? null : _params_title, _params_titleId = params.titleId, titleId = _params_titleId === void 0 ? null : _params_titleId, _params_classes = params.classes, classes = _params_classes === void 0 ? [] : _params_classes, _params_attributes = params.attributes, attributes = _params_attributes === void 0 ? {} : _params_attributes, _params_styles = params.styles, styles = _params_styles === void 0 ? {} : _params_styles;
    if (!iconDefinition) return;
    var prefix = iconDefinition.prefix, iconName = iconDefinition.iconName, icon = iconDefinition.icon;
    return domVariants(_objectSpread2({
        type: 'icon'
    }, iconDefinition), function() {
        callHooks('beforeDOMElementCreation', {
            iconDefinition: iconDefinition,
            params: params
        });
        if (config.autoA11y) {
            if (title) {
                attributes['aria-labelledby'] = "".concat(config.replacementClass, "-title-").concat(titleId || nextUniqueId());
            } else {
                attributes['aria-hidden'] = 'true';
                attributes['focusable'] = 'false';
            }
        }
        return makeInlineSvgAbstract({
            icons: {
                main: asFoundIcon(icon),
                mask: mask ? asFoundIcon(mask.icon) : {
                    found: false,
                    width: null,
                    height: null,
                    icon: {}
                }
            },
            prefix: prefix,
            iconName: iconName,
            transform: _objectSpread2(_objectSpread2({}, meaninglessTransform), transform),
            symbol: symbol,
            title: title,
            maskId: maskId,
            titleId: titleId,
            extra: {
                attributes: attributes,
                styles: styles,
                classes: classes
            }
        });
    });
};
var ReplaceElements = {
    mixout: function mixout() {
        return {
            icon: resolveIcons(render)
        };
    },
    hooks: function hooks() {
        return {
            mutationObserverCallbacks: function mutationObserverCallbacks(accumulator) {
                accumulator.treeCallback = onTree;
                accumulator.nodeCallback = onNode;
                return accumulator;
            }
        };
    },
    provides: function provides(providers$$1) {
        providers$$1.i2svg = function(params) {
            var _params_node = params.node, node = _params_node === void 0 ? DOCUMENT : _params_node, _params_callback = params.callback, callback = _params_callback === void 0 ? function() {} : _params_callback;
            return onTree(node, callback);
        };
        providers$$1.generateSvgReplacementMutation = function(node, nodeMeta) {
            var iconName = nodeMeta.iconName, title = nodeMeta.title, titleId = nodeMeta.titleId, prefix = nodeMeta.prefix, transform = nodeMeta.transform, symbol = nodeMeta.symbol, mask = nodeMeta.mask, maskId = nodeMeta.maskId, extra = nodeMeta.extra;
            return new Promise(function(resolve, reject) {
                Promise.all([
                    findIcon(iconName, prefix),
                    mask.iconName ? findIcon(mask.iconName, mask.prefix) : Promise.resolve({
                        found: false,
                        width: 512,
                        height: 512,
                        icon: {}
                    })
                ]).then(function(_ref) {
                    var _$_ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(_ref, 2), main = _$_ref[0], mask = _$_ref[1];
                    resolve([
                        node,
                        makeInlineSvgAbstract({
                            icons: {
                                main: main,
                                mask: mask
                            },
                            prefix: prefix,
                            iconName: iconName,
                            transform: transform,
                            symbol: symbol,
                            maskId: maskId,
                            title: title,
                            titleId: titleId,
                            extra: extra,
                            watchable: true
                        })
                    ]);
                }).catch(reject);
            });
        };
        providers$$1.generateAbstractIcon = function(_ref2) {
            var children = _ref2.children, attributes = _ref2.attributes, main = _ref2.main, transform = _ref2.transform, styles = _ref2.styles;
            var styleString = joinStyles(styles);
            if (styleString.length > 0) {
                attributes['style'] = styleString;
            }
            var nextChild;
            if (transformIsMeaningful(transform)) {
                nextChild = callProvided('generateAbstractTransformGrouping', {
                    main: main,
                    transform: transform,
                    containerWidth: main.width,
                    iconWidth: main.width
                });
            }
            children.push(nextChild || main.icon);
            return {
                children: children,
                attributes: attributes
            };
        };
    }
};
var Layers = {
    mixout: function mixout() {
        return {
            layer: function layer(assembler) {
                var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                var _params_classes = params.classes, classes = _params_classes === void 0 ? [] : _params_classes;
                return domVariants({
                    type: 'layer'
                }, function() {
                    callHooks('beforeDOMElementCreation', {
                        assembler: assembler,
                        params: params
                    });
                    var children = [];
                    assembler(function(args) {
                        Array.isArray(args) ? args.map(function(a) {
                            children = children.concat(a.abstract);
                        }) : children = children.concat(args.abstract);
                    });
                    return [
                        {
                            tag: 'span',
                            attributes: {
                                class: [
                                    "".concat(config.cssPrefix, "-layers")
                                ].concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(classes)).join(' ')
                            },
                            children: children
                        }
                    ];
                });
            }
        };
    }
};
var LayersCounter = {
    mixout: function mixout() {
        return {
            counter: function counter(content) {
                var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                var _params_title = params.title, title = _params_title === void 0 ? null : _params_title, _params_classes = params.classes, classes = _params_classes === void 0 ? [] : _params_classes, _params_attributes = params.attributes, attributes = _params_attributes === void 0 ? {} : _params_attributes, _params_styles = params.styles, styles = _params_styles === void 0 ? {} : _params_styles;
                return domVariants({
                    type: 'counter',
                    content: content
                }, function() {
                    callHooks('beforeDOMElementCreation', {
                        content: content,
                        params: params
                    });
                    return makeLayersCounterAbstract({
                        content: content.toString(),
                        title: title,
                        extra: {
                            attributes: attributes,
                            styles: styles,
                            classes: [
                                "".concat(config.cssPrefix, "-layers-counter")
                            ].concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(classes))
                        }
                    });
                });
            }
        };
    }
};
var LayersText = {
    mixout: function mixout() {
        return {
            text: function text(content) {
                var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                var _params_transform = params.transform, transform = _params_transform === void 0 ? meaninglessTransform : _params_transform, _params_title = params.title, title = _params_title === void 0 ? null : _params_title, _params_classes = params.classes, classes = _params_classes === void 0 ? [] : _params_classes, _params_attributes = params.attributes, attributes = _params_attributes === void 0 ? {} : _params_attributes, _params_styles = params.styles, styles = _params_styles === void 0 ? {} : _params_styles;
                return domVariants({
                    type: 'text',
                    content: content
                }, function() {
                    callHooks('beforeDOMElementCreation', {
                        content: content,
                        params: params
                    });
                    return makeLayersTextAbstract({
                        content: content,
                        transform: _objectSpread2(_objectSpread2({}, meaninglessTransform), transform),
                        title: title,
                        extra: {
                            attributes: attributes,
                            styles: styles,
                            classes: [
                                "".concat(config.cssPrefix, "-layers-text")
                            ].concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(classes))
                        }
                    });
                });
            }
        };
    },
    provides: function provides(providers$$1) {
        providers$$1.generateLayersText = function(node, nodeMeta) {
            var title = nodeMeta.title, transform = nodeMeta.transform, extra = nodeMeta.extra;
            var width = null;
            var height = null;
            if (IS_IE) {
                var computedFontSize = parseInt(getComputedStyle(node).fontSize, 10);
                var boundingClientRect = node.getBoundingClientRect();
                width = boundingClientRect.width / computedFontSize;
                height = boundingClientRect.height / computedFontSize;
            }
            if (config.autoA11y && !title) {
                extra.attributes['aria-hidden'] = 'true';
            }
            return Promise.resolve([
                node,
                makeLayersTextAbstract({
                    content: node.innerHTML,
                    width: width,
                    height: height,
                    transform: transform,
                    title: title,
                    extra: extra,
                    watchable: true
                })
            ]);
        };
    }
};
var CLEAN_CONTENT_PATTERN = new RegExp('\u{22}', 'ug');
var SECONDARY_UNICODE_RANGE = [
    1105920,
    1112319
];
var _FONT_FAMILY_WEIGHT_TO_PREFIX = _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, {
    FontAwesome: {
        normal: 'fas',
        400: 'fas'
    }
}), lt), wa), Yt);
var FONT_FAMILY_WEIGHT_TO_PREFIX = Object.keys(_FONT_FAMILY_WEIGHT_TO_PREFIX).reduce(function(acc, key) {
    acc[key.toLowerCase()] = _FONT_FAMILY_WEIGHT_TO_PREFIX[key];
    return acc;
}, {});
var FONT_FAMILY_WEIGHT_FALLBACK = Object.keys(FONT_FAMILY_WEIGHT_TO_PREFIX).reduce(function(acc, fontFamily) {
    var weights = FONT_FAMILY_WEIGHT_TO_PREFIX[fontFamily];
    acc[fontFamily] = weights[900] || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(Object.entries(weights))[0][1];
    return acc;
}, {});
function hexValueFromContent(content) {
    var cleaned = content.replace(CLEAN_CONTENT_PATTERN, '');
    var codePoint = codePointAt(cleaned, 0);
    var isPrependTen = codePoint >= SECONDARY_UNICODE_RANGE[0] && codePoint <= SECONDARY_UNICODE_RANGE[1];
    var isDoubled = cleaned.length === 2 ? cleaned[0] === cleaned[1] : false;
    return {
        value: isDoubled ? toHex(cleaned[0]) : toHex(cleaned),
        isSecondary: isPrependTen || isDoubled
    };
}
function getPrefix(fontFamily, fontWeight) {
    var fontFamilySanitized = fontFamily.replace(/^['"]|['"]$/g, '').toLowerCase();
    var fontWeightInteger = parseInt(fontWeight);
    var fontWeightSanitized = isNaN(fontWeightInteger) ? 'normal' : fontWeightInteger;
    return (FONT_FAMILY_WEIGHT_TO_PREFIX[fontFamilySanitized] || {})[fontWeightSanitized] || FONT_FAMILY_WEIGHT_FALLBACK[fontFamilySanitized];
}
function replaceForPosition(node, position) {
    var pendingAttribute = "".concat(DATA_FA_PSEUDO_ELEMENT_PENDING).concat(position.replace(':', '-'));
    return new Promise(function(resolve, reject) {
        if (node.getAttribute(pendingAttribute) !== null) {
            // This node is already being processed
            return resolve();
        }
        var children = toArray(node.children);
        var alreadyProcessedPseudoElement = children.filter(function(c$$1) {
            return c$$1.getAttribute(DATA_FA_PSEUDO_ELEMENT) === position;
        })[0];
        var styles = WINDOW.getComputedStyle(node, position);
        var fontFamily = styles.getPropertyValue('font-family');
        var fontFamilyMatch = fontFamily.match(FONT_FAMILY_PATTERN);
        var fontWeight = styles.getPropertyValue('font-weight');
        var content = styles.getPropertyValue('content');
        if (alreadyProcessedPseudoElement && !fontFamilyMatch) {
            // If we've already processed it but the current computed style does not result in a font-family,
            // that probably means that a class name that was previously present to make the icon has been
            // removed. So we now should delete the icon.
            node.removeChild(alreadyProcessedPseudoElement);
            return resolve();
        } else if (fontFamilyMatch && content !== 'none' && content !== '') {
            var content1 = styles.getPropertyValue('content');
            var prefix = getPrefix(fontFamily, fontWeight);
            var _hexValueFromContent = hexValueFromContent(content1), hexValue = _hexValueFromContent.value, isSecondary = _hexValueFromContent.isSecondary;
            var isV4 = fontFamilyMatch[0].startsWith('FontAwesome');
            var iconName = byUnicode(prefix, hexValue);
            var iconIdentifier = iconName;
            if (isV4) {
                var iconName4 = byOldUnicode(hexValue);
                if (iconName4.iconName && iconName4.prefix) {
                    iconName = iconName4.iconName;
                    prefix = iconName4.prefix;
                }
            }
            // Only convert the pseudo element in this ::before/::after position into an icon if we haven't
            // already done so with the same prefix and iconName
            if (iconName && !isSecondary && (!alreadyProcessedPseudoElement || alreadyProcessedPseudoElement.getAttribute(DATA_PREFIX) !== prefix || alreadyProcessedPseudoElement.getAttribute(DATA_ICON) !== iconIdentifier)) {
                node.setAttribute(pendingAttribute, iconIdentifier);
                if (alreadyProcessedPseudoElement) {
                    // Delete the old one, since we're replacing it with a new one
                    node.removeChild(alreadyProcessedPseudoElement);
                }
                var meta = blankMeta();
                var extra = meta.extra;
                extra.attributes[DATA_FA_PSEUDO_ELEMENT] = position;
                findIcon(iconName, prefix).then(function(main) {
                    var abstract = makeInlineSvgAbstract(_objectSpread2(_objectSpread2({}, meta), {}, {
                        icons: {
                            main: main,
                            mask: emptyCanonicalIcon()
                        },
                        prefix: prefix,
                        iconName: iconIdentifier,
                        extra: extra,
                        watchable: true
                    }));
                    var element = DOCUMENT.createElementNS('http://www.w3.org/2000/svg', 'svg');
                    if (position === '::before') {
                        node.insertBefore(element, node.firstChild);
                    } else {
                        node.appendChild(element);
                    }
                    element.outerHTML = abstract.map(function(a$$1) {
                        return toHtml(a$$1);
                    }).join('\n');
                    node.removeAttribute(pendingAttribute);
                    resolve();
                }).catch(reject);
            } else {
                resolve();
            }
        } else {
            resolve();
        }
    });
}
function replace(node) {
    return Promise.all([
        replaceForPosition(node, '::before'),
        replaceForPosition(node, '::after')
    ]);
}
function processable(node) {
    return node.parentNode !== document.head && !~TAGNAMES_TO_SKIP_FOR_PSEUDOELEMENTS.indexOf(node.tagName.toUpperCase()) && !node.getAttribute(DATA_FA_PSEUDO_ELEMENT) && (!node.parentNode || node.parentNode.tagName !== 'svg');
}
function searchPseudoElements(root) {
    if (!IS_DOM) return;
    return new Promise(function(resolve, reject) {
        var operations = toArray(root.querySelectorAll('*')).filter(processable).map(replace);
        var end = perf.begin('searchPseudoElements');
        disableObservation();
        Promise.all(operations).then(function() {
            end();
            enableObservation();
            resolve();
        }).catch(function() {
            end();
            enableObservation();
            reject();
        });
    });
}
var PseudoElements = {
    hooks: function hooks() {
        return {
            mutationObserverCallbacks: function mutationObserverCallbacks(accumulator) {
                accumulator.pseudoElementsCallback = searchPseudoElements;
                return accumulator;
            }
        };
    },
    provides: function provides(providers) {
        providers.pseudoElements2svg = function(params) {
            var _params_node = params.node, node = _params_node === void 0 ? DOCUMENT : _params_node;
            if (config.searchPseudoElements) {
                searchPseudoElements(node);
            }
        };
    }
};
var _unwatched = false;
var MutationObserver$1 = {
    mixout: function mixout() {
        return {
            dom: {
                unwatch: function unwatch() {
                    disableObservation();
                    _unwatched = true;
                }
            }
        };
    },
    hooks: function hooks() {
        return {
            bootstrap: function bootstrap() {
                observe(chainHooks('mutationObserverCallbacks', {}));
            },
            noAuto: function noAuto() {
                disconnect();
            },
            watch: function watch(params) {
                var observeMutationsRoot = params.observeMutationsRoot;
                if (_unwatched) {
                    enableObservation();
                } else {
                    observe(chainHooks('mutationObserverCallbacks', {
                        observeMutationsRoot: observeMutationsRoot
                    }));
                }
            }
        };
    }
};
var parseTransformString = function(transformString) {
    var transform = {
        size: 16,
        x: 0,
        y: 0,
        flipX: false,
        flipY: false,
        rotate: 0
    };
    return transformString.toLowerCase().split(' ').reduce(function(acc, n) {
        var parts = n.toLowerCase().split('-');
        var first = parts[0];
        var rest = parts.slice(1).join('-');
        if (first && rest === 'h') {
            acc.flipX = true;
            return acc;
        }
        if (first && rest === 'v') {
            acc.flipY = true;
            return acc;
        }
        rest = parseFloat(rest);
        if (isNaN(rest)) {
            return acc;
        }
        switch(first){
            case 'grow':
                acc.size = acc.size + rest;
                break;
            case 'shrink':
                acc.size = acc.size - rest;
                break;
            case 'left':
                acc.x = acc.x - rest;
                break;
            case 'right':
                acc.x = acc.x + rest;
                break;
            case 'up':
                acc.y = acc.y - rest;
                break;
            case 'down':
                acc.y = acc.y + rest;
                break;
            case 'rotate':
                acc.rotate = acc.rotate + rest;
                break;
        }
        return acc;
    }, transform);
};
var PowerTransforms = {
    mixout: function mixout() {
        return {
            parse: {
                transform: function(transformString) {
                    return parseTransformString(transformString);
                }
            }
        };
    },
    hooks: function hooks() {
        return {
            parseNodeAttributes: function parseNodeAttributes(accumulator, node) {
                var transformString = node.getAttribute('data-fa-transform');
                if (transformString) {
                    accumulator.transform = parseTransformString(transformString);
                }
                return accumulator;
            }
        };
    },
    provides: function provides(providers) {
        providers.generateAbstractTransformGrouping = function(_ref) {
            var main = _ref.main, transform = _ref.transform, containerWidth = _ref.containerWidth, iconWidth = _ref.iconWidth;
            var outer = {
                transform: "translate(".concat(containerWidth / 2, " 256)")
            };
            var innerTranslate = "translate(".concat(transform.x * 32, ", ").concat(transform.y * 32, ") ");
            var innerScale = "scale(".concat(transform.size / 16 * (transform.flipX ? -1 : 1), ", ").concat(transform.size / 16 * (transform.flipY ? -1 : 1), ") ");
            var innerRotate = "rotate(".concat(transform.rotate, " 0 0)");
            var inner = {
                transform: "".concat(innerTranslate, " ").concat(innerScale, " ").concat(innerRotate)
            };
            var path = {
                transform: "translate(".concat(iconWidth / 2 * -1, " -256)")
            };
            var operations = {
                outer: outer,
                inner: inner,
                path: path
            };
            return {
                tag: 'g',
                attributes: _objectSpread2({}, operations.outer),
                children: [
                    {
                        tag: 'g',
                        attributes: _objectSpread2({}, operations.inner),
                        children: [
                            {
                                tag: main.icon.tag,
                                children: main.icon.children,
                                attributes: _objectSpread2(_objectSpread2({}, main.icon.attributes), operations.path)
                            }
                        ]
                    }
                ]
            };
        };
    }
};
var ALL_SPACE = {
    x: 0,
    y: 0,
    width: '100%',
    height: '100%'
};
function fillBlack(abstract) {
    var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    if (abstract.attributes && (abstract.attributes.fill || force)) {
        abstract.attributes.fill = 'black';
    }
    return abstract;
}
function deGroup(abstract) {
    if (abstract.tag === 'g') {
        return abstract.children;
    } else {
        return [
            abstract
        ];
    }
}
var Masks = {
    hooks: function hooks() {
        return {
            parseNodeAttributes: function parseNodeAttributes(accumulator, node) {
                var maskData = node.getAttribute('data-fa-mask');
                var mask = !maskData ? emptyCanonicalIcon() : getCanonicalIcon(maskData.split(' ').map(function(i) {
                    return i.trim();
                }));
                if (!mask.prefix) {
                    mask.prefix = getDefaultUsablePrefix();
                }
                accumulator.mask = mask;
                accumulator.maskId = node.getAttribute('data-fa-mask-id');
                return accumulator;
            }
        };
    },
    provides: function provides(providers) {
        providers.generateAbstractMask = function(_ref) {
            var children = _ref.children, attributes = _ref.attributes, main = _ref.main, mask = _ref.mask, explicitMaskId = _ref.maskId, transform = _ref.transform;
            var mainWidth = main.width, mainPath = main.icon;
            var maskWidth = mask.width, maskPath = mask.icon;
            var trans = transformForSvg({
                transform: transform,
                containerWidth: maskWidth,
                iconWidth: mainWidth
            });
            var maskRect = {
                tag: 'rect',
                attributes: _objectSpread2(_objectSpread2({}, ALL_SPACE), {}, {
                    fill: 'white'
                })
            };
            var maskInnerGroupChildrenMixin = mainPath.children ? {
                children: mainPath.children.map(fillBlack)
            } : {};
            var maskInnerGroup = {
                tag: 'g',
                attributes: _objectSpread2({}, trans.inner),
                children: [
                    fillBlack(_objectSpread2({
                        tag: mainPath.tag,
                        attributes: _objectSpread2(_objectSpread2({}, mainPath.attributes), trans.path)
                    }, maskInnerGroupChildrenMixin))
                ]
            };
            var maskOuterGroup = {
                tag: 'g',
                attributes: _objectSpread2({}, trans.outer),
                children: [
                    maskInnerGroup
                ]
            };
            var maskId = "mask-".concat(explicitMaskId || nextUniqueId());
            var clipId = "clip-".concat(explicitMaskId || nextUniqueId());
            var maskTag = {
                tag: 'mask',
                attributes: _objectSpread2(_objectSpread2({}, ALL_SPACE), {}, {
                    id: maskId,
                    maskUnits: 'userSpaceOnUse',
                    maskContentUnits: 'userSpaceOnUse'
                }),
                children: [
                    maskRect,
                    maskOuterGroup
                ]
            };
            var defs = {
                tag: 'defs',
                children: [
                    {
                        tag: 'clipPath',
                        attributes: {
                            id: clipId
                        },
                        children: deGroup(maskPath)
                    },
                    maskTag
                ]
            };
            children.push(defs, {
                tag: 'rect',
                attributes: _objectSpread2({
                    fill: 'currentColor',
                    'clip-path': "url(#".concat(clipId, ")"),
                    mask: "url(#".concat(maskId, ")")
                }, ALL_SPACE)
            });
            return {
                children: children,
                attributes: attributes
            };
        };
    }
};
var MissingIconIndicator = {
    provides: function provides(providers) {
        var reduceMotion = false;
        if (WINDOW.matchMedia) {
            reduceMotion = WINDOW.matchMedia('(prefers-reduced-motion: reduce)').matches;
        }
        providers.missingIconAbstract = function() {
            var gChildren = [];
            var FILL = {
                fill: 'currentColor'
            };
            var ANIMATION_BASE = {
                attributeType: 'XML',
                repeatCount: 'indefinite',
                dur: '2s'
            };
            // Ring
            gChildren.push({
                tag: 'path',
                attributes: _objectSpread2(_objectSpread2({}, FILL), {}, {
                    d: 'M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z'
                })
            });
            var OPACITY_ANIMATE = _objectSpread2(_objectSpread2({}, ANIMATION_BASE), {}, {
                attributeName: 'opacity'
            });
            var dot = {
                tag: 'circle',
                attributes: _objectSpread2(_objectSpread2({}, FILL), {}, {
                    cx: '256',
                    cy: '364',
                    r: '28'
                }),
                children: []
            };
            if (!reduceMotion) {
                dot.children.push({
                    tag: 'animate',
                    attributes: _objectSpread2(_objectSpread2({}, ANIMATION_BASE), {}, {
                        attributeName: 'r',
                        values: '28;14;28;28;14;28;'
                    })
                }, {
                    tag: 'animate',
                    attributes: _objectSpread2(_objectSpread2({}, OPACITY_ANIMATE), {}, {
                        values: '1;0;1;1;0;1;'
                    })
                });
            }
            gChildren.push(dot);
            gChildren.push({
                tag: 'path',
                attributes: _objectSpread2(_objectSpread2({}, FILL), {}, {
                    opacity: '1',
                    d: 'M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z'
                }),
                children: reduceMotion ? [] : [
                    {
                        tag: 'animate',
                        attributes: _objectSpread2(_objectSpread2({}, OPACITY_ANIMATE), {}, {
                            values: '1;0;0;0;0;1;'
                        })
                    }
                ]
            });
            if (!reduceMotion) {
                // Exclamation
                gChildren.push({
                    tag: 'path',
                    attributes: _objectSpread2(_objectSpread2({}, FILL), {}, {
                        opacity: '0',
                        d: 'M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z'
                    }),
                    children: [
                        {
                            tag: 'animate',
                            attributes: _objectSpread2(_objectSpread2({}, OPACITY_ANIMATE), {}, {
                                values: '0;0;1;1;0;0;'
                            })
                        }
                    ]
                });
            }
            return {
                tag: 'g',
                attributes: {
                    'class': 'missing'
                },
                children: gChildren
            };
        };
    }
};
var SvgSymbols = {
    hooks: function hooks() {
        return {
            parseNodeAttributes: function parseNodeAttributes(accumulator, node) {
                var symbolData = node.getAttribute('data-fa-symbol');
                var symbol = symbolData === null ? false : symbolData === '' ? true : symbolData;
                accumulator['symbol'] = symbol;
                return accumulator;
            }
        };
    }
};
var plugins = [
    InjectCSS,
    ReplaceElements,
    Layers,
    LayersCounter,
    LayersText,
    PseudoElements,
    MutationObserver$1,
    PowerTransforms,
    Masks,
    MissingIconIndicator,
    SvgSymbols
];
registerPlugins(plugins, {
    mixoutsTo: api
});
var noAuto$1 = api.noAuto;
var config$1 = api.config;
var library$1 = api.library;
var dom$1 = api.dom;
var parse$1 = api.parse;
var findIconDefinition$1 = api.findIconDefinition;
var toHtml$1 = api.toHtml;
var icon = api.icon;
var layer = api.layer;
var text = api.text;
var counter = api.counter;
;
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@fortawesome/fontawesome-svg-core/package.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"description":"The iconic font, CSS, and SVG framework","keywords":["font","awesome","fontawesome","icon","svg","bootstrap"],"homepage":"https://fontawesome.com","bugs":{"url":"https://github.com/FortAwesome/Font-Awesome/issues"},"author":"The Font Awesome Team (https://github.com/orgs/FortAwesome/people)","repository":{"type":"git","url":"https://github.com/FortAwesome/Font-Awesome"},"engines":{"node":">=6"},"dependencies":{"@fortawesome/fontawesome-common-types":"6.7.2"},"version":"6.7.2","name":"@fortawesome/fontawesome-svg-core","main":"index.js","module":"index.mjs","jsnext:main":"index.mjs","style":"styles.css","license":"MIT","types":"./index.d.ts","exports":{".":{"types":"./index.d.ts","module":"./index.mjs","import":"./index.mjs","require":"./index.js","style":"./styles.css","default":"./index.js"},"./index":{"types":"./index.d.ts","module":"./index.mjs","import":"./index.mjs","require":"./index.js","default":"./index.js"},"./index.js":{"types":"./index.d.ts","module":"./index.mjs","import":"./index.mjs","require":"./index.js","default":"./index.js"},"./plugins":{"types":"./index.d.ts","module":"./plugins.mjs","import":"./plugins.mjs","default":"./plugins.mjs"},"./import.macro":"./import.macro.js","./import.macro.js":"./import.macro.js","./styles":"./styles.css","./styles.css":"./styles.css","./package.json":"./package.json"},"sideEffects":["./index.js","./index.mjs","./styles.css"]});}),
]);

//# sourceMappingURL=5be21_%40fortawesome_fontawesome-svg-core_7d9160d1._.js.map