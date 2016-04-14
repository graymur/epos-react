import React from 'react';
import { reduxForm } from 'redux-form';
import { createAsyncValidator } from '../../../util/validate/validate.js';

function validationClass(classes = [], state = {}) {
    if (state.touched && !state.valid) {
        classes.push('_invalid');
    }

    return classes.join(' ');
}

class Form extends React.Component {
    render() {
        const { fields: { name, email, phone, message }, handleSubmit } = this.props;

        return (
            <form method="post" onSubmit={ handleSubmit(this.context.onFormSubmit) }>
                <div className="contacts__form form">
                    <label className={validationClass(['form__row'], name)}>
                        <span className="form__row__label">Your name:</span>
                        <span className="form__row__input">
                            <input name="name" {...name}/>
                        </span>
                    </label>
                    <label className={validationClass(['form__row'], email)}>
                        <span className="form__row__label">Your email:</span>
                        <span className="form__row__input">
                            <input name="email" {...email}/>
                        </span>
                    </label>
                    <label className={validationClass(['form__row'], phone)}>
                        <span className="form__row__label">Your phone:</span>
                        <span className="form__row__input">
                            <input name="phone" {...phone}/>
                        </span>
                    </label>
                    <label className={validationClass(['form__row'], message)}>
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

Form.contextTypes = {
    onFormSubmit: React.PropTypes.func.isRequried
};

const rules = {
    name: "required",
    email: {
        required: "This field is required",
        email: "Wrong email"
    },
    phone: {
        required: true,
        minlength: 10
    },
    message: "required"
};

export default reduxForm({
    form: 'contacts',
    fields: ['name', 'email', 'phone', 'message'],
    asyncValidate: createAsyncValidator(rules),
    asyncBlurFields: ['name', 'email', 'phone', 'message']
}, state => ({ // mapStateToProps
    initialValues: {
        name: 'Sergey',
        email: 'graymur@mail.ru',
        phone: '1234567890',
        message: 'Hello, world!'
    }
}))(Form);