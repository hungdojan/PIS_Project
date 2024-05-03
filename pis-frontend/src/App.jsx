import './App.css';

import AuthProvider from './router/AuthProvider';
import CustomRouter from './router';

const App = () => {
  return (
    <AuthProvider>
      <CustomRouter />
    </AuthProvider>
  );
};

export default App;
