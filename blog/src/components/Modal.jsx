import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // don't render if modal is closed

  return (
    <div className="fixed inset-0 flex items-start pt-30 justify-center bg-black/10 z-50">
      {/* Modal content */}
      <div className="bg-white rounded-lg shadow-lg p-6 w-[50vw] max-w-[90vw] relative">
        {/* Close button (X) */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-black/10"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
