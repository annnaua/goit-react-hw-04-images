import PropTypes from 'prop-types';
import { useState } from 'react';

import { Modal } from '../../Modal/Modal';
import { ImageItem, ImageGalleryImg } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ tags, smallImage, largeImage }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <ImageItem>
      <ImageGalleryImg src={smallImage} alt={tags} onClick={toggleModal} />

      {showModal && (
        <Modal largeImage={largeImage} tags={tags} closeModal={toggleModal} />
      )}
    </ImageItem>
  );
};

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
};
