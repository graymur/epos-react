export default (value, rule) => {
    return /\S+@\S+/.test(value);
};