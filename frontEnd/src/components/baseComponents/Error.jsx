import React from "react";
import PropTypes from 'prop-types';

const Error = (
    {
        className,
        id,
        children
    }
) => {
    return (
        <span
            className={`text-danger fs-sm ${className ? className : ""}`}
            id={id}
        >
            {children}
        </span>
    )
}

Error.propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
}

export default Error;