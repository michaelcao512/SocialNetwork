import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UnprotectedRoutes from './Components/Navigation/UnprotectedRoutes';
import ProtectedRoutes from './Components/Navigation/ProtectedRoutes';

import theme from './StyledComponents/Theme';

import RegistrationPage from './Pages/RegistrationPage';
// import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import ProfilePage from './Pages/ProfilePage';
import AllPostsPage from './Pages/AllPostsPage';
import AllUsersPage from './Pages/AllUsersPage';

import { ThemeProvider } from '@emotion/react';

import { Navigate } from 'react-router-dom';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          {/* Unprotected Routes */}
          <Route element={<UnprotectedRoutes />}>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<ProtectedRoutes />}>
            <Route path="*" element={<Navigate to={`/`} />} />
            
              <Route path="/allposts" element={<AllPostsPage />} />
              <Route path="/allusers" element={<AllUsersPage />} />
              <Route path="/profile/:profileUserId" element={<ProfilePage />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;