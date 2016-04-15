import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { submitForm } from './actions.js';
import { createAsyncValidator } from '../../util/validate/validate.js';
import { resetForm } from './actions.js';

function validationClass(classes = [], state = {}) {
    if (state.touched && !state.valid) {
        classes.push('_invalid');
    }

    return classes.join(' ');
}

class ContactsForm extends React.Component {
    componentDidMount() {
        this.form = this.refs.form;
    }

    componentDidUpdate() {
        if (this.props.contactsForm.submitted) {
            this.form.reset();
        }
    }

    render() {
        const { fields: { name, email, phone, message }, handleSubmit } = this.props;

        return (
            <div className="form-container">
                { this.props.contactsForm.submitted ? <h3>Thank you, our message has been sent, we will contact you shortly.</h3> : null }

                <form ref="form" method="post" onSubmit={handleSubmit(this.props.onSubmit)}>
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
            </div>
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
        minlength: 10
    },
    message: "required"
};

ContactsForm = connect(
    state => ({ contactsForm: state.contactsForm }),
    dispatch => ( { onSubmit: values => dispatch(submitForm(values)) } )
)(ContactsForm);

export default reduxForm({
    form: 'contacts',
    fields: ['name', 'email', 'phone', 'message'],
    asyncValidate: createAsyncValidator(rules),
    asyncBlurFields: ['name', 'email', 'phone', 'message']
}/*, state => ({
    initialValues: {
        name: 'Sergey',
        email: 'graymur@mail.ru',
        phone: '1234567890',
        message: 'Hello, world!'
    }
})*/)(ContactsForm);