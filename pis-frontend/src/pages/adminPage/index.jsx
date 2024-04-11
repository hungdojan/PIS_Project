import { useEffect } from 'react';

// TODO:
const AdminPage = () => {
  useEffect(() => {
    document.title = 'Admin page';
  }, []);

  return (
    <>
      <h1>This is the admin page</h1>
    </>
  );
};

export default AdminPage;
