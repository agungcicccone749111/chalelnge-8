import React from 'react';

interface ModalProps {
  show: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  successMessage?: string; // Add a prop for success message
}

const Modal: React.FC<ModalProps> = ({ show, onConfirm, onCancel, successMessage }) => {
  return (
    <div style={{ display: show ? 'block' : 'none', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '20px', borderRadius: '8px' }}>
        {successMessage ? (
          <div>
            <p>{successMessage}</p>
            <button onClick={onCancel} className="btn btn-secondary">Close</button>
          </div>
        ) : (
          <div>
            <p>Are you sure you want to delete this car?</p>
            <button onClick={onConfirm} className="btn btn-danger">Yes</button>
            <button onClick={onCancel} className="btn btn-secondary">No</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
