import React, { useEffect, useState } from "react";
import "./Home.css";

const Home = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    location: "",
    maxPrice: "",
    type: "",
    bedrooms: "",
  });

  const fetchProperties = () => {
    const queryParams = new URLSearchParams();

    if (filters.location) queryParams.append("location", filters.location);
    if (filters.maxPrice) queryParams.append("maxPrice", filters.maxPrice);
    if (filters.type) queryParams.append("type", filters.type);
    if (filters.bedrooms) queryParams.append("bedrooms", filters.bedrooms);

    fetch(`http://localhost:6001/property/getAllProperty?${queryParams}`)
      .then((res) => res.json())
      .then((result) => setData(result.properties || []))
      .catch((error) => console.log("Error:", error));
  };

  useEffect(() => {
    fetchProperties();
  }, [filters]); // 🔁 Auto-fetch on filter change

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setFilters({
      location: "",
      maxPrice: "",
      type: "",
      bedrooms: "",
    });
  };

  return (
    <>
      <section className="hero-section">
        <div className="overlay"></div>
        <div className="container hero-content">
          <h1 className="fw-bold">YOUR DREAM HOME</h1>
          <p className="fs-5">IS ONE CLICK AWAY</p>

          <div className="search-box shadow p-3">
            <div className="row g-2">
              <div className="col-md-3">
                <select
                  className="form-select"
                  name="type"
                  value={filters.type}
                  onChange={handleChange}
                >
                  <option value="">Property Type</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                </select>
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  name="location"
                  value={filters.location}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Location"
                />
              </div>
              <div className="col-md-3">
                <select
                  name="bedrooms"
                  value={filters.bedrooms}
                  className="form-select"
                  onChange={handleChange}
                >
                  <option value="">Bedrooms</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4+</option>
                </select>
              </div>
              <div className="col-md-3 d-flex">
                <input
                  type="number"
                  name="maxPrice"
                  value={filters.maxPrice}
                  className="form-control me-2"
                  placeholder="Max Price"
                  onChange={handleChange}
                />
                <button
                  className="btn btn-secondary me-2"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property List */}
      <section className="property-list-section py-5">
        <div className="container">
          <h2 className="mb-4">Available Properties</h2>
          <div className="row">
            {data.length === 0 ? (
              <p>No properties found.</p>
            ) : (
              data.map((property) => (
                <div className="col-md-4 mb-4" key={property.id}>
                  <div className="card h-100 shadow-sm">
                    <img
                      src={
                        property.imageUrls ||
                        "https://via.placeholder.com/400x200"
                      }
                      alt={property.title}
                      className="card-img-top"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{property.title}</h5>
                      <p className="card-text">{property.discription}</p>
                      <p className="fw-bold">
                        ₹ {Number(property.price).toLocaleString("en-IN")}
                      </p>
                      <p className="text-muted">{property.location}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
