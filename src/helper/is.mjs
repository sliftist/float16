import { ToIntegerOrInfinity } from "./spec.mjs";

/**
 * @param {unknown} value
 * @returns {value is object}
 */
export function isObject(value) {
    return (value !== null && typeof value === "object") || typeof value === "function";
}

/**
 * @param {unknown} value
 * @returns {value is object}
 */
function isObjectLike(value) {
    return value !== null && typeof value === "object";
}

const toString = Object.prototype.toString;

/**
 * @param {unknown} value
 * @returns {value is DataView}
 */
export function isDataView(value) {
    return ArrayBuffer.isView(value) && toString.call(value) === "[object DataView]";
}

// Inspired by util.types implementation of Node.js
const TypedArrayPrototype = Object.getPrototypeOf(Uint8Array).prototype;
const getTypedArrayPrototypeSybolToStringTag = Object.getOwnPropertyDescriptor(TypedArrayPrototype, Symbol.toStringTag).get;

/**
 * @param {unknown} value
 * @returns {value is Uint8Array|Uint8ClampedArray|Uint16Array|Uint32Array|Int8Array|Int16Array|Int32Array|Float32Array|Float64Array|BigUint64Array|BigInt64Array}
 */
export function isTypedArray(value) {
    return getTypedArrayPrototypeSybolToStringTag.call(value) !== undefined;
}

/**
 * @param {unknown} value
 * @returns {value is ArrayBuffer}
 */
 export function isArrayBuffer(value) {
    return isObjectLike(value) && toString.call(value) === "[object ArrayBuffer]";
}

/**
 * @param {unknown} value
 * @returns {value is SharedArrayBuffer}
 */
export function isSharedArrayBuffer(value) {
    return isObjectLike(value) && toString.call(value) === "[object SharedArrayBuffer]";
}

/**
 * @param {unknown} value
 * @returns {value is Iterable}
 */
export function isIterable(value) {
    return isObject(value) && typeof value[Symbol.iterator] === "function";
}

/**
 * @param {unknown} key
 * @returns {value is string}
 */
export function isCanonicalIntegerIndexString(key) {
    return typeof key === "string" && key === ToIntegerOrInfinity(key) + "";
}
