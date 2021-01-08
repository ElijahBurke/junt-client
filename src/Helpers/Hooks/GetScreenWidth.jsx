import { useState, useEffect } from 'react';

const GetScreenWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const setWidthOnChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', setWidthOnChange);
    return () => { window.removeEventListener('resize', setWidthOnChange); };
  }, []);

  return width;
};

export default GetScreenWidth;
