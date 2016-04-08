import React from 'react';
import { reduxForm } from 'redux-form';
import { generateValidation } from 'redux-form-validation';

function onSubmit() {
    console.log(arguments);
}

class Form extends React.Component {
    render() {
        const { fields: { name, email, phone, message }, handleSubmit } = this.props;

        console.log(email);

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

var validations = {
    name: {
        required: false
    },
    email: {
        required: true,
        minLength: 5,
        email: true
    },
    phone: {
        //validateOnBlur: true,
        required: true,
        minLength: 5
    },
    message: {
        required: true,
        minLength: 10
    }
};

var validator = generateValidation(validations);

//console.log(validator);

//const asyncValidate = validator.asyncValidate;
//
//validator.asyncValidate = function () {
//    let retval = asyncValidate.apply(null, [].slice.call(arguments));
//    console.log(retval);
//    retval.then(function (data) {
//        console.log(data);
//        return data;
//    }).catch(e => {
//        console.log(e);
//    });
//    return retval;
//};

export default reduxForm({
    form: 'contacts',
    fields: ['name', 'email', 'phone', 'message'],
    asyncValidate: validator.asyncValidate,
    asyncBlurFields: validator.asyncBlurFields
})(Form);