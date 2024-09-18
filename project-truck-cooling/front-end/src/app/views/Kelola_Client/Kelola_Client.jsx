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

function createData(no, nama, alamat, nohp, email, tgl) {
  return { no, nama, alamat, nohp, email, tgl };
}

const rows = [
  createData(
    1,
    "PT Huangcun",
    "Jl. Merdeka, Bekasi",
    "08123874940",
    "info@huangcun.co.id",
    "22 Aug 2024",
  ),
  createData(
    2,
    "PT Eskrimku",
    "Jl. Koramil, Bandung",
    "08123874940",
    "info@eskrimku.co.id",
    "22 Aug 2024",
  ),
  createData(
    3,
    "CV Berkah Daging",
    "Komp. Gudang, Cikarang",
    "08123874940",
    "Berkah.Daging@gmail.com",
    "22 Aug 2024",
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
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3.5,
  maxHeight: '90vh',
  overflowY: 'auto',
};

const data_provinsi = [
  { id: "jabar", label: "Jawa Barat" },
  { id: "jateng", label: "Jawa Tengah" },
  { id: "jatim", label: "Jawa Timur" },
  { id: "suta", label: "Sulawesi Utara" },
];

const data_kota = [
  { id: "kbb", label: "Kabupaten Bandung Barat" },
  { id: "bandung", label: "Kota Bandung" },
  { id: "cimahi", label: "Kota Cimahi" },
];

const data_kec = [
  { id: "parongpong", label: "Parongpong" },
  { id: "lembang", label: "Lembang" },
  { id: "sukajadi", label: "Sukajadi" },
];

export default function Kelola_Alat() {
  const { palette } = useTheme();
  const [open, setopen] = React.useState(false);
  const handleOpen = () => setopen(true);
  const handleClose = () => setopen(false);
  const [provinsi, setProvinsi] = useState("");
  const [kota, setKota] = useState("");
  const [date, setDate] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [inputValue, setinputvalue] = useState({ id: "", label: "" });

  return (
    <Container>
      <H4>Kelola Client</H4>
      <Stack spacing={2}>
        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: "space-between", alignItems: "baseline" }}
        >
          <Button variant="contained" color="success" onClick={handleOpen}>
            Tambah Client
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <H4>Tambah Client</H4>
              <Stack spacing={2}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    components="h6"
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
                    id="modal-modal-title"
                    variant="h6"
                    components="h6"
                    sx={{ minWidth: "150px", fontSize: "1rem" }}
                  >
                    Alamat
                  </Typography>

                  <TextField
                    label="Alamat"
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
                    Provinsi
                  </Typography>

                  <Autocomplete
                    sx={{ width: 500 }}
                    options={data_provinsi}
                    getOptionLabel={(option) => option.label}
                    value={provinsi}
                    onChange={(e, newValue) => setProvinsi(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Provinsi"
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
                    Kabupaten/Kota
                  </Typography>

                  <Autocomplete
                    sx={{ width: 500 }}
                    options={data_kota}
                    getOptionLabel={(option) => option.label}
                    value={kota}
                    onChange={(e, newValue) => setKota(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Kabupaten/Kota"
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
                    Kecamatan
                  </Typography>

                  <Autocomplete
                    sx={{ width: 500 }}
                    options={data_kec}
                    getOptionLabel={(option) => option.label}
                    value={kecamatan}
                    onChange={(e, newValue) => setKecamatan(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Kecamatan"
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
                    Kode Pos
                  </Typography>

                  <TextField
                    label="Kode Pos"
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
                    Nomor Kontak
                  </Typography>

                  <TextField
                    label="Nomor Kontak"
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
                    id="modal-modal-title"
                    variant="h6"
                    components="h6"
                    sx={{ minWidth: "150px", fontSize: "1rem" }}
                  >
                    Tanggal Bergabung
                  </Typography>

                  <TextField
                    label="Tanggal Bergabung"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
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
                  <TableCell align="center">Nama Klien</TableCell>
                  <TableCell align="center">Alamat</TableCell>
                  <TableCell align="center">Nomor Kontak</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Tgl Gabung</TableCell>
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
                    <TableCell align="center">{row.nama}</TableCell>
                    <TableCell align="center">{row.alamat}</TableCell>
                    <TableCell align="center">{row.nohp}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">{row.tgl}</TableCell>
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
                          <VisibilityIcon/>
                        </Button>
                        <Button color="warning" sx={{ flex: 1 }}>
                          <EditIcon/>
                        </Button>
                        <Button color="error" sx={{ flex: 1 }}>
                          <DeleteIcon/>
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
