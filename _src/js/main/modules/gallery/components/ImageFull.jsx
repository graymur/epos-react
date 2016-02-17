import React from 'react';

export default class ImageFull extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false
        }
    }

    componentDidMount() {
        let i = new Image();

        i.onload = () => {
            this.setState({ loaded: true });
        };

        i.src = this.getSrc();
    }

    getSrc() {
        return '/resize/w1000-h1000/' + this.props.source
    }

    render() {
        return (
            this.state.loaded
                ? <img src={this.getSrc()} className="gallery__big-image" onClick={this.props.onClick}/>
                : <div className="gallery__big-image__preloader"></div>
        );
    }
}