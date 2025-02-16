import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg min-w-[30vw] min-h-[30vh]  max-w-max max-h-[90vh]  overflow-auto w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="text-gray-500 text-xl hover:text-gray-700 float-right"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
