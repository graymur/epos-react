import * as methods from './methods/_index.js';

export function normalizeRules(rules) {
    let key, normalized;

    if (typeof rules === 'string') {
        normalized = {
            [rules]: true
        };
    } else {
        normalized = Object.assign({}, rules);
    }

    for (key in normalized) {
        if (!normalized.hasOwnProperty(key)) continue;
        normalized[key] = normalizeRule({[key]: normalized[key]});
    }

    return normalized;
}

export function normalizeRule(rule) {
    let keys = Object.keys(rule);

    if (keys.length > 1) {
        throw new Error('Single rule cannot contain more than one key');
    }

    let ruleData = rule[keys[0]];

    if (typeof ruleData === 'string') {
        ruleData = {
            message: ruleData
        };
    } else if (typeof ruleData !== 'object') {
        ruleData = {
            data: ruleData
        };
    }

    ruleData = Object.assign({}, { message: 'Wrong value'}, ruleData);

    return ruleData;
}

export function createValidator(fields, additionalMethods = {}, messages = {}) {
    let localMethods = Object.assign({}, methods, additionalMethods);

    return (values) => {
        let key, rule, errors = {}, isValid = true;

        for (key in fields) {
            if (!fields.hasOwnProperty(key)) continue;
            let fieldRules = normalizeRules(fields[key]);

            for (rule in fieldRules) {
                if (!fieldRules.hasOwnProperty(rule)) continue;

                if (!localMethods[rule]) {
                    throw new Error(`Validation method ${rule} does not exist`);
                }

                let result = localMethods[rule](values[key] || '', fieldRules[rule]);

                if (!result) {
                    isValid = false;

                    if (messages[key] && messages[key][rule]) {
                        errors[key] = messages[key][rule];
                    } else {
                        errors[key] = fieldRules[rule].message;
                    }
                }
            }
        }

        return errors;
    };
}

export function createAsyncValidator(fields, additionalMethods = {}, messages = {}) {
    return (values, dispatch, props) => {
        var result = createValidator(fields, additionalMethods = {}, messages = {})(values);
        return Object.keys(result).length === 0 ? Promise.resolve(result) : Promise.reject(result);
    };
}
