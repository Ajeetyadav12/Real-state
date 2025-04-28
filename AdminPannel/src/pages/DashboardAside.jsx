import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Routes, Route, Link } from "react-router-dom";
import "./DashboardAside.css"; // सही spelling
import AddProperty from "../components/Property/AddProperty";
import PropertyList from "../components/Property/PropertyList";
const DashboardAside = () => {
  const { user, setUser } = useContext(UserContext);
  console.log(user);
  return (
    <>
      <div className="wrapper">
        <div className="sidebar">
          <ul className="nav">
            <li>
              <Link to="/dashboard/PropertyList">PropertyList</Link>
            </li>
            <hr></hr>
            <li>
              <Link to="/dashboard/AddProperty">AddProperty</Link>
            </li>
          </ul>
        </div>

        <div className="main-content">
          <Routes>
            <Route path="/PropertyList" element={<PropertyList />} />
            <Route path="/AddProperty" element={<AddProperty />} />

            <Route
              path="/"
              element={<div>Select a link from the sidebar</div>}
            />
            <Route path="showProducts" element={<propertyList />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default DashboardAside;
