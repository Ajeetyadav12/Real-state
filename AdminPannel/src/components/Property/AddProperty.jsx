import React, { useState } from "react";
import axios from "axios";

const AddProperty = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    location: "",
    discription: "",
    Type: "",
    size: "",
    rooms: "",
    Washrooms: "",
    imageUrls: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageUrls") {
      setFormData({ ...formData, imageUrls: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("price", formData.price);
      data.append("location", formData.location);
      data.append("discription", formData.discription);
      data.append("Type", formData.Type);
      data.append("size", formData.size);
      data.append("rooms", formData.rooms);
      data.append("Washrooms", formData.Washrooms);
      if (formData.imageUrls) {
        data.append("imageUrls", formData.imageUrls);
      }

      const response = await axios.post(
        "http://localhost:6001/property/addProperty",
        data
      );
      alert("Property added successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error adding property:", error);
      alert("Failed to add property.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Property</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label>Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Price</label>
          <input
            type="number"
            name="price"
            className="form-control"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Location</label>
          <input
            type="text"
            name="location"
            className="form-control"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <textarea
            name="discription"
            className="form-control"
            value={formData.discription}
            onChange={handleChange}
            required
          />
        </div>

        {/* ✅ Updated Type Field as Dropdown */}
        <div className="mb-3">
          <label>Type</label>
          <select
            name="Type"
            className="form-select"
            value={formData.Type}
            onChange={handleChange}
            required
          >
            <option value="">Select Property Type</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Size</label>
          <input
            type="text"
            name="size"
            className="form-control"
            value={formData.size}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Rooms</label>
          <input
            type="number"
            name="rooms"
            className="form-control"
            value={formData.rooms}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Washrooms</label>
          <input
            type="number"
            name="Washrooms"
            className="form-control"
            value={formData.Washrooms}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Image</label>
          <input
            type="file"
            name="imageUrls"
            className="form-control"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Property
        </button>
      </form>
    </div>
  );
};

export default AddProperty;
