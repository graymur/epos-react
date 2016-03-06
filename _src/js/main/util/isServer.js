export default function isServer() {
    return typeof window === 'undefined' && typeof __webpack_require__ === 'undefined';
}