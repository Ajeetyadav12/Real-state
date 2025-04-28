import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const UpdatePropertyModal = ({
  show,
  handleClose,
  property,
  onUpdateSuccess,
}) => {
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

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (property) {
      setFormData({
        title: property.title,
        price: property.price,
        location: property.location,
        discription: property.discription,
        Type: property.Type,
        size: property.size,
        rooms: property.rooms,
        Washrooms: property.Washrooms,
        imageUrls: null,
      });
      setPreview(property.imageUrls);
    }
  }, [property]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageUrls") {
      const file = files[0];
      setFormData({ ...formData, imageUrls: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        if (val) data.append(key, val);
      });

      await axios.put(
        `http://localhost:6001/property/updateProperty/${property.id}`,
        data
      );
      alert("Property updated successfully!");
      onUpdateSuccess();
    } catch (error) {
      console.error("Error updating property:", error);
      alert("Failed to update property.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Modal.Header closeButton>
          <Modal.Title>Edit Property</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-2">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="discription"
              value={formData.discription}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Updated Type field as dropdown */}
          <Form.Group className="mb-2">
            <Form.Label>Type</Form.Label>
            <Form.Select
              name="Type"
              value={formData.Type}
              onChange={handleChange}
              required
            >
              <option value="">Select Property Type</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Size</Form.Label>
            <Form.Control
              type="text"
              name="size"
              value={formData.size}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Rooms</Form.Label>
            <Form.Control
              type="number"
              name="rooms"
              value={formData.rooms}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Washrooms</Form.Label>
            <Form.Control
              type="number"
              name="Washrooms"
              value={formData.Washrooms}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              name="imageUrls"
              onChange={handleChange}
            />
          </Form.Group>
          {preview && (
            <div className="mb-2">
              <img src={preview} alt="Preview" style={{ maxWidth: "100%" }} />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="success">
            Update
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdatePropertyModal;
