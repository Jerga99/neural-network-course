
import {useEffect, useState} from "react";

function Modal({isOpen, onClose, title, children}) {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
    onClose();
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-backdrop" onClick={closeModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        <div className="modal-content">
          {children}
        </div>
        <button className="modal-close-btn" onClick={closeModal}>Close modal</button>
      </div>
    </div>
  )
}

export default Modal;
