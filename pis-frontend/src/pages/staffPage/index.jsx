import { useEffect } from 'react';
import './StaffPage.css';

const StaffPage = () => {
  const role = localStorage.getItem('role');

  useEffect(() => {
    document.title = 'Staff page';
  }, []);

  return (
    <>
      <h1>This is the staff page</h1>
      <h3>{role}</h3>
    </>
  );
};

export default StaffPage;
