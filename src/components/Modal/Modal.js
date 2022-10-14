import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { Overlay, ModalImage } from './Modal.styled';
const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ tags, largeImage, closeModal }) => {
  useEffect(() => {
    const handleEscapePress = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleEscapePress);

    return () => {
      window.removeEventListener('keydown', handleEscapePress);
    };
  }, [closeModal]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalImage>
        <img src={largeImage} alt={tags} />
      </ModalImage>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  tags: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
