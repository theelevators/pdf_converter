import { useState } from "react";
import { createPortal } from "react-dom";
import ModalContent from "./ModalContent";
import { findDOMNode } from "react-dom";

const GeneralModal = ({
  showModal,
  setShowModal,
  setModalStatus,
  leftButtonTitle,
  rightButtonTitle,
  title,
  isEditable,
  handleModalEntry,
}) => {
  const domNode = findDOMNode(document.getElementById("portal"));

  return (
    <>
      {showModal &&
        createPortal(
          <ModalContent
            onClose={() => setShowModal(false)}
            isEditable={isEditable}
            handleModalEntry={handleModalEntry}
            onAccept={() => setModalStatus(leftButtonTitle)}
            title={title}
            leftButtonTitle={leftButtonTitle}
            rightButtonTitle={rightButtonTitle}
          />,
          domNode,
        )}
    </>
  );
};

export default GeneralModal;
