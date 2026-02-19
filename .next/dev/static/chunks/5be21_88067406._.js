(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_define_property
]);
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else obj[key] = value;
    return obj;
}
;
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_object_spread.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_object_spread
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)");
;
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(target, key, source[key]);
        });
    }
    return target;
}
;
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_object_spread_props.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_object_spread_props
]);
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
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
;
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_array_with_holes.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_array_with_holes
]);
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
;
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_iterable_to_array_limit.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_iterable_to_array_limit
]);
function _iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
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
;
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_non_iterable_rest.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_non_iterable_rest
]);
function _non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
;
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_array_like_to_array.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_array_like_to_array
]);
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
;
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_unsupported_iterable_to_array.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_unsupported_iterable_to_array
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_array_like_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_array_like_to_array.js [app-client] (ecmascript)");
;
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_array_like_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_array_like_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(o, minLen);
}
;
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_sliced_to_array.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_sliced_to_array
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_array_with_holes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_array_with_holes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_iterable_to_array_limit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_iterable_to_array_limit.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_non_iterable_rest$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_non_iterable_rest.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_unsupported_iterable_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_unsupported_iterable_to_array.js [app-client] (ecmascript)");
;
;
;
;
function _sliced_to_array(arr, i) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_array_with_holes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(arr) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_iterable_to_array_limit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(arr, i) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_unsupported_iterable_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(arr, i) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_non_iterable_rest$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])();
}
;
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_array_without_holes.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_array_without_holes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_array_like_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_array_like_to_array.js [app-client] (ecmascript)");
;
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_array_like_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(arr);
}
;
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_iterable_to_array.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_iterable_to_array
]);
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) {
        return Array.from(iter);
    }
}
;
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_non_iterable_spread.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_non_iterable_spread
]);
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
;
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_to_consumable_array.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_to_consumable_array
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_array_without_holes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_array_without_holes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_iterable_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_iterable_to_array.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_non_iterable_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_non_iterable_spread.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_unsupported_iterable_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_unsupported_iterable_to_array.js [app-client] (ecmascript)");
;
;
;
;
function _to_consumable_array(arr) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_array_without_holes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(arr) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_iterable_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(arr) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_unsupported_iterable_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(arr) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_non_iterable_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])();
}
;
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_async_to_generator.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_async_to_generator
]);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) resolve(value);
    else Promise.resolve(value).then(_next, _throw);
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
;
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_class_call_check.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_class_call_check
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_instanceof$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_instanceof.js [app-client] (ecmascript)");
;
function _class_call_check(instance, Constructor) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_instanceof$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(instance, Constructor)) throw new TypeError("Cannot call a class as a function");
}
;
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_create_class.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_create_class
]);
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
;
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/cjs/_object_without_properties_loose.cjs [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

function _object_without_properties_loose(source, excluded) {
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
exports._ = _object_without_properties_loose;
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/cjs/_object_without_properties.cjs [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _object_without_properties_loose = __turbopack_context__.r("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/cjs/_object_without_properties_loose.cjs [app-client] (ecmascript)");
function _object_without_properties(source, excluded) {
    if (source == null) return {};
    var target = _object_without_properties_loose._(source, excluded);
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
exports._ = _object_without_properties;
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_get_prototype_of.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_get_prototype_of
]);
function _get_prototype_of(o) {
    _get_prototype_of = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _get_prototype_of(o);
}
;
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_is_native_reflect_construct.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_is_native_reflect_construct
]);
function _is_native_reflect_construct() {
    // Since Reflect.construct can't be properly polyfilled, some
    // implementations (e.g. core-js@2) don't set the correct internal slots.
    // Those polyfills don't allow us to subclass built-ins, so we need to
    // use our fallback implementation.
    try {
        // If the internal slots aren't set, this throws an error similar to
        //   TypeError: this is not a Boolean object.
        var result = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
    } catch (_) {}
    return (_is_native_reflect_construct = function _is_native_reflect_construct() {
        return !!result;
    })();
}
;
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_assert_this_initialized.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_assert_this_initialized
]);
function _assert_this_initialized(self) {
    if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return self;
}
;
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_possible_constructor_return.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_possible_constructor_return
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_assert_this_initialized$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_assert_this_initialized.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
;
;
function _possible_constructor_return(self, call) {
    if (call && ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(call) === "object" || typeof call === "function")) return call;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_assert_this_initialized$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(self);
}
;
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_call_super.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_call_super
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_get_prototype_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_get_prototype_of.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_is_native_reflect_construct$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_is_native_reflect_construct.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_possible_constructor_return$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_possible_constructor_return.js [app-client] (ecmascript)");
;
;
;
function _call_super(_this, derived, args) {
    // Super
    derived = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_get_prototype_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(derived);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_possible_constructor_return$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(_this, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_is_native_reflect_construct$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])() ? Reflect.construct(derived, args || [], (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_get_prototype_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(_this).constructor) : derived.apply(_this, args));
}
;
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_set_prototype_of.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_set_prototype_of
]);
function _set_prototype_of(o, p) {
    _set_prototype_of = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _set_prototype_of(o, p);
}
;
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_inherits.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_inherits
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_set_prototype_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_set_prototype_of.js [app-client] (ecmascript)");
;
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_set_prototype_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(subClass, superClass);
}
;
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_construct.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_construct
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_is_native_reflect_construct$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_is_native_reflect_construct.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_set_prototype_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_set_prototype_of.js [app-client] (ecmascript)");
;
;
function _construct(Parent, args, Class) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_is_native_reflect_construct$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])()) _construct = Reflect.construct;
    else {
        _construct = function construct(Parent, args, Class) {
            var a = [
                null
            ];
            a.push.apply(a, args);
            var Constructor = Function.bind.apply(Parent, a);
            var instance = new Constructor();
            if (Class) (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_set_prototype_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(instance, Class.prototype);
            return instance;
        };
    }
    return _construct.apply(null, arguments);
}
;
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_is_native_function.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_is_native_function
]);
function _is_native_function(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
;
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_wrap_native_super.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_wrap_native_super
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_construct$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_construct.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_get_prototype_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_get_prototype_of.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_is_native_function$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_is_native_function.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_set_prototype_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_set_prototype_of.js [app-client] (ecmascript)");
;
;
;
;
function _wrap_native_super(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;
    _wrap_native_super = function _wrap_native_super(Class) {
        if (Class === null || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_is_native_function$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(Class)) return Class;
        if (typeof Class !== "function") throw new TypeError("Super expression must either be null or a function");
        if (typeof _cache !== "undefined") {
            if (_cache.has(Class)) return _cache.get(Class);
            _cache.set(Class, Wrapper);
        }
        function Wrapper() {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_construct$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(Class, arguments, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_get_prototype_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this).constructor);
        }
        Wrapper.prototype = Object.create(Class.prototype, {
            constructor: {
                value: Wrapper,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_set_prototype_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(Wrapper, Class);
    };
    return _wrap_native_super(Class);
}
;
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_super_prop_base.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_super_prop_base
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_get_prototype_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_get_prototype_of.js [app-client] (ecmascript)");
;
function _super_prop_base(object, property) {
    while(!Object.prototype.hasOwnProperty.call(object, property)){
        object = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_get_prototype_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(object);
        if (object === null) break;
    }
    return object;
}
;
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_get.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_get
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_super_prop_base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_super_prop_base.js [app-client] (ecmascript)");
;
function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) _get = Reflect.get;
    else {
        _get = function get(target, property, receiver) {
            var base = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_super_prop_base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(target, property);
            if (!base) return;
            var desc = Object.getOwnPropertyDescriptor(base, property);
            if (desc.get) return desc.get.call(receiver || target);
            return desc.value;
        };
    }
    return _get(target, property, receiver || target);
}
;
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/tslib/tslib.es6.mjs [app-client] (ecmascript) <export __generator as _>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/tslib/tslib.es6.mjs [app-client] (ecmascript)");
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/react-is/cjs/react-is.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 'use strict';
var _type_of = __turbopack_context__.r("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/cjs/_type_of.cjs [app-client] (ecmascript)");
if ("TURBOPACK compile-time truthy", 1) {
    (function() {
        'use strict';
        // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
        // nor polyfill, then a plain number is used for performance.
        var hasSymbol = typeof Symbol === 'function' && Symbol.for;
        var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
        var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
        var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
        var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
        var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
        var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
        var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
        // (unstable) APIs that have been removed. Can we remove the symbols?
        var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
        var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
        var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
        var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
        var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
        var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
        var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
        var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
        var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
        var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
        var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;
        function isValidElementType(type) {
            return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
            type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || (typeof type === "undefined" ? "undefined" : _type_of._(type)) === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
        }
        function typeOf(object) {
            if ((typeof object === "undefined" ? "undefined" : _type_of._(object)) === 'object' && object !== null) {
                var $$typeof = object.$$typeof;
                switch($$typeof){
                    case REACT_ELEMENT_TYPE:
                        var type = object.type;
                        switch(type){
                            case REACT_ASYNC_MODE_TYPE:
                            case REACT_CONCURRENT_MODE_TYPE:
                            case REACT_FRAGMENT_TYPE:
                            case REACT_PROFILER_TYPE:
                            case REACT_STRICT_MODE_TYPE:
                            case REACT_SUSPENSE_TYPE:
                                return type;
                            default:
                                var $$typeofType = type && type.$$typeof;
                                switch($$typeofType){
                                    case REACT_CONTEXT_TYPE:
                                    case REACT_FORWARD_REF_TYPE:
                                    case REACT_LAZY_TYPE:
                                    case REACT_MEMO_TYPE:
                                    case REACT_PROVIDER_TYPE:
                                        return $$typeofType;
                                    default:
                                        return $$typeof;
                                }
                        }
                    case REACT_PORTAL_TYPE:
                        return $$typeof;
                }
            }
            return undefined;
        } // AsyncMode is deprecated along with isAsyncMode
        var AsyncMode = REACT_ASYNC_MODE_TYPE;
        var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
        var ContextConsumer = REACT_CONTEXT_TYPE;
        var ContextProvider = REACT_PROVIDER_TYPE;
        var Element = REACT_ELEMENT_TYPE;
        var ForwardRef = REACT_FORWARD_REF_TYPE;
        var Fragment = REACT_FRAGMENT_TYPE;
        var Lazy = REACT_LAZY_TYPE;
        var Memo = REACT_MEMO_TYPE;
        var Portal = REACT_PORTAL_TYPE;
        var Profiler = REACT_PROFILER_TYPE;
        var StrictMode = REACT_STRICT_MODE_TYPE;
        var Suspense = REACT_SUSPENSE_TYPE;
        var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated
        function isAsyncMode(object) {
            {
                if (!hasWarnedAboutDeprecatedIsAsyncMode) {
                    hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint
                    console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
                }
            }
            return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
        }
        function isConcurrentMode(object) {
            return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
        }
        function isContextConsumer(object) {
            return typeOf(object) === REACT_CONTEXT_TYPE;
        }
        function isContextProvider(object) {
            return typeOf(object) === REACT_PROVIDER_TYPE;
        }
        function isElement(object) {
            return (typeof object === "undefined" ? "undefined" : _type_of._(object)) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        function isForwardRef(object) {
            return typeOf(object) === REACT_FORWARD_REF_TYPE;
        }
        function isFragment(object) {
            return typeOf(object) === REACT_FRAGMENT_TYPE;
        }
        function isLazy(object) {
            return typeOf(object) === REACT_LAZY_TYPE;
        }
        function isMemo(object) {
            return typeOf(object) === REACT_MEMO_TYPE;
        }
        function isPortal(object) {
            return typeOf(object) === REACT_PORTAL_TYPE;
        }
        function isProfiler(object) {
            return typeOf(object) === REACT_PROFILER_TYPE;
        }
        function isStrictMode(object) {
            return typeOf(object) === REACT_STRICT_MODE_TYPE;
        }
        function isSuspense(object) {
            return typeOf(object) === REACT_SUSPENSE_TYPE;
        }
        exports.AsyncMode = AsyncMode;
        exports.ConcurrentMode = ConcurrentMode;
        exports.ContextConsumer = ContextConsumer;
        exports.ContextProvider = ContextProvider;
        exports.Element = Element;
        exports.ForwardRef = ForwardRef;
        exports.Fragment = Fragment;
        exports.Lazy = Lazy;
        exports.Memo = Memo;
        exports.Portal = Portal;
        exports.Profiler = Profiler;
        exports.StrictMode = StrictMode;
        exports.Suspense = Suspense;
        exports.isAsyncMode = isAsyncMode;
        exports.isConcurrentMode = isConcurrentMode;
        exports.isContextConsumer = isContextConsumer;
        exports.isContextProvider = isContextProvider;
        exports.isElement = isElement;
        exports.isForwardRef = isForwardRef;
        exports.isFragment = isFragment;
        exports.isLazy = isLazy;
        exports.isMemo = isMemo;
        exports.isPortal = isPortal;
        exports.isProfiler = isProfiler;
        exports.isStrictMode = isStrictMode;
        exports.isSuspense = isSuspense;
        exports.isValidElementType = isValidElementType;
        exports.typeOf = typeOf;
    })();
}
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/react-is/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/react-is/cjs/react-is.development.js [app-client] (ecmascript)");
}
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/prop-types/lib/ReactPropTypesSecret.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
module.exports = ReactPropTypesSecret;
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/prop-types/lib/has.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = Function.call.bind(Object.prototype.hasOwnProperty);
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/prop-types/checkPropTypes.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 'use strict';
var _instanceof = __turbopack_context__.r("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/cjs/_instanceof.cjs [app-client] (ecmascript)");
var _type_of = __turbopack_context__.r("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/cjs/_type_of.cjs [app-client] (ecmascript)");
var printWarning = function printWarning() {};
if ("TURBOPACK compile-time truthy", 1) {
    var ReactPropTypesSecret = __turbopack_context__.r("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/prop-types/lib/ReactPropTypesSecret.js [app-client] (ecmascript)");
    var loggedTypeFailures = {};
    var has = __turbopack_context__.r("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/prop-types/lib/has.js [app-client] (ecmascript)");
    printWarning = function printWarning(text) {
        var message = 'Warning: ' + text;
        if (typeof console !== 'undefined') {
            console.error(message);
        }
        try {
            // --- Welcome to debugging React ---
            // This error was thrown as a convenience so that you can use this stack
            // to find the callsite that caused this warning to fire.
            throw new Error(message);
        } catch (x) {}
    };
}
/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */ function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
    if ("TURBOPACK compile-time truthy", 1) {
        for(var typeSpecName in typeSpecs){
            if (has(typeSpecs, typeSpecName)) {
                var error;
                // Prop type validation may throw. In case they do, we don't want to
                // fail the render phase where it didn't fail before. So we log it.
                // After these have been cleaned up, we'll let them throw.
                try {
                    // This is intentionally an invariant that gets caught. It's the same
                    // behavior as without this statement except with a better message.
                    if (typeof typeSpecs[typeSpecName] !== 'function') {
                        var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + _type_of._(typeSpecs[typeSpecName]) + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
                        err.name = 'Invariant Violation';
                        throw err;
                    }
                    error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
                } catch (ex) {
                    error = ex;
                }
                if (error && !_instanceof._(error, Error)) {
                    printWarning((componentName || 'React class') + ': type specification of ' + location + ' `' + typeSpecName + '` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a ' + (typeof error === "undefined" ? "undefined" : _type_of._(error)) + '. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).');
                }
                if (_instanceof._(error, Error) && !(error.message in loggedTypeFailures)) {
                    // Only monitor this failure once because there tends to be a lot of the
                    // same error.
                    loggedTypeFailures[error.message] = true;
                    var stack = getStack ? getStack() : '';
                    printWarning('Failed ' + location + ' type: ' + error.message + (stack != null ? stack : ''));
                }
            }
        }
    }
}
/**
 * Resets warning cache when testing.
 *
 * @private
 */ checkPropTypes.resetWarningCache = function() {
    if (("TURBOPACK compile-time value", "development") !== 'production') {
        loggedTypeFailures = {};
    }
};
module.exports = checkPropTypes;
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/prop-types/factoryWithTypeCheckers.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 'use strict';
var _instanceof = __turbopack_context__.r("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/cjs/_instanceof.cjs [app-client] (ecmascript)");
var _type_of = __turbopack_context__.r("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/cjs/_type_of.cjs [app-client] (ecmascript)");
var ReactIs = __turbopack_context__.r("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/react-is/index.js [app-client] (ecmascript)");
var assign = __turbopack_context__.r("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/dist/build/polyfills/object-assign.js [app-client] (ecmascript)");
var ReactPropTypesSecret = __turbopack_context__.r("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/prop-types/lib/ReactPropTypesSecret.js [app-client] (ecmascript)");
var has = __turbopack_context__.r("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/prop-types/lib/has.js [app-client] (ecmascript)");
var checkPropTypes = __turbopack_context__.r("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/prop-types/checkPropTypes.js [app-client] (ecmascript)");
var printWarning = function printWarning() {};
if ("TURBOPACK compile-time truthy", 1) {
    printWarning = function printWarning(text) {
        var message = 'Warning: ' + text;
        if (typeof console !== 'undefined') {
            console.error(message);
        }
        try {
            // --- Welcome to debugging React ---
            // This error was thrown as a convenience so that you can use this stack
            // to find the callsite that caused this warning to fire.
            throw new Error(message);
        } catch (x) {}
    };
}
function emptyFunctionThatReturnsNull() {
    return null;
}
module.exports = function(isValidElement, throwOnDirectAccess) {
    /* global Symbol */ var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
    var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.
    /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */ function getIteratorFn(maybeIterable) {
        var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
        if (typeof iteratorFn === 'function') {
            return iteratorFn;
        }
    }
    /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */ var ANONYMOUS = '<<anonymous>>';
    // Important!
    // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
    var ReactPropTypes = {
        array: createPrimitiveTypeChecker('array'),
        bigint: createPrimitiveTypeChecker('bigint'),
        bool: createPrimitiveTypeChecker('boolean'),
        func: createPrimitiveTypeChecker('function'),
        number: createPrimitiveTypeChecker('number'),
        object: createPrimitiveTypeChecker('object'),
        string: createPrimitiveTypeChecker('string'),
        symbol: createPrimitiveTypeChecker('symbol'),
        any: createAnyTypeChecker(),
        arrayOf: createArrayOfTypeChecker,
        element: createElementTypeChecker(),
        elementType: createElementTypeTypeChecker(),
        instanceOf: createInstanceTypeChecker,
        node: createNodeChecker(),
        objectOf: createObjectOfTypeChecker,
        oneOf: createEnumTypeChecker,
        oneOfType: createUnionTypeChecker,
        shape: createShapeTypeChecker,
        exact: createStrictShapeTypeChecker
    };
    /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */ /*eslint-disable no-self-compare*/ function is(x, y) {
        // SameValue algorithm
        if (x === y) {
            // Steps 1-5, 7-10
            // Steps 6.b-6.e: +0 != -0
            return x !== 0 || 1 / x === 1 / y;
        } else {
            // Step 6.a: NaN == NaN
            return x !== x && y !== y;
        }
    }
    /*eslint-enable no-self-compare*/ /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */ function PropTypeError(message, data) {
        this.message = message;
        this.data = data && (typeof data === "undefined" ? "undefined" : _type_of._(data)) === 'object' ? data : {};
        this.stack = '';
    }
    // Make `instanceof Error` still work for returned errors.
    PropTypeError.prototype = Error.prototype;
    function createChainableTypeChecker(validate) {
        if (("TURBOPACK compile-time value", "development") !== 'production') {
            var manualPropTypeCallCache = {};
            var manualPropTypeWarningCount = 0;
        }
        function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
            componentName = componentName || ANONYMOUS;
            propFullName = propFullName || propName;
            if (secret !== ReactPropTypesSecret) {
                if (throwOnDirectAccess) {
                    // New behavior only for users of `prop-types` package
                    var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use `PropTypes.checkPropTypes()` to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
                    err.name = 'Invariant Violation';
                    throw err;
                } else if (("TURBOPACK compile-time value", "development") !== 'production' && typeof console !== 'undefined') {
                    // Old behavior for people using React.PropTypes
                    var cacheKey = componentName + ':' + propName;
                    if (!manualPropTypeCallCache[cacheKey] && // Avoid spamming the console because they are often not actionable except for lib authors
                    manualPropTypeWarningCount < 3) {
                        printWarning('You are manually calling a React.PropTypes validation ' + 'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' + 'and will throw in the standalone `prop-types` package. ' + 'You may be seeing this warning due to a third-party PropTypes ' + 'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.');
                        manualPropTypeCallCache[cacheKey] = true;
                        manualPropTypeWarningCount++;
                    }
                }
            }
            if (props[propName] == null) {
                if (isRequired) {
                    if (props[propName] === null) {
                        return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
                    }
                    return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
                }
                return null;
            } else {
                return validate(props, propName, componentName, location, propFullName);
            }
        }
        var chainedCheckType = checkType.bind(null, false);
        chainedCheckType.isRequired = checkType.bind(null, true);
        return chainedCheckType;
    }
    function createPrimitiveTypeChecker(expectedType) {
        function validate(props, propName, componentName, location, propFullName, secret) {
            var propValue = props[propName];
            var propType = getPropType(propValue);
            if (propType !== expectedType) {
                // `propValue` being instance of, say, date/regexp, pass the 'object'
                // check, but we can offer a more precise error message here rather than
                // 'of type `object`'.
                var preciseType = getPreciseType(propValue);
                return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'), {
                    expectedType: expectedType
                });
            }
            return null;
        }
        return createChainableTypeChecker(validate);
    }
    function createAnyTypeChecker() {
        return createChainableTypeChecker(emptyFunctionThatReturnsNull);
    }
    function createArrayOfTypeChecker(typeChecker) {
        function validate(props, propName, componentName, location, propFullName) {
            if (typeof typeChecker !== 'function') {
                return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
            }
            var propValue = props[propName];
            if (!Array.isArray(propValue)) {
                var propType = getPropType(propValue);
                return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
            }
            for(var i = 0; i < propValue.length; i++){
                var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
                if (_instanceof._(error, Error)) {
                    return error;
                }
            }
            return null;
        }
        return createChainableTypeChecker(validate);
    }
    function createElementTypeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
            var propValue = props[propName];
            if (!isValidElement(propValue)) {
                var propType = getPropType(propValue);
                return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
            }
            return null;
        }
        return createChainableTypeChecker(validate);
    }
    function createElementTypeTypeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
            var propValue = props[propName];
            if (!ReactIs.isValidElementType(propValue)) {
                var propType = getPropType(propValue);
                return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
            }
            return null;
        }
        return createChainableTypeChecker(validate);
    }
    function createInstanceTypeChecker(expectedClass) {
        function validate(props, propName, componentName, location, propFullName) {
            if (!_instanceof._(props[propName], expectedClass)) {
                var expectedClassName = expectedClass.name || ANONYMOUS;
                var actualClassName = getClassName(props[propName]);
                return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
            }
            return null;
        }
        return createChainableTypeChecker(validate);
    }
    function createEnumTypeChecker(expectedValues) {
        if (!Array.isArray(expectedValues)) {
            if ("TURBOPACK compile-time truthy", 1) {
                if (arguments.length > 1) {
                    printWarning('Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' + 'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).');
                } else {
                    printWarning('Invalid argument supplied to oneOf, expected an array.');
                }
            }
            return emptyFunctionThatReturnsNull;
        }
        function validate(props, propName, componentName, location, propFullName) {
            var propValue = props[propName];
            for(var i = 0; i < expectedValues.length; i++){
                if (is(propValue, expectedValues[i])) {
                    return null;
                }
            }
            var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
                var type = getPreciseType(value);
                if (type === 'symbol') {
                    return String(value);
                }
                return value;
            });
            return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
        }
        return createChainableTypeChecker(validate);
    }
    function createObjectOfTypeChecker(typeChecker) {
        function validate(props, propName, componentName, location, propFullName) {
            if (typeof typeChecker !== 'function') {
                return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
            }
            var propValue = props[propName];
            var propType = getPropType(propValue);
            if (propType !== 'object') {
                return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
            }
            for(var key in propValue){
                if (has(propValue, key)) {
                    var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
                    if (_instanceof._(error, Error)) {
                        return error;
                    }
                }
            }
            return null;
        }
        return createChainableTypeChecker(validate);
    }
    function createUnionTypeChecker(arrayOfTypeCheckers) {
        if (!Array.isArray(arrayOfTypeCheckers)) {
            ("TURBOPACK compile-time truthy", 1) ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : "TURBOPACK unreachable";
            return emptyFunctionThatReturnsNull;
        }
        for(var i = 0; i < arrayOfTypeCheckers.length; i++){
            var checker = arrayOfTypeCheckers[i];
            if (typeof checker !== 'function') {
                printWarning('Invalid argument supplied to oneOfType. Expected an array of check functions, but ' + 'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.');
                return emptyFunctionThatReturnsNull;
            }
        }
        function validate(props, propName, componentName, location, propFullName) {
            var expectedTypes = [];
            for(var i = 0; i < arrayOfTypeCheckers.length; i++){
                var checker = arrayOfTypeCheckers[i];
                var checkerResult = checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret);
                if (checkerResult == null) {
                    return null;
                }
                if (checkerResult.data && has(checkerResult.data, 'expectedType')) {
                    expectedTypes.push(checkerResult.data.expectedType);
                }
            }
            var expectedTypesMessage = expectedTypes.length > 0 ? ', expected one of type [' + expectedTypes.join(', ') + ']' : '';
            return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`' + expectedTypesMessage + '.'));
        }
        return createChainableTypeChecker(validate);
    }
    function createNodeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
            if (!isNode(props[propName])) {
                return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
            }
            return null;
        }
        return createChainableTypeChecker(validate);
    }
    function invalidValidatorError(componentName, location, propFullName, key, type) {
        return new PropTypeError((componentName || 'React class') + ': ' + location + ' type `' + propFullName + '.' + key + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + type + '`.');
    }
    function createShapeTypeChecker(shapeTypes) {
        function validate(props, propName, componentName, location, propFullName) {
            var propValue = props[propName];
            var propType = getPropType(propValue);
            if (propType !== 'object') {
                return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
            }
            for(var key in shapeTypes){
                var checker = shapeTypes[key];
                if (typeof checker !== 'function') {
                    return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
                }
                var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
                if (error) {
                    return error;
                }
            }
            return null;
        }
        return createChainableTypeChecker(validate);
    }
    function createStrictShapeTypeChecker(shapeTypes) {
        function validate(props, propName, componentName, location, propFullName) {
            var propValue = props[propName];
            var propType = getPropType(propValue);
            if (propType !== 'object') {
                return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
            }
            // We need to check all keys in case some are required but missing from props.
            var allKeys = assign({}, props[propName], shapeTypes);
            for(var key in allKeys){
                var checker = shapeTypes[key];
                if (has(shapeTypes, key) && typeof checker !== 'function') {
                    return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
                }
                if (!checker) {
                    return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' + '\nBad object: ' + JSON.stringify(props[propName], null, '  ') + '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  '));
                }
                var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
                if (error) {
                    return error;
                }
            }
            return null;
        }
        return createChainableTypeChecker(validate);
    }
    function isNode(propValue) {
        switch(typeof propValue === "undefined" ? "undefined" : _type_of._(propValue)){
            case 'number':
            case 'string':
            case 'undefined':
                return true;
            case 'boolean':
                return !propValue;
            case 'object':
                if (Array.isArray(propValue)) {
                    return propValue.every(isNode);
                }
                if (propValue === null || isValidElement(propValue)) {
                    return true;
                }
                var iteratorFn = getIteratorFn(propValue);
                if (iteratorFn) {
                    var iterator = iteratorFn.call(propValue);
                    var step;
                    if (iteratorFn !== propValue.entries) {
                        while(!(step = iterator.next()).done){
                            if (!isNode(step.value)) {
                                return false;
                            }
                        }
                    } else {
                        // Iterator will provide entry [k,v] tuples rather than values.
                        while(!(step = iterator.next()).done){
                            var entry = step.value;
                            if (entry) {
                                if (!isNode(entry[1])) {
                                    return false;
                                }
                            }
                        }
                    }
                } else {
                    return false;
                }
                return true;
            default:
                return false;
        }
    }
    function isSymbol(propType, propValue) {
        // Native Symbol.
        if (propType === 'symbol') {
            return true;
        }
        // falsy value can't be a Symbol
        if (!propValue) {
            return false;
        }
        // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
        if (propValue['@@toStringTag'] === 'Symbol') {
            return true;
        }
        // Fallback for non-spec compliant Symbols which are polyfilled.
        if (typeof Symbol === 'function' && _instanceof._(propValue, Symbol)) {
            return true;
        }
        return false;
    }
    // Equivalent of `typeof` but with special handling for array and regexp.
    function getPropType(propValue) {
        var propType = typeof propValue === "undefined" ? "undefined" : _type_of._(propValue);
        if (Array.isArray(propValue)) {
            return 'array';
        }
        if (_instanceof._(propValue, RegExp)) {
            // Old webkits (at least until Android 4.0) return 'function' rather than
            // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
            // passes PropTypes.object.
            return 'object';
        }
        if (isSymbol(propType, propValue)) {
            return 'symbol';
        }
        return propType;
    }
    // This handles more types than `getPropType`. Only used for error messages.
    // See `createPrimitiveTypeChecker`.
    function getPreciseType(propValue) {
        if (typeof propValue === 'undefined' || propValue === null) {
            return '' + propValue;
        }
        var propType = getPropType(propValue);
        if (propType === 'object') {
            if (_instanceof._(propValue, Date)) {
                return 'date';
            } else if (_instanceof._(propValue, RegExp)) {
                return 'regexp';
            }
        }
        return propType;
    }
    // Returns a string that is postfixed to a warning about an invalid type.
    // For example, "undefined" or "of type array"
    function getPostfixForTypeWarning(value) {
        var type = getPreciseType(value);
        switch(type){
            case 'array':
            case 'object':
                return 'an ' + type;
            case 'boolean':
            case 'date':
            case 'regexp':
                return 'a ' + type;
            default:
                return type;
        }
    }
    // Returns class name of the object, if any.
    function getClassName(propValue) {
        if (!propValue.constructor || !propValue.constructor.name) {
            return ANONYMOUS;
        }
        return propValue.constructor.name;
    }
    ReactPropTypes.checkPropTypes = checkPropTypes;
    ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
    ReactPropTypes.PropTypes = ReactPropTypes;
    return ReactPropTypes;
};
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/prop-types/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ if ("TURBOPACK compile-time truthy", 1) {
    var ReactIs = __turbopack_context__.r("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/react-is/index.js [app-client] (ecmascript)");
    // By explicitly using `prop-types` you are opting into new development behavior.
    // http://fb.me/prop-types-in-prod
    var throwOnDirectAccess = true;
    module.exports = __turbopack_context__.r("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/prop-types/factoryWithTypeCheckers.js [app-client] (ecmascript)")(ReactIs.isElement, throwOnDirectAccess);
} else //TURBOPACK unreachable
;
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@fortawesome/react-fontawesome/index.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FontAwesomeIcon",
    ()=>FontAwesomeIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$fortawesome$2f$fontawesome$2d$svg$2d$core$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@fortawesome/fontawesome-svg-core/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/prop-types/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
;
;
function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for(var e = 0, n = Array(a); e < a; e++)n[e] = r[e];
    return n;
}
function _arrayWithHoles(r) {
    if (Array.isArray(r)) return r;
}
function _arrayWithoutHoles(r) {
    if (Array.isArray(r)) return _arrayLikeToArray(r);
}
function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[r] = t, e;
}
function _iterableToArray(r) {
    if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
        var e, n, i, u, a = [], f = !0, o = !1;
        try {
            if (i = (t = t.call(r)).next, 0 === l) {
                if (Object(t) !== t) return;
                f = !1;
            } else for(; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
        } catch (r) {
            o = !0, n = r;
        } finally{
            try {
                if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
            } finally{
                if (o) throw n;
            }
        }
        return a;
    }
}
function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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
function _objectWithoutProperties(e, t) {
    if (null == e) return {};
    var o, r, i = _objectWithoutPropertiesLoose(e, t);
    if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(e);
        for(r = 0; r < n.length; r++)o = n[r], -1 === t.indexOf(o) && ({}).propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
    }
    return i;
}
function _objectWithoutPropertiesLoose(r, e) {
    if (null == r) return {};
    var t = {};
    for(var n in r)if (({}).hasOwnProperty.call(r, n)) {
        if (-1 !== e.indexOf(n)) continue;
        t[n] = r[n];
    }
    return t;
}
function _slicedToArray(r, e) {
    return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _toConsumableArray(r) {
    return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
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
function _typeof(o) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(o) {
        return typeof o;
    } : function(o) {
        return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
}
function _unsupportedIterableToArray(r, a) {
    if (r) {
        if ("string" == typeof r) return _arrayLikeToArray(r, a);
        var t = ({}).toString.call(r).slice(8, -1);
        return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
}
var ICON_PACKS_STARTING_VERSION = '7.0.0';
// Try to get version from installed package first, fallback to env var, then default
var SVG_CORE_VERSION;
try {
    var svgCorePackageJson = __turbopack_context__.r("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@fortawesome/fontawesome-svg-core/package.json (json)");
    SVG_CORE_VERSION = svgCorePackageJson.version;
} catch (e) {
    // If package.json can't be loaded, try environment variable
    SVG_CORE_VERSION = typeof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] !== 'undefined' && __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.FA_VERSION || '7.0.0';
}
// Get CSS class list from a props object
function classList(props) {
    var beat = props.beat, fade = props.fade, beatFade = props.beatFade, bounce = props.bounce, shake = props.shake, flash = props.flash, spin = props.spin, spinPulse = props.spinPulse, spinReverse = props.spinReverse, pulse = props.pulse, fixedWidth = props.fixedWidth, inverse = props.inverse, border = props.border, listItem = props.listItem, flip = props.flip, size = props.size, rotation = props.rotation, pull = props.pull, swapOpacity = props.swapOpacity, rotateBy = props.rotateBy, widthAuto = props.widthAuto;
    // Check if we're using version 7 or later
    var isVersion7OrLater = versionCheckGte(SVG_CORE_VERSION, ICON_PACKS_STARTING_VERSION);
    // map of CSS class names to properties
    var classes = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({
        'fa-beat': beat,
        'fa-fade': fade,
        'fa-beat-fade': beatFade,
        'fa-bounce': bounce,
        'fa-shake': shake,
        'fa-flash': flash,
        'fa-spin': spin,
        'fa-spin-reverse': spinReverse,
        'fa-spin-pulse': spinPulse,
        'fa-pulse': pulse,
        'fa-fw': fixedWidth,
        'fa-inverse': inverse,
        'fa-border': border,
        'fa-li': listItem,
        'fa-flip': flip === true,
        'fa-flip-horizontal': flip === 'horizontal' || flip === 'both',
        'fa-flip-vertical': flip === 'vertical' || flip === 'both'
    }, "fa-".concat(size), typeof size !== 'undefined' && size !== null), "fa-rotate-".concat(rotation), typeof rotation !== 'undefined' && rotation !== null && rotation !== 0), "fa-pull-".concat(pull), typeof pull !== 'undefined' && pull !== null), 'fa-swap-opacity', swapOpacity), 'fa-rotate-by', isVersion7OrLater && rotateBy), 'fa-width-auto', isVersion7OrLater && widthAuto);
    // map over all the keys in the classes object
    // return an array of the keys where the value for the key is not null
    return Object.keys(classes).map(function(key) {
        return classes[key] ? key : null;
    }).filter(function(key) {
        return key;
    });
}
// check if verion1 is greater than or equal to version2
function versionCheckGte(version1, version2) {
    var _version1$split = version1.split('-'), _version1$split2 = _slicedToArray(_version1$split, 2), v1Base = _version1$split2[0], v1PreRelease = _version1$split2[1];
    var _version2$split = version2.split('-'), _version2$split2 = _slicedToArray(_version2$split, 2), v2Base = _version2$split2[0], v2PreRelease = _version2$split2[1];
    var v1Parts = v1Base.split('.');
    var v2Parts = v2Base.split('.');
    // Compare version numbers first
    for(var i = 0; i < Math.max(v1Parts.length, v2Parts.length); i++){
        var v1Part = v1Parts[i] || '0';
        var v2Part = v2Parts[i] || '0';
        // Compare numeric values
        var v1Num = parseInt(v1Part, 10);
        var v2Num = parseInt(v2Part, 10);
        if (v1Num !== v2Num) {
            return v1Num > v2Num;
        }
    }
    // If numeric values are equal, look for any remaining parts
    // that would make one version greater than the other
    for(var _i = 0; _i < Math.max(v1Parts.length, v2Parts.length); _i++){
        var _v1Part = v1Parts[_i] || '0';
        var _v2Part = v2Parts[_i] || '0';
        if (_v1Part !== _v2Part) {
            // When numeric values are equal but strings differ,
            // the one without leading zeros is greater
            if (_v1Part.length !== _v2Part.length) {
                return _v1Part.length < _v2Part.length;
            }
        }
    }
    // If version numbers are equal, compare pre-release identifiers
    // A version with a pre-release identifier is less than one without
    if (v1PreRelease && !v2PreRelease) return false;
    if (!v1PreRelease && v2PreRelease) return true;
    return true;
}
// Camelize taken from humps
// humps is copyright © 2012+ Dom Christie
// Released under the MIT license.
// Performant way to determine if object coerces to a number
function _isNumerical(obj) {
    obj = obj - 0;
    // eslint-disable-next-line no-self-compare
    return obj === obj;
}
function camelize(string) {
    if (_isNumerical(string)) {
        return string;
    }
    // eslint-disable-next-line no-useless-escape
    string = string.replace(/[\-_\s]+(.)?/g, function(match, chr) {
        return chr ? chr.toUpperCase() : '';
    });
    // Ensure 1st char is always lowercase
    return string.substr(0, 1).toLowerCase() + string.substr(1);
}
var _excluded = [
    "style"
];
function capitalize(val) {
    return val.charAt(0).toUpperCase() + val.slice(1);
}
function styleToObject(style) {
    return style.split(';').map(function(s) {
        return s.trim();
    }).filter(function(s) {
        return s;
    }).reduce(function(acc, pair) {
        var i = pair.indexOf(':');
        var prop = camelize(pair.slice(0, i));
        var value = pair.slice(i + 1).trim();
        prop.startsWith('webkit') ? acc[capitalize(prop)] = value : acc[prop] = value;
        return acc;
    }, {});
}
function convert(createElement, element) {
    var extraProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    if (typeof element === 'string') {
        return element;
    }
    var children = (element.children || []).map(function(child) {
        return convert(createElement, child);
    });
    /* eslint-disable dot-notation */ var mixins = Object.keys(element.attributes || {}).reduce(function(acc, key) {
        var val = element.attributes[key];
        switch(key){
            case 'class':
                acc.attrs['className'] = val;
                delete element.attributes['class'];
                break;
            case 'style':
                acc.attrs['style'] = styleToObject(val);
                break;
            default:
                if (key.indexOf('aria-') === 0 || key.indexOf('data-') === 0) {
                    acc.attrs[key.toLowerCase()] = val;
                } else {
                    acc.attrs[camelize(key)] = val;
                }
        }
        return acc;
    }, {
        attrs: {}
    });
    var _extraProps$style = extraProps.style, existingStyle = _extraProps$style === void 0 ? {} : _extraProps$style, remaining = _objectWithoutProperties(extraProps, _excluded);
    mixins.attrs['style'] = _objectSpread2(_objectSpread2({}, mixins.attrs['style']), existingStyle);
    /* eslint-enable */ return createElement.apply(void 0, [
        element.tag,
        _objectSpread2(_objectSpread2({}, mixins.attrs), remaining)
    ].concat(_toConsumableArray(children)));
}
var PRODUCTION = false;
try {
    PRODUCTION = ("TURBOPACK compile-time value", "development") === 'production';
} catch (e) {}
function log() {
    if (!PRODUCTION && console && typeof console.error === 'function') {
        var _console;
        (_console = console).error.apply(_console, arguments);
    }
}
// Normalize icon arguments
function normalizeIconArgs(icon) {
    // this has everything that it needs to be rendered which means it was probably imported
    // directly from an icon svg package
    if (icon && _typeof(icon) === 'object' && icon.prefix && icon.iconName && icon.icon) {
        return icon;
    }
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$fortawesome$2f$fontawesome$2d$svg$2d$core$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parse"].icon) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$fortawesome$2f$fontawesome$2d$svg$2d$core$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parse"].icon(icon);
    }
    // if the icon is null, there's nothing to do
    if (icon === null) {
        return null;
    }
    // if the icon is an object and has a prefix and an icon name, return it
    if (icon && _typeof(icon) === 'object' && icon.prefix && icon.iconName) {
        return icon;
    }
    // if it's an array with length of two
    if (Array.isArray(icon) && icon.length === 2) {
        // use the first item as prefix, second as icon name
        return {
            prefix: icon[0],
            iconName: icon[1]
        };
    }
    // if it's a string, use it as the icon name
    if (typeof icon === 'string') {
        return {
            prefix: 'fas',
            iconName: icon
        };
    }
}
// creates an object with a key of key
// and a value of value
// if certain conditions are met
function objectWithKey(key, value) {
    // if the value is a non-empty array
    // or it's not an array but it is truthy
    // then create the object with the key and the value
    // if not, return an empty array
    return Array.isArray(value) && value.length > 0 || !Array.isArray(value) && value ? _defineProperty({}, key, value) : {};
}
var defaultProps = {
    border: false,
    className: '',
    mask: null,
    maskId: null,
    // the fixedWidth property has been deprecated as of version 7
    fixedWidth: false,
    inverse: false,
    flip: false,
    icon: null,
    listItem: false,
    pull: null,
    pulse: false,
    rotation: null,
    rotateBy: false,
    size: null,
    spin: false,
    spinPulse: false,
    spinReverse: false,
    beat: false,
    fade: false,
    beatFade: false,
    bounce: false,
    shake: false,
    symbol: false,
    title: '',
    titleId: null,
    transform: null,
    swapOpacity: false,
    widthAuto: false
};
var FontAwesomeIcon = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].forwardRef(function(props, ref) {
    var allProps = _objectSpread2(_objectSpread2({}, defaultProps), props);
    var iconArgs = allProps.icon, maskArgs = allProps.mask, symbol = allProps.symbol, className = allProps.className, title = allProps.title, titleId = allProps.titleId, maskId = allProps.maskId;
    var iconLookup = normalizeIconArgs(iconArgs);
    var classes = objectWithKey('classes', [].concat(_toConsumableArray(classList(allProps)), _toConsumableArray((className || '').split(' '))));
    var transform = objectWithKey('transform', typeof allProps.transform === 'string' ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$fortawesome$2f$fontawesome$2d$svg$2d$core$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parse"].transform(allProps.transform) : allProps.transform);
    var mask = objectWithKey('mask', normalizeIconArgs(maskArgs));
    var renderedIcon = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$fortawesome$2f$fontawesome$2d$svg$2d$core$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["icon"])(iconLookup, _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, classes), transform), mask), {}, {
        symbol: symbol,
        title: title,
        titleId: titleId,
        maskId: maskId
    }));
    if (!renderedIcon) {
        log('Could not find icon', iconLookup);
        return null;
    }
    var abstract = renderedIcon.abstract;
    var extraProps = {
        ref: ref
    };
    Object.keys(allProps).forEach(function(key) {
        // eslint-disable-next-line no-prototype-builtins
        if (!defaultProps.hasOwnProperty(key)) {
            extraProps[key] = allProps[key];
        }
    });
    return convertCurry(abstract[0], extraProps);
});
FontAwesomeIcon.displayName = 'FontAwesomeIcon';
FontAwesomeIcon.propTypes = {
    beat: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].bool,
    border: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].bool,
    beatFade: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].bool,
    bounce: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].bool,
    className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].string,
    fade: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].bool,
    flash: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].bool,
    mask: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].oneOfType([
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].object,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].array,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].string
    ]),
    maskId: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].string,
    // the fixedWidth property has been deprecated as of version 7
    fixedWidth: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].bool,
    inverse: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].bool,
    flip: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].oneOf([
        true,
        false,
        'horizontal',
        'vertical',
        'both'
    ]),
    icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].oneOfType([
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].object,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].array,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].string
    ]),
    listItem: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].bool,
    pull: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].oneOf([
        'right',
        'left'
    ]),
    pulse: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].bool,
    rotation: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].oneOf([
        0,
        90,
        180,
        270
    ]),
    rotateBy: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].bool,
    shake: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].bool,
    size: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].oneOf([
        '2xs',
        'xs',
        'sm',
        'lg',
        'xl',
        '2xl',
        '1x',
        '2x',
        '3x',
        '4x',
        '5x',
        '6x',
        '7x',
        '8x',
        '9x',
        '10x'
    ]),
    spin: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].bool,
    spinPulse: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].bool,
    spinReverse: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].bool,
    symbol: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].oneOfType([
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].bool,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].string
    ]),
    title: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].string,
    titleId: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].string,
    transform: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].oneOfType([
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].string,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].object
    ]),
    swapOpacity: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].bool,
    widthAuto: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].bool
};
var convertCurry = convert.bind(null, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement);
;
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@supabase/functions-js/dist/module/types.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Base error for Supabase Edge Function invocations.
 *
 * @example
 * ```ts
 * import { FunctionsError } from '@supabase/functions-js'
 *
 * throw new FunctionsError('Unexpected error invoking function', 'FunctionsError', {
 *   requestId: 'abc123',
 * })
 * ```
 */ __turbopack_context__.s([
    "FunctionRegion",
    ()=>FunctionRegion,
    "FunctionsError",
    ()=>FunctionsError,
    "FunctionsFetchError",
    ()=>FunctionsFetchError,
    "FunctionsHttpError",
    ()=>FunctionsHttpError,
    "FunctionsRelayError",
    ()=>FunctionsRelayError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_call_super$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_call_super.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_call_check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_class_call_check.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_inherits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_inherits.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_wrap_native_super$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_wrap_native_super.js [app-client] (ecmascript)");
;
;
;
;
var FunctionsError = /*#__PURE__*/ function(Error1) {
    "use strict";
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_inherits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(FunctionsError, Error1);
    function FunctionsError(message) {
        var name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 'FunctionsError', context = arguments.length > 2 ? arguments[2] : void 0;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_call_check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, FunctionsError);
        var _this;
        _this = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_call_super$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, FunctionsError, [
            message
        ]);
        _this.name = name;
        _this.context = context;
        return _this;
    }
    return FunctionsError;
}((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_wrap_native_super$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(Error));
var FunctionsFetchError = /*#__PURE__*/ function(FunctionsError) {
    "use strict";
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_inherits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(FunctionsFetchError, FunctionsError);
    function FunctionsFetchError(context) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_call_check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, FunctionsFetchError);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_call_super$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, FunctionsFetchError, [
            'Failed to send a request to the Edge Function',
            'FunctionsFetchError',
            context
        ]);
    }
    return FunctionsFetchError;
}(FunctionsError);
var FunctionsRelayError = /*#__PURE__*/ function(FunctionsError) {
    "use strict";
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_inherits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(FunctionsRelayError, FunctionsError);
    function FunctionsRelayError(context) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_call_check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, FunctionsRelayError);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_call_super$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, FunctionsRelayError, [
            'Relay Error invoking the Edge Function',
            'FunctionsRelayError',
            context
        ]);
    }
    return FunctionsRelayError;
}(FunctionsError);
var FunctionsHttpError = /*#__PURE__*/ function(FunctionsError) {
    "use strict";
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_inherits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(FunctionsHttpError, FunctionsError);
    function FunctionsHttpError(context) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_call_check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, FunctionsHttpError);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_call_super$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, FunctionsHttpError, [
            'Edge Function returned a non-2xx status code',
            'FunctionsHttpError',
            context
        ]);
    }
    return FunctionsHttpError;
}(FunctionsError);
var FunctionRegion;
(function(FunctionRegion) {
    FunctionRegion["Any"] = "any";
    FunctionRegion["ApNortheast1"] = "ap-northeast-1";
    FunctionRegion["ApNortheast2"] = "ap-northeast-2";
    FunctionRegion["ApSouth1"] = "ap-south-1";
    FunctionRegion["ApSoutheast1"] = "ap-southeast-1";
    FunctionRegion["ApSoutheast2"] = "ap-southeast-2";
    FunctionRegion["CaCentral1"] = "ca-central-1";
    FunctionRegion["EuCentral1"] = "eu-central-1";
    FunctionRegion["EuWest1"] = "eu-west-1";
    FunctionRegion["EuWest2"] = "eu-west-2";
    FunctionRegion["EuWest3"] = "eu-west-3";
    FunctionRegion["SaEast1"] = "sa-east-1";
    FunctionRegion["UsEast1"] = "us-east-1";
    FunctionRegion["UsWest1"] = "us-west-1";
    FunctionRegion["UsWest2"] = "us-west-2";
})(FunctionRegion || (FunctionRegion = {})); //# sourceMappingURL=types.js.map
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@supabase/functions-js/dist/module/helper.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resolveFetch",
    ()=>resolveFetch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_to_consumable_array.js [app-client] (ecmascript)");
;
var resolveFetch = function(customFetch) {
    if (customFetch) {
        return function() {
            for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                args[_key] = arguments[_key];
            }
            return customFetch.apply(void 0, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(args));
        };
    }
    return function() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        return fetch.apply(void 0, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(args));
    };
}; //# sourceMappingURL=helper.js.map
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@supabase/functions-js/dist/module/FunctionsClient.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FunctionsClient",
    ()=>FunctionsClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_call_check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_class_call_check.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_create_class$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_create_class.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_instanceof$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_instanceof.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/tslib/tslib.es6.mjs [app-client] (ecmascript) <export __generator as _>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/tslib/tslib.es6.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$supabase$2f$functions$2d$js$2f$dist$2f$module$2f$helper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@supabase/functions-js/dist/module/helper.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$supabase$2f$functions$2d$js$2f$dist$2f$module$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@supabase/functions-js/dist/module/types.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
var FunctionsClient = /*#__PURE__*/ function() {
    "use strict";
    function FunctionsClient(url) {
        var _ref = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ref_headers = _ref.headers, headers = _ref_headers === void 0 ? {} : _ref_headers, customFetch = _ref.customFetch, _ref_region = _ref.region, region = _ref_region === void 0 ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$supabase$2f$functions$2d$js$2f$dist$2f$module$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FunctionRegion"].Any : _ref_region;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_call_check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, FunctionsClient);
        this.url = url;
        this.headers = headers;
        this.region = region;
        this.fetch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$supabase$2f$functions$2d$js$2f$dist$2f$module$2f$helper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveFetch"])(customFetch);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_create_class$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(FunctionsClient, [
        {
            /**
     * Updates the authorization header
     * @param token - the new jwt token sent in the authorisation header
     * @example
     * ```ts
     * functions.setAuth(session.access_token)
     * ```
     */ key: "setAuth",
            value: function setAuth(token) {
                this.headers.Authorization = "Bearer ".concat(token);
            }
        },
        {
            /**
     * Invokes a function
     * @param functionName - The name of the Function to invoke.
     * @param options - Options for invoking the Function.
     * @example
     * ```ts
     * const { data, error } = await functions.invoke('hello-world', {
     *   body: { name: 'Ada' },
     * })
     * ```
     */ key: "invoke",
            value: function invoke(functionName_1) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__awaiter"])(this, arguments, void 0, function(functionName) {
                    var options, _a, timeoutId, timeoutController, headers, method, functionArgs, signal, timeout, _headers, region, url, body, effectiveSignal, response, isRelayError, responseType, data, error;
                    var _arguments = arguments;
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                options = _arguments.length > 1 && _arguments[1] !== void 0 ? _arguments[1] : {};
                                _state.label = 1;
                            case 1:
                                _state.trys.push([
                                    1,
                                    12,
                                    13,
                                    14
                                ]);
                                headers = options.headers, method = options.method, functionArgs = options.body, signal = options.signal, timeout = options.timeout;
                                _headers = {};
                                region = options.region;
                                if (!region) {
                                    region = this.region;
                                }
                                // Add region as query parameter using URL API
                                url = new URL("".concat(this.url, "/").concat(functionName));
                                if (region && region !== 'any') {
                                    _headers['x-region'] = region;
                                    url.searchParams.set('forceFunctionRegion', region);
                                }
                                if (functionArgs && (headers && !Object.prototype.hasOwnProperty.call(headers, 'Content-Type') || !headers)) {
                                    if (typeof Blob !== 'undefined' && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_instanceof$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(functionArgs, Blob) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_instanceof$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(functionArgs, ArrayBuffer)) {
                                        // will work for File as File inherits Blob
                                        // also works for ArrayBuffer as it is the same underlying structure as a Blob
                                        _headers['Content-Type'] = 'application/octet-stream';
                                        body = functionArgs;
                                    } else if (typeof functionArgs === 'string') {
                                        // plain string
                                        _headers['Content-Type'] = 'text/plain';
                                        body = functionArgs;
                                    } else if (typeof FormData !== 'undefined' && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_instanceof$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(functionArgs, FormData)) {
                                        // don't set content-type headers
                                        // Request will automatically add the right boundary value
                                        body = functionArgs;
                                    } else {
                                        // default, assume this is JSON
                                        _headers['Content-Type'] = 'application/json';
                                        body = JSON.stringify(functionArgs);
                                    }
                                } else {
                                    if (functionArgs && typeof functionArgs !== 'string' && !(typeof Blob !== 'undefined' && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_instanceof$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(functionArgs, Blob)) && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_instanceof$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(functionArgs, ArrayBuffer) && !(typeof FormData !== 'undefined' && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_instanceof$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(functionArgs, FormData))) {
                                        body = JSON.stringify(functionArgs);
                                    } else {
                                        body = functionArgs;
                                    }
                                }
                                // Handle timeout by creating an AbortController
                                effectiveSignal = signal;
                                if (timeout) {
                                    timeoutController = new AbortController();
                                    timeoutId = setTimeout(function() {
                                        return timeoutController.abort();
                                    }, timeout);
                                    // If user provided their own signal, we need to respect both
                                    if (signal) {
                                        effectiveSignal = timeoutController.signal;
                                        // If the user's signal is aborted, abort our timeout controller too
                                        signal.addEventListener('abort', function() {
                                            return timeoutController.abort();
                                        });
                                    } else {
                                        effectiveSignal = timeoutController.signal;
                                    }
                                }
                                return [
                                    4,
                                    this.fetch(url.toString(), {
                                        method: method || 'POST',
                                        // headers priority is (high to low):
                                        // 1. invoke-level headers
                                        // 2. client-level headers
                                        // 3. default Content-Type header
                                        headers: Object.assign(Object.assign(Object.assign({}, _headers), this.headers), headers),
                                        body: body,
                                        signal: effectiveSignal
                                    }).catch(function(fetchError) {
                                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$supabase$2f$functions$2d$js$2f$dist$2f$module$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FunctionsFetchError"](fetchError);
                                    })
                                ];
                            case 2:
                                response = _state.sent();
                                isRelayError = response.headers.get('x-relay-error');
                                if (isRelayError && isRelayError === 'true') {
                                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$supabase$2f$functions$2d$js$2f$dist$2f$module$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FunctionsRelayError"](response);
                                }
                                if (!response.ok) {
                                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$supabase$2f$functions$2d$js$2f$dist$2f$module$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FunctionsHttpError"](response);
                                }
                                responseType = ((_a = response.headers.get('Content-Type')) !== null && _a !== void 0 ? _a : 'text/plain').split(';')[0].trim();
                                if (!(responseType === 'application/json')) return [
                                    3,
                                    4
                                ];
                                return [
                                    4,
                                    response.json()
                                ];
                            case 3:
                                data = _state.sent();
                                return [
                                    3,
                                    11
                                ];
                            case 4:
                                if (!(responseType === 'application/octet-stream' || responseType === 'application/pdf')) return [
                                    3,
                                    6
                                ];
                                return [
                                    4,
                                    response.blob()
                                ];
                            case 5:
                                data = _state.sent();
                                return [
                                    3,
                                    11
                                ];
                            case 6:
                                if (!(responseType === 'text/event-stream')) return [
                                    3,
                                    7
                                ];
                                data = response;
                                return [
                                    3,
                                    11
                                ];
                            case 7:
                                if (!(responseType === 'multipart/form-data')) return [
                                    3,
                                    9
                                ];
                                return [
                                    4,
                                    response.formData()
                                ];
                            case 8:
                                data = _state.sent();
                                return [
                                    3,
                                    11
                                ];
                            case 9:
                                return [
                                    4,
                                    response.text()
                                ];
                            case 10:
                                // default to text
                                data = _state.sent();
                                _state.label = 11;
                            case 11:
                                return [
                                    2,
                                    {
                                        data: data,
                                        error: null,
                                        response: response
                                    }
                                ];
                            case 12:
                                error = _state.sent();
                                return [
                                    2,
                                    {
                                        data: null,
                                        error: error,
                                        response: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_instanceof$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(error, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$supabase$2f$functions$2d$js$2f$dist$2f$module$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FunctionsHttpError"]) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_instanceof$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(error, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$supabase$2f$functions$2d$js$2f$dist$2f$module$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FunctionsRelayError"]) ? error.context : undefined
                                    }
                                ];
                            case 13:
                                // Clear the timeout if it was set
                                if (timeoutId) {
                                    clearTimeout(timeoutId);
                                }
                                return [
                                    7
                                ];
                            case 14:
                                return [
                                    2
                                ];
                        }
                    });
                });
            }
        }
    ]);
    return FunctionsClient;
} //# sourceMappingURL=FunctionsClient.js.map
();
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@supabase/postgrest-js/dist/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PostgrestBuilder",
    ()=>PostgrestBuilder,
    "PostgrestClient",
    ()=>PostgrestClient,
    "PostgrestError",
    ()=>PostgrestError,
    "PostgrestFilterBuilder",
    ()=>PostgrestFilterBuilder,
    "PostgrestQueryBuilder",
    ()=>PostgrestQueryBuilder,
    "PostgrestTransformBuilder",
    ()=>PostgrestTransformBuilder,
    "default",
    ()=>src_default
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_async_to_generator.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_call_super$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_call_super.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_call_check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_class_call_check.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_create_class$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_create_class.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_inherits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_inherits.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_sliced_to_array.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_to_consumable_array.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_wrap_native_super$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_wrap_native_super.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/tslib/tslib.es6.mjs [app-client] (ecmascript) <export __generator as _>");
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
//#region src/PostgrestError.ts
/**
* Error format
*
* {@link https://postgrest.org/en/stable/api.html?highlight=options#errors-and-http-status-codes}
*/ var PostgrestError = /*#__PURE__*/ function(Error1) {
    "use strict";
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_inherits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(PostgrestError, Error1);
    function PostgrestError(context) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_call_check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, PostgrestError);
        var _this;
        _this = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_call_super$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, PostgrestError, [
            context.message
        ]);
        _this.name = "PostgrestError";
        _this.details = context.details;
        _this.hint = context.hint;
        _this.code = context.code;
        return _this;
    }
    return PostgrestError;
}((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_wrap_native_super$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(Error));
//#endregion
//#region src/PostgrestBuilder.ts
var PostgrestBuilder = /*#__PURE__*/ function() {
    "use strict";
    function PostgrestBuilder(builder) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_call_check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, PostgrestBuilder);
        var _builder$shouldThrowO, _builder$isMaybeSingl, _builder$urlLengthLim;
        this.shouldThrowOnError = false;
        this.method = builder.method;
        this.url = builder.url;
        this.headers = new Headers(builder.headers);
        this.schema = builder.schema;
        this.body = builder.body;
        this.shouldThrowOnError = (_builder$shouldThrowO = builder.shouldThrowOnError) !== null && _builder$shouldThrowO !== void 0 ? _builder$shouldThrowO : false;
        this.signal = builder.signal;
        this.isMaybeSingle = (_builder$isMaybeSingl = builder.isMaybeSingle) !== null && _builder$isMaybeSingl !== void 0 ? _builder$isMaybeSingl : false;
        this.urlLengthLimit = (_builder$urlLengthLim = builder.urlLengthLimit) !== null && _builder$urlLengthLim !== void 0 ? _builder$urlLengthLim : 8e3;
        if (builder.fetch) this.fetch = builder.fetch;
        else this.fetch = fetch;
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_create_class$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(PostgrestBuilder, [
        {
            /**
	* If there's an error with the query, throwOnError will reject the promise by
	* throwing the error instead of returning it as part of a successful response.
	*
	* {@link https://github.com/supabase/supabase-js/issues/92}
	*/ key: "throwOnError",
            value: function throwOnError() {
                this.shouldThrowOnError = true;
                return this;
            }
        },
        {
            /**
	* Set an HTTP header for the request.
	*/ key: "setHeader",
            value: function setHeader(name, value) {
                this.headers = new Headers(this.headers);
                this.headers.set(name, value);
                return this;
            }
        },
        {
            key: "then",
            value: function then(onfulfilled, onrejected) {
                var _this = this;
                var _this1 = this;
                if (this.schema === void 0) {} else if ([
                    "GET",
                    "HEAD"
                ].includes(this.method)) this.headers.set("Accept-Profile", this.schema);
                else this.headers.set("Content-Profile", this.schema);
                if (this.method !== "GET" && this.method !== "HEAD") this.headers.set("Content-Type", "application/json");
                var _fetch = this.fetch;
                var res = _fetch(this.url.toString(), {
                    method: this.method,
                    headers: this.headers,
                    body: JSON.stringify(this.body),
                    signal: this.signal
                }).then(function(res$1) {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(function() {
                        var error, data, count, status, statusText, _this$headers$get2, _res$headers$get, _this$headers$get, body, countHeader, contentRange, _error$details, body1;
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                            switch(_state.label){
                                case 0:
                                    error = null;
                                    data = null;
                                    count = null;
                                    status = res$1.status;
                                    statusText = res$1.statusText;
                                    if (!res$1.ok) return [
                                        3,
                                        3
                                    ];
                                    if (!(_this1.method !== "HEAD")) return [
                                        3,
                                        2
                                    ];
                                    return [
                                        4,
                                        res$1.text()
                                    ];
                                case 1:
                                    body = _state.sent();
                                    if (body === "") {} else if (_this1.headers.get("Accept") === "text/csv") data = body;
                                    else if (_this1.headers.get("Accept") && ((_this$headers$get = _this1.headers.get("Accept")) === null || _this$headers$get === void 0 ? void 0 : _this$headers$get.includes("application/vnd.pgrst.plan+text"))) data = body;
                                    else data = JSON.parse(body);
                                    _state.label = 2;
                                case 2:
                                    countHeader = (_this$headers$get2 = _this1.headers.get("Prefer")) === null || _this$headers$get2 === void 0 ? void 0 : _this$headers$get2.match(/count=(exact|planned|estimated)/);
                                    contentRange = (_res$headers$get = res$1.headers.get("content-range")) === null || _res$headers$get === void 0 ? void 0 : _res$headers$get.split("/");
                                    if (countHeader && contentRange && contentRange.length > 1) count = parseInt(contentRange[1]);
                                    if (_this1.isMaybeSingle && _this1.method === "GET" && Array.isArray(data)) if (data.length > 1) {
                                        error = {
                                            code: "PGRST116",
                                            details: "Results contain ".concat(data.length, " rows, application/vnd.pgrst.object+json requires 1 row"),
                                            hint: null,
                                            message: "JSON object requested, multiple (or no) rows returned"
                                        };
                                        data = null;
                                        count = null;
                                        status = 406;
                                        statusText = "Not Acceptable";
                                    } else if (data.length === 1) data = data[0];
                                    else data = null;
                                    return [
                                        3,
                                        5
                                    ];
                                case 3:
                                    return [
                                        4,
                                        res$1.text()
                                    ];
                                case 4:
                                    body1 = _state.sent();
                                    try {
                                        error = JSON.parse(body1);
                                        if (Array.isArray(error) && res$1.status === 404) {
                                            data = [];
                                            error = null;
                                            status = 200;
                                            statusText = "OK";
                                        }
                                    } catch (_unused) {
                                        if (res$1.status === 404 && body1 === "") {
                                            status = 204;
                                            statusText = "No Content";
                                        } else error = {
                                            message: body1
                                        };
                                    }
                                    if (error && _this1.isMaybeSingle && (error === null || error === void 0 || (_error$details = error.details) === null || _error$details === void 0 ? void 0 : _error$details.includes("0 rows"))) {
                                        error = null;
                                        status = 200;
                                        statusText = "OK";
                                    }
                                    if (error && _this1.shouldThrowOnError) throw new PostgrestError(error);
                                    _state.label = 5;
                                case 5:
                                    return [
                                        2,
                                        {
                                            error: error,
                                            data: data,
                                            count: count,
                                            status: status,
                                            statusText: statusText
                                        }
                                    ];
                            }
                        });
                    })();
                });
                if (!this.shouldThrowOnError) res = res.catch(function(fetchError) {
                    var _fetchError$name2;
                    var errorDetails = "";
                    var hint = "";
                    var code = "";
                    var cause = fetchError === null || fetchError === void 0 ? void 0 : fetchError.cause;
                    if (cause) {
                        var _cause$message, _cause$code, _fetchError$name, _cause$name;
                        var causeMessage = (_cause$message = cause === null || cause === void 0 ? void 0 : cause.message) !== null && _cause$message !== void 0 ? _cause$message : "";
                        var causeCode = (_cause$code = cause === null || cause === void 0 ? void 0 : cause.code) !== null && _cause$code !== void 0 ? _cause$code : "";
                        errorDetails = "".concat((_fetchError$name = fetchError === null || fetchError === void 0 ? void 0 : fetchError.name) !== null && _fetchError$name !== void 0 ? _fetchError$name : "FetchError", ": ").concat(fetchError === null || fetchError === void 0 ? void 0 : fetchError.message);
                        errorDetails += "\n\nCaused by: ".concat((_cause$name = cause === null || cause === void 0 ? void 0 : cause.name) !== null && _cause$name !== void 0 ? _cause$name : "Error", ": ").concat(causeMessage);
                        if (causeCode) errorDetails += " (".concat(causeCode, ")");
                        if (cause === null || cause === void 0 ? void 0 : cause.stack) errorDetails += "\n".concat(cause.stack);
                    } else {
                        var _fetchError$stack;
                        errorDetails = (_fetchError$stack = fetchError === null || fetchError === void 0 ? void 0 : fetchError.stack) !== null && _fetchError$stack !== void 0 ? _fetchError$stack : "";
                    }
                    var urlLength = _this.url.toString().length;
                    if ((fetchError === null || fetchError === void 0 ? void 0 : fetchError.name) === "AbortError" || (fetchError === null || fetchError === void 0 ? void 0 : fetchError.code) === "ABORT_ERR") {
                        code = "";
                        hint = "Request was aborted (timeout or manual cancellation)";
                        if (urlLength > _this.urlLengthLimit) hint += ". Note: Your request URL is ".concat(urlLength, " characters, which may exceed server limits. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [many IDs])), consider using an RPC function to pass values server-side.");
                    } else if ((cause === null || cause === void 0 ? void 0 : cause.name) === "HeadersOverflowError" || (cause === null || cause === void 0 ? void 0 : cause.code) === "UND_ERR_HEADERS_OVERFLOW") {
                        code = "";
                        hint = "HTTP headers exceeded server limits (typically 16KB)";
                        if (urlLength > _this.urlLengthLimit) hint += ". Your request URL is ".concat(urlLength, " characters. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [200+ IDs])), consider using an RPC function instead.");
                    }
                    return {
                        error: {
                            message: "".concat((_fetchError$name2 = fetchError === null || fetchError === void 0 ? void 0 : fetchError.name) !== null && _fetchError$name2 !== void 0 ? _fetchError$name2 : "FetchError", ": ").concat(fetchError === null || fetchError === void 0 ? void 0 : fetchError.message),
                            details: errorDetails,
                            hint: hint,
                            code: code
                        },
                        data: null,
                        count: null,
                        status: 0,
                        statusText: ""
                    };
                });
                return res.then(onfulfilled, onrejected);
            }
        },
        {
            /**
	* Override the type of the returned `data`.
	*
	* @typeParam NewResult - The new result type to override with
	* @deprecated Use overrideTypes<yourType, { merge: false }>() method at the end of your call chain instead
	*/ key: "returns",
            value: function returns() {
                /* istanbul ignore next */ return this;
            }
        },
        {
            /**
	* Override the type of the returned `data` field in the response.
	*
	* @typeParam NewResult - The new type to cast the response data to
	* @typeParam Options - Optional type configuration (defaults to { merge: true })
	* @typeParam Options.merge - When true, merges the new type with existing return type. When false, replaces the existing types entirely (defaults to true)
	* @example
	* ```typescript
	* // Merge with existing types (default behavior)
	* const query = supabase
	*   .from('users')
	*   .select()
	*   .overrideTypes<{ custom_field: string }>()
	*
	* // Replace existing types completely
	* const replaceQuery = supabase
	*   .from('users')
	*   .select()
	*   .overrideTypes<{ id: number; name: string }, { merge: false }>()
	* ```
	* @returns A PostgrestBuilder instance with the new type
	*/ key: "overrideTypes",
            value: function overrideTypes() {
                return this;
            }
        }
    ]);
    return PostgrestBuilder;
}();
//#endregion
//#region src/PostgrestTransformBuilder.ts
var PostgrestTransformBuilder = /*#__PURE__*/ function(PostgrestBuilder) {
    "use strict";
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_inherits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(PostgrestTransformBuilder, PostgrestBuilder);
    function PostgrestTransformBuilder() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_call_check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, PostgrestTransformBuilder);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_call_super$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, PostgrestTransformBuilder, arguments);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_create_class$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(PostgrestTransformBuilder, [
        {
            /**
	* Perform a SELECT on the query result.
	*
	* By default, `.insert()`, `.update()`, `.upsert()`, and `.delete()` do not
	* return modified rows. By calling this method, modified rows are returned in
	* `data`.
	*
	* @param columns - The columns to retrieve, separated by commas
	*/ key: "select",
            value: function select(columns) {
                var quoted = false;
                var cleanedColumns = (columns !== null && columns !== void 0 ? columns : "*").split("").map(function(c) {
                    if (/\s/.test(c) && !quoted) return "";
                    if (c === "\"") quoted = !quoted;
                    return c;
                }).join("");
                this.url.searchParams.set("select", cleanedColumns);
                this.headers.append("Prefer", "return=representation");
                return this;
            }
        },
        {
            /**
	* Order the query result by `column`.
	*
	* You can call this method multiple times to order by multiple columns.
	*
	* You can order referenced tables, but it only affects the ordering of the
	* parent table if you use `!inner` in the query.
	*
	* @param column - The column to order by
	* @param options - Named parameters
	* @param options.ascending - If `true`, the result will be in ascending order
	* @param options.nullsFirst - If `true`, `null`s appear first. If `false`,
	* `null`s appear last.
	* @param options.referencedTable - Set this to order a referenced table by
	* its columns
	* @param options.foreignTable - Deprecated, use `options.referencedTable`
	* instead
	*/ key: "order",
            value: function order(column) {
                var _ref = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ref_ascending = _ref.ascending, ascending = _ref_ascending === void 0 ? true : _ref_ascending, nullsFirst = _ref.nullsFirst, foreignTable = _ref.foreignTable, _ref_referencedTable = _ref.referencedTable, referencedTable = _ref_referencedTable === void 0 ? foreignTable : _ref_referencedTable;
                var key = referencedTable ? "".concat(referencedTable, ".order") : "order";
                var existingOrder = this.url.searchParams.get(key);
                this.url.searchParams.set(key, "".concat(existingOrder ? "".concat(existingOrder, ",") : "").concat(column, ".").concat(ascending ? "asc" : "desc").concat(nullsFirst === void 0 ? "" : nullsFirst ? ".nullsfirst" : ".nullslast"));
                return this;
            }
        },
        {
            /**
	* Limit the query result by `count`.
	*
	* @param count - The maximum number of rows to return
	* @param options - Named parameters
	* @param options.referencedTable - Set this to limit rows of referenced
	* tables instead of the parent table
	* @param options.foreignTable - Deprecated, use `options.referencedTable`
	* instead
	*/ key: "limit",
            value: function limit(count) {
                var _ref = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, foreignTable = _ref.foreignTable, _ref_referencedTable = _ref.referencedTable, referencedTable = _ref_referencedTable === void 0 ? foreignTable : _ref_referencedTable;
                var key = typeof referencedTable === "undefined" ? "limit" : "".concat(referencedTable, ".limit");
                this.url.searchParams.set(key, "".concat(count));
                return this;
            }
        },
        {
            /**
	* Limit the query result by starting at an offset `from` and ending at the offset `to`.
	* Only records within this range are returned.
	* This respects the query order and if there is no order clause the range could behave unexpectedly.
	* The `from` and `to` values are 0-based and inclusive: `range(1, 3)` will include the second, third
	* and fourth rows of the query.
	*
	* @param from - The starting index from which to limit the result
	* @param to - The last index to which to limit the result
	* @param options - Named parameters
	* @param options.referencedTable - Set this to limit rows of referenced
	* tables instead of the parent table
	* @param options.foreignTable - Deprecated, use `options.referencedTable`
	* instead
	*/ key: "range",
            value: function range(from, to) {
                var _ref = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, foreignTable = _ref.foreignTable, _ref_referencedTable = _ref.referencedTable, referencedTable = _ref_referencedTable === void 0 ? foreignTable : _ref_referencedTable;
                var keyOffset = typeof referencedTable === "undefined" ? "offset" : "".concat(referencedTable, ".offset");
                var keyLimit = typeof referencedTable === "undefined" ? "limit" : "".concat(referencedTable, ".limit");
                this.url.searchParams.set(keyOffset, "".concat(from));
                this.url.searchParams.set(keyLimit, "".concat(to - from + 1));
                return this;
            }
        },
        {
            /**
	* Set the AbortSignal for the fetch request.
	*
	* @param signal - The AbortSignal to use for the fetch request
	*/ key: "abortSignal",
            value: function abortSignal(signal) {
                this.signal = signal;
                return this;
            }
        },
        {
            /**
	* Return `data` as a single object instead of an array of objects.
	*
	* Query result must be one row (e.g. using `.limit(1)`), otherwise this
	* returns an error.
	*/ key: "single",
            value: function single() {
                this.headers.set("Accept", "application/vnd.pgrst.object+json");
                return this;
            }
        },
        {
            /**
	* Return `data` as a single object instead of an array of objects.
	*
	* Query result must be zero or one row (e.g. using `.limit(1)`), otherwise
	* this returns an error.
	*/ key: "maybeSingle",
            value: function maybeSingle() {
                if (this.method === "GET") this.headers.set("Accept", "application/json");
                else this.headers.set("Accept", "application/vnd.pgrst.object+json");
                this.isMaybeSingle = true;
                return this;
            }
        },
        {
            /**
	* Return `data` as a string in CSV format.
	*/ key: "csv",
            value: function csv() {
                this.headers.set("Accept", "text/csv");
                return this;
            }
        },
        {
            /**
	* Return `data` as an object in [GeoJSON](https://geojson.org) format.
	*/ key: "geojson",
            value: function geojson() {
                this.headers.set("Accept", "application/geo+json");
                return this;
            }
        },
        {
            /**
	* Return `data` as the EXPLAIN plan for the query.
	*
	* You need to enable the
	* [db_plan_enabled](https://supabase.com/docs/guides/database/debugging-performance#enabling-explain)
	* setting before using this method.
	*
	* @param options - Named parameters
	*
	* @param options.analyze - If `true`, the query will be executed and the
	* actual run time will be returned
	*
	* @param options.verbose - If `true`, the query identifier will be returned
	* and `data` will include the output columns of the query
	*
	* @param options.settings - If `true`, include information on configuration
	* parameters that affect query planning
	*
	* @param options.buffers - If `true`, include information on buffer usage
	*
	* @param options.wal - If `true`, include information on WAL record generation
	*
	* @param options.format - The format of the output, can be `"text"` (default)
	* or `"json"`
	*/ key: "explain",
            value: function explain() {
                var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, _ref_analyze = _ref.analyze, analyze = _ref_analyze === void 0 ? false : _ref_analyze, _ref_verbose = _ref.verbose, verbose = _ref_verbose === void 0 ? false : _ref_verbose, _ref_settings = _ref.settings, settings = _ref_settings === void 0 ? false : _ref_settings, _ref_buffers = _ref.buffers, buffers = _ref_buffers === void 0 ? false : _ref_buffers, _ref_wal = _ref.wal, wal = _ref_wal === void 0 ? false : _ref_wal, _ref_format = _ref.format, format = _ref_format === void 0 ? "text" : _ref_format;
                var _this$headers$get;
                var options = [
                    analyze ? "analyze" : null,
                    verbose ? "verbose" : null,
                    settings ? "settings" : null,
                    buffers ? "buffers" : null,
                    wal ? "wal" : null
                ].filter(Boolean).join("|");
                var forMediatype = (_this$headers$get = this.headers.get("Accept")) !== null && _this$headers$get !== void 0 ? _this$headers$get : "application/json";
                this.headers.set("Accept", "application/vnd.pgrst.plan+".concat(format, '; for="').concat(forMediatype, '"; options=').concat(options, ";"));
                if (format === "json") return this;
                else return this;
            }
        },
        {
            /**
	* Rollback the query.
	*
	* `data` will still be returned, but the query is not committed.
	*/ key: "rollback",
            value: function rollback() {
                this.headers.append("Prefer", "tx=rollback");
                return this;
            }
        },
        {
            /**
	* Override the type of the returned `data`.
	*
	* @typeParam NewResult - The new result type to override with
	* @deprecated Use overrideTypes<yourType, { merge: false }>() method at the end of your call chain instead
	*/ key: "returns",
            value: function returns() {
                return this;
            }
        },
        {
            /**
	* Set the maximum number of rows that can be affected by the query.
	* Only available in PostgREST v13+ and only works with PATCH and DELETE methods.
	*
	* @param value - The maximum number of rows that can be affected
	*/ key: "maxAffected",
            value: function maxAffected(value) {
                this.headers.append("Prefer", "handling=strict");
                this.headers.append("Prefer", "max-affected=".concat(value));
                return this;
            }
        }
    ]);
    return PostgrestTransformBuilder;
}(PostgrestBuilder);
//#endregion
//#region src/PostgrestFilterBuilder.ts
var PostgrestReservedCharsRegexp = /* @__PURE__ */ new RegExp("[,()]");
var PostgrestFilterBuilder = /*#__PURE__*/ function(PostgrestTransformBuilder) {
    "use strict";
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_inherits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(PostgrestFilterBuilder, PostgrestTransformBuilder);
    function PostgrestFilterBuilder() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_call_check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, PostgrestFilterBuilder);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_call_super$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, PostgrestFilterBuilder, arguments);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_create_class$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(PostgrestFilterBuilder, [
        {
            /**
	* Match only rows where `column` is equal to `value`.
	*
	* To check if the value of `column` is NULL, you should use `.is()` instead.
	*
	* @param column - The column to filter on
	* @param value - The value to filter with
	*/ key: "eq",
            value: function eq(column, value) {
                this.url.searchParams.append(column, "eq.".concat(value));
                return this;
            }
        },
        {
            /**
	* Match only rows where `column` is not equal to `value`.
	*
	* @param column - The column to filter on
	* @param value - The value to filter with
	*/ key: "neq",
            value: function neq(column, value) {
                this.url.searchParams.append(column, "neq.".concat(value));
                return this;
            }
        },
        {
            /**
	* Match only rows where `column` is greater than `value`.
	*
	* @param column - The column to filter on
	* @param value - The value to filter with
	*/ key: "gt",
            value: function gt(column, value) {
                this.url.searchParams.append(column, "gt.".concat(value));
                return this;
            }
        },
        {
            /**
	* Match only rows where `column` is greater than or equal to `value`.
	*
	* @param column - The column to filter on
	* @param value - The value to filter with
	*/ key: "gte",
            value: function gte(column, value) {
                this.url.searchParams.append(column, "gte.".concat(value));
                return this;
            }
        },
        {
            /**
	* Match only rows where `column` is less than `value`.
	*
	* @param column - The column to filter on
	* @param value - The value to filter with
	*/ key: "lt",
            value: function lt(column, value) {
                this.url.searchParams.append(column, "lt.".concat(value));
                return this;
            }
        },
        {
            /**
	* Match only rows where `column` is less than or equal to `value`.
	*
	* @param column - The column to filter on
	* @param value - The value to filter with
	*/ key: "lte",
            value: function lte(column, value) {
                this.url.searchParams.append(column, "lte.".concat(value));
                return this;
            }
        },
        {
            /**
	* Match only rows where `column` matches `pattern` case-sensitively.
	*
	* @param column - The column to filter on
	* @param pattern - The pattern to match with
	*/ key: "like",
            value: function like(column, pattern) {
                this.url.searchParams.append(column, "like.".concat(pattern));
                return this;
            }
        },
        {
            /**
	* Match only rows where `column` matches all of `patterns` case-sensitively.
	*
	* @param column - The column to filter on
	* @param patterns - The patterns to match with
	*/ key: "likeAllOf",
            value: function likeAllOf(column, patterns) {
                this.url.searchParams.append(column, "like(all).{".concat(patterns.join(","), "}"));
                return this;
            }
        },
        {
            /**
	* Match only rows where `column` matches any of `patterns` case-sensitively.
	*
	* @param column - The column to filter on
	* @param patterns - The patterns to match with
	*/ key: "likeAnyOf",
            value: function likeAnyOf(column, patterns) {
                this.url.searchParams.append(column, "like(any).{".concat(patterns.join(","), "}"));
                return this;
            }
        },
        {
            /**
	* Match only rows where `column` matches `pattern` case-insensitively.
	*
	* @param column - The column to filter on
	* @param pattern - The pattern to match with
	*/ key: "ilike",
            value: function ilike(column, pattern) {
                this.url.searchParams.append(column, "ilike.".concat(pattern));
                return this;
            }
        },
        {
            /**
	* Match only rows where `column` matches all of `patterns` case-insensitively.
	*
	* @param column - The column to filter on
	* @param patterns - The patterns to match with
	*/ key: "ilikeAllOf",
            value: function ilikeAllOf(column, patterns) {
                this.url.searchParams.append(column, "ilike(all).{".concat(patterns.join(","), "}"));
                return this;
            }
        },
        {
            /**
	* Match only rows where `column` matches any of `patterns` case-insensitively.
	*
	* @param column - The column to filter on
	* @param patterns - The patterns to match with
	*/ key: "ilikeAnyOf",
            value: function ilikeAnyOf(column, patterns) {
                this.url.searchParams.append(column, "ilike(any).{".concat(patterns.join(","), "}"));
                return this;
            }
        },
        {
            /**
	* Match only rows where `column` matches the PostgreSQL regex `pattern`
	* case-sensitively (using the `~` operator).
	*
	* @param column - The column to filter on
	* @param pattern - The PostgreSQL regular expression pattern to match with
	*/ key: "regexMatch",
            value: function regexMatch(column, pattern) {
                this.url.searchParams.append(column, "match.".concat(pattern));
                return this;
            }
        },
        {
            /**
	* Match only rows where `column` matches the PostgreSQL regex `pattern`
	* case-insensitively (using the `~*` operator).
	*
	* @param column - The column to filter on
	* @param pattern - The PostgreSQL regular expression pattern to match with
	*/ key: "regexIMatch",
            value: function regexIMatch(column, pattern) {
                this.url.searchParams.append(column, "imatch.".concat(pattern));
                return this;
            }
        },
        {
            /**
	* Match only rows where `column` IS `value`.
	*
	* For non-boolean columns, this is only relevant for checking if the value of
	* `column` is NULL by setting `value` to `null`.
	*
	* For boolean columns, you can also set `value` to `true` or `false` and it
	* will behave the same way as `.eq()`.
	*
	* @param column - The column to filter on
	* @param value - The value to filter with
	*/ key: "is",
            value: function is(column, value) {
                this.url.searchParams.append(column, "is.".concat(value));
                return this;
            }
        },
        {
            /**
	* Match only rows where `column` IS DISTINCT FROM `value`.
	*
	* Unlike `.neq()`, this treats `NULL` as a comparable value. Two `NULL` values
	* are considered equal (not distinct), and comparing `NULL` with any non-NULL
	* value returns true (distinct).
	*
	* @param column - The column to filter on
	* @param value - The value to filter with
	*/ key: "isDistinct",
            value: function isDistinct(column, value) {
                this.url.searchParams.append(column, "isdistinct.".concat(value));
                return this;
            }
        },
        {
            /**
	* Match only rows where `column` is included in the `values` array.
	*
	* @param column - The column to filter on
	* @param values - The values array to filter with
	*/ key: "in",
            value: function _in(column, values) {
                var cleanedValues = Array.from(new Set(values)).map(function(s) {
                    if (typeof s === "string" && PostgrestReservedCharsRegexp.test(s)) return '"'.concat(s, '"');
                    else return "".concat(s);
                }).join(",");
                this.url.searchParams.append(column, "in.(".concat(cleanedValues, ")"));
                return this;
            }
        },
        {
            /**
	* Match only rows where `column` is NOT included in the `values` array.
	*
	* @param column - The column to filter on
	* @param values - The values array to filter with
	*/ key: "notIn",
            value: function notIn(column, values) {
                var cleanedValues = Array.from(new Set(values)).map(function(s) {
                    if (typeof s === "string" && PostgrestReservedCharsRegexp.test(s)) return '"'.concat(s, '"');
                    else return "".concat(s);
                }).join(",");
                this.url.searchParams.append(column, "not.in.(".concat(cleanedValues, ")"));
                return this;
            }
        },
        {
            /**
	* Only relevant for jsonb, array, and range columns. Match only rows where
	* `column` contains every element appearing in `value`.
	*
	* @param column - The jsonb, array, or range column to filter on
	* @param value - The jsonb, array, or range value to filter with
	*/ key: "contains",
            value: function contains(column, value) {
                if (typeof value === "string") this.url.searchParams.append(column, "cs.".concat(value));
                else if (Array.isArray(value)) this.url.searchParams.append(column, "cs.{".concat(value.join(","), "}"));
                else this.url.searchParams.append(column, "cs.".concat(JSON.stringify(value)));
                return this;
            }
        },
        {
            /**
	* Only relevant for jsonb, array, and range columns. Match only rows where
	* every element appearing in `column` is contained by `value`.
	*
	* @param column - The jsonb, array, or range column to filter on
	* @param value - The jsonb, array, or range value to filter with
	*/ key: "containedBy",
            value: function containedBy(column, value) {
                if (typeof value === "string") this.url.searchParams.append(column, "cd.".concat(value));
                else if (Array.isArray(value)) this.url.searchParams.append(column, "cd.{".concat(value.join(","), "}"));
                else this.url.searchParams.append(column, "cd.".concat(JSON.stringify(value)));
                return this;
            }
        },
        {
            /**
	* Only relevant for range columns. Match only rows where every element in
	* `column` is greater than any element in `range`.
	*
	* @param column - The range column to filter on
	* @param range - The range to filter with
	*/ key: "rangeGt",
            value: function rangeGt(column, range) {
                this.url.searchParams.append(column, "sr.".concat(range));
                return this;
            }
        },
        {
            /**
	* Only relevant for range columns. Match only rows where every element in
	* `column` is either contained in `range` or greater than any element in
	* `range`.
	*
	* @param column - The range column to filter on
	* @param range - The range to filter with
	*/ key: "rangeGte",
            value: function rangeGte(column, range) {
                this.url.searchParams.append(column, "nxl.".concat(range));
                return this;
            }
        },
        {
            /**
	* Only relevant for range columns. Match only rows where every element in
	* `column` is less than any element in `range`.
	*
	* @param column - The range column to filter on
	* @param range - The range to filter with
	*/ key: "rangeLt",
            value: function rangeLt(column, range) {
                this.url.searchParams.append(column, "sl.".concat(range));
                return this;
            }
        },
        {
            /**
	* Only relevant for range columns. Match only rows where every element in
	* `column` is either contained in `range` or less than any element in
	* `range`.
	*
	* @param column - The range column to filter on
	* @param range - The range to filter with
	*/ key: "rangeLte",
            value: function rangeLte(column, range) {
                this.url.searchParams.append(column, "nxr.".concat(range));
                return this;
            }
        },
        {
            /**
	* Only relevant for range columns. Match only rows where `column` is
	* mutually exclusive to `range` and there can be no element between the two
	* ranges.
	*
	* @param column - The range column to filter on
	* @param range - The range to filter with
	*/ key: "rangeAdjacent",
            value: function rangeAdjacent(column, range) {
                this.url.searchParams.append(column, "adj.".concat(range));
                return this;
            }
        },
        {
            /**
	* Only relevant for array and range columns. Match only rows where
	* `column` and `value` have an element in common.
	*
	* @param column - The array or range column to filter on
	* @param value - The array or range value to filter with
	*/ key: "overlaps",
            value: function overlaps(column, value) {
                if (typeof value === "string") this.url.searchParams.append(column, "ov.".concat(value));
                else this.url.searchParams.append(column, "ov.{".concat(value.join(","), "}"));
                return this;
            }
        },
        {
            /**
	* Only relevant for text and tsvector columns. Match only rows where
	* `column` matches the query string in `query`.
	*
	* @param column - The text or tsvector column to filter on
	* @param query - The query text to match with
	* @param options - Named parameters
	* @param options.config - The text search configuration to use
	* @param options.type - Change how the `query` text is interpreted
	*/ key: "textSearch",
            value: function textSearch(column, query) {
                var _ref = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, config = _ref.config, type = _ref.type;
                var typePart = "";
                if (type === "plain") typePart = "pl";
                else if (type === "phrase") typePart = "ph";
                else if (type === "websearch") typePart = "w";
                var configPart = config === void 0 ? "" : "(".concat(config, ")");
                this.url.searchParams.append(column, "".concat(typePart, "fts").concat(configPart, ".").concat(query));
                return this;
            }
        },
        {
            /**
	* Match only rows where each column in `query` keys is equal to its
	* associated value. Shorthand for multiple `.eq()`s.
	*
	* @param query - The object to filter with, with column names as keys mapped
	* to their filter values
	*/ key: "match",
            value: function match(query) {
                var _this = this;
                Object.entries(query).forEach(function(param) {
                    var _param = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(param, 2), column = _param[0], value = _param[1];
                    _this.url.searchParams.append(column, "eq.".concat(value));
                });
                return this;
            }
        },
        {
            /**
	* Match only rows which doesn't satisfy the filter.
	*
	* Unlike most filters, `opearator` and `value` are used as-is and need to
	* follow [PostgREST
	* syntax](https://postgrest.org/en/stable/api.html#operators). You also need
	* to make sure they are properly sanitized.
	*
	* @param column - The column to filter on
	* @param operator - The operator to be negated to filter with, following
	* PostgREST syntax
	* @param value - The value to filter with, following PostgREST syntax
	*/ key: "not",
            value: function not(column, operator, value) {
                this.url.searchParams.append(column, "not.".concat(operator, ".").concat(value));
                return this;
            }
        },
        {
            /**
	* Match only rows which satisfy at least one of the filters.
	*
	* Unlike most filters, `filters` is used as-is and needs to follow [PostgREST
	* syntax](https://postgrest.org/en/stable/api.html#operators). You also need
	* to make sure it's properly sanitized.
	*
	* It's currently not possible to do an `.or()` filter across multiple tables.
	*
	* @param filters - The filters to use, following PostgREST syntax
	* @param options - Named parameters
	* @param options.referencedTable - Set this to filter on referenced tables
	* instead of the parent table
	* @param options.foreignTable - Deprecated, use `referencedTable` instead
	*/ key: "or",
            value: function or(filters) {
                var _ref = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, foreignTable = _ref.foreignTable, _ref_referencedTable = _ref.referencedTable, referencedTable = _ref_referencedTable === void 0 ? foreignTable : _ref_referencedTable;
                var key = referencedTable ? "".concat(referencedTable, ".or") : "or";
                this.url.searchParams.append(key, "(".concat(filters, ")"));
                return this;
            }
        },
        {
            /**
	* Match only rows which satisfy the filter. This is an escape hatch - you
	* should use the specific filter methods wherever possible.
	*
	* Unlike most filters, `opearator` and `value` are used as-is and need to
	* follow [PostgREST
	* syntax](https://postgrest.org/en/stable/api.html#operators). You also need
	* to make sure they are properly sanitized.
	*
	* @param column - The column to filter on
	* @param operator - The operator to filter with, following PostgREST syntax
	* @param value - The value to filter with, following PostgREST syntax
	*/ key: "filter",
            value: function filter(column, operator, value) {
                this.url.searchParams.append(column, "".concat(operator, ".").concat(value));
                return this;
            }
        }
    ]);
    return PostgrestFilterBuilder;
}(PostgrestTransformBuilder);
//#endregion
//#region src/PostgrestQueryBuilder.ts
var PostgrestQueryBuilder = /*#__PURE__*/ function() {
    "use strict";
    function PostgrestQueryBuilder(url, param) {
        var _param_headers = param.headers, headers = _param_headers === void 0 ? {} : _param_headers, schema = param.schema, fetch$1 = param.fetch, _param_urlLengthLimit = param.urlLengthLimit, urlLengthLimit = _param_urlLengthLimit === void 0 ? 8e3 : _param_urlLengthLimit;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_call_check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, PostgrestQueryBuilder);
        this.url = url;
        this.headers = new Headers(headers);
        this.schema = schema;
        this.fetch = fetch$1;
        this.urlLengthLimit = urlLengthLimit;
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_create_class$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(PostgrestQueryBuilder, [
        {
            /**
	* Clone URL and headers to prevent shared state between operations.
	*/ key: "cloneRequestState",
            value: function cloneRequestState() {
                return {
                    url: new URL(this.url.toString()),
                    headers: new Headers(this.headers)
                };
            }
        },
        {
            /**
	* Perform a SELECT query on the table or view.
	*
	* @param columns - The columns to retrieve, separated by commas. Columns can be renamed when returned with `customName:columnName`
	*
	* @param options - Named parameters
	*
	* @param options.head - When set to `true`, `data` will not be returned.
	* Useful if you only need the count.
	*
	* @param options.count - Count algorithm to use to count rows in the table or view.
	*
	* `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
	* hood.
	*
	* `"planned"`: Approximated but fast count algorithm. Uses the Postgres
	* statistics under the hood.
	*
	* `"estimated"`: Uses exact count for low numbers and planned count for high
	* numbers.
	*
	* @remarks
	* When using `count` with `.range()` or `.limit()`, the returned `count` is the total number of rows
	* that match your filters, not the number of rows in the current page. Use this to build pagination UI.
	*/ key: "select",
            value: function select(columns, options) {
                var _ref = options !== null && options !== void 0 ? options : {}, _ref_head = _ref.head, head = _ref_head === void 0 ? false : _ref_head, count = _ref.count;
                var method = head ? "HEAD" : "GET";
                var quoted = false;
                var cleanedColumns = (columns !== null && columns !== void 0 ? columns : "*").split("").map(function(c) {
                    if (/\s/.test(c) && !quoted) return "";
                    if (c === "\"") quoted = !quoted;
                    return c;
                }).join("");
                var _this_cloneRequestState = this.cloneRequestState(), url = _this_cloneRequestState.url, headers = _this_cloneRequestState.headers;
                url.searchParams.set("select", cleanedColumns);
                if (count) headers.append("Prefer", "count=".concat(count));
                return new PostgrestFilterBuilder({
                    method: method,
                    url: url,
                    headers: headers,
                    schema: this.schema,
                    fetch: this.fetch,
                    urlLengthLimit: this.urlLengthLimit
                });
            }
        },
        {
            /**
	* Perform an INSERT into the table or view.
	*
	* By default, inserted rows are not returned. To return it, chain the call
	* with `.select()`.
	*
	* @param values - The values to insert. Pass an object to insert a single row
	* or an array to insert multiple rows.
	*
	* @param options - Named parameters
	*
	* @param options.count - Count algorithm to use to count inserted rows.
	*
	* `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
	* hood.
	*
	* `"planned"`: Approximated but fast count algorithm. Uses the Postgres
	* statistics under the hood.
	*
	* `"estimated"`: Uses exact count for low numbers and planned count for high
	* numbers.
	*
	* @param options.defaultToNull - Make missing fields default to `null`.
	* Otherwise, use the default value for the column. Only applies for bulk
	* inserts.
	*/ key: "insert",
            value: function insert(values) {
                var _ref = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, count = _ref.count, _ref_defaultToNull = _ref.defaultToNull, defaultToNull = _ref_defaultToNull === void 0 ? true : _ref_defaultToNull;
                var _this$fetch;
                var method = "POST";
                var _this_cloneRequestState = this.cloneRequestState(), url = _this_cloneRequestState.url, headers = _this_cloneRequestState.headers;
                if (count) headers.append("Prefer", "count=".concat(count));
                if (!defaultToNull) headers.append("Prefer", "missing=default");
                if (Array.isArray(values)) {
                    var columns = values.reduce(function(acc, x) {
                        return acc.concat(Object.keys(x));
                    }, []);
                    if (columns.length > 0) {
                        var uniqueColumns = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(new Set(columns)).map(function(column) {
                            return '"'.concat(column, '"');
                        });
                        url.searchParams.set("columns", uniqueColumns.join(","));
                    }
                }
                return new PostgrestFilterBuilder({
                    method: method,
                    url: url,
                    headers: headers,
                    schema: this.schema,
                    body: values,
                    fetch: (_this$fetch = this.fetch) !== null && _this$fetch !== void 0 ? _this$fetch : fetch,
                    urlLengthLimit: this.urlLengthLimit
                });
            }
        },
        {
            /**
	* Perform an UPSERT on the table or view. Depending on the column(s) passed
	* to `onConflict`, `.upsert()` allows you to perform the equivalent of
	* `.insert()` if a row with the corresponding `onConflict` columns doesn't
	* exist, or if it does exist, perform an alternative action depending on
	* `ignoreDuplicates`.
	*
	* By default, upserted rows are not returned. To return it, chain the call
	* with `.select()`.
	*
	* @param values - The values to upsert with. Pass an object to upsert a
	* single row or an array to upsert multiple rows.
	*
	* @param options - Named parameters
	*
	* @param options.onConflict - Comma-separated UNIQUE column(s) to specify how
	* duplicate rows are determined. Two rows are duplicates if all the
	* `onConflict` columns are equal.
	*
	* @param options.ignoreDuplicates - If `true`, duplicate rows are ignored. If
	* `false`, duplicate rows are merged with existing rows.
	*
	* @param options.count - Count algorithm to use to count upserted rows.
	*
	* `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
	* hood.
	*
	* `"planned"`: Approximated but fast count algorithm. Uses the Postgres
	* statistics under the hood.
	*
	* `"estimated"`: Uses exact count for low numbers and planned count for high
	* numbers.
	*
	* @param options.defaultToNull - Make missing fields default to `null`.
	* Otherwise, use the default value for the column. This only applies when
	* inserting new rows, not when merging with existing rows under
	* `ignoreDuplicates: false`. This also only applies when doing bulk upserts.
	*
	* @example Upsert a single row using a unique key
	* ```ts
	* // Upserting a single row, overwriting based on the 'username' unique column
	* const { data, error } = await supabase
	*   .from('users')
	*   .upsert({ username: 'supabot' }, { onConflict: 'username' })
	*
	* // Example response:
	* // {
	* //   data: [
	* //     { id: 4, message: 'bar', username: 'supabot' }
	* //   ],
	* //   error: null
	* // }
	* ```
	*
	* @example Upsert with conflict resolution and exact row counting
	* ```ts
	* // Upserting and returning exact count
	* const { data, error, count } = await supabase
	*   .from('users')
	*   .upsert(
	*     {
	*       id: 3,
	*       message: 'foo',
	*       username: 'supabot'
	*     },
	*     {
	*       onConflict: 'username',
	*       count: 'exact'
	*     }
	*   )
	*
	* // Example response:
	* // {
	* //   data: [
	* //     {
	* //       id: 42,
	* //       handle: "saoirse",
	* //       display_name: "Saoirse"
	* //     }
	* //   ],
	* //   count: 1,
	* //   error: null
	* // }
	* ```
	*/ key: "upsert",
            value: function upsert(values) {
                var _ref = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, onConflict = _ref.onConflict, _ref_ignoreDuplicates = _ref.ignoreDuplicates, ignoreDuplicates = _ref_ignoreDuplicates === void 0 ? false : _ref_ignoreDuplicates, count = _ref.count, _ref_defaultToNull = _ref.defaultToNull, defaultToNull = _ref_defaultToNull === void 0 ? true : _ref_defaultToNull;
                var _this$fetch2;
                var method = "POST";
                var _this_cloneRequestState = this.cloneRequestState(), url = _this_cloneRequestState.url, headers = _this_cloneRequestState.headers;
                headers.append("Prefer", "resolution=".concat(ignoreDuplicates ? "ignore" : "merge", "-duplicates"));
                if (onConflict !== void 0) url.searchParams.set("on_conflict", onConflict);
                if (count) headers.append("Prefer", "count=".concat(count));
                if (!defaultToNull) headers.append("Prefer", "missing=default");
                if (Array.isArray(values)) {
                    var columns = values.reduce(function(acc, x) {
                        return acc.concat(Object.keys(x));
                    }, []);
                    if (columns.length > 0) {
                        var uniqueColumns = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(new Set(columns)).map(function(column) {
                            return '"'.concat(column, '"');
                        });
                        url.searchParams.set("columns", uniqueColumns.join(","));
                    }
                }
                return new PostgrestFilterBuilder({
                    method: method,
                    url: url,
                    headers: headers,
                    schema: this.schema,
                    body: values,
                    fetch: (_this$fetch2 = this.fetch) !== null && _this$fetch2 !== void 0 ? _this$fetch2 : fetch,
                    urlLengthLimit: this.urlLengthLimit
                });
            }
        },
        {
            /**
	* Perform an UPDATE on the table or view.
	*
	* By default, updated rows are not returned. To return it, chain the call
	* with `.select()` after filters.
	*
	* @param values - The values to update with
	*
	* @param options - Named parameters
	*
	* @param options.count - Count algorithm to use to count updated rows.
	*
	* `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
	* hood.
	*
	* `"planned"`: Approximated but fast count algorithm. Uses the Postgres
	* statistics under the hood.
	*
	* `"estimated"`: Uses exact count for low numbers and planned count for high
	* numbers.
	*/ key: "update",
            value: function update(values) {
                var count = (arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}).count;
                var _this$fetch3;
                var method = "PATCH";
                var _this_cloneRequestState = this.cloneRequestState(), url = _this_cloneRequestState.url, headers = _this_cloneRequestState.headers;
                if (count) headers.append("Prefer", "count=".concat(count));
                return new PostgrestFilterBuilder({
                    method: method,
                    url: url,
                    headers: headers,
                    schema: this.schema,
                    body: values,
                    fetch: (_this$fetch3 = this.fetch) !== null && _this$fetch3 !== void 0 ? _this$fetch3 : fetch,
                    urlLengthLimit: this.urlLengthLimit
                });
            }
        },
        {
            /**
	* Perform a DELETE on the table or view.
	*
	* By default, deleted rows are not returned. To return it, chain the call
	* with `.select()` after filters.
	*
	* @param options - Named parameters
	*
	* @param options.count - Count algorithm to use to count deleted rows.
	*
	* `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
	* hood.
	*
	* `"planned"`: Approximated but fast count algorithm. Uses the Postgres
	* statistics under the hood.
	*
	* `"estimated"`: Uses exact count for low numbers and planned count for high
	* numbers.
	*/ key: "delete",
            value: function _delete() {
                var count = (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}).count;
                var _this$fetch4;
                var method = "DELETE";
                var _this_cloneRequestState = this.cloneRequestState(), url = _this_cloneRequestState.url, headers = _this_cloneRequestState.headers;
                if (count) headers.append("Prefer", "count=".concat(count));
                return new PostgrestFilterBuilder({
                    method: method,
                    url: url,
                    headers: headers,
                    schema: this.schema,
                    fetch: (_this$fetch4 = this.fetch) !== null && _this$fetch4 !== void 0 ? _this$fetch4 : fetch,
                    urlLengthLimit: this.urlLengthLimit
                });
            }
        }
    ]);
    return PostgrestQueryBuilder;
}();
//#endregion
//#region \0@oxc-project+runtime@0.101.0/helpers/typeof.js
function _typeof(o) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(o$1) {
        return typeof o$1;
    } : function(o$1) {
        return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
    }, _typeof(o);
}
//#endregion
//#region \0@oxc-project+runtime@0.101.0/helpers/toPrimitive.js
function toPrimitive(t, r) {
    if ("object" != _typeof(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
//#endregion
//#region \0@oxc-project+runtime@0.101.0/helpers/toPropertyKey.js
function toPropertyKey(t) {
    var i = toPrimitive(t, "string");
    return "symbol" == _typeof(i) ? i : i + "";
}
//#endregion
//#region \0@oxc-project+runtime@0.101.0/helpers/defineProperty.js
function _defineProperty(e, r, t) {
    return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[r] = t, e;
}
//#endregion
//#region \0@oxc-project+runtime@0.101.0/helpers/objectSpread2.js
function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r$1) {
            return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
        })), t.push.apply(t, o);
    }
    return t;
}
function _objectSpread2(e) {
    for(var r = 1; r < arguments.length; r++){
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), !0).forEach(function(r$1) {
            _defineProperty(e, r$1, t[r$1]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r$1) {
            Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
        });
    }
    return e;
}
//#endregion
//#region src/PostgrestClient.ts
/**
* PostgREST client.
*
* @typeParam Database - Types for the schema from the [type
* generator](https://supabase.com/docs/reference/javascript/next/typescript-support)
*
* @typeParam SchemaName - Postgres schema to switch to. Must be a string
* literal, the same one passed to the constructor. If the schema is not
* `"public"`, this must be supplied manually.
*/ var PostgrestClient = /*#__PURE__*/ function() {
    "use strict";
    function PostgrestClient(url) {
        var _ref = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ref_headers = _ref.headers, headers = _ref_headers === void 0 ? {} : _ref_headers, schema = _ref.schema, fetch$1 = _ref.fetch, timeout = _ref.timeout, _ref_urlLengthLimit = _ref.urlLengthLimit, urlLengthLimit = _ref_urlLengthLimit === void 0 ? 8e3 : _ref_urlLengthLimit;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_call_check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, PostgrestClient);
        this.url = url;
        this.headers = new Headers(headers);
        this.schemaName = schema;
        this.urlLengthLimit = urlLengthLimit;
        var originalFetch = fetch$1 !== null && fetch$1 !== void 0 ? fetch$1 : globalThis.fetch;
        if (timeout !== void 0 && timeout > 0) this.fetch = function(input, init) {
            var controller = new AbortController();
            var timeoutId = setTimeout(function() {
                return controller.abort();
            }, timeout);
            var existingSignal = init === null || init === void 0 ? void 0 : init.signal;
            if (existingSignal) {
                if (existingSignal.aborted) {
                    clearTimeout(timeoutId);
                    return originalFetch(input, init);
                }
                var abortHandler = function() {
                    clearTimeout(timeoutId);
                    controller.abort();
                };
                existingSignal.addEventListener("abort", abortHandler, {
                    once: true
                });
                return originalFetch(input, _objectSpread2(_objectSpread2({}, init), {}, {
                    signal: controller.signal
                })).finally(function() {
                    clearTimeout(timeoutId);
                    existingSignal.removeEventListener("abort", abortHandler);
                });
            }
            return originalFetch(input, _objectSpread2(_objectSpread2({}, init), {}, {
                signal: controller.signal
            })).finally(function() {
                return clearTimeout(timeoutId);
            });
        };
        else this.fetch = originalFetch;
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_create_class$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(PostgrestClient, [
        {
            /**
	* Perform a query on a table or a view.
	*
	* @param relation - The table or view name to query
	*/ key: "from",
            value: function from(relation) {
                if (!relation || typeof relation !== "string" || relation.trim() === "") throw new Error("Invalid relation name: relation must be a non-empty string.");
                return new PostgrestQueryBuilder(new URL("".concat(this.url, "/").concat(relation)), {
                    headers: new Headers(this.headers),
                    schema: this.schemaName,
                    fetch: this.fetch,
                    urlLengthLimit: this.urlLengthLimit
                });
            }
        },
        {
            /**
	* Select a schema to query or perform an function (rpc) call.
	*
	* The schema needs to be on the list of exposed schemas inside Supabase.
	*
	* @param schema - The schema to query
	*/ key: "schema",
            value: function schema(_schema) {
                return new PostgrestClient(this.url, {
                    headers: this.headers,
                    schema: _schema,
                    fetch: this.fetch,
                    urlLengthLimit: this.urlLengthLimit
                });
            }
        },
        {
            /**
	* Perform a function call.
	*
	* @param fn - The function name to call
	* @param args - The arguments to pass to the function call
	* @param options - Named parameters
	* @param options.head - When set to `true`, `data` will not be returned.
	* Useful if you only need the count.
	* @param options.get - When set to `true`, the function will be called with
	* read-only access mode.
	* @param options.count - Count algorithm to use to count rows returned by the
	* function. Only applicable for [set-returning
	* functions](https://www.postgresql.org/docs/current/functions-srf.html).
	*
	* `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
	* hood.
	*
	* `"planned"`: Approximated but fast count algorithm. Uses the Postgres
	* statistics under the hood.
	*
	* `"estimated"`: Uses exact count for low numbers and planned count for high
	* numbers.
	*
	* @example
	* ```ts
	* // For cross-schema functions where type inference fails, use overrideTypes:
	* const { data } = await supabase
	*   .schema('schema_b')
	*   .rpc('function_a', {})
	*   .overrideTypes<{ id: string; user_id: string }[]>()
	* ```
	*/ key: "rpc",
            value: function rpc(fn) {
                var args = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ref = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, _ref_head = _ref.head, head = _ref_head === void 0 ? false : _ref_head, _ref_get = _ref.get, get = _ref_get === void 0 ? false : _ref_get, count = _ref.count;
                var _this$fetch;
                var method;
                var url = new URL("".concat(this.url, "/rpc/").concat(fn));
                var body;
                var _isObject = function(v) {
                    return v !== null && (typeof v === "undefined" ? "undefined" : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(v)) === "object" && (!Array.isArray(v) || v.some(_isObject));
                };
                var _hasObjectArg = head && Object.values(args).some(_isObject);
                if (_hasObjectArg) {
                    method = "POST";
                    body = args;
                } else if (head || get) {
                    method = head ? "HEAD" : "GET";
                    Object.entries(args).filter(function(param) {
                        var _param = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(param, 2), _ = _param[0], value = _param[1];
                        return value !== void 0;
                    }).map(function(param) {
                        var _param = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(param, 2), name = _param[0], value = _param[1];
                        return [
                            name,
                            Array.isArray(value) ? "{".concat(value.join(","), "}") : "".concat(value)
                        ];
                    }).forEach(function(param) {
                        var _param = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(param, 2), name = _param[0], value = _param[1];
                        url.searchParams.append(name, value);
                    });
                } else {
                    method = "POST";
                    body = args;
                }
                var headers = new Headers(this.headers);
                if (_hasObjectArg) headers.set("Prefer", count ? "count=".concat(count, ",return=minimal") : "return=minimal");
                else if (count) headers.set("Prefer", "count=".concat(count));
                return new PostgrestFilterBuilder({
                    method: method,
                    url: url,
                    headers: headers,
                    schema: this.schemaName,
                    body: body,
                    fetch: (_this$fetch = this.fetch) !== null && _this$fetch !== void 0 ? _this$fetch : fetch,
                    urlLengthLimit: this.urlLengthLimit
                });
            }
        }
    ]);
    return PostgrestClient;
}();
//#endregion
//#region src/index.ts
var src_default = {
    PostgrestClient: PostgrestClient,
    PostgrestQueryBuilder: PostgrestQueryBuilder,
    PostgrestFilterBuilder: PostgrestFilterBuilder,
    PostgrestTransformBuilder: PostgrestTransformBuilder,
    PostgrestBuilder: PostgrestBuilder,
    PostgrestError: PostgrestError
};
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/iceberg-js/dist/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IcebergError",
    ()=>IcebergError,
    "IcebergRestCatalog",
    ()=>IcebergRestCatalog,
    "getCurrentSchema",
    ()=>getCurrentSchema,
    "isDecimalType",
    ()=>isDecimalType,
    "isFixedType",
    ()=>isFixedType,
    "parseDecimalType",
    ()=>parseDecimalType,
    "parseFixedType",
    ()=>parseFixedType,
    "typesEqual",
    ()=>typesEqual
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_async_to_generator.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_call_super$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_call_super.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_call_check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_class_call_check.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_create_class$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_create_class.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_inherits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_inherits.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_instanceof$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_instanceof.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_object_spread.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_sliced_to_array.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_wrap_native_super$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_wrap_native_super.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/tslib/tslib.es6.mjs [app-client] (ecmascript) <export __generator as _>");
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
// src/errors/IcebergError.ts
var IcebergError = /*#__PURE__*/ function(Error1) {
    "use strict";
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_inherits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(IcebergError, Error1);
    function IcebergError(message, opts) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_call_check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, IcebergError);
        var _this;
        var _opts_icebergType;
        _this = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_call_super$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, IcebergError, [
            message
        ]);
        _this.name = "IcebergError";
        _this.status = opts.status;
        _this.icebergType = opts.icebergType;
        _this.icebergCode = opts.icebergCode;
        _this.details = opts.details;
        _this.isCommitStateUnknown = opts.icebergType === "CommitStateUnknownException" || [
            500,
            502,
            504
        ].includes(opts.status) && ((_opts_icebergType = opts.icebergType) === null || _opts_icebergType === void 0 ? void 0 : _opts_icebergType.includes("CommitState")) === true;
        return _this;
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_create_class$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(IcebergError, [
        {
            /**
   * Returns true if the error is a 404 Not Found error.
   */ key: "isNotFound",
            value: function isNotFound() {
                return this.status === 404;
            }
        },
        {
            /**
   * Returns true if the error is a 409 Conflict error.
   */ key: "isConflict",
            value: function isConflict() {
                return this.status === 409;
            }
        },
        {
            /**
   * Returns true if the error is a 419 Authentication Timeout error.
   */ key: "isAuthenticationTimeout",
            value: function isAuthenticationTimeout() {
                return this.status === 419;
            }
        }
    ]);
    return IcebergError;
}((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_wrap_native_super$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(Error));
// src/utils/url.ts
function buildUrl(baseUrl, path, query) {
    var url = new URL(path, baseUrl);
    if (query) {
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = Object.entries(query)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var _step_value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(_step.value, 2), key = _step_value[0], value = _step_value[1];
                if (value !== void 0) {
                    url.searchParams.set(key, value);
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }
    return url.toString();
}
// src/http/createFetchClient.ts
function buildAuthHeaders(auth) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(function() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
            switch(_state.label){
                case 0:
                    if (!auth || auth.type === "none") {
                        return [
                            2,
                            {}
                        ];
                    }
                    if (auth.type === "bearer") {
                        return [
                            2,
                            {
                                Authorization: "Bearer ".concat(auth.token)
                            }
                        ];
                    }
                    if (auth.type === "header") {
                        return [
                            2,
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({}, auth.name, auth.value)
                        ];
                    }
                    if (!(auth.type === "custom")) return [
                        3,
                        2
                    ];
                    return [
                        4,
                        auth.getHeaders()
                    ];
                case 1:
                    return [
                        2,
                        _state.sent()
                    ];
                case 2:
                    return [
                        2,
                        {}
                    ];
            }
        });
    })();
}
function createFetchClient(options) {
    var _options_fetchImpl;
    var fetchFn = (_options_fetchImpl = options.fetchImpl) !== null && _options_fetchImpl !== void 0 ? _options_fetchImpl : globalThis.fetch;
    return {
        request: function request(_0) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(function(param) {
                var method, path, query, body, headers, url, authHeaders, res, text, isJson, data, _ref, errBody, errorDetail;
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                    switch(_state.label){
                        case 0:
                            method = param.method, path = param.path, query = param.query, body = param.body, headers = param.headers;
                            url = buildUrl(options.baseUrl, path, query);
                            return [
                                4,
                                buildAuthHeaders(options.auth)
                            ];
                        case 1:
                            authHeaders = _state.sent();
                            return [
                                4,
                                fetchFn(url, {
                                    method: method,
                                    headers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({}, body ? {
                                        "Content-Type": "application/json"
                                    } : {}, authHeaders, headers),
                                    body: body ? JSON.stringify(body) : void 0
                                })
                            ];
                        case 2:
                            res = _state.sent();
                            return [
                                4,
                                res.text()
                            ];
                        case 3:
                            text = _state.sent();
                            isJson = (res.headers.get("content-type") || "").includes("application/json");
                            data = isJson && text ? JSON.parse(text) : text;
                            if (!res.ok) {
                                ;
                                errBody = isJson ? data : void 0;
                                errorDetail = errBody === null || errBody === void 0 ? void 0 : errBody.error;
                                throw new IcebergError((_ref = errorDetail === null || errorDetail === void 0 ? void 0 : errorDetail.message) !== null && _ref !== void 0 ? _ref : "Request failed with status ".concat(res.status), {
                                    status: res.status,
                                    icebergType: errorDetail === null || errorDetail === void 0 ? void 0 : errorDetail.type,
                                    icebergCode: errorDetail === null || errorDetail === void 0 ? void 0 : errorDetail.code,
                                    details: errBody
                                });
                            }
                            return [
                                2,
                                {
                                    status: res.status,
                                    headers: res.headers,
                                    data: data
                                }
                            ];
                    }
                });
            }).apply(this, arguments);
        }
    };
}
// src/catalog/namespaces.ts
function namespaceToPath(namespace) {
    return namespace.join("");
}
var NamespaceOperations = /*#__PURE__*/ function() {
    "use strict";
    function NamespaceOperations(client) {
        var prefix = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_call_check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, NamespaceOperations);
        this.client = client;
        this.prefix = prefix;
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_create_class$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(NamespaceOperations, [
        {
            key: "listNamespaces",
            value: function listNamespaces(parent) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(function() {
                    var query, response;
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                query = parent ? {
                                    parent: namespaceToPath(parent.namespace)
                                } : void 0;
                                return [
                                    4,
                                    this.client.request({
                                        method: "GET",
                                        path: "".concat(this.prefix, "/namespaces"),
                                        query: query
                                    })
                                ];
                            case 1:
                                response = _state.sent();
                                return [
                                    2,
                                    response.data.namespaces.map(function(ns) {
                                        return {
                                            namespace: ns
                                        };
                                    })
                                ];
                        }
                    });
                }).call(this);
            }
        },
        {
            key: "createNamespace",
            value: function createNamespace(id, metadata) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(function() {
                    var request, response;
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                request = {
                                    namespace: id.namespace,
                                    properties: metadata === null || metadata === void 0 ? void 0 : metadata.properties
                                };
                                return [
                                    4,
                                    this.client.request({
                                        method: "POST",
                                        path: "".concat(this.prefix, "/namespaces"),
                                        body: request
                                    })
                                ];
                            case 1:
                                response = _state.sent();
                                return [
                                    2,
                                    response.data
                                ];
                        }
                    });
                }).call(this);
            }
        },
        {
            key: "dropNamespace",
            value: function dropNamespace(id) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(function() {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    this.client.request({
                                        method: "DELETE",
                                        path: "".concat(this.prefix, "/namespaces/").concat(namespaceToPath(id.namespace))
                                    })
                                ];
                            case 1:
                                _state.sent();
                                return [
                                    2
                                ];
                        }
                    });
                }).call(this);
            }
        },
        {
            key: "loadNamespaceMetadata",
            value: function loadNamespaceMetadata(id) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(function() {
                    var response;
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    this.client.request({
                                        method: "GET",
                                        path: "".concat(this.prefix, "/namespaces/").concat(namespaceToPath(id.namespace))
                                    })
                                ];
                            case 1:
                                response = _state.sent();
                                return [
                                    2,
                                    {
                                        properties: response.data.properties
                                    }
                                ];
                        }
                    });
                }).call(this);
            }
        },
        {
            key: "namespaceExists",
            value: function namespaceExists(id) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(function() {
                    var error;
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    2,
                                    ,
                                    3
                                ]);
                                return [
                                    4,
                                    this.client.request({
                                        method: "HEAD",
                                        path: "".concat(this.prefix, "/namespaces/").concat(namespaceToPath(id.namespace))
                                    })
                                ];
                            case 1:
                                _state.sent();
                                return [
                                    2,
                                    true
                                ];
                            case 2:
                                error = _state.sent();
                                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_instanceof$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(error, IcebergError) && error.status === 404) {
                                    return [
                                        2,
                                        false
                                    ];
                                }
                                throw error;
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                }).call(this);
            }
        },
        {
            key: "createNamespaceIfNotExists",
            value: function createNamespaceIfNotExists(id, metadata) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(function() {
                    var error;
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    2,
                                    ,
                                    3
                                ]);
                                return [
                                    4,
                                    this.createNamespace(id, metadata)
                                ];
                            case 1:
                                return [
                                    2,
                                    _state.sent()
                                ];
                            case 2:
                                error = _state.sent();
                                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_instanceof$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(error, IcebergError) && error.status === 409) {
                                    return [
                                        2
                                    ];
                                }
                                throw error;
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                }).call(this);
            }
        }
    ]);
    return NamespaceOperations;
}();
// src/catalog/tables.ts
function namespaceToPath2(namespace) {
    return namespace.join("");
}
var TableOperations = /*#__PURE__*/ function() {
    "use strict";
    function TableOperations(client) {
        var prefix = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "", accessDelegation = arguments.length > 2 ? arguments[2] : void 0;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_call_check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, TableOperations);
        this.client = client;
        this.prefix = prefix;
        this.accessDelegation = accessDelegation;
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_create_class$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(TableOperations, [
        {
            key: "listTables",
            value: function listTables(namespace) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(function() {
                    var response;
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    this.client.request({
                                        method: "GET",
                                        path: "".concat(this.prefix, "/namespaces/").concat(namespaceToPath2(namespace.namespace), "/tables")
                                    })
                                ];
                            case 1:
                                response = _state.sent();
                                return [
                                    2,
                                    response.data.identifiers
                                ];
                        }
                    });
                }).call(this);
            }
        },
        {
            key: "createTable",
            value: function createTable(namespace, request) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(function() {
                    var headers, response;
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                headers = {};
                                if (this.accessDelegation) {
                                    headers["X-Iceberg-Access-Delegation"] = this.accessDelegation;
                                }
                                return [
                                    4,
                                    this.client.request({
                                        method: "POST",
                                        path: "".concat(this.prefix, "/namespaces/").concat(namespaceToPath2(namespace.namespace), "/tables"),
                                        body: request,
                                        headers: headers
                                    })
                                ];
                            case 1:
                                response = _state.sent();
                                return [
                                    2,
                                    response.data.metadata
                                ];
                        }
                    });
                }).call(this);
            }
        },
        {
            key: "updateTable",
            value: function updateTable(id, request) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(function() {
                    var response;
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    this.client.request({
                                        method: "POST",
                                        path: "".concat(this.prefix, "/namespaces/").concat(namespaceToPath2(id.namespace), "/tables/").concat(id.name),
                                        body: request
                                    })
                                ];
                            case 1:
                                response = _state.sent();
                                return [
                                    2,
                                    {
                                        "metadata-location": response.data["metadata-location"],
                                        metadata: response.data.metadata
                                    }
                                ];
                        }
                    });
                }).call(this);
            }
        },
        {
            key: "dropTable",
            value: function dropTable(id, options) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(function() {
                    var _ref;
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    this.client.request({
                                        method: "DELETE",
                                        path: "".concat(this.prefix, "/namespaces/").concat(namespaceToPath2(id.namespace), "/tables/").concat(id.name),
                                        query: {
                                            purgeRequested: String((_ref = options === null || options === void 0 ? void 0 : options.purge) !== null && _ref !== void 0 ? _ref : false)
                                        }
                                    })
                                ];
                            case 1:
                                _state.sent();
                                return [
                                    2
                                ];
                        }
                    });
                }).call(this);
            }
        },
        {
            key: "loadTable",
            value: function loadTable(id) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(function() {
                    var headers, response;
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                headers = {};
                                if (this.accessDelegation) {
                                    headers["X-Iceberg-Access-Delegation"] = this.accessDelegation;
                                }
                                return [
                                    4,
                                    this.client.request({
                                        method: "GET",
                                        path: "".concat(this.prefix, "/namespaces/").concat(namespaceToPath2(id.namespace), "/tables/").concat(id.name),
                                        headers: headers
                                    })
                                ];
                            case 1:
                                response = _state.sent();
                                return [
                                    2,
                                    response.data.metadata
                                ];
                        }
                    });
                }).call(this);
            }
        },
        {
            key: "tableExists",
            value: function tableExists(id) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(function() {
                    var headers, error;
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                headers = {};
                                if (this.accessDelegation) {
                                    headers["X-Iceberg-Access-Delegation"] = this.accessDelegation;
                                }
                                _state.label = 1;
                            case 1:
                                _state.trys.push([
                                    1,
                                    3,
                                    ,
                                    4
                                ]);
                                return [
                                    4,
                                    this.client.request({
                                        method: "HEAD",
                                        path: "".concat(this.prefix, "/namespaces/").concat(namespaceToPath2(id.namespace), "/tables/").concat(id.name),
                                        headers: headers
                                    })
                                ];
                            case 2:
                                _state.sent();
                                return [
                                    2,
                                    true
                                ];
                            case 3:
                                error = _state.sent();
                                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_instanceof$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(error, IcebergError) && error.status === 404) {
                                    return [
                                        2,
                                        false
                                    ];
                                }
                                throw error;
                            case 4:
                                return [
                                    2
                                ];
                        }
                    });
                }).call(this);
            }
        },
        {
            key: "createTableIfNotExists",
            value: function createTableIfNotExists(namespace, request) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(function() {
                    var error;
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    2,
                                    ,
                                    5
                                ]);
                                return [
                                    4,
                                    this.createTable(namespace, request)
                                ];
                            case 1:
                                return [
                                    2,
                                    _state.sent()
                                ];
                            case 2:
                                error = _state.sent();
                                if (!((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_instanceof$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(error, IcebergError) && error.status === 409)) return [
                                    3,
                                    4
                                ];
                                return [
                                    4,
                                    this.loadTable({
                                        namespace: namespace.namespace,
                                        name: request.name
                                    })
                                ];
                            case 3:
                                return [
                                    2,
                                    _state.sent()
                                ];
                            case 4:
                                throw error;
                            case 5:
                                return [
                                    2
                                ];
                        }
                    });
                }).call(this);
            }
        }
    ]);
    return TableOperations;
}();
// src/catalog/IcebergRestCatalog.ts
var IcebergRestCatalog = /*#__PURE__*/ function() {
    "use strict";
    function IcebergRestCatalog(options) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_call_check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, IcebergRestCatalog);
        var _options_accessDelegation;
        var prefix = "v1";
        if (options.catalogName) {
            prefix += "/".concat(options.catalogName);
        }
        var baseUrl = options.baseUrl.endsWith("/") ? options.baseUrl : "".concat(options.baseUrl, "/");
        this.client = createFetchClient({
            baseUrl: baseUrl,
            auth: options.auth,
            fetchImpl: options.fetch
        });
        this.accessDelegation = (_options_accessDelegation = options.accessDelegation) === null || _options_accessDelegation === void 0 ? void 0 : _options_accessDelegation.join(",");
        this.namespaceOps = new NamespaceOperations(this.client, prefix);
        this.tableOps = new TableOperations(this.client, prefix, this.accessDelegation);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_create_class$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(IcebergRestCatalog, [
        {
            key: "listNamespaces",
            value: /**
   * Lists all namespaces in the catalog.
   *
   * @param parent - Optional parent namespace to list children under
   * @returns Array of namespace identifiers
   *
   * @example
   * ```typescript
   * // List all top-level namespaces
   * const namespaces = await catalog.listNamespaces();
   *
   * // List namespaces under a parent
   * const children = await catalog.listNamespaces({ namespace: ['analytics'] });
   * ```
   */ function listNamespaces(parent) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(function() {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                        return [
                            2,
                            this.namespaceOps.listNamespaces(parent)
                        ];
                    });
                }).call(this);
            }
        },
        {
            key: "createNamespace",
            value: /**
   * Creates a new namespace in the catalog.
   *
   * @param id - Namespace identifier to create
   * @param metadata - Optional metadata properties for the namespace
   * @returns Response containing the created namespace and its properties
   *
   * @example
   * ```typescript
   * const response = await catalog.createNamespace(
   *   { namespace: ['analytics'] },
   *   { properties: { owner: 'data-team' } }
   * );
   * console.log(response.namespace); // ['analytics']
   * console.log(response.properties); // { owner: 'data-team', ... }
   * ```
   */ function createNamespace(id, metadata) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(function() {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                        return [
                            2,
                            this.namespaceOps.createNamespace(id, metadata)
                        ];
                    });
                }).call(this);
            }
        },
        {
            key: "dropNamespace",
            value: /**
   * Drops a namespace from the catalog.
   *
   * The namespace must be empty (contain no tables) before it can be dropped.
   *
   * @param id - Namespace identifier to drop
   *
   * @example
   * ```typescript
   * await catalog.dropNamespace({ namespace: ['analytics'] });
   * ```
   */ function dropNamespace(id) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(function() {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    this.namespaceOps.dropNamespace(id)
                                ];
                            case 1:
                                _state.sent();
                                return [
                                    2
                                ];
                        }
                    });
                }).call(this);
            }
        },
        {
            key: "loadNamespaceMetadata",
            value: /**
   * Loads metadata for a namespace.
   *
   * @param id - Namespace identifier to load
   * @returns Namespace metadata including properties
   *
   * @example
   * ```typescript
   * const metadata = await catalog.loadNamespaceMetadata({ namespace: ['analytics'] });
   * console.log(metadata.properties);
   * ```
   */ function loadNamespaceMetadata(id) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(function() {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                        return [
                            2,
                            this.namespaceOps.loadNamespaceMetadata(id)
                        ];
                    });
                }).call(this);
            }
        },
        {
            key: "listTables",
            value: /**
   * Lists all tables in a namespace.
   *
   * @param namespace - Namespace identifier to list tables from
   * @returns Array of table identifiers
   *
   * @example
   * ```typescript
   * const tables = await catalog.listTables({ namespace: ['analytics'] });
   * console.log(tables); // [{ namespace: ['analytics'], name: 'events' }, ...]
   * ```
   */ function listTables(namespace) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(function() {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                        return [
                            2,
                            this.tableOps.listTables(namespace)
                        ];
                    });
                }).call(this);
            }
        },
        {
            key: "createTable",
            value: /**
   * Creates a new table in the catalog.
   *
   * @param namespace - Namespace to create the table in
   * @param request - Table creation request including name, schema, partition spec, etc.
   * @returns Table metadata for the created table
   *
   * @example
   * ```typescript
   * const metadata = await catalog.createTable(
   *   { namespace: ['analytics'] },
   *   {
   *     name: 'events',
   *     schema: {
   *       type: 'struct',
   *       fields: [
   *         { id: 1, name: 'id', type: 'long', required: true },
   *         { id: 2, name: 'timestamp', type: 'timestamp', required: true }
   *       ],
   *       'schema-id': 0
   *     },
   *     'partition-spec': {
   *       'spec-id': 0,
   *       fields: [
   *         { source_id: 2, field_id: 1000, name: 'ts_day', transform: 'day' }
   *       ]
   *     }
   *   }
   * );
   * ```
   */ function createTable(namespace, request) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(function() {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                        return [
                            2,
                            this.tableOps.createTable(namespace, request)
                        ];
                    });
                }).call(this);
            }
        },
        {
            key: "updateTable",
            value: /**
   * Updates an existing table's metadata.
   *
   * Can update the schema, partition spec, or properties of a table.
   *
   * @param id - Table identifier to update
   * @param request - Update request with fields to modify
   * @returns Response containing the metadata location and updated table metadata
   *
   * @example
   * ```typescript
   * const response = await catalog.updateTable(
   *   { namespace: ['analytics'], name: 'events' },
   *   {
   *     properties: { 'read.split.target-size': '134217728' }
   *   }
   * );
   * console.log(response['metadata-location']); // s3://...
   * console.log(response.metadata); // TableMetadata object
   * ```
   */ function updateTable(id, request) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(function() {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                        return [
                            2,
                            this.tableOps.updateTable(id, request)
                        ];
                    });
                }).call(this);
            }
        },
        {
            key: "dropTable",
            value: /**
   * Drops a table from the catalog.
   *
   * @param id - Table identifier to drop
   *
   * @example
   * ```typescript
   * await catalog.dropTable({ namespace: ['analytics'], name: 'events' });
   * ```
   */ function dropTable(id, options) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(function() {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    this.tableOps.dropTable(id, options)
                                ];
                            case 1:
                                _state.sent();
                                return [
                                    2
                                ];
                        }
                    });
                }).call(this);
            }
        },
        {
            key: "loadTable",
            value: /**
   * Loads metadata for a table.
   *
   * @param id - Table identifier to load
   * @returns Table metadata including schema, partition spec, location, etc.
   *
   * @example
   * ```typescript
   * const metadata = await catalog.loadTable({ namespace: ['analytics'], name: 'events' });
   * console.log(metadata.schema);
   * console.log(metadata.location);
   * ```
   */ function loadTable(id) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(function() {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                        return [
                            2,
                            this.tableOps.loadTable(id)
                        ];
                    });
                }).call(this);
            }
        },
        {
            key: "namespaceExists",
            value: /**
   * Checks if a namespace exists in the catalog.
   *
   * @param id - Namespace identifier to check
   * @returns True if the namespace exists, false otherwise
   *
   * @example
   * ```typescript
   * const exists = await catalog.namespaceExists({ namespace: ['analytics'] });
   * console.log(exists); // true or false
   * ```
   */ function namespaceExists(id) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(function() {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                        return [
                            2,
                            this.namespaceOps.namespaceExists(id)
                        ];
                    });
                }).call(this);
            }
        },
        {
            key: "tableExists",
            value: /**
   * Checks if a table exists in the catalog.
   *
   * @param id - Table identifier to check
   * @returns True if the table exists, false otherwise
   *
   * @example
   * ```typescript
   * const exists = await catalog.tableExists({ namespace: ['analytics'], name: 'events' });
   * console.log(exists); // true or false
   * ```
   */ function tableExists(id) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(function() {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                        return [
                            2,
                            this.tableOps.tableExists(id)
                        ];
                    });
                }).call(this);
            }
        },
        {
            key: "createNamespaceIfNotExists",
            value: /**
   * Creates a namespace if it does not exist.
   *
   * If the namespace already exists, returns void. If created, returns the response.
   *
   * @param id - Namespace identifier to create
   * @param metadata - Optional metadata properties for the namespace
   * @returns Response containing the created namespace and its properties, or void if it already exists
   *
   * @example
   * ```typescript
   * const response = await catalog.createNamespaceIfNotExists(
   *   { namespace: ['analytics'] },
   *   { properties: { owner: 'data-team' } }
   * );
   * if (response) {
   *   console.log('Created:', response.namespace);
   * } else {
   *   console.log('Already exists');
   * }
   * ```
   */ function createNamespaceIfNotExists(id, metadata) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(function() {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                        return [
                            2,
                            this.namespaceOps.createNamespaceIfNotExists(id, metadata)
                        ];
                    });
                }).call(this);
            }
        },
        {
            key: "createTableIfNotExists",
            value: /**
   * Creates a table if it does not exist.
   *
   * If the table already exists, returns its metadata instead.
   *
   * @param namespace - Namespace to create the table in
   * @param request - Table creation request including name, schema, partition spec, etc.
   * @returns Table metadata for the created or existing table
   *
   * @example
   * ```typescript
   * const metadata = await catalog.createTableIfNotExists(
   *   { namespace: ['analytics'] },
   *   {
   *     name: 'events',
   *     schema: {
   *       type: 'struct',
   *       fields: [
   *         { id: 1, name: 'id', type: 'long', required: true },
   *         { id: 2, name: 'timestamp', type: 'timestamp', required: true }
   *       ],
   *       'schema-id': 0
   *     }
   *   }
   * );
   * ```
   */ function createTableIfNotExists(namespace, request) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(function() {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                        return [
                            2,
                            this.tableOps.createTableIfNotExists(namespace, request)
                        ];
                    });
                }).call(this);
            }
        }
    ]);
    return IcebergRestCatalog;
}();
// src/catalog/types.ts
var DECIMAL_REGEX = /^decimal\s*\(\s*(\d+)\s*,\s*(\d+)\s*\)$/;
var FIXED_REGEX = /^fixed\s*\[\s*(\d+)\s*\]$/;
function parseDecimalType(type) {
    var match = type.match(DECIMAL_REGEX);
    if (!match) return null;
    return {
        precision: parseInt(match[1], 10),
        scale: parseInt(match[2], 10)
    };
}
function parseFixedType(type) {
    var match = type.match(FIXED_REGEX);
    if (!match) return null;
    return {
        length: parseInt(match[1], 10)
    };
}
function isDecimalType(type) {
    return DECIMAL_REGEX.test(type);
}
function isFixedType(type) {
    return FIXED_REGEX.test(type);
}
function typesEqual(a, b) {
    var decimalA = parseDecimalType(a);
    var decimalB = parseDecimalType(b);
    if (decimalA && decimalB) {
        return decimalA.precision === decimalB.precision && decimalA.scale === decimalB.scale;
    }
    var fixedA = parseFixedType(a);
    var fixedB = parseFixedType(b);
    if (fixedA && fixedB) {
        return fixedA.length === fixedB.length;
    }
    return a === b;
}
function getCurrentSchema(metadata) {
    return metadata.schemas.find(function(s) {
        return s["schema-id"] === metadata["current-schema-id"];
    });
}
;
 //# sourceMappingURL=index.mjs.map
 //# sourceMappingURL=index.mjs.map
}),
"[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@supabase/supabase-js/dist/index.mjs [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SupabaseClient",
    ()=>SupabaseClient,
    "createClient",
    ()=>createClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_async_to_generator.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_call_super$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_call_super.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_call_check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_class_call_check.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_create_class$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_create_class.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_inherits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_inherits.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@swc/helpers/esm/_to_consumable_array.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/tslib/tslib.es6.mjs [app-client] (ecmascript) <export __generator as _>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$supabase$2f$functions$2d$js$2f$dist$2f$module$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@supabase/functions-js/dist/module/types.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$supabase$2f$functions$2d$js$2f$dist$2f$module$2f$FunctionsClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@supabase/functions-js/dist/module/FunctionsClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$supabase$2f$postgrest$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@supabase/postgrest-js/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@supabase/realtime-js/dist/module/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$RealtimeClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RealtimeClient$3e$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@supabase/realtime-js/dist/module/RealtimeClient.js [app-client] (ecmascript) <export default as RealtimeClient>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$supabase$2f$storage$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@supabase/storage-js/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$supabase$2f$auth$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@supabase/auth-js/dist/module/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$supabase$2f$auth$2d$js$2f$dist$2f$module$2f$AuthClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AuthClient$3e$__ = __turbopack_context__.i("[project]/Desktop/HappyCase/TheHappy/TheHappyCase/node_modules/@supabase/auth-js/dist/module/AuthClient.js [app-client] (ecmascript) <export default as AuthClient>");
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
//#region src/lib/version.ts
var version = "2.95.3";
//#endregion
//#region src/lib/constants.ts
var JS_ENV = "";
if (typeof Deno !== "undefined") JS_ENV = "deno";
else if (typeof document !== "undefined") JS_ENV = "web";
else if (typeof navigator !== "undefined" && navigator.product === "ReactNative") JS_ENV = "react-native";
else JS_ENV = "node";
var DEFAULT_HEADERS = {
    "X-Client-Info": "supabase-js-".concat(JS_ENV, "/").concat(version)
};
var DEFAULT_GLOBAL_OPTIONS = {
    headers: DEFAULT_HEADERS
};
var DEFAULT_DB_OPTIONS = {
    schema: "public"
};
var DEFAULT_AUTH_OPTIONS = {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: "implicit"
};
var DEFAULT_REALTIME_OPTIONS = {};
//#endregion
//#region \0@oxc-project+runtime@0.101.0/helpers/typeof.js
function _typeof(o) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(o$1) {
        return typeof o$1;
    } : function(o$1) {
        return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
    }, _typeof(o);
}
//#endregion
//#region \0@oxc-project+runtime@0.101.0/helpers/toPrimitive.js
function toPrimitive(t, r) {
    if ("object" != _typeof(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
//#endregion
//#region \0@oxc-project+runtime@0.101.0/helpers/toPropertyKey.js
function toPropertyKey(t) {
    var i = toPrimitive(t, "string");
    return "symbol" == _typeof(i) ? i : i + "";
}
//#endregion
//#region \0@oxc-project+runtime@0.101.0/helpers/defineProperty.js
function _defineProperty(e, r, t) {
    return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[r] = t, e;
}
//#endregion
//#region \0@oxc-project+runtime@0.101.0/helpers/objectSpread2.js
function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r$1) {
            return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
        })), t.push.apply(t, o);
    }
    return t;
}
function _objectSpread2(e) {
    for(var r = 1; r < arguments.length; r++){
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), !0).forEach(function(r$1) {
            _defineProperty(e, r$1, t[r$1]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r$1) {
            Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
        });
    }
    return e;
}
//#endregion
//#region src/lib/fetch.ts
var resolveFetch = function(customFetch) {
    if (customFetch) return function() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        return customFetch.apply(void 0, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(args));
    };
    return function() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        return fetch.apply(void 0, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(args));
    };
};
var resolveHeadersConstructor = function() {
    return Headers;
};
var fetchWithAuth = function(supabaseKey, getAccessToken, customFetch) {
    var fetch$1 = resolveFetch(customFetch);
    var HeadersConstructor = resolveHeadersConstructor();
    return function(input, init) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(function() {
            var _await$getAccessToken, accessToken, headers;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            getAccessToken()
                        ];
                    case 1:
                        accessToken = (_await$getAccessToken = _state.sent()) !== null && _await$getAccessToken !== void 0 ? _await$getAccessToken : supabaseKey;
                        headers = new HeadersConstructor(init === null || init === void 0 ? void 0 : init.headers);
                        if (!headers.has("apikey")) headers.set("apikey", supabaseKey);
                        if (!headers.has("Authorization")) headers.set("Authorization", "Bearer ".concat(accessToken));
                        return [
                            2,
                            fetch$1(input, _objectSpread2(_objectSpread2({}, init), {}, {
                                headers: headers
                            }))
                        ];
                }
            });
        })();
    };
};
//#endregion
//#region src/lib/helpers.ts
function ensureTrailingSlash(url) {
    return url.endsWith("/") ? url : url + "/";
}
function applySettingDefaults(options, defaults) {
    var _DEFAULT_GLOBAL_OPTIO, _globalOptions$header;
    var dbOptions = options.db, authOptions = options.auth, realtimeOptions = options.realtime, globalOptions = options.global;
    var DEFAULT_DB_OPTIONS$1 = defaults.db, DEFAULT_AUTH_OPTIONS$1 = defaults.auth, DEFAULT_REALTIME_OPTIONS$1 = defaults.realtime, DEFAULT_GLOBAL_OPTIONS$1 = defaults.global;
    var result = {
        db: _objectSpread2(_objectSpread2({}, DEFAULT_DB_OPTIONS$1), dbOptions),
        auth: _objectSpread2(_objectSpread2({}, DEFAULT_AUTH_OPTIONS$1), authOptions),
        realtime: _objectSpread2(_objectSpread2({}, DEFAULT_REALTIME_OPTIONS$1), realtimeOptions),
        storage: {},
        global: _objectSpread2(_objectSpread2(_objectSpread2({}, DEFAULT_GLOBAL_OPTIONS$1), globalOptions), {}, {
            headers: _objectSpread2(_objectSpread2({}, (_DEFAULT_GLOBAL_OPTIO = DEFAULT_GLOBAL_OPTIONS$1 === null || DEFAULT_GLOBAL_OPTIONS$1 === void 0 ? void 0 : DEFAULT_GLOBAL_OPTIONS$1.headers) !== null && _DEFAULT_GLOBAL_OPTIO !== void 0 ? _DEFAULT_GLOBAL_OPTIO : {}), (_globalOptions$header = globalOptions === null || globalOptions === void 0 ? void 0 : globalOptions.headers) !== null && _globalOptions$header !== void 0 ? _globalOptions$header : {})
        }),
        accessToken: function() {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(function() {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                    return [
                        2,
                        ""
                    ];
                });
            })();
        }
    };
    if (options.accessToken) result.accessToken = options.accessToken;
    else delete result.accessToken;
    return result;
}
/**
* Validates a Supabase client URL
*
* @param {string} supabaseUrl - The Supabase client URL string.
* @returns {URL} - The validated base URL.
* @throws {Error}
*/ function validateSupabaseUrl(supabaseUrl) {
    var trimmedUrl = supabaseUrl === null || supabaseUrl === void 0 ? void 0 : supabaseUrl.trim();
    if (!trimmedUrl) throw new Error("supabaseUrl is required.");
    if (!trimmedUrl.match(/^https?:\/\//i)) throw new Error("Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.");
    try {
        return new URL(ensureTrailingSlash(trimmedUrl));
    } catch (_unused) {
        throw Error("Invalid supabaseUrl: Provided URL is malformed.");
    }
}
//#endregion
//#region src/lib/SupabaseAuthClient.ts
var SupabaseAuthClient = /*#__PURE__*/ function(AuthClient) {
    "use strict";
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_inherits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(SupabaseAuthClient, AuthClient);
    function SupabaseAuthClient(options) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_call_check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, SupabaseAuthClient);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_call_super$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, SupabaseAuthClient, [
            options
        ]);
    }
    return SupabaseAuthClient;
}(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$supabase$2f$auth$2d$js$2f$dist$2f$module$2f$AuthClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AuthClient$3e$__["AuthClient"]);
//#endregion
//#region src/SupabaseClient.ts
/**
* Supabase Client.
*
* An isomorphic Javascript client for interacting with Postgres.
*/ var SupabaseClient = /*#__PURE__*/ function() {
    "use strict";
    function SupabaseClient(supabaseUrl, supabaseKey, options) {
        var _this = this;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_call_check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, SupabaseClient);
        var _settings$auth$storag, _settings$global$head;
        this.supabaseUrl = supabaseUrl;
        this.supabaseKey = supabaseKey;
        var baseUrl = validateSupabaseUrl(supabaseUrl);
        if (!supabaseKey) throw new Error("supabaseKey is required.");
        this.realtimeUrl = new URL("realtime/v1", baseUrl);
        this.realtimeUrl.protocol = this.realtimeUrl.protocol.replace("http", "ws");
        this.authUrl = new URL("auth/v1", baseUrl);
        this.storageUrl = new URL("storage/v1", baseUrl);
        this.functionsUrl = new URL("functions/v1", baseUrl);
        var defaultStorageKey = "sb-".concat(baseUrl.hostname.split(".")[0], "-auth-token");
        var DEFAULTS = {
            db: DEFAULT_DB_OPTIONS,
            realtime: DEFAULT_REALTIME_OPTIONS,
            auth: _objectSpread2(_objectSpread2({}, DEFAULT_AUTH_OPTIONS), {}, {
                storageKey: defaultStorageKey
            }),
            global: DEFAULT_GLOBAL_OPTIONS
        };
        var settings = applySettingDefaults(options !== null && options !== void 0 ? options : {}, DEFAULTS);
        this.storageKey = (_settings$auth$storag = settings.auth.storageKey) !== null && _settings$auth$storag !== void 0 ? _settings$auth$storag : "";
        this.headers = (_settings$global$head = settings.global.headers) !== null && _settings$global$head !== void 0 ? _settings$global$head : {};
        if (!settings.accessToken) {
            var _settings$auth;
            this.auth = this._initSupabaseAuthClient((_settings$auth = settings.auth) !== null && _settings$auth !== void 0 ? _settings$auth : {}, this.headers, settings.global.fetch);
        } else {
            this.accessToken = settings.accessToken;
            this.auth = new Proxy({}, {
                get: function(_, prop) {
                    throw new Error("@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.".concat(String(prop), " is not possible"));
                }
            });
        }
        this.fetch = fetchWithAuth(supabaseKey, this._getAccessToken.bind(this), settings.global.fetch);
        this.realtime = this._initRealtimeClient(_objectSpread2({
            headers: this.headers,
            accessToken: this._getAccessToken.bind(this)
        }, settings.realtime));
        if (this.accessToken) Promise.resolve(this.accessToken()).then(function(token) {
            return _this.realtime.setAuth(token);
        }).catch(function(e) {
            return console.warn("Failed to set initial Realtime auth token:", e);
        });
        this.rest = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$supabase$2f$postgrest$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PostgrestClient"](new URL("rest/v1", baseUrl).href, {
            headers: this.headers,
            schema: settings.db.schema,
            fetch: this.fetch,
            timeout: settings.db.timeout,
            urlLengthLimit: settings.db.urlLengthLimit
        });
        this.storage = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$supabase$2f$storage$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageClient"](this.storageUrl.href, this.headers, this.fetch, options === null || options === void 0 ? void 0 : options.storage);
        if (!settings.accessToken) this._listenForAuthEvents();
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_create_class$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(SupabaseClient, [
        {
            key: "functions",
            get: /**
	* Supabase Functions allows you to deploy and invoke edge functions.
	*/ function get() {
                return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$supabase$2f$functions$2d$js$2f$dist$2f$module$2f$FunctionsClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FunctionsClient"](this.functionsUrl.href, {
                    headers: this.headers,
                    customFetch: this.fetch
                });
            }
        },
        {
            /**
	* Perform a query on a table or a view.
	*
	* @param relation - The table or view name to query
	*/ key: "from",
            value: function from(relation) {
                return this.rest.from(relation);
            }
        },
        {
            /**
	* Select a schema to query or perform an function (rpc) call.
	*
	* The schema needs to be on the list of exposed schemas inside Supabase.
	*
	* @param schema - The schema to query
	*/ key: "schema",
            value: function schema(_schema) {
                return this.rest.schema(_schema);
            }
        },
        {
            /**
	* Perform a function call.
	*
	* @param fn - The function name to call
	* @param args - The arguments to pass to the function call
	* @param options - Named parameters
	* @param options.head - When set to `true`, `data` will not be returned.
	* Useful if you only need the count.
	* @param options.get - When set to `true`, the function will be called with
	* read-only access mode.
	* @param options.count - Count algorithm to use to count rows returned by the
	* function. Only applicable for [set-returning
	* functions](https://www.postgresql.org/docs/current/functions-srf.html).
	*
	* `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
	* hood.
	*
	* `"planned"`: Approximated but fast count algorithm. Uses the Postgres
	* statistics under the hood.
	*
	* `"estimated"`: Uses exact count for low numbers and planned count for high
	* numbers.
	*/ key: "rpc",
            value: function rpc(fn) {
                var args = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
                    head: false,
                    get: false,
                    count: void 0
                };
                return this.rest.rpc(fn, args, options);
            }
        },
        {
            /**
	* Creates a Realtime channel with Broadcast, Presence, and Postgres Changes.
	*
	* @param {string} name - The name of the Realtime channel.
	* @param {Object} opts - The options to pass to the Realtime channel.
	*
	*/ key: "channel",
            value: function channel(name) {
                var opts = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
                    config: {}
                };
                return this.realtime.channel(name, opts);
            }
        },
        {
            /**
	* Returns all Realtime channels.
	*/ key: "getChannels",
            value: function getChannels() {
                return this.realtime.getChannels();
            }
        },
        {
            /**
	* Unsubscribes and removes Realtime channel from Realtime client.
	*
	* @param {RealtimeChannel} channel - The name of the Realtime channel.
	*
	*/ key: "removeChannel",
            value: function removeChannel(channel) {
                return this.realtime.removeChannel(channel);
            }
        },
        {
            /**
	* Unsubscribes and removes all Realtime channels from Realtime client.
	*/ key: "removeAllChannels",
            value: function removeAllChannels() {
                return this.realtime.removeAllChannels();
            }
        },
        {
            key: "_getAccessToken",
            value: function _getAccessToken() {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(function() {
                    var _this, _data$session$access_, _data$session, data;
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _this = this;
                                if (!_this.accessToken) return [
                                    3,
                                    2
                                ];
                                return [
                                    4,
                                    _this.accessToken()
                                ];
                            case 1:
                                return [
                                    2,
                                    _state.sent()
                                ];
                            case 2:
                                return [
                                    4,
                                    _this.auth.getSession()
                                ];
                            case 3:
                                data = _state.sent().data;
                                return [
                                    2,
                                    (_data$session$access_ = (_data$session = data.session) === null || _data$session === void 0 ? void 0 : _data$session.access_token) !== null && _data$session$access_ !== void 0 ? _data$session$access_ : _this.supabaseKey
                                ];
                        }
                    });
                }).call(this);
            }
        },
        {
            key: "_initSupabaseAuthClient",
            value: function _initSupabaseAuthClient(param, headers, fetch$1) {
                var autoRefreshToken = param.autoRefreshToken, persistSession = param.persistSession, detectSessionInUrl = param.detectSessionInUrl, storage = param.storage, userStorage = param.userStorage, storageKey = param.storageKey, flowType = param.flowType, lock = param.lock, debug = param.debug, throwOnError = param.throwOnError;
                var authHeaders = {
                    Authorization: "Bearer ".concat(this.supabaseKey),
                    apikey: "".concat(this.supabaseKey)
                };
                return new SupabaseAuthClient({
                    url: this.authUrl.href,
                    headers: _objectSpread2(_objectSpread2({}, authHeaders), headers),
                    storageKey: storageKey,
                    autoRefreshToken: autoRefreshToken,
                    persistSession: persistSession,
                    detectSessionInUrl: detectSessionInUrl,
                    storage: storage,
                    userStorage: userStorage,
                    flowType: flowType,
                    lock: lock,
                    debug: debug,
                    throwOnError: throwOnError,
                    fetch: fetch$1,
                    hasCustomAuthorizationHeader: Object.keys(this.headers).some(function(key) {
                        return key.toLowerCase() === "authorization";
                    })
                });
            }
        },
        {
            key: "_initRealtimeClient",
            value: function _initRealtimeClient(options) {
                return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$HappyCase$2f$TheHappy$2f$TheHappyCase$2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$RealtimeClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RealtimeClient$3e$__["RealtimeClient"](this.realtimeUrl.href, _objectSpread2(_objectSpread2({}, options), {}, {
                    params: _objectSpread2(_objectSpread2({}, {
                        apikey: this.supabaseKey
                    }), options === null || options === void 0 ? void 0 : options.params)
                }));
            }
        },
        {
            key: "_listenForAuthEvents",
            value: function _listenForAuthEvents() {
                var _this = this;
                return this.auth.onAuthStateChange(function(event, session) {
                    _this._handleTokenChanged(event, "CLIENT", session === null || session === void 0 ? void 0 : session.access_token);
                });
            }
        },
        {
            key: "_handleTokenChanged",
            value: function _handleTokenChanged(event, source, token) {
                if ((event === "TOKEN_REFRESHED" || event === "SIGNED_IN") && this.changedAccessToken !== token) {
                    this.changedAccessToken = token;
                    this.realtime.setAuth(token);
                } else if (event === "SIGNED_OUT") {
                    this.realtime.setAuth();
                    if (source == "STORAGE") this.auth.signOut();
                    this.changedAccessToken = void 0;
                }
            }
        }
    ]);
    return SupabaseClient;
}();
//#endregion
//#region src/index.ts
/**
* Creates a new Supabase Client.
*
* @example
* ```ts
* import { createClient } from '@supabase/supabase-js'
*
* const supabase = createClient('https://xyzcompany.supabase.co', 'public-anon-key')
* const { data, error } = await supabase.from('profiles').select('*')
* ```
*/ var createClient = function(supabaseUrl, supabaseKey, options) {
    return new SupabaseClient(supabaseUrl, supabaseKey, options);
};
function shouldShowDeprecationWarning() {
    if (typeof window !== "undefined") return false;
    var _process = globalThis["process"];
    if (!_process) return false;
    var processVersion = _process["version"];
    if (processVersion === void 0 || processVersion === null) return false;
    var versionMatch = processVersion.match(/^v(\d+)\./);
    if (!versionMatch) return false;
    return parseInt(versionMatch[1], 10) <= 18;
}
if (shouldShowDeprecationWarning()) console.warn("⚠️  Node.js 18 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 20 or later. For more information, visit: https://github.com/orgs/supabase/discussions/37217");
;
 //# sourceMappingURL=index.mjs.map
}),
]);

//# sourceMappingURL=5be21_88067406._.js.map