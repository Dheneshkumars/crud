import React from 'react';
import PropTypes from 'prop-types';
const TextArea = ({ placeHolder, id, name, rows, cols, value, className, type, children,onChange,ref}) => {

    return <textarea
        value={value}
        rows={rows}
        cols={cols}
        placeholder={placeHolder}
        id={id}
        name={name}
        className={className}
        onChange={onChange}
        ref={ref}
    >{children}
    </textarea>
}

TextArea.propTypes = {
    type: PropTypes.string.isRequired,
    rows: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    value: PropTypes.any,
    placeHolder: PropTypes.any,
    className: PropTypes.string,
    id: PropTypes.string,
    cols: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    children: PropTypes.any
}

export default TextArea;