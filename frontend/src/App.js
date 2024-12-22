import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import NavBar from './Components/Navigation/NavBar';
import HomePage from './Components/Home/HomePage';
import RegistrationPage from './Components/Registration/RegistrationPage';
import LoginPage from './Components/Login/LoginPage';
import ProfilePage from './Components/Profile/ProfilePage';
import ProtectedRoutes from './Components/Navigation/ProtectedRoutes';
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
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

      </Routes>
    </Router>

  );
}

export default App;
