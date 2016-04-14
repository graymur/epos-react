import { isEmail } from 'validator';

export default (value, rule) => {
    return isEmail(value.toString());
}