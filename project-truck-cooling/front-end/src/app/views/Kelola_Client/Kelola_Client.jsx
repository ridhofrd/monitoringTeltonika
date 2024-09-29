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
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';

function createData(no, nama, alamat, nohp, email, tgl, status) {
  return { no, nama, alamat, nohp, email, tgl, status };
}

const rows = [
  createData(
    1,
    "PT Huangcun",
    "Jl. Merdeka, Bekasi",
    "08123874940",
    "info@huangcun.co.id",
    "22 Aug 2024",
    "Aktif",
  ),
  createData(
    2,
    "PT Eskrimku",
    "Jl. Koramil, Bandung",
    "08123874940",
    "info@eskrimku.co.id",
    "22 Aug 2024",
    "Aktif",
  ),
  createData(
    3,
    "CV Berkah Daging",
    "Komp. Gudang, Cikarang",
    "08123874940",
    "Berkah.Daging@gmail.com",
    "22 Aug 2024",
    "Suspend",
  ),
  createData(
    4,
    "CV Berkah Daging",
    "Komp. Gudang, Cikarang",
    "08123874940",
    "Berkah.Daging@gmail.com",
    "22 Aug 2024",
    "Suspend",
  ),
  createData(
    5,
    "CV Berkah Daging",
    "Komp. Gudang, Cikarang",
    "08123874940",
    "Berkah.Daging@gmail.com",
    "22 Aug 2024",
    "Suspend",
  ),
  createData(
    6,
    "CV Berkah Daging",
    "Komp. Gudang, Cikarang",
    "08123874940",
    "Berkah.Daging@gmail.com",
    "22 Aug 2024",
    "Suspend",
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
  borderRadius : 2,
};

const style2 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3.5,
  maxHeight: '90vh',
  overflowY: 'auto',
  borderRadius : 2,
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

export default function Kelola_Client() {
  const { palette } = useTheme();
  const [activeModal, setActiveModal] = useState(null);
  const handleOpen = (modalName) => {setActiveModal(modalName);};
  const handleClose = () => {setActiveModal(null);};
  const [provinsi, setProvinsi] = useState("");
  const [kota, setKota] = useState("");
  const [date, setDate] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [inputValue, setinputvalue] = useState({ id: "", label: "" });

  return (
    <Container>
      <H4 sx={{ fontFamily: 'Arial, sans-serif',fontWeight: 'bold', fontSize: '25px', textAlign: 'left' }}>
        Kelola Client
      </H4>
      <Stack spacing={2}>
        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: "space-between", alignItems: "baseline" }}
        >
          <Button variant="contained" color="success" onClick={() => handleOpen('modal1')}>
            Tambah Client
          </Button>
          <Modal
            open={activeModal === 'modal1'}
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
                <TableRow >
                  <TableCell align="center"sx={{width: '40px', border: "1px solid #ddd",}}>No</TableCell>
                  <TableCell align="center"sx={{width: '135px', border: "1px solid #ddd",}}>Nama Klien</TableCell>
                  <TableCell align="center"sx={{width: '200px', border: "1px solid #ddd",}}>Alamat</TableCell>
                  <TableCell align="center"sx={{width: '110px', border: "1px solid #ddd",}}>Nomor Kontak</TableCell>
                  <TableCell align="center"sx={{width: '200px', border: "1px solid #ddd",}}>Email</TableCell>
                  <TableCell align="center"sx={{width: '100px', border: "1px solid #ddd",}}>Tgl Gabung</TableCell>
                  <TableCell align="center"sx={{width: '75px', border: "1px solid #ddd",}}>Status</TableCell>
                  <TableCell align="center"sx={{border: "1px solid #ddd",}}>Aksi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.no}
                    // sx={{ "&:last-child td, &:last-child th": { border: 0 }, }}
                  >
                    <TableCell component="th" scope="row" align="center" sx={{border: "1px solid #ddd",}}>{row.no}</TableCell>
                    <TableCell component="th" scope="row" align="center" sx={{border: "1px solid #ddd",}}>{row.nama}</TableCell>
                    <TableCell component="th" scope="row" align="center" sx={{border: "1px solid #ddd",}}>{row.alamat}</TableCell>
                    <TableCell component="th" scope="row" align="center" sx={{border: "1px solid #ddd",}}>{row.nohp}</TableCell>
                    <TableCell component="th" scope="row" align="center" sx={{border: "1px solid #ddd",}}>{row.email}</TableCell>
                    <TableCell component="th" scope="row" align="center" sx={{border: "1px solid #ddd",}}>{row.tgl}</TableCell>
                    <TableCell component="th" scope="row" align="center" sx={{border: "1px solid #ddd",}}>{row.status}</TableCell>
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
                        <Button color="info" sx={{ flex: 1 }} onClick={() => handleOpen('modal2')}>
                          <VisibilityIcon/>
                        </Button>
                        <Modal
                          open={activeModal === 'modal2'}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style}>
                            <H4>Data Client</H4>
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
                        <Button color="warning" sx={{ flex: 1 }} onClick={() => handleOpen('modal3')}>
                          <EditIcon/>
                        </Button>
                        <Modal
                          open={activeModal === 'modal3'}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style}>
                            <H4>Edit Client</H4>
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
                        <Button color="warning" sx={{ flex: 1}} onClick={() => handleOpen('modal4')}>
                          <RestartAltIcon/>
                        </Button>
                        <Modal
                          open={activeModal === 'modal4'}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style2}>
                          <H4 sx={{ fontFamily: 'Arial, sans-serif',fontWeight: 'bold', fontSize: '20px', textAlign: 'center' }}>
                              Apakah anda yakin untuk mereset password?
                            </H4>
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
                                Tidak
                              </Button>
                              <Button variant="contained" color="success">
                                Ya
                              </Button>
                            </Stack>
                          </Box>
                        </Modal>
                        <Button color="error" sx={{ flex: 1}} onClick={() => handleOpen('modal5')}>
                          <DoNotDisturbOnIcon/>
                        </Button>
                        <Modal
                          open={activeModal === 'modal5'}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style2}>
                            <H4 sx={{ fontFamily: 'Arial, sans-serif',fontWeight: 'bold', fontSize: '20px', textAlign: 'center' }}>
                              Apakah anda yakin untuk melakukan suspend akun klien ini?
                            </H4>
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
                                Tidak
                              </Button>
                              <Button variant="contained" color="success">
                                Ya
                              </Button>
                            </Stack>
                          </Box>
                        </Modal>
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