import React from 'react';
import PropTypes from 'prop-types';

const Paragraph = (
    {
        className,
        id,
        children
    }
) => {
    return (
        <>
            <p
                id={id}
                className={`${className ? className : ""}`}
            >
                {children}
            </p>
        </>
    )
}

Paragraph.prototype = {
    id: PropTypes.string,
    className: PropTypes.string,
}

export default Paragraph;