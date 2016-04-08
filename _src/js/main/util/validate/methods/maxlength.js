export default (value, rule) => {
    return value.toString().length <= rule.data;
}
