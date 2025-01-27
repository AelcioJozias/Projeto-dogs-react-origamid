import React, { useEffect, useState } from 'react';
import FeedModal from './FeedModal';
import FeedPhotos from './FeedPhotos';

const Feed = ({ user }) => {
  const [modalPhoto, setModalPhoto] = useState(null);
  const [pages, setPages] = useState([1]);
  const [isToContinueFetchImages, setIsToContinueFetchImages] = useState(true);

  useEffect(() => {
    function disableScroll() {
      if (modalPhoto) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    }
    disableScroll();
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [modalPhoto]);

  // all this code on useEffect is to make the infinte scroll
  useEffect(() => {
    let cantMakeRequest = false;

    function scheduleNextRequest() {
      cantMakeRequest = true;
      setTimeout(() => {
        cantMakeRequest = false;
      }, 500);
    }

    function isScrollNearBottom() {
      const scroll = window.scrollY;
      const height = document.body.offsetHeight - window.innerHeight;
      return scroll > height * 0.75;
    }

    function infiniteScroll() {
      if (isToContinueFetchImages) {
        if (isScrollNearBottom() && !cantMakeRequest) {
          setPages((pages) => [...pages, pages.length + 1]);
          scheduleNextRequest();
        }
      }
    }

    window.addEventListener('wheel', infiniteScroll);
    window.addEventListener('scroll', infiniteScroll);
    return () => {
      window.removeEventListener('wheel', infiniteScroll);
      window.removeEventListener('scroll', infiniteScroll);
    };
  }, [isToContinueFetchImages]);

  return (
    <div>
      {modalPhoto && (
        <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto} />
      )}
      {pages.map((page) => (
        <FeedPhotos
          setIsToContinueFetchImages={setIsToContinueFetchImages}
          key={page}
          user={user}
          page={page}
          setModalPhoto={setModalPhoto}
        />
      ))}
    </div>
  );
};

export default Feed;
