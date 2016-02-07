import React from 'react';

const Image = ({ source }) => {
    return (
        <a href={'/files/' + source} target="_blank">
            <picture>
                <source media="(min-width: 769px)" srcSet={'/resize/w150-h150-tput_out-fgs/' + source}/>
                <source media="(min-width: 401px)" srcSet={'/resize/w768-fgs/' + source}/>
                <source media="(min-width: 0)" srcSet={'/resize/w400-fgs/' + source}/>
                <img src={'/resize/w150-h150-tput_out-fgs/' + source}/>
            </picture>
        </a>
    );
};

export default Image;