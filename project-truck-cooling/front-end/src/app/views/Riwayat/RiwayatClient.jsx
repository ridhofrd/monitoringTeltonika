import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Stack, Typography, MenuItem, useTheme } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet"; // Import Polyline
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
  display: isSidebarOpen ? 'none' : 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]: {
    height: '250px',
  }
}));


export default function RiwayatAdmin() {
  const theme = useTheme();
  const [equipments, setEquipments] = useState([]);
  const [selectedEquipments, setSelectedEquipments] = useState(null);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [interval, setInterval] = useState("");
  const [result, setResult] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const [mapData, setMapData] = useState([]); // State untuk menyimpan data peta
  const [chartData, setChartData] = useState([]); // State untuk menyimpan data grafik

  useEffect(() => {
    fetch('http://localhost:5000/alatklien')
      .then((response) => response.json())
      .then((dataalat) => {
        setEquipments(dataalat);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }, []);

  const handleSubmit = () => {
    setResult({
      equipment: selectedEquipments ? selectedEquipments.label : "",
      date,
      startTime,
      endTime,
      interval
    });
  
    // Fetch data dynamically based on selected equipment's IMEI
    fetch(`http://localhost:5000/log_track/${selectedEquipments.id}`)
      .then((response) => response.json())
      .then((data) => {
        setMapData(data); // Update map data with the fetched points
      })
      .catch((error) => {
        console.error("Error fetching log data", error);
      });
  
    // Simulasi data untuk chart berdasarkan form input
    const fetchedChartData = [1, 0, 1, 1, 1, 0, 1];
    setChartData(fetchedChartData);
  };
  

  const isFormValid = () => {
    return selectedEquipments && date && startTime && endTime && interval;
  };

  return (
    <Container>
      <H4>Riwayat</H4>
      <Stack spacing={3}>
        {/* Form */}
        <Stack direction="row" spacing={3}>
          <Autocomplete
            options={equipments}
            getOptionLabel={(option) => option.label}
            onChange={(event, newValue) => setSelectedEquipments(newValue)}
            renderInput={(params) => <TextField {...params} label="Alat" />}
            sx={{ width: 300 }}
          />
        </Stack>

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

        {result && (
          <Typography variant="h6" mt={2}>
            Visualisasi Riwayat:
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
      <ContainerMap>
        <MapContainer center={[-6.9175, 107.6191]} zoom={90} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {mapData.length > 1 && (
            <Polyline 
              positions={mapData.map(data => [data.latitude, data.longitude])}
              color="blue"
            />
          )}

        {/* Menampilkan marker hanya untuk data terakhir */}
        {mapData.slice(-1).map((data, index) => (
          <Marker
            key={index}
            position={[data.latitude, data.longitude]}
            icon={data.pinpointType === "storage" ? customStorageIcon : customTruckIcon}
          >
            <Popup>
              <strong>{data.equipment}</strong><br />
              Nama Alat: {data.nama_alat}<br/ >
              Longitude: {data.longitude}<br />
              Latitude: {data.latitude}<br />
              Suhu: {`${data.suhu}°C`}<br />
              Storage: {data.storage}<br />
              Waktu: {data.waktu}
            </Popup>
          </Marker>
        ))}


        </MapContainer>
      </ContainerMap>

      <H4>Visualisasi Riwayat Suhu</H4>
      <SimpleCard title="Suhu *c">
        <ChartSuhu height="350px"
          color={[theme.palette.primary.main, theme.palette.primary.light]} />
      </SimpleCard>

      <H4>Status Alat</H4>
      <SimpleCard title="Status Alat">
        <ChartStatus height="350px"
          color={[theme.palette.primary.main, theme.palette.primary.light]} />
      </SimpleCard>
    </Container>
  );
}
