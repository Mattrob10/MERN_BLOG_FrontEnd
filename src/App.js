import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import Auth from "./components/Auth.js";
import Profile from "./components/Profile.js";
import Public from "./components/Public.js";
import ProtectedRoute from "./components/ProtectedRoute.js";
import { UserContext } from "./context/UserProvider.js";
import Footer from "./components/Footer.js"
export default function App() {
  const { token, logout} = useContext(UserContext);

  return (
    <div className='app'>
        <Navbar logout={logout} token={token}/>

     {/* <Route path = "/" element = {token ? <Navigate replace to = "/profile" /> : <Public />} */}

      <Routes>
        {token && <Route path="/" element={<Profile />} />}
        {!token && <Route path="/" element={<Navigate to="/public"/>}/>}

        { !token && <Route path="/auth" element={<Auth/>}/>}
        { token && <Route path="/auth" element={<Navigate to="/" />} />}

        <Route path="/"
          element={
            <ProtectedRoute token={token} redirectTo="/public">
              <Profile/>
            </ProtectedRoute>
          }/>
        <Route path="/public" element={<Public/>}/>
      </Routes>
      <Footer />
    </div>
  );
}

