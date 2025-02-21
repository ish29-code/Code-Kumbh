import React, { useState, useEffect } from "react";
import { GoogleMap, Polygon, useJsApiLoader } from "@react-google-maps/api";
import axios from "axios";
import "./SafeRoutesMap.css";

const SafeRoutesMap = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBIBtQ9KaoiOqo5UzKL6TlhtWl2e7k_FsE",
  });

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [regions, setRegions] = useState([]);  // Stores red, green, yellow areas
  const [errorMessage, setErrorMessage] = useState("");

  const fetchSafeRegions = async () => {
    if (!start || !end) {
      setErrorMessage("Please enter both start and end locations.");
      return;
    }

    try {
      setErrorMessage(""); // Clear previous errors
      const response = await axios.get(`http://localhost:5000/api/regions?start=${start}&end=${end}`);
      setRegions(response.data.regions);  // Expecting polygon coordinates from backend
    } catch (error) {
      console.error("Error fetching route regions:", error);
      setErrorMessage("Failed to fetch safe regions. Please try again.");
    }
  };

  return (
    <div className="map-container">
      {/* Search Bar */}
      <div className="search-box">
        <input type="text" placeholder="Start Location" value={start} onChange={(e) => setStart(e.target.value)} />
        <input type="text" placeholder="End Location" value={end} onChange={(e) => setEnd(e.target.value)} />
        <button onClick={fetchSafeRegions}>Find Safe Zones</button>
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {/* Google Map */}
      {isLoaded && (
        <GoogleMap center={{ lat: 23.16, lng: 79.93 }} zoom={10} mapContainerStyle={{ width: "100%", height: "90vh" }}>
          {regions.map((region, index) => (
            <Polygon
              key={index}
              paths={region.coordinates}
              options={{
                fillColor:
                  region.safety === "safe" ? "green" : region.safety === "moderate" ? "yellow" : "red",
                fillOpacity: 0.3,
                strokeColor: "#000",
                strokeWeight: 1,
              }}
            />
          ))}
        </GoogleMap>
      )}

      {/* Safety Legend */}
      <div className="legend">
        <p><span className="green-box"></span> Safe Zone</p>
        <p><span className="yellow-box"></span> Moderate Zone</p>
        <p><span className="red-box"></span> Unsafe Zone</p>
      </div>
    </div>
  );
};

export default SafeRoutesMap;



