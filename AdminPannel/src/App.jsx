// App.jsx या main.jsx में ऐसा कुछ होना चाहिए:

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { UserProvider } from "./context/UserContext";
import DashboardAside from "./pages/DashboardAside";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route
            path="/dashboard/*"
            element={<DashboardAside></DashboardAside>}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
