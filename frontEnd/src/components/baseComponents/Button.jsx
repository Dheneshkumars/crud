import React from 'react';
import PropTypes from 'prop-types';

const Button = (
    {
        children,
        id,
        form,
        type,
        name,
        disabled,
        isHidden,
        className,
        onClickHandler,
        dataAction,
        datadismiss,
        dataToggle,
        dataTarget,
        ariaExpanded,
        ariaControls,
        style,
        onAnimationEnd
    }
) => {
    return (
        <button
            key={id}
            type={type}
            name={name}
            id={id}
            form={form}
            className={`btn ${className}`}
            disabled={disabled}
            hidden={isHidden}
            onClick={() => {
                onClickHandler && onClickHandler({ target: { name, dataAction } }, "onClick")
            }}
            data-name={dataAction}
            data-dismiss={datadismiss}
            data-toggle={dataToggle}
            data-target={dataTarget}
            aria-expanded={ariaExpanded}
            aria-controls={ariaControls}
            style={style}
            onAnimationEnd={onAnimationEnd}
        >
            {children}
        </button>
    )
};

Button.defaultProps = {
    isHidden: false,
    disabled: false,
    isEncrypted: false
}

Button.propTypes = {
    children: PropTypes.any,
    type: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onClickHandler: PropTypes.func
};

export default Button;