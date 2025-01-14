import React, { useEffect, useState } from 'react';

const useMedia = (media) => {
  const [match, setMatch] = useState(false);

  useEffect(() => {
    function changeMatch() {
      const { matches } = window.matchMedia(media);
      console.log(matches);

      setMatch(matches);
    }
    window.addEventListener('resize', changeMatch);
    return () => {
      window.removeEventListener('resize', changeMatch);
    };
  }, []);
  return match;
};

export default useMedia;
