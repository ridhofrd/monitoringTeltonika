import React, { useState } from "react";
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
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

function createData(no, nama, imei, seri, tanggalAwal, tanggalAkhir) {
  return { no, nama, imei, seri, tanggalAwal, tanggalAkhir};
}

const rows = [
  createData(
    1,
    "PT Huangcun",
    8123465737,
    "info@huangcun.co.id",
    "22 Aug 2024",
    "22 OKt 2025"
  ),
  createData(
    2,
    "PT Eskrimku",
    8978798772,
    "eskrimku@gmail.com",
    "20 Aug 2024",
    "22 Sept 2025"
  ),
  createData(
    3,
    "CV Berkah Daging ",
    1234567890,
    "berkah@dagingku.id",
    "22 Aug 2024",
    "22 Jan 2026"
  ),
];

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

const nama_alat = [
  { id: "TET", label: "TET- " },
  { id: "TEC", label: "TEC- " },
];

const status_alat = [
  { id: "tersedia", label: "Tersedia" },
  { id: "disewa", label: "Disewa" },
  { id: "rusak", label: "Rusak" },
];

export default function Layanan() {
  const { palette } = useTheme();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [namalat, setNamalat] = useState(null);
  const [statusAlat, setStatusAlat] = useState(null);
  const [dateMain, setDateMain] = useState("");
  const [dateModal, setDateModal] = useState("");
  const [inputValue, setInputValue] = useState("");

  return (
    <Container>
      <H4>Layanan</H4>
      <Stack spacing={2}>

        {/* Form Tambah Penyewaan */}
        <Box sx={{ marginTop: 3, padding: 2, border: '1px solid #ccc', borderRadius: '4px' }}>
          <H4>Tambah Penyewaan</H4>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography
                variant="h6"
                sx={{ minWidth: "150px", fontSize: "1rem" }}
              >
                Nama Klien
              </Typography>
              <TextField
                label="Nama Klien"
                variant="outlined"
                sx={{ width: 500 }}
              />
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
              <Typography
                variant="h6"
                sx={{ minWidth: "150px", fontSize: "1rem" }}
              >
                Nomor Kontak
              </Typography>
              <TextField
                label="No Kontak"
                variant="outlined"
                sx={{ width: 500 }}
              />
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
              <Typography
                variant="h6"
                sx={{ minWidth: "150px", fontSize: "1rem" }}
              >
                Email
              </Typography>
              <TextField
                label="Email"
                variant="outlined"
                sx={{ width: 500 }}
              />
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
              <Typography
                variant="h6"
                sx={{ minWidth: "150px", fontSize: "1rem" }}
              >
                Tanggal Bergabung
              </Typography>
              <TextField
                label="Tanggal Produksi"
                type="date"
                value={dateMain}
                onChange={(e) => setDateMain(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ width: 500 }}
              />
            </Stack>

            <Stack direction="row" spacing={5} alignItems="center">
              <Typography
                variant="h6"
                sx={{ minWidth: "125px", fontSize: "1rem" }}
              >
                Tambah Alat
              </Typography>
              <Button
                variant="contained"
                sx={{ width: 150, height: 50 }}
                onClick={handleOpen} // Menambahkan onClick handler
              >
                Tambah Alat
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <H4>Tambah Alat</H4>
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h6"
                        sx={{ minWidth: "150px", fontSize: "1rem" }}
                      >
                        Nama Alat
                      </Typography>

                      <Autocomplete
                        options={nama_alat}
                        getOptionLabel={(option) => option.label}
                        value={namalat}
                        onChange={(e, newValue) => setNamalat(newValue)}
                        inputValue={inputValue}
                        onInputChange={(e, newInputValue) =>
                          setInputValue(newInputValue)
                        }
                        freeSolo
                        sx={{ width: 500 }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Nama Alat"
                            variant="outlined"
                          />
                        )}
                      />
                    </Stack>

                    <Stack direction="row" spacing={2} alignItems="center">
                      <Typography
                        variant="h6"
                        component="h6"
                        sx={{ minWidth: "150px", fontSize: "1rem" }}
                      >
                        IMEI
                      </Typography>

                      <TextField
                        label="No IMEI"
                        variant="outlined"
                        sx={{ width: 500 }}
                      />
                    </Stack>

                    <Stack direction="row" spacing={2} alignItems="center">
                      <Typography
                        variant="h6"
                        component="h6"
                        sx={{ minWidth: "150px", fontSize: "1rem" }}
                      >
                        Seri Alat
                      </Typography>

                      <TextField
                        label="Seri Alat"
                        variant="outlined"
                        sx={{ width: 500 }}
                      />
                    </Stack>

                    <Stack direction="row" spacing={2} alignItems="center">
                      <Typography
                        variant="h6"
                        component="h6"
                        sx={{ minWidth: "150px", fontSize: "1rem" }}
                      >
                        Tanggal Sewa Awal
                      </Typography>

                      <TextField
                        label="Tanggal Sewa Awal"
                        type="date"
                        value={dateModal}
                        onChange={(e) => setDateModal(e.target.value)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        sx={{ width: 500 }}
                      />
                    </Stack>

                    <Stack direction="row" spacing={2} alignItems="center">
                      <Typography
                        variant="h6"
                        component="h6"
                        sx={{ minWidth: "150px", fontSize: "1rem" }}
                      >
                        Tanggal Sewa Akhir
                      </Typography>

                      <TextField
                        label="Tanggal Sewa Akhir"
                        type="date"
                        value={dateModal}
                        onChange={(e) => setDateModal(e.target.value)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        sx={{ width: 500 }}
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
                    <Button variant="contained" color="error" onClick={handleClose}>
                      Reset
                    </Button>
                    <Button variant="contained" color="success" onClick={handleClose}>
                      Simpan
                    </Button>
                  </Stack>
                </Box>
              </Modal>
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
          </Stack>
        </Box>

        {/* Tabel Data Penyewaan */}
        <Stack spacing={2}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">No</TableCell>
                  <TableCell align="center">Nama Alat</TableCell>
                  <TableCell align="center">IMEI</TableCell>
                  <TableCell align="center">Seri Alat</TableCell>
                  <TableCell align="center">Tanggal Awal</TableCell>
                  <TableCell align="center">Tanggal Akhir</TableCell>
                  {/* <TableCell align="center">Aksi</TableCell> */}
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
                    <TableCell align="center">{row.nama}</TableCell>
                    <TableCell align="center">{row.imei}</TableCell>
                    <TableCell align="center">{row.seri}</TableCell>
                    <TableCell align="center">{row.tanggalAwal}</TableCell>
                    <TableCell align="center">{row.tanggalAkhir}</TableCell>
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
