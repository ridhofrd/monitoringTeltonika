import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Stack, Typography, MenuItem, useTheme } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
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

const Container = styled("div")(({ theme }) => ({
  margin: "30px"
}));

const ContainerMap = styled(Box)(({ theme, isSidebarOpen }) => ({
  border: "2px solid #2196F3",
  borderRadius: "8px",
  padding: "18px",
  height: "400px",
  backgroundColor: "#f0f8ff",
  display: isSidebarOpen ? "none" : "flex",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down("sm")]: {
    height: "250px"
  }
}));

const API_URL = process.env.REACT_APP_API_URL;

export default function RiwayatClient() {
  const theme = useTheme();
  const [equipments, setEquipments] = useState([]);
  const [selectedEquipments, setSelectedEquipments] = useState(null);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [interval, setInterval] = useState("");
  const [result, setResult] = useState(null);
  const [mapData, setMapData] = useState([]);
  const [chartData, setChartData] = useState([]);

  // Fetch static sewa data and log_track data for client with ID 1
  useEffect(() => {
    const fetchData = async () => {
      try {
        const sewaResponse = await fetch(`${API_URL}/sewa/1`);
        const sewaData = await sewaResponse.json();
        setEquipments(sewaData);
        setSelectedEquipments(null);

        const logTrackResponse = await fetch(`${API_URL}/log_track_id/1`);
        const logTrackData = await logTrackResponse.json();
        setMapData(logTrackData);
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchData();
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
    fetch(`${API_URL}/log_track/${selectedEquipments.imei}`)
      .then((response) => response.json())
      .then((data) => {
        setMapData(data);

        const suhuData = data.map((entry) => entry.suhu2);
        setChartData(suhuData);
      })
      .catch((error) => {
        console.error("Error fetching log data", error);
      });

    // Simulated data for chart based on form inputs
    // const fetchedChartData = [1, 0, 1, 1, 1, 0, 1];
    // setChartData(fetchedChartData);
  };

  const handleReset = () => {
    setSelectedEquipments(null);
    setDate("");
    setStartTime("");
    setEndTime("");
    setInterval("");
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
          <TextField
            select
            label="Alat"
            value={selectedEquipments}
            onChange={(event) => setSelectedEquipments(event.target.value)}
            variant="outlined"
            fullWidth
          >
            {equipments.map((equipment) => (
              <MenuItem key={equipment.imei} value={equipment}>
                {equipment.namaalat}
              </MenuItem>
            ))}
          </TextField>
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
          color="primary"
          disabled={!isFormValid()}
        >
          Tampilkan
        </Button>

        {result && (
          <Typography variant="h6" mt={2}>
            <Button
              variant="contained"
              onClick={handleReset}
              disabled={!isFormValid()}
              color="secondary"
            >
              Reset
            </Button>
          </Typography>
        )}
      </Stack>

      <H4>Visualisasi Riwayat Perjalanan</H4>
      <ContainerMap>
        <MapContainer
          center={[-6.9175, 107.6191]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />

          {mapData.length > 1 && (
            <Polyline
              positions={mapData.map((data) => [data.log_latitude, data.log_longitude])}
              color="blue"
            />
          )}

          {mapData.slice(-1).map((data, index) => (
            <Marker
              key={index}
              position={[data.log_latitude, data.log_longitude]}
              icon={data.pinpointType === "storage" ? customStorageIcon : customTruckIcon}
            >
              <Popup>
                <strong>{data.namaalat}</strong>
                <br />
                Longitude: {data.log_longitude}
                <br />
                Latitude: {data.log_latitude}
                <br />
                Suhu: {`${data.suhu2}°C`}
                <br />
                Waktu: {data.timestamplog}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </ContainerMap>

      <H4>Visualisasi Riwayat Suhu</H4>
      <p>Tanggal: {new Date(date).toLocaleDateString()}</p>
      <p>
        {startTime} - {endTime}
      </p>

      <SimpleCard title="Suhu °C">
        <ChartSuhu
          height="350px"
          color={[theme.palette.primary.main, theme.palette.primary.light]}
          chartData={chartData}
          firstTime={startTime}
          lastTime={endTime}
          interval={interval}
        />
      </SimpleCard>

      <H4>Status Alat</H4>
      <p>Tanggal: {new Date(date).toLocaleDateString()}</p>
      <p>
        {startTime} - {endTime}
      </p>
      <SimpleCard title="Status Alat">
        <ChartStatus
          height="350px"
          color={[theme.palette.primary.main, theme.palette.primary.light]}
          firstTime={startTime}
          lastTime={endTime}
          interval={interval}
        />
      </SimpleCard>
    </Container>
  );
}
