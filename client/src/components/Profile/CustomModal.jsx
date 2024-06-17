import React from 'react';
import './CustomModal.css';

const CustomModal = ({ isOpen, onClose, onConfirm, children }) => {
    if (!isOpen) return null;

    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal">
                <button className="custom-modal-close" onClick={onClose}>×</button>
                <div className="custom-modal-content">
                    {children}
                    <div className="custom-modal-buttons">
                        <button onClick={onConfirm} className="btn btn-danger narrow-button">Usuń</button>
                        <button onClick={onClose} className="btn btn-secondary narrow-button">Anuluj</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomModal;
