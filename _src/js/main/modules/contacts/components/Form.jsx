import React from 'react';
import { reduxForm } from 'redux-form';
import createValidator from '../../../util/validate/validate.js';

function onSubmit() {
    console.log(arguments);
}

class Form extends React.Component {
    render() {
        const { fields: { name, email, phone, message }, handleSubmit } = this.props;

        return (
            <form method="post" onSubmit={ handleSubmit(onSubmit) }>
                <div className="contacts__form form">
                    <label className="form__row">
                        <span className="form__row__label">Your name:</span>
                        <span className="form__row__input">
                            <input name="name" {...name}/>
                        </span>
                    </label>
                    <label className="form__row">
                        <span className="form__row__label">Your email:</span>
                        <span className="form__row__input">
                            <input name="email" {...email}/>
                        </span>
                    </label>
                    <label className="form__row">
                        <span className="form__row__label">Your phone:</span>
                        <span className="form__row__input">
                            <input name="phone" {...phone}/>
                        </span>
                    </label>
                    <label className="form__row">
                        <span className="form__row__label">Your message:</span>
                        <span className="form__row__input">
                            <textarea name="message" {...message}></textarea>
                        </span>
                    </label>
                    <label className="form__row _submit">
                        <input type="submit" value="Submit"/>
                    </label>
                </div>
            </form>
        );
    }
}

const rules = {
    name: "required",
    email: {
        required: "This field is required",
        email: "Wrong email"
    },
    phone: {
        required: true,
        regexp: {
            "data": /^\d{5,}$/
        }
    },
    message: "required"
};

//const validate = values => {
//    const errors = {};
//
//    if (!values.name) {
//        errors.name = 'Required';
//    }
//
//    if (!values.email) {
//        errors.email = 'Required';
//    } else if (!isEmail(values.email)) {
//        errors.email = 'Wrong email';
//    }
//
//    if (!values.username) {
//        errors.username = 'Required';
//    } else if (values.username.length > 15) {
//        errors.username = 'Must be 15 characters or less';
//    }
//
//    if (!values.email) {
//        errors.email = 'Required';
//    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//        errors.email = 'Invalid email address';
//    }
//
//    if (!values.age) {
//        errors.age = 'Required';
//    } else if (isNaN(Number(values.age))) {
//        errors.age = 'Must be a number';
//    } else if (Number(values.age) < 18) {
//        errors.age = 'Sorry, you must be at least 18 years old';
//    }
//
//    return errors;
//};

export default reduxForm({
    form: 'contacts',
    fields: ['name', 'email', 'phone', 'message'],
    validate: createValidator(rules)
})(Form);