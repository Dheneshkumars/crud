import React from 'react';
import PropTypes from 'prop-types';
import { ToastContainer} from 'react-toastify';

const Toaster = (
    {
        position = "top-right",
        autoClose = 5000,
        hideProgressBar = false,
        newestOnTop = false,
        rtl = false,
        closeOnClick = true,
        pauseOnHover = true,
    }
) => {
    return (
        <ToastContainer
            position={position}
            autoClose={autoClose}
            hideProgressBar={hideProgressBar}
            newestOnTop={newestOnTop}
            rtl={rtl}
            closeOnClick={closeOnClick}
            pauseOnHover={pauseOnHover}
        />
    )
}

Toaster.propTypes = {
    position: PropTypes.string,
    autoClose: PropTypes.number,
    hideProgressBar: PropTypes.bool,
    newestOnTop: PropTypes.bool,
    rtl: PropTypes.bool,
    closeOnClick: PropTypes.bool,
    pauseOnHover: PropTypes.bool,
};

export default Toaster;