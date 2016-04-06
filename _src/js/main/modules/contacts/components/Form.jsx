import React from 'react';
import { reduxForm } from 'redux-form';

class Form extends React.Component {
    render() {
        const { fields: { name, email, phone, message }, handleSubmit } = this.props;

        return (
            <form method="post" onSubmit={ handleSubmit }>
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

export default reduxForm({
    form: 'contacts',
    fields: ['name', 'email', 'phone', 'message']
})(Form);