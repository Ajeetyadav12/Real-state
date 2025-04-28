import { useState } from "react";

import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import PropertyShowcase from "./Pages/PropertyShowCase";
import InquirySection from "./Pages/InquirySection";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar></Navbar>
      <Home></Home>
      <PropertyShowcase></PropertyShowcase>
      <InquirySection></InquirySection>
    </>
  );
}

export default App;
