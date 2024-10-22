import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import PinpointFilter from './PinpointFilter';
import storageIcon from "../assets/storage-icon.ico";
import truckIcon from "../assets/truck-icon.ico";

const Pinpoint = () => {
  const [pinpointData, setPinpointData] = useState([]);
  const mapRef = useRef(null);
  const [filters, setFilters] = useState({
    client: "",
    minTemperature: "",
    maxTemperature: "",
  });

  // Fetch data from the Express API
  useEffect(() => {
    const fetchPinpoints = async () => {
      try {
        const response = await fetch('https://monitoring-teltonika-be.vercel.app/api/dashboardPinpoints');
        const data = await response.json();
        setPinpointData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchPinpoints();
  }, []);

  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters);
  };

  const filterData = {
    client: Array.from(new Set(pinpointData.map((pin) => pin.client))),
    temperature: Array.from(new Set(pinpointData.map((pin) => parseFloat(pin.temperature)))),
  };

  const filteredData = pinpointData.filter((pin) => {
    const clientMatch = filters.client === "" || filters.client === pin.client;

    const temperatureValue = parseFloat(pin.temperature);
    const minTemperature = filters.minTemperature === "" ? -Infinity : parseFloat(filters.minTemperature);
    const maxTemperature = filters.maxTemperature === "" ? Infinity : parseFloat(filters.maxTemperature);
    const temperatureMatch = temperatureValue >= minTemperature && temperatureValue <= maxTemperature;

    return clientMatch && temperatureMatch;
  });

  return (
    <div>
      <PinpointFilter filterData={filterData} onFilterChange={handleFilterChange} />
      <MapContainer
        center={pinpointData.length > 0 
          ? [pinpointData[0].latitude, pinpointData[0].longitude] 
          : [-6.934268, 107.5729931]  }
        zoom={13}
        ref={mapRef}
        style={{ height: "80vh", width: "80vw" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filteredData.map((pin, index) => (
          <Marker
            key={index}
            position={[pin.latitude, pin.longitude]}
            icon={getIcon('truck')}
          >
            <Popup>
              <strong>{getTitle(pin.pinpoint_type)}</strong> <br />
              Client: {pin.client} <br /><br />
              Waktu: {new Date(pin.time).toLocaleString()} <br />
              Lokasi: {pin.latitude}, {pin.longitude} <br />
              Suhu: {pin.temperature} <br />
              Barang: {pin.item} <a href={pin.detail_url} target="_blank">(Lihat Detail)</a><br />
              Storage: {pin.storage}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

const getIcon = (pinpointType) => {
  let iconUrl;
  switch (pinpointType) {
    case "truck":
      iconUrl = truckIcon;
      break;
    case "storage":
      iconUrl = storageIcon;
      break;
    default:
      iconUrl = truckIcon;
  }

  return L.icon({
    iconUrl,
    iconSize: [30, 35],
    iconAnchor: [12, 41],
  });
};

const getTitle = (pinpointType) => {
  switch (pinpointType) {
    case "truck":
      return "Nama Truck Cooling";
    case "storage":
      return "Nama Cool Storage";
    default:
      return "";
  }
};

export default Pinpoint;
