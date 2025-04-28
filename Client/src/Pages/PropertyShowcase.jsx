import React from "react";
import "./PropertyShowcase.css";
import img from "../assets/leftimg.jpeg";

const PropertyShowcase = () => {
  return (
    <div className="property-container">
      {/* Left Large Image */}
      <div className="left-image">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
          alt="Main Property"
        />
      </div>

      {/* Right Content Section */}
      <div className="right-content">
        {/* Top Row: Image + Text */}
        <div className="top-row">
          <div className="small-img">
            <img src={img} alt="Stair" />
          </div>
          <div className="text-content">
            <h4>Wide Selection Of Properties</h4>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard.
            </p>
            <div className="blue-line"></div>
          </div>
        </div>

        {/* Bottom Row: Two Columns of Images */}
        <div className="bottom-row">
          <div className="bottom-left">
            <img src={img} alt="Bathroom" />
          </div>
          <div className="bottom-right">
            <img src={img} alt="Hallway 1" />
            <img src={img} alt="Hallway 2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyShowcase;
