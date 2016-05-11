import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { submitForm, resetForm } from './actions.js';
import { createAsyncValidator } from '../../util/validate/validate.js';

export function validationClass(classes = [], state = {}) {
    if (state.touched && !state.valid) {
        classes.push('_invalid');
    }

    return classes.join(' ');
}

export class ContactsForm extends React.Component {
    componentDidMount() {
        this.form = this.refs.form;
        this.message = this.refs.message;
        this.resetTimeout = null;
    }

    componentDidUpdate() {
        if (this.props.contactsForm.submitted && !this.resetTimeout) {
            this.props.resetForm();
            // some bug in redux-form won't clear value from a textarea
            this.message.value = '';

            // remove success message after 5 seconds
            this.resetTimeout = setTimeout(() => {
                this.props.dispatch(resetForm());
                this.resetTimeout = null;
            }, 5000);
        }
    }

    render() {
        const { fields: { name, email, phone, message }, handleSubmit } = this.props;

        let submitTitle = this.props.contactsForm.submitting ? 'Submitting...' : 'Submit';

        return (
            <div className="form-container">
                <h3>Contacts form</h3>
                { this.props.contactsForm.submitted ? <h4>Thank you, our message has been sent, we will contact you shortly.</h4> : null }

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
                                <textarea name="message" ref="message" {...message}></textarea>
                            </span>
                        </label>
                        <label className="form__row _submit">
                            <input type="submit" value={submitTitle} disabled={this.props.contactsForm.submitting} />
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

const ContactsFormConnected = connect(
    state => ( { contactsForm: state.contactsForm } ),
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
})*/)(ContactsFormConnected);