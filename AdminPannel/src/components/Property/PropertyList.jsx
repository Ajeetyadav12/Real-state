import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import UpdatePropertyModal from "./UpdateProperty"; // ⬅️ नया modal component

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get(
        "http://localhost:6001/property/getAllProperty"
      );
      if (response.data.success) {
        setProperties(response.data.properties);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?"))
      return;
    try {
      const response = await axios.delete(
        `http://localhost:6001/property/deleteProperty/${id}`
      );
      if (response.data.success) {
        setProperties(properties.filter((prop) => prop.id !== id));
        alert("Property deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting property:", error);
      alert("Failed to delete property");
    }
  };

  const handleEditClick = (property) => {
    setSelectedProperty(property);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setSelectedProperty(null);
    setShowEditModal(false);
  };

  const handleUpdateSuccess = () => {
    fetchProperties();
    handleCloseModal();
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">All Properties</h2>
      <div className="row">
        {properties.map((property) => (
          <div className="col-md-4" key={property.id}>
            <PropertyCard
              property={property}
              onDelete={handleDelete}
              onEdit={handleEditClick}
            />
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {selectedProperty && (
        <UpdatePropertyModal
          show={showEditModal}
          handleClose={handleCloseModal}
          property={selectedProperty}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}
    </div>
  );
};

const PropertyCard = ({ property, onDelete, onEdit }) => {
  return (
    <div className="card property-card mb-4 shadow-sm">
      {property.imageUrls ? (
        <img
          src={property.imageUrls}
          className="card-img-top"
          alt={property.title}
          style={{ height: "200px", objectFit: "cover" }}
        />
      ) : (
        <div
          className="card-img-top bg-secondary text-white d-flex align-items-center justify-content-center"
          style={{ height: "200px" }}
        >
          No Image
        </div>
      )}

      <div className="card-body">
        <h5 className="card-title">{property.title}</h5>
        <p className="card-text">
          <strong>Price:</strong> ₹{property.price} <br />
          <strong>Location:</strong> {property.location} <br />
          <strong>Type:</strong> {property.Type} <br />
          <strong>Rooms:</strong> {property.rooms} | <strong>Washrooms:</strong>{" "}
          {property.Washrooms} <br />
          <strong>Size:</strong> {property.size} sqft
        </p>
        {property.discription && (
          <p className="text-muted small">{property.discription}</p>
        )}
        <div className="d-flex justify-content-between">
          <Button
            variant="danger"
            size="sm"
            onClick={() => onDelete(property.id)}
          >
            Delete
          </Button>
          <Button variant="primary" size="sm" onClick={() => onEdit(property)}>
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyList;
