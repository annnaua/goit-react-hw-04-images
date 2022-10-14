import { useState, useEffect } from 'react';

import { Toaster, toast } from 'react-hot-toast';
import { fetchImage } from './services/fetchImage';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    const imageGalleryRequest = async () => {
      try {
        setIsLoading(true);
        const { hits, totalHits } = await fetchImage(query, page);
        setTotalHits(totalHits);

        if (hits.length === 0) {
          setImages([]);
          setTotalHits([0]);
          toast.error(`Sorry, failed to load your search: ${query}.`);
          return;
        }

        page === 1
          ? setImages(hits)
          : setImages(prevImages => [...prevImages, ...hits]);
      } catch (error) {
        toast.error(`Sorry, something went wrong. Try later`);
      } finally {
        setIsLoading(false);
      }
    };

    imageGalleryRequest();
  }, [query, page]);

  const handleFormSubmit = data => {
    setQuery(data);
    setPage(1);
  };

  const getNextPage = () => {
    setPage(page => page + 1);
  };

  return (
    <>
      <Searchbar onQuerySubmit={handleFormSubmit} />
      {isLoading && <Loader />}

      {images && <ImageGallery images={images} />}

      {!isLoading && images && images.length < totalHits && (
        <Button getMoreImage={getNextPage} />
      )}

      <Toaster position="top-right" />
    </>
  );
};
