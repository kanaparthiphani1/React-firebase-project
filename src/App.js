import logo from './logo.svg';
import './App.css';
import "./firebase/config"
import Header from './pages/Header';
import {Routes,Route} from "react-router-dom"
import Signup from "./pages/Signup";
import { ToastContainer } from 'react-toastify';
import Profile from './pages/Profile';
import { UserProvider } from './Context/UserContext';
import Login from './pages/Login';
import ProfileRedirect from './Router/ProfileRedirect';
import AuthRouter from './Router/AuthRouter';

function App() {
  return (
    <UserProvider>
    <div className="App">
      <Header />
      <Routes>
        <Route path="/signup" element={<ProfileRedirect Component={Signup}/>} />
        <Route path="/login" element={<ProfileRedirect Component={Login}/>} />

        <Route path="/profile/:id" element={<AuthRouter Component={Profile}/>} />

      </Routes>
      <ToastContainer />
    </div>
    </UserProvider>
  );
}

export default App;
