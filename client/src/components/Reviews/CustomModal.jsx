import React from 'react';
import './CustomModal.css';

const CustomModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal">
                <button className="custom-modal-close" onClick={onClose}>×</button>
                <div className="custom-modal-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default CustomModal;
