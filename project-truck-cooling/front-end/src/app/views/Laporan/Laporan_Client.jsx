import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Stack, Typography, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Autocomplete } from "@mui/material";
import SimpleCard from "app/components/SimpleCard";
import { styled } from "@mui/material/styles";
import * as XLSX from 'xlsx';

const H4 = styled("h4")(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: "500",
  marginBottom: "35px",
  textTransform: "capitalize",
  color: theme.palette.text.secondary
}));

const Container = styled("div")(({ theme }) => ({
  margin: "30px"
}));

export default function LaporanClient() {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [equipments, setEquipments] = useState([]);
  const [selectedEquipments, setSelectedEquipments] = useState(null);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [interval, setInterval] = useState("");
  const [mapData, setMapData] = useState([]);

  // Fetch list of clients
  useEffect(() => {
    fetch('https://monitoring-teltonika-be.vercel.app/clients')
      .then((response) => response.json())
      .then((data) => {
        setClients(data);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }, []);

  // Fetch sewa data and log_track data based on selected client
  useEffect(() => {
    if (selectedClient) {
      const fetchData = async () => {
        try {
          const sewaResponse = await fetch(`https://monitoring-teltonika-be.vercel.app/sewa/${selectedClient.id}`);
          const sewaData = await sewaResponse.json();
          console.log(sewaData);  // Cek data
          setEquipments(sewaData);
          setSelectedEquipments(null);  // Reset form alat when client changes

          const logTrackResponse = await fetch(`https://monitoring-teltonika-be.vercel.app/log_track_id/${selectedClient.id}`);
          const logTrackData = await logTrackResponse.json();
          console.log(logTrackData);  // Cek data
          setMapData(logTrackData);
        } catch (error) {
          console.error("Error", error);
        }
      };
      fetchData();
    }
  }, [selectedClient]);

  const handleSubmit = () => {
    console.log(selectedEquipments.imei);  // Cek IMEI
    fetch(`https://monitoring-teltonika-be.vercel.app/log_track/${selectedEquipments.imei}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);  // Cek hasil data
        setMapData(data);
      })
      .catch((error) => {
        console.error("Error fetching log data", error);
      });
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(mapData); // Convert mapData to Excel format
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    XLSX.writeFile(wb, "map_data.xlsx");
  };

  const isFormValid = () => selectedClient && selectedEquipments && date && startTime && endTime && interval;

  return (
    <Container>
      <H4>Laporan</H4>
      <Stack spacing={3}>
        {/* Form */}
        <Stack direction="row" spacing={3}>
 {/*         <Autocomplete
            options={clients}
            getOptionLabel={(option) => option.label}
            onChange={(event, newValue) => setSelectedClient(newValue)}
            renderInput={(params) => <TextField {...params} label="Klien" />}
            sx={{ width: 300 }}
          />*/}
          <Autocomplete
            options={equipments}
            getOptionLabel={(option) => option.namaalat}
            value={selectedEquipments}
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
            InputLabelProps={{ shrink: true }}
            sx={{ width: 300 }}
          />
          <TextField
            label="Jam Mulai"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ width: 300 }}
          />
          <TextField
            label="Jam Selesai"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            InputLabelProps={{ shrink: true }}
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

        {/* Submit button */}
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!isFormValid()}
        >
          Tampilkan
        </Button>

        {/* Display fetched log data in a table */}
        {mapData.length > 0 && (
          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Button variant="contained" onClick={exportToExcel}>
              Export to Excel
            </Button>
            <Table aria-label="Map Data Table">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Latitude</TableCell>
                  <TableCell>Longitude</TableCell>
                  <TableCell>Temperature (C)</TableCell>
                  <TableCell>Status Alat</TableCell>
                  <TableCell>Commodity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mapData.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell>{new Date(data.timestamplog).toLocaleDateString()}</TableCell>
                    <TableCell>{data.timestamplog}</TableCell> {/* Display timestamp */}
                    <TableCell>{data.log_latitude}</TableCell>
                    <TableCell>{data.log_longitude}</TableCell>
                    <TableCell>{data.suhu2}°C</TableCell>
                    <TableCell>{data.status_alat || "N/A"}</TableCell> {/* Default status */}
                    <TableCell>{data.commodity || "N/A"}</TableCell> {/* Default commodity */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Stack>
    </Container>
  );
}
