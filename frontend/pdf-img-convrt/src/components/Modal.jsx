import { useState } from "react";
import { createPortal } from "react-dom";
import ModalContent from "./ModalContent";
import { findDOMNode } from "react-dom";

const GeneralModal = ({
  showModal,
  onCancel,
  onAccept,
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
            onClose={() => onCancel(false)}
            isEditable={isEditable}
            handleModalEntry={handleModalEntry}
            onAccept={() => onAccept()}
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
