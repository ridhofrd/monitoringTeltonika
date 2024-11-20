import { Fragment, useState, useEffect } from "react";
import {
  Modal,
  Box,
  Autocomplete,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  ButtonGroup,
  Stack,
  styled,
  TextField,
} from "@mui/material";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Styles
const ContentBox = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

const H4 = styled("h4")(({ theme }) => ({
  fontSize: "1.2rem",
  fontWeight: "1000",
  marginBottom: "35px",
  color: theme.palette.text.secondary,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);

  // Penyesuaian waktu lokal dengan manual
  const day = String(date.getDate()-1).padStart(2, '0');
  const month = String(date.getMonth()+1).padStart(2, '0');
  const year = date.getFullYear();
  
  return `${day}-${month}-${year}`; 
};


export default function LayananClient() {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [rows, setRows] = useState([]);
  const [perpanjang, setPerpanjang] = useState([])

  const handlePerpanjang = (rows) => {
    setSelectedRow(rows);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const getIMEI = () => {
    return rows.map((rows) => rows.imei); 
  };

  const getRowByIMEI = (imei) => {
    return rows.find((rows) => rows.imei === imei);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/sewaCJ`);
        console.log("Data fetched from API:", response.data);  // Cek data yang diterima
        setRows(response.data); // Menyimpan data ke state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();

    const fetchPerpanjang = async () => {
      try {
        const response = await axios.get(`${API_URL}/perpanjangan`);
        console.log("Data fetched from API:", response.data);  // Cek data yang diterima
        setPerpanjang(response.data); // Menyimpan data ke state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchPerpanjang();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault(); // Mencegah form submit default (reload halaman)
  
    if (selectedRow.tanggalPerpanjang) { // Pastikan tanggalPerpanjang diisi
      try {
        // Kirim data tanggalPerpanjang yang baru ke backend
        await axios.put(`${API_URL}/sewaCJ/${selectedRow.id_perpanjang}`, {
          tanggalPerpanjang: selectedRow.tanggalPerpanjang,
        });
  
        // Update data di frontend setelah berhasil
        const updatedRows = rows.map((rows) =>
          rows.id_perpanjang === selectedRow.id_perpanjang
            ? { ...rows, tanggalperpanjang: selectedRow.tanggalPerpanjang }
            : rows
        );
        setRows(updatedRows); // Perbarui state rows
  
        // Tutup modal setelah data berhasil diperbarui
        setOpen(false); 
      } catch (error) {
        console.error("Error updating data:", error);
      }
    } else {
      // Tampilkan peringatan jika tanggalPerpanjang kosong
      alert("Tanggal perpanjang harus diisi!");
    }
  };  

  return (
    <Fragment>
      <ContentBox className="analytics">
        <H4>Layanan</H4>
        <h3>Daftar alat yang disewa</h3>
        <Stack spacing={2}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">No</TableCell>
                  <TableCell align="center">Nama alat</TableCell>
                  <TableCell align="center">Tanggal Awal Sewa</TableCell>
                  <TableCell align="center">Tanggal Akhir Sewa</TableCell>
                  <TableCell align="center">Aksi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((rows, index) => (
                  <TableRow key={rows.id_perpanjang}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{rows.imei}</TableCell>
                    <TableCell align="center">{formatDate(rows.tanggalawalsewa)}</TableCell>
                    <TableCell align="center">{formatDate(rows.tanggalakhirsewa)}</TableCell>
                    <TableCell align="center">
                      <ButtonGroup variant="text" aria-label="Basic button group">
                        <StyledButton
                          variant="contained"
                          color="primary"
                          onClick={() => handlePerpanjang(rows)}
                        >
                          Perpanjang
                        </StyledButton>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
        <StyledButton
          variant="contained"
          color="secondary"
          onClick={() => {
            window.open(
              "https://wa.me/<nomoradmin>?text=Halo%20saya%20butuh%20bantuan%20terkait%20penyewaan%20alat"
            );
          }}
        >
          Bantuan
        </StyledButton>

        <Stack spacing={2}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">No</TableCell>
                  <TableCell align="center">Nama alat</TableCell>
                  <TableCell align="center">Tanggal Awal Sewa</TableCell>
                  <TableCell align="center">Tanggal Akhir Sewa</TableCell>
                  <TableCell align="center">Tanggal permohonan perpanjang</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {perpanjang.map((perpanjang, index) => (
                  <TableRow key={perpanjang.id_perpanjang}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{perpanjang.imei}</TableCell>
                    <TableCell align="center">{formatDate(perpanjang.tanggalawalsewa)}</TableCell>
                    <TableCell align="center">{formatDate(perpanjang.tanggalakhirsewa)}</TableCell>
                    <TableCell align="center">{formatDate(perpanjang.tanggalPerpanjang)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </ContentBox>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <H4 id="modal-modal-title" variant="h6" component="h2">
            Perpanjang Sewa
          </H4>
          {selectedRow && (
            <form onSubmit={handleUpdate}>
            {/* Autocomplete untuk memilih IMEI */}
            <Autocomplete
              fullWidth
              margin="normal"
              options={getIMEI()}
              value={selectedRow.imei || ""}
              renderInput={(params) => <TextField {...params} label="IMEI" />}
              onChange={(e, value) => {
                const row = value ? getRowByIMEI(value) : null;
                setSelectedRow({
                  ...selectedRow,
                  imei: row ? row.imei : null,
                  tanggalAwal: row ? row.tanggalawalsewa : "",
                  tanggalAkhir: row ? row.tanggalakhirsewa : "",
                  tanggalPerpanjang: row ? row.tanggalperpanjang : "",
                });
              }}
            />
          
            {/* Tanggal Awal Sewa */}
            <TextField
              fullWidth
              margin="normal"
              label="Tanggal Awal Sewa"
              type="date"
              value={selectedRow.tanggalawalsewa.split('T')[0]}
              disabled
              InputLabelProps={{ shrink: true }}
            />
          
            {/* Tanggal Akhir Sewa */}
            <TextField
              fullWidth
              margin="normal"
              label="Tanggal Akhir Sewa"
              type="date"
              value={selectedRow.tanggalakhirsewa.split('T')[0]}
              disabled
              InputLabelProps={{ shrink: true }}
            />
          
            {/* Tanggal Perpanjang Sewa */}
            <TextField
              fullWidth
              margin="normal"
              label="Tanggal Perpanjang Sewa"
              type="date"
              value={selectedRow.tanggalPerpanjang}
              onChange={(e) => {
                const newDate = e.target.value;
                setSelectedRow({ ...selectedRow, tanggalPerpanjang: newDate });
              }}
              InputLabelProps={{ shrink: true }}
            />
          
            {/* Tombol Simpan dan Batal */}
            <Stack direction="row" spacing={2} justifyContent="flex-end" marginTop={2}>
              <Button variant="contained" color="primary" type="submit" onClick={handleClose}>
                Simpan
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleClose}>
                Batal
              </Button>
            </Stack>
          </form>          
          )}
        </Box>
      </Modal>
    </Fragment>
  );
}
