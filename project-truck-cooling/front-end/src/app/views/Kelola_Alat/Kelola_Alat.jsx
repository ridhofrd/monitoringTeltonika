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
import { useDispatch, useSelector } from "react-redux";
import { getAlat } from "app/store/features/dataSlice";
import axios from "axios";
//import { DataGrid } from "@mui/x-data-grid";

function createData(no, gambar, nama, imei, seri, tanggal, status) {
  return { no, gambar, nama, imei, seri, tanggal, status };
}

const Kelola_Alat = () => {
  const rows = [
    createData(
      1,
      " ",
      "TET-0001",
      9087657899,
      "TCL1-2024",
      "22 Aug 2024",
      "Disewa"
    ),
    createData(
      2,
      " ",
      "TEC-0001",
      8978798772,
      "TCL1-2024",
      "20 Aug 2024",
      "Tersedia"
    ),
    createData(
      3,
      " ",
      "TET-0002",
      1234567890,
      "TCL1-2024",
      "22 Aug 2024",
      "Rusak"
    ),
    createData(
      4,
      " ",
      "TET-0003",
      2234567890,
      "TCL1-2024",
      "23 Aug 2024",
      "Tersedia"
    ),
    createData(
      5,
      " ",
      "TEC-0002",
      3234567890,
      "TCL1-2024",
      "24 Aug 2024",
      "Disewa"
    ),
    createData(
      6,
      " ",
      "TEC-0003",
      4234567890,
      "TCL1-2024",
      "25 Aug 2024",
      "Rusak"
    ),
    createData(
      7,
      " ",
      "TET-0004",
      5234567890,
      "TCL1-2024",
      "26 Aug 2024",
      "Tersedia"
    ),
    // Tambahkan data lain jika diperlukan
  ];

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

  const nama_alat = [
    { id: "TET", label: "TET- " },
    { id: "TEC", label: "TEC- " },
  ];

  const status_alat = [
    { id: "tersedia", label: "Tersedia" },
    { id: "disewa", label: "Disewa" },
    { id: "rusak", label: "Rusak" },
  ];

  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.data);

  const { palette } = useTheme();
  const [open, setopen] = React.useState(false);
  const handleOpen = () => setopen(true);
  const handleClose = () => setopen(false);
  const [namalat, setnamalat] = useState("");
  const [StatusAlat, setStatusAlat] = useState("");
  const [date, setDate] = useState("");
  const [inputValue, setinputvalue] = useState("");

  // Added state for search term and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Filter rows based on search term
  const filteredRows = rows.filter((row) =>
    row.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredRows.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
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
              setCurrentPage(1); // Reset to first page when search term changes
            }}
            sx={{ width: 300 }}
          />
        </Stack>

        {/* Modal for "Tambah Alat" */}
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
                  onChange={(e, newValue) => setnamalat(newValue)}
                  inputValue={inputValue}
                  onInputChange={(e, newInputValue) =>
                    setinputvalue(newInputValue)
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
                  id="modal-modal-title"
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
                  id="modal-modal-title"
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
                  id="modal-modal-title"
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

              <Stack direction="row" spacing={2} alignItems="center">
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h6"
                  sx={{ minWidth: "150px", fontSize: "1rem" }}
                >
                  Status Alat
                </Typography>

                <Autocomplete
                  sx={{ width: 500 }}
                  options={status_alat}
                  getOptionLabel={(option) => option.label}
                  value={StatusAlat}
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

              <Stack direction="row" spacing={2} alignItems="center">
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h6"
                  sx={{ minWidth: "150px", fontSize: "1rem" }}
                >
                  Gambar
                </Typography>

                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  sx={{ width: 150, height: 50 }}
                >
                  Pilih Gambar
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(e) => console.log(e.target.files)}
                    multiple
                  />
                </Button>
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
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {indexOfFirstRow + index + 1}
                    </TableCell>
                    <TableCell align="center">{row.gambar}</TableCell>
                    <TableCell align="center">{row.nama}</TableCell>
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
