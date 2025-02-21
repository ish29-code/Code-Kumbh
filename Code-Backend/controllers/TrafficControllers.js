import axios from "axios";

export const getMinimalTrafficRoute = async (req, res) => {
  const { start, end } = req.query;

  if (!start || !end) {
    return res.status(400).json({ message: "Start and End locations are required" });
  }

  try {
    const trafficURL = `https://maps.googleapis.com/maps/api/directions/json?origin=${start}&destination=${end}&departure_time=now&traffic_model=best_guess&key=${"AIzaSyBIBtQ9KaoiOqo5UzKL6TlhtWl2e7k_FsE"}`;
    const response = await axios.get(trafficURL);

    if (response.data.status !== "OK") {
      return res.status(500).json({ message: "Google Maps API Error", details: response.data });
    }

    res.json({ minimalTrafficRoute: response.data.routes[0] });
  } catch (error) {
    console.error("Error fetching traffic route:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
