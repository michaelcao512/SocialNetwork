import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ProtectedRoutes from './Components/Navigation/ProtectedRoutes';

import RegistrationPage from './Pages/RegistrationPage';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import ProfilePage from './Pages/ProfilePage';
import AllPostsPage from './Pages/AllPostsPage';
import AllUsersPage from './Pages/AllUsersPage';

import authService from './Services/auth.service';

function App() {
  const user = authService
  return (

    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/register" element={<RegistrationPage/>} />
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/profile/:profileUserId" element={<ProfilePage />} />
          <Route path="/allposts" element={<AllPostsPage />} />
          <Route path="/allusers" element={<AllUsersPage />} />
        </Route>

      </Routes>
    </Router>

  );
}

export default App;
