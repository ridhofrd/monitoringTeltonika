// src/app/views/Kelola_Alat/Kelola_Alat.jsx

import React, { useEffect, useState } from "react";
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
  Pagination,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";

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

const VisuallyHiddenInput = styled("input")({
  display: "none",
});

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

const nama_alat_options = [
  { id: "TET", label: "TET-" },
  { id: "TEC", label: "TEC-" },
];

const status_alat_options = [
  { id: "tersedia", label: "Tersedia" },
  { id: "disewa", label: "Disewa" },
  { id: "rusak", label: "Rusak" },
];

const BACKEND_URL = "https://monitoring-teltonika-be.vercel.app";

const Kelola_Alat = () => {
  const { palette } = useTheme();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    handleReset();
  };

  const [alat, setAlat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const [namalat, setNamalat] = useState(null);
  const [statusAlat, setStatusAlat] = useState(null);
  const [date, setDate] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [imei, setImei] = useState("");
  const [seri, setSeri] = useState("");
  const [gambar, setGambar] = useState("");

  // State untuk Edit
  const [editOpen, setEditOpen] = useState(false);
  const [currentAlat, setCurrentAlat] = useState(null);
  const [editNamalat, setEditNamalat] = useState(null);
  const [editStatusAlat, setEditStatusAlat] = useState(null);
  const [editDate, setEditDate] = useState("");
  const [editSeri, setEditSeri] = useState("");
  const [editGambar, setEditGambar] = useState("");

  // State untuk View
  const [viewOpen, setViewOpen] = useState(false);
  const [viewAlat, setViewAlat] = useState(null);

  // Fetch Alat dari Backend
  useEffect(() => {
    const fetchAlat = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/alat`);
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

  const filteredRows = alat.filter(
    (row) =>
      typeof row.namaalat === "string" &&
      row.namaalat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredRows.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Tambah Alat
  const handleTambahAlat = async () => {
    if (!namalat || !statusAlat || !imei || !seri || !date || !gambar) {
      alert("Silakan lengkapi semua field");
      return;
    }

    const newAlat = {
      namaalat: namalat.label + imei,
      imei: imei,
      seri: seri,
      tanggal: date,
      status: statusAlat.label,
      gambar: gambar, // URL gambar
    };

    try {
      const response = await axios.post(`${BACKEND_URL}/alat`, newAlat);
      console.log("Alat baru ditambahkan:", response.data);
      setAlat([...alat, response.data]);
      handleClose();
    } catch (err) {
      console.error("Error saat menambah alat:", err);
      alert("Gagal menambah alat");
    }
  };

  // Edit Alat
  const handleEditOpen = (alat) => {
    setCurrentAlat(alat);
    const [prefix] = alat.namaalat.split("-");
    setEditNamalat({ label: prefix + "-" });
    setEditStatusAlat(
      status_alat_options.find((sa) => sa.label === alat.status)
    );
    setEditDate(alat.tanggal);
    setEditSeri(alat.seri);
    setEditGambar(alat.gambar);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setCurrentAlat(null);
    setEditNamalat(null);
    setEditStatusAlat(null);
    setEditDate("");
    setEditSeri("");
    setEditGambar("");
  };

  const handleUpdateAlat = async () => {
    if (!editNamalat || !editStatusAlat || !editSeri || !editDate) {
      alert("Silakan lengkapi semua field");
      return;
    }

    const updatedAlat = {
      namaalat: editNamalat.label + currentAlat.imei,
      seri: editSeri,
      tanggal: editDate,
      status: editStatusAlat.label,
      gambar: editGambar, // URL gambar
    };

    try {
      console.log(
        "Mengirim PUT request ke:",
        `${BACKEND_URL}/alat/${currentAlat.imei}`
      );
      const response = await axios.put(
        `${BACKEND_URL}/alat/${currentAlat.imei}`, // Perbaiki URL
        updatedAlat
      );
      console.log("Response update alat:", response.data);
      const updatedList = alat.map((item) =>
        item.imei === currentAlat.imei ? response.data : item
      );
      setAlat(updatedList);
      handleEditClose();
    } catch (err) {
      console.error("Error saat mengupdate alat:", err);
      alert("Gagal mengupdate alat");
    }
  };

  // Hapus Alat
  const handleDeleteAlat = async (imei) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus alat ini?")) {
      try {
        await axios.delete(`${BACKEND_URL}/alat/${imei}`);
        const updatedAlat = alat.filter((item) => item.imei !== imei);
        setAlat(updatedAlat);
      } catch (err) {
        console.error("Error saat menghapus alat:", err);
        alert("Gagal menghapus alat");
      }
    }
  };

  // Lihat Alat
  const handleViewOpen = (alat) => {
    setViewAlat(alat);
    setViewOpen(true);
  };

  const handleViewClose = () => {
    setViewOpen(false);
    setViewAlat(null);
  };

  // Reset Form Tambah Alat
  const handleReset = () => {
    setNamalat(null);
    setStatusAlat(null);
    setImei("");
    setSeri("");
    setDate("");
    setGambar("");
    setInputValue("");
  };

  return (
    <Container>
      <H4>Kelola Alat</H4>
      <Stack spacing={2}>
        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Button variant="contained" color="success" onClick={handleOpen}>
            Tambah Alat
          </Button>
          <TextField
            label="Cari Nama Alat"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            sx={{ width: 300 }}
          />
        </Stack>

        {/* Modal untuk "Tambah Alat" */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <H4>Tambah Alat</H4>
            <Stack spacing={2}>
              {/* Nama Alat */}
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography
                  variant="h6"
                  component="h6"
                  sx={{ minWidth: "150px", fontSize: "1rem" }}
                >
                  Nama Alat
                </Typography>

                <Autocomplete
                  options={nama_alat_options}
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

              {/* IMEI */}
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
                  value={imei}
                  onChange={(e) => setImei(e.target.value)}
                />
              </Stack>

              {/* Seri Alat */}
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
                  value={seri}
                  onChange={(e) => setSeri(e.target.value)}
                />
              </Stack>

              {/* Tanggal Produksi */}
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography
                  variant="h6"
                  component="h6"
                  sx={{ minWidth: "150px", fontSize: "1rem" }}
                >
                  Tanggal Produksi
                </Typography>

                <TextField
                  label="Tanggal Produksi"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ width: 500 }}
                />
              </Stack>

              {/* Status Alat */}
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography
                  variant="h6"
                  component="h6"
                  sx={{ minWidth: "150px", fontSize: "1rem" }}
                >
                  Status Alat
                </Typography>

                <Autocomplete
                  sx={{ width: 500 }}
                  options={status_alat_options}
                  getOptionLabel={(option) => option.label}
                  value={statusAlat}
                  onChange={(e, newValue) => setStatusAlat(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Status Alat"
                      variant="outlined"
                    />
                  )}
                />
              </Stack>

              {/* Gambar */}
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography
                  variant="h6"
                  component="h6"
                  sx={{ minWidth: "150px", fontSize: "1rem" }}
                >
                  Gambar
                </Typography>

                <TextField
                  label="URL Gambar"
                  variant="outlined"
                  sx={{ width: 500 }}
                  value={gambar}
                  onChange={(e) => setGambar(e.target.value)}
                />
              </Stack>
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              sx={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 5,
              }}
            >
              <Button variant="contained" color="error" onClick={handleReset}>
                Reset
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={handleTambahAlat}
              >
                Simpan
              </Button>
            </Stack>
          </Box>
        </Modal>

        {/* Modal untuk Edit Alat */}
        <Modal
          open={editOpen}
          onClose={handleEditClose}
          aria-labelledby="modal-edit-title"
          aria-describedby="modal-edit-description"
        >
          <Box sx={style}>
            <H4>Edit Alat</H4>
            <Stack spacing={2}>
              {/* Nama Alat */}
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography
                  variant="h6"
                  component="h6"
                  sx={{ minWidth: "150px", fontSize: "1rem" }}
                >
                  Nama Alat
                </Typography>

                <Autocomplete
                  options={nama_alat_options}
                  getOptionLabel={(option) => option.label}
                  value={editNamalat}
                  onChange={(e, newValue) => setEditNamalat(newValue)}
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

              {/* IMEI (Read-Only) */}
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
                  value={currentAlat?.imei || ""}
                  disabled
                />
              </Stack>

              {/* Seri Alat */}
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
                  value={editSeri}
                  onChange={(e) => setEditSeri(e.target.value)}
                />
              </Stack>

              {/* Tanggal Produksi */}
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography
                  variant="h6"
                  component="h6"
                  sx={{ minWidth: "150px", fontSize: "1rem" }}
                >
                  Tanggal Produksi
                </Typography>

                <TextField
                  label="Tanggal Produksi"
                  type="date"
                  value={editDate}
                  onChange={(e) => setEditDate(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ width: 500 }}
                />
              </Stack>

              {/* Status Alat */}
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography
                  variant="h6"
                  component="h6"
                  sx={{ minWidth: "150px", fontSize: "1rem" }}
                >
                  Status Alat
                </Typography>

                <Autocomplete
                  sx={{ width: 500 }}
                  options={status_alat_options}
                  getOptionLabel={(option) => option.label}
                  value={editStatusAlat}
                  onChange={(e, newValue) => setEditStatusAlat(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Status Alat"
                      variant="outlined"
                    />
                  )}
                />
              </Stack>

              {/* Gambar */}
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography
                  variant="h6"
                  component="h6"
                  sx={{ minWidth: "150px", fontSize: "1rem" }}
                >
                  Gambar
                </Typography>

                <TextField
                  label="URL Gambar"
                  variant="outlined"
                  sx={{ width: 500 }}
                  value={editGambar}
                  onChange={(e) => setEditGambar(e.target.value)}
                />
              </Stack>
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              sx={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 5,
              }}
            >
              <Button
                variant="contained"
                color="error"
                onClick={handleEditClose}
              >
                Batal
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={handleUpdateAlat}
              >
                Update
              </Button>
            </Stack>
          </Box>
        </Modal>

        {/* Modal untuk Lihat Alat */}
        <Modal
          open={viewOpen}
          onClose={handleViewClose}
          aria-labelledby="modal-view-title"
          aria-describedby="modal-view-description"
        >
          <Box sx={style}>
            <H4>Detail Alat</H4>
            {viewAlat && (
              <Stack spacing={2}>
                <Typography>
                  <strong>Nama Alat:</strong> {viewAlat.namaalat}
                </Typography>
                <Typography>
                  <strong>IMEI:</strong> {viewAlat.imei}
                </Typography>
                <Typography>
                  <strong>Seri Alat:</strong> {viewAlat.seri}
                </Typography>
                <Typography>
                  <strong>Tanggal Produksi:</strong> {viewAlat.tanggal}
                </Typography>
                <Typography>
                  <strong>Status Alat:</strong> {viewAlat.status}
                </Typography>
                <Typography>
                  <strong>Gambar:</strong>{" "}
                  {viewAlat.gambar ? (
                    <img
                      src={viewAlat.gambar} // Gunakan URL gambar langsung
                      alt="Gambar Alat"
                      width="100"
                    />
                  ) : (
                    "-"
                  )}
                </Typography>
              </Stack>
            )}
            <Stack
              direction="row"
              spacing={2}
              sx={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 5,
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleViewClose}
              >
                Tutup
              </Button>
            </Stack>
          </Box>
        </Modal>

        {/* Table and Pagination */}
        <Stack spacing={2}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">No</TableCell>
                  <TableCell align="center">Gambar</TableCell>
                  <TableCell align="center">Nama Alat</TableCell>
                  <TableCell align="center">IMEI</TableCell>
                  <TableCell align="center">Seri Alat</TableCell>
                  <TableCell align="center">Tanggal Produksi</TableCell>
                  <TableCell align="center">Status Alat</TableCell>
                  <TableCell align="center">Aksi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentRows.map((row, index) => (
                  <TableRow
                    key={row.imei}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {indexOfFirstRow + index + 1}
                    </TableCell>
                    <TableCell align="center">
                      {row.gambar ? (
                        <img
                          src={row.gambar} // Gunakan URL gambar langsung
                          alt="Gambar Alat"
                          width="50"
                        />
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell align="center">{row.namaalat}</TableCell>
                    <TableCell align="center">{row.imei}</TableCell>
                    <TableCell align="center">{row.seri}</TableCell>
                    <TableCell align="center">{row.tanggal}</TableCell>
                    <TableCell align="center">{row.status}</TableCell>
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
                        <Button
                          color="info"
                          sx={{ flex: 1 }}
                          onClick={() => handleViewOpen(row)}
                        >
                          <VisibilityIcon />
                        </Button>
                        <Button
                          color="warning"
                          sx={{ flex: 1 }}
                          onClick={() => handleEditOpen(row)}
                        >
                          <EditIcon />
                        </Button>
                        <Button
                          color="error"
                          sx={{ flex: 1 }}
                          onClick={() => handleDeleteAlat(row.imei)}
                        >
                          <DeleteIcon />
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
                {currentRows.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      Tidak ada data
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
            color="primary"
            showFirstButton
            showLastButton
            sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
          />
        </Stack>
      </Stack>
    </Container>
  );
};

export default Kelola_Alat;
