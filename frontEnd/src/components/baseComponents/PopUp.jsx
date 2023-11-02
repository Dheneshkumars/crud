import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const PopUp = (
    {
        type,
        id,
        className = "",
        closeBtn = true,
        modalTitle = "Modal Title",
        modalBody = "Modal Body",
        modalFooter = "Modal Footer"
    }
) => {
    switch (type) {
        case "modal":
            return (
                <div
                    className="modal"
                    tabIndex="-1"
                    data-backdrop="static"
                    id={id}
                >
                    <div
                        className={`${className} modal-dialog`}
                        role="document"
                    >
                        <div className="modal-content">
                            {
                                closeBtn &&
                                <div className="modal-header text-white fw-bold" style={{backgroundColor: '#173b6c'}}>
                                    <h5 className="modal-title">
                                        {modalTitle && modalTitle}
                                    </h5>
                                    <Button
                                        type="button"
                                        className="btn shadow-none text-white fs-3 px-2 py-0" datadismiss="modal"
                                    >
                                        &times;
                                    </Button>
                                </div>
                            }
                            <div className="modal-body">
                                {modalBody && modalBody}
                            </div>
                            {
                                modalFooter && 
                                <div className="modal-footer">
                                    {modalFooter && modalFooter}
                                </div>
                            }
                        </div>
                    </div>
                </div>
            )
        case "popUp":
            return (
                <div
                    className={`modal`}
                    tabIndex="-1"
                    data-backdrop="static"
                    id={id}
                >
                    <div
                        className={`${className} modal-dialog modal-dialog-centered`}
                        role="document"
                    >
                        <div 
                            className="modal-content"
                            style={{borderTop: `8px solid #3498db`}}
                        >
                            {modalBody && modalBody}
                        </div>
                    </div>
                </div>
            )
        default:
            return null;
    }
}

PopUp.propTypes = {
    type: PropTypes.string,
    id: PropTypes.string,
    className: PropTypes.string,
    closeBtn: PropTypes.bool,
    modalTitle: PropTypes.string,
    modalBody: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]),
    modalFooter: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]),
    popColor: PropTypes.string,
};

export default PopUp;
