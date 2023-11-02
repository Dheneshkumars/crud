import React from "react";
import PropTypes from 'prop-types';

const Titles = (
    {
        type,
        children,
        className,
        id
    }
) => {
    switch (type) {
        case "h1":
            return <h1 className={className} id={id}>{children}</h1>;
        case "h2":
            return <h2 className={className} id={id}>{children}</h2>;
        case "h3":
            return <h3 className={className} id={id}>{children}</h3>;
        case "h4":
            return <h4 className={className} id={id}>{children}</h4>;
        case "h5":
            return <h5 className={className} id={id}>{children}</h5>;
        case "h6":
            return <h6 className={className} id={id}>{children}</h6>;
        default:
            return null;
    };
}

Titles.propTypes = {
    type: PropTypes.string,
    children: PropTypes.any,
    className: PropTypes.string,
    id: PropTypes.string,
};

export default Titles;