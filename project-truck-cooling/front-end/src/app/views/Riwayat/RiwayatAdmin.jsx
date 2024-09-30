import React, { useState,useEffect } from "react";
import { Box, TextField, Button, Stack, Typography, MenuItem, useTheme } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Autocomplete from '@mui/material/Autocomplete';
import SimpleCard from "app/components/SimpleCard";
import { styled } from "@mui/material/styles";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import truckIcon from "./truck.png";
import storageIcon from "./storage.png";
import markerIcon from "./marker.png";
import ChartSuhu from "../charts/echarts/ChartSuhu";
import ChartStatus from "../charts/echarts/ChartStatus";

// Styled components
const H4 = styled("h4")(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: "500",
  marginBottom: "35px",
  textTransform: "capitalize",
  color: theme.palette.text.secondary
}));

const customStorageIcon = L.icon({
  iconUrl: storageIcon,
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38]
});

const customTruckIcon = L.icon({
  iconUrl: truckIcon,
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38]
});

const customMarkerIcon = L.icon({
  iconUrl: markerIcon,
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38]
});

const Container = styled("div")(({ theme }) => ({
  margin: "30px"
}));

const ContainerMap = styled(Box)(({ theme, isSidebarOpen }) => ({
  border: '2px solid #2196F3',
  borderRadius: '8px',
  padding: '18px',
  height: '400px',
  backgroundColor: '#f0f8ff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  display: isSidebarOpen ? 'none' : 'flex', // Hide map when sidebar is open
  [theme.breakpoints.down('sm')]: {
    height: '250px', // Adjust the height for smaller screens
  }
}));

const pinpoint = {
  latitude: [-6.934268, -6.984268, -6.634268],
  longitude: [107.5729931, 107.6729231, 107.5769931],
  pinpointType: ["storage", "truck", "marker"],
  detailUrl: ["https://polban.ac.id/", "https://polban.ac.id/", "https://polban.ac.id/"],
  client: ["PT Hangcun", "PT Hangcun", "PT Hangcun"],
  time: ["04 Sep 2024 09:45:15", "04 Sep 2024 09:45:15", "04 Sep 2024 09:45:15"],
  temperature: ["-15 C", "-5 C", "-2 C"],
  item: ["Daging Sapi Segar", "Daging Ayam Segar", "Ikan Segar"],
  storage: ["90 / 200 kg", "10 / 20 kg", "17 / 20 kg"]
};

