import React, { useEffect, useState } from 'react';

const useMedia = (media) => {
  const [match, setMatch] = useState(false);

  useEffect(() => {
    function changeMatch() {
      const { matches } = window.matchMedia(media);
      setMatch(matches);
    }
    window.addEventListener('resize', changeMatch);
    changeMatch();

    return () => {
      window.removeEventListener('resize', changeMatch);
    };
  }, []);
  return match;
};

export default useMedia;
