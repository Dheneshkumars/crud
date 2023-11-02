import React from "react";
import PropTypes from 'prop-types';

const HyperLink = (
    {
        id,
        className,
        href,
        value,
        target,
        children,
        download,
        index,
        onClick
    }
) => {
    return (
        <a
            id={id}
            className={className}
            href={href}
            value={value}
            target={target}
            download = {download}
            index={index}
            onClick={onClick}
        >
            {children}
        </a>
    )
}

HyperLink.PropType = {
    id: PropTypes.string,
    className: PropTypes.string,
    href: PropTypes.any,
    value: PropTypes.string.isRequired,
    target: PropTypes.string,
    children: PropTypes.any.isRequired
}

export default HyperLink;