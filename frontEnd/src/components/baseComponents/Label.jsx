import React from 'react';
import PropTypes from 'prop-types';

const Label = ({ htmlFor, className, children, onMouseEnter, onMouseLeave, style }) => {
    return (
        <label
            htmlFor={htmlFor}
            className={className}
            style={style}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {children}
        </label>
    );
};

Label.propTypes = {
    children: PropTypes.any,
    htmlFor: PropTypes.any,
    className: PropTypes.string,
};

export default Label;