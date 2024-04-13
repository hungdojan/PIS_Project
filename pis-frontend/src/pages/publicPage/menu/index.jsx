import React, { useEffect } from 'react';

const MenuPage = () => {
  useEffect(() => {
    document.title = 'Menu Page';
  }, []);

  return (
    <>
      <h1>This is a Menu page.</h1>
    </>
  );
};

export default MenuPage;
