import { useEffect } from 'react';

const ManagerPage = () => {
  useEffect(() => {
    document.title = 'Manager page';
  }, []);

  return (
    <>
      <h1>This is the manager page</h1>
    </>
  );
};

export default ManagerPage;
