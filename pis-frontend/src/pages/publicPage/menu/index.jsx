import React, { useEffect } from 'react';
import Button from "react-bootstrap/Button";

const MenuPage = () => {
  useEffect(() => {
    document.title = 'Menu Page';
  }, []);

  return (
    <>
      <h1>This is a Menu page.</h1>
      <Button variant="primary">Ok</Button>
    </>
  );
};

export default MenuPage;
