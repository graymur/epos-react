import React from 'react';
import ImageFull from './ImageFull.jsx';
import Modal from 'react-modal';
import modalStyles from '../../util/modal-styles.js';

export default class Image extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            opened: false
        };
    }

    toggleOpened(event) {
        if (event && event.preventDefault) {
            event.preventDefault();
        }

        this.setState({
            opened: !this.state.opened
        });
    }

    render() {
        let source = this.props.source;

        return (
            <a href={'/files/' + source} onClick={this.toggleOpened.bind(this)}>
                <picture>
                    <source media="(min-width: 769px)" srcSet={'/resize/w150-h150-tput_out-fgs/' + source} />
                    <source media="(min-width: 401px)" srcSet={'/resize/w768-fgs/' + source} />
                    <source media="(min-width: 0)" srcSet={'/resize/w400-fgs/' + source} />
                    <img src={'/resize/w150-h150-tput_out-fgs/' + source} />
                </picture>
                <Modal contentLabel="" isOpen={this.state.opened} onRequestClose={this.toggleOpened.bind(this)} style={modalStyles}>
                    <ImageFull source={source} onClick={this.toggleOpened.bind(this)} />
                </Modal>
            </a>
        );
    }
}
