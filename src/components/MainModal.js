import React from "react";
import ReactModal from "react-modal";

const MainModal = ({ open, onClose, title, children }) => {
  return (
    <ReactModal
      ariaHideApp={false}
      isOpen={open}
      onRequestClose={() => onClose()}
      style={{
        overlay: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 100,
        },
        content: {
          width: "100%",
          maxWidth: "500px",
          height: "fit-content",
          margin: "0 auto",
          backgroundColor: "#fff",
        },
      }}
    >
      <h4 className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300 flex justify-between">
        {title}
        <button
          onClick={() => onClose()}
          className="px-3 py-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-md active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
        >
          Close
        </button>
      </h4>

      {children}
    </ReactModal>
  );
};

export default MainModal;
