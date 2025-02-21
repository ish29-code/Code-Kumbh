import axios from "axios";


export const getZonesOnRoute = async (req, res) => {
  const { start, end } = req.query;
  if (!start || !end) {
    return res.status(400).json({ message: "Start and End locations are required" });
  }

  try {
    // Fetch route data
    const mapsURL = `https://maps.googleapis.com/maps/api/directions/json?origin=${start}&destination=${end}&key=${"AIzaSyBIBtQ9KaoiOqo5UzKL6TlhtWl2e7k_FsE"}`;
    const response = await axios.get(mapsURL);

    if (response.data.status !== "OK") {
      return res.status(500).json({ message: "Google Maps API Error", details: response.data });
    }

    const steps = response.data.routes[0].legs[0].steps;
    let zones = [];

    for (let step of steps) {
      const lat = step.start_location.lat;
      const lng = step.start_location.lng;

      // Check transport & traffic density
      const placeData = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=bus_station|subway_station|train_station&key=${GOOGLE_MAPS_API_KEY}`
      );

      const trafficDensity = placeData.data.results.length;
      let zoneType = "Red"; // Default to Red Zone

      if (trafficDensity > 15) {
        zoneType = "Green";
      } else if (trafficDensity > 5) {
        zoneType = "Yellow";
      }

      zones.push({ lat, lng, zone: zoneType });
    }

    res.json({ zones });
  } catch (error) {
    console.error("Error fetching zones:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getMinimalTrafficRoute = async (req, res) => { };