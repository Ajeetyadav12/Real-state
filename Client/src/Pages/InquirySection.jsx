import React from "react";
import "./InquirySection.css";

const InquirySection = () => {
  return (
    <div className="inquiry-section">
      {/* Left Content */}
      <div className="left-content">
        <h2>Why Our Service Is The Perfect Choice?</h2>
        <hr className="underline" />
        <div className="points">
          <div className="point">
            <h4>
              01. <span>Lorem Ipsum</span>
            </h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam
              nonummy nibh euismod.
            </p>
          </div>
          <div className="point">
            <h4>
              02. <span>Lorem Ipsum</span>
            </h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam
              nonummy nibh euismod.
            </p>
          </div>
          <div className="point">
            <h4>
              03. <span>Lorem Ipsum</span>
            </h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam
              nonummy nibh euismod.
            </p>
          </div>
        </div>
      </div>

      {/* Right Form */}
      <div className="right-form">
        <form className="form-card">
          <h5>Real Estate Inquiry Form</h5>

          <label>Inquiry Type</label>
          <select>
            <option>Renting Property</option>
            <option>Buying Property</option>
            <option>General Inquiry</option>
          </select>

          <label>Name</label>
          <input type="text" placeholder="John Doe" />

          <label>Email</label>
          <input type="email" placeholder="example@domain.com" />

          <label>Phone (Optional)</label>
          <input type="tel" placeholder="+1 (123) 456-0509" />

          <label>Message</label>
          <textarea rows="3" placeholder="Please Enter Your Message"></textarea>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default InquirySection;
