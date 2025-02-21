/*import React, { useState, useEffect } from "react";
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
      {/* Search Bar *//*}
      <div className="search-box">
        <input type="text" placeholder="Start Location" value={start} onChange={(e) => setStart(e.target.value)} />
        <input type="text" placeholder="End Location" value={end} onChange={(e) => setEnd(e.target.value)} />
        <button onClick={fetchSafeRegions}>Find Safe Zones</button>
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {/* Google Map *//*}
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

      {/* Safety Legend *//*}
      <div className="legend">
        <p><span className="green-box"></span> Safe Zone</p>
        <p><span className="yellow-box"></span> Moderate Zone</p>
        <p><span className="red-box"></span> Unsafe Zone</p>
      </div>
    </div>
  );
};

export default SafeRoutesMap;*/

import React, { useState } from "react";
import { GoogleMap, Polygon, useJsApiLoader } from "@react-google-maps/api";
import "./SafeRoutesMap.css";

const SafeRoutesMap = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBIBtQ9KaoiOqo5UzKL6TlhtWl2e7k_FsE",
  });

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Predefined zones
  const zones = [
    {
      name: "Safe Zone",
      safety: "safe",
      coordinates: [
        { lat: 23.18, lng: 79.90 },
        { lat: 23.22, lng: 79.92 },
        { lat: 23.19, lng: 79.95 },
        { lat: 23.17, lng: 79.93 },
      ],
      color: "green",
    },
    {
      name: "Moderate Zone",
      safety: "moderate",
      coordinates: [
        { lat: 23.14, lng: 79.89 },
        { lat: 23.16, lng: 79.91 },
        { lat: 23.15, lng: 79.94 },
        { lat: 23.12, lng: 79.92 },
      ],
      color: "yellow",
    },
    {
      name: "Unsafe Zone",
      safety: "unsafe",
      coordinates: [
        { lat: 23.10, lng: 79.87 },
        { lat: 23.13, lng: 79.89 },
        { lat: 23.11, lng: 79.92 },
        { lat: 23.09, lng: 79.90 },
      ],
      color: "red",
    },
  ];

  const handleSearch = () => {
    if (!start || !end) {
      setErrorMessage("Please enter both start and end locations.");
      return;
    }
    setErrorMessage(""); // Clear error if input is valid
  };

  return (
    <div className="map-container">
      {/* Search Bar */}
      <div className="search-box">
        <input 
          type="text" 
          placeholder="Start Location" 
          value={start} 
          onChange={(e) => setStart(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="End Location" 
          value={end} 
          onChange={(e) => setEnd(e.target.value)} 
        />
        <button onClick={handleSearch}>Find Safe Zones</button>
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {/* Google Map */}
      {isLoaded && (
        <GoogleMap
          center={{ lat: 23.16, lng: 79.93 }}
          zoom={12}
          mapContainerStyle={{ width: "100%", height: "90vh" }}
        >
          {zones.map((zone, index) => (
            <Polygon
              key={index}
              paths={zone.coordinates}
              options={{
                fillColor: zone.color,
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
