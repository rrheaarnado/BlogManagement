// components/StatusModal.jsx
import React from "react";

const StatusModal = ({ isOpen, onClose, title, message, type }) => {
    if (!isOpen) return null;

    // Colors depending on success or error
    const colorClasses =
        type === "success"
            ? "bg-white text-green-600  border-gray-400"
            : "bg-white text-red-600 border-gray-400";

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className={`w-full max-w-sm rounded-lg border p-6 shadow-lg ${colorClasses}`}>
                <h2 className="text-lg font-bold mb-2">{title}</h2>
                <p className="mb-4">{message}</p>
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-600"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StatusModal;
