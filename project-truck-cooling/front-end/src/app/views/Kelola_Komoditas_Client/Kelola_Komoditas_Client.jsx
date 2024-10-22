import React, { useState, useEffect } from "react";
import {
  Card,
  Grid,
  styled,
  useTheme,
  Stack,
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  Autocomplete,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  ButtonGroup,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";

function createData(no, gambar, nama, imei, seri, tanggal, status) {
  return { no, gambar, nama, imei, seri, tanggal, status };
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
}));

const H4 = styled("h4")(({ theme }) => ({
  fontSize: "1.2rem",
  fontWeight: "1000",
  marginBottom: "35px",
  textTransform: "capitalize",
  color: theme.palette.text.secondary,
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  height: 650,
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const nama_barang = [
  { id: "B-", label: "B- " },
];

const satuan = [
  { id: "KG", label: "KG" },
  { id: "Liter", label: "Liter" },
  { id: "Box", label: "Box" },
];

const rows = [
  createData(
    1,
    " ",
    "Ikan Asin",
    "Ikan Asin dari Pangandaran",
    "KG",
    "120"
  ),
  createData(
    2,
    " ",
    "Frozen Food",
    "Aneka Olahan Frozen Food",
    "KG",
    "230"
  ),
  createData(
    3,
    " ",
    "Es Balok",
    "Bongkahan Es Balok",
    "Liter",
    "30"
  ),
];

const BACKEND_URL = "http://localhost:5000"; // Contoh untuk lokal


export default function Kelola_Komoditas() {
  const { palette } = useTheme();
  const [open, setopen] = React.useState(false);
  const [alat, setAlat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const handleOpen = () => setopen(true);
  const handleClose = () => setopen(false);
  const [namabarang, setnamabarang] = useState("");
  const [statusSatuan, setStatusSatuan] = useState("");
  const [date, setDate] = useState("");
  const [inputValue, setinputvalue] = useState({ id: "", label: "" });

    // Fetch Alat dari Backend
    useEffect(() => {
      const fetchAlat = async () => {
        try {
          const response = await axios.get(`${BACKEND_URL}/commodity`);
          console.log("Data alat diterima:", response.data);
          setAlat(response.data);
          setLoading(false);
        } catch (err) {
          console.error("Error saat mengambil data alat:", err);
          setError("Gagal mengambil data alat");
          setLoading(false);
        }
      };
      fetchAlat();
    }, []);

  return (
    <Container>
      <H4>Kelola Komoditas</H4>
      <Stack spacing={2}>
        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: "space-between", alignItems: "baseline" }}
        >
          <Button variant="contained" color="success" onClick={handleOpen}>
            Tambah Barang
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <H4>Tambah Barang</H4>
              <Stack spacing={2}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    components="h6"
                    sx={{ minWidth: "150px", fontSize: "1rem" }}
                  >
                    Nama Barang
                  </Typography>

                  <Autocomplete
                    options={nama_barang}
                    getOptionLabel={(option) => option.label}
                    value={namabarang}
                    onChange={(e, newValue) => setnamabarang(newValue)}
                    inputValue={inputValue}
                    onInputChange={(e, newinputvalue) =>
                      setinputvalue(newinputvalue)
                    }
                    freeSolo
                    sx={{ width: 500 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Nama Barang"
                        variant="outlined"
                      />
                    )}
                  />
                </Stack>

                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    components="h6"
                    sx={{ minWidth: "150px", fontSize: "1rem" }}
                  >
                    Deskripsi Barang
                  </Typography>

                  <TextField
                    label="Deskripsi Barang"
                    variant="outlined"
                    sx={{ width: 500 }}
                  />
                </Stack>

                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    components="h6"
                    sx={{ minWidth: "150px", fontSize: "1rem" }}
                  >
                    Satuan
                  </Typography>

                  <Autocomplete
                    sx={{ width: 500 }}
                    options={satuan}
                    getOptionLabel={(option) => option.label}
                    value={statusSatuan}
                    onChange={(e, newValue) => setStatusSatuan(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Satuan"
                        variant="outlined"
                      />
                    )}
                  />
                </Stack>

              </Stack>
              <Stack
                direction="row"
                spacing={12}
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 5,
                }}
              >
                <Button variant="contained" color="error">
                  Reset
                </Button>
                <Button variant="contained" color="success">
                  Simpan
                </Button>
              </Stack>
            </Box>
          </Modal>
        </Stack>
        <Stack spacing={2}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">No</TableCell>
                  <TableCell align="center">Gambar</TableCell>
                  <TableCell align="center">Nama Barang</TableCell>
                  <TableCell align="center">Deskripsi</TableCell>
                  <TableCell align="center">Satuan</TableCell>
                  <TableCell align="center">Stok Terbaru</TableCell>
                  <TableCell align="center">Aksi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.no}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {row.no}
                    </TableCell>
                    <TableCell align="center">{row.gambar}</TableCell>
                    <TableCell align="center">{row.nama}</TableCell>
                    <TableCell align="center">{row.imei}</TableCell>
                    <TableCell align="center">{row.seri}</TableCell>
                    <TableCell align="center">{row.tanggal}</TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        width: "auto",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <ButtonGroup
                        variant="text"
                        aria-label="Basic button group"
                        sx={{ width: "100%" }}
                      >
                        <Button color="info" sx={{ flex: 1 }}>
                          <VisibilityIcon />
                        </Button>
                        <Button color="warning" sx={{ flex: 1 }}>
                          <EditIcon />
                        </Button>
                        <Button color="error" sx={{ flex: 1 }}>
                          <DeleteIcon />
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Stack>
    </Container>
  );
}
