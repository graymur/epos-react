export default (value, rule) => {
    return rule.data.test(value.toString());
}