export default function RiwayatAdmin() {
  const theme = useTheme();
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [equipments, setEquipments] = useState([]);
  const [selectedEquipments, setSelectedEquipments] = useState(null);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [interval, setInterval] = useState("");
  const [result, setResult] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false); // Add state to track sidebar visibility

  useEffect(() => {
    fetch('http://localhost:5000/clients')
      .then((response) => response.json())
      .then((data) => {
        setClients(data);
      })
      .catch((error) => {
        console.error("Error", error);
      });

  },[]); //Get data klien

  console.log(selectedClient)

  let id_sewa = selectedClient === null ? 1 : selectedClient.id;
  let fetch_sewa = `http://localhost:5000/sewa/${id_sewa}`
  console.log(fetch_sewa)

  useEffect(() => {
    fetch(fetch_sewa)
      .then((response) => response.json())
      .then((dataalat) => {
        setEquipments(dataalat);
        console.log(dataalat)
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }); //Get data alat

  console.log(selectedClient)
  const handleSubmit = () => {
    setResult({
      client: selectedClient ? selectedClient.label : null,
      equipment: selectedEquipments ? selectedEquipments.nama_alat: null,
      date,
      startTime,
      endTime,
      interval
    });
  };

  const isFormValid = () => {
    return selectedClient && selectedEquipments && date && startTime && endTime && interval;
  };

  return (
    <Container>
      <H4>Riwayat</H4>
      <Stack spacing={3}>
        {/* Form */}
        <Stack direction="row" spacing={3}>
          {/* Client */}
          <Autocomplete
            options={clients}
            getOptionLabel={(option) => option.label}
            onChange={(event, newValue) => {setSelectedClient(newValue) 
                                            setSelectedEquipments(newValue)}
                                          }
                                            
            renderInput={(params) => <TextField {...params} label="Klien" />}
            sx={{ width: 300 }}
          />

          {/* Equipment */}
          <Autocomplete
            options={equipments}
            getOptionLabel={(option) => option.nama_alat }
            onChange={(event, newValue) => setSelectedEquipments(newValue)}
            renderInput={(params) => <TextField {...params} label="Alat" />}
            sx={{ width: 300 }}
          />
        </Stack>

        {/* Date and Time */}
        <Stack direction="row" spacing={3}>
          <TextField
            label="Tanggal"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{
              shrink: true
            }}
            sx={{ width: 300 }}
          />
          <TextField
            label="Jam Mulai"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            InputLabelProps={{
              shrink: true
            }}
            sx={{ width: 300 }}
          />
          <TextField
            label="Jam Selesai"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            InputLabelProps={{
              shrink: true
            }}
            sx={{ width: 300 }}
          />
        </Stack>

        {/* Interval */}
        <TextField
          select
          label="Interval"
          value={interval}
          onChange={(e) => setInterval(e.target.value)}
          variant="outlined"
          fullWidth
        >
          <MenuItem value="5">5 Menit</MenuItem>
          <MenuItem value="10">10 Menit</MenuItem>
        </TextField>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!isFormValid()}
        >
          Tampilkan
        </Button>

        {/* Display Result */}
        {result && (
          <Typography variant="h6" mt={2}>
            Visualisasi Riwayat:
            <br />
            Klien: {result.client}
            <br />
            Alat: {result.equipment}
            <br />
            Waktu: {new Date(result.date).toLocaleDateString()} Pukul {result.startTime} - {result.endTime}
            <br />
            Interval Data: {result.interval} Menit
          </Typography>
        )}
      </Stack>
      <H4>Visualisasi Riwayat Perjalanan</H4>
      {/* Conditionally Render Map Component */}
      {!isSidebarOpen && (
        <ContainerMap>
          <MapContainer center={[-6.9175, 107.6191]} zoom={11} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {pinpoint.latitude.map((lat, index) => {
              let icon;

              // Cek tipe pinpoint
              if (pinpoint.pinpointType[index] === "storage") {
                icon = customStorageIcon;
              } else if (pinpoint.pinpointType[index] === "truck") {
                icon = customTruckIcon;
              } else if (pinpoint.pinpointType[index] === "marker" || pinpoint.pinpointType[index] === "tujuan") {
                icon = customMarkerIcon;
              }
              return (
                <Marker key={index} icon={icon} position={[lat, pinpoint.longitude[index]]}>
                  <Popup>
                    <strong>{pinpoint.client[index]}</strong><br />
                    Type: {pinpoint.pinpointType[index]}<br />
                    Item: {pinpoint.item[index]}<br />
                    Temperature: {pinpoint.temperature[index]}<br />
                    Storage: {pinpoint.storage[index]}<br />
                    Time: {pinpoint.time[index]}<br />
                    <a href={pinpoint.detailUrl[index]} target="_blank" rel="noopener noreferrer">
                      Detail
                    </a>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </ContainerMap>
      )}
      <H4>Visualisasi Riwayat Temperatur</H4>
      <SimpleCard title="Suhu *c">
        <ChartSuhu
          height="350px"
          color={[theme.palette.primary.main, theme.palette.primary.light]}
        />
      </SimpleCard>
      <H4>Visualisasi Riwayat Status Alat</H4>
      <SimpleCard title="Status Alat">
        <ChartStatus
          height="350px"
          color={[theme.palette.primary.main, theme.palette.primary.light]}
        />
      </SimpleCard>
    </Container>
  );
}
