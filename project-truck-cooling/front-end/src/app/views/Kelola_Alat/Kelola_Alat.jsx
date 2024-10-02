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
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useDispatch, useSelector } from "react-redux";
import { getAlat } from "app/store/features/dataSlice";
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';

// const getAlat = () => {
// fetch('http://localhost:5000/alat')
//   .then((res) => res.json())
//   .then((json) => console.log(json));
// };

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
      "TET-0001",
      1234567890,
      "TCL1-2024",
      "22 Aug 2024",
      "Rusak"
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

  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.data);

  const { palette } = useTheme();
  const [open, setopen] = React.useState(false);
  const handleOpen = () => setopen(true);
  const handleClose = () => setopen(false);
  const [namalat, setnamalat] = useState("");
  const [StatusAlat, setStatusAlat] = useState("");
  const [date, setDate] = useState("");
  const [inputValue, setinputvalue] = useState({ id: "", label: "" });

  const [alat, setAlat] = useState([]);
  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   dispatch(getAlat())
  // }, [])

  // useEffect(() => {
  //   fetch('http://localhost:3001/clients')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setAlat(data);
  //       console.log(data)
  //     })
  //     .catch((error) => {
  //       console.error("Error", error);
  //     });
  // }, []);

  useEffect(() => {
    fetch("http://localhost:3001/alat")
      .then((response) => response.json())
      .then((data) => {
        // if(data.length>0){
        // }
        setAlat(data);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }, []);

  console.log("tes", alat);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
  ];
  
  // const rowss = [
  //   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  //   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  //   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  //   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  //   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  //   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  //   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  //   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  //   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  // ];

  const rowsss = alat.map((item) => {
    return{
      id_alat: item.id_alat,
      nama: item.namaalat,
      imei: item.imei
    }
  })
  
  const paginationModel = { page: 0, pageSize: 5 };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:3001/alat");
  //       // setAlat(response.data);
  //       console.log(response);
  //       // setAlat(response)
  //       setAlat(Array.isArray(response.data) ? response.data : []);
  //     } catch (err) {
  //       console.error("Error fetching data:", err);
  //       // setError(err.message);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // console.log(alat);

  return (
    <Container>
      <H4>Kelola Alat</H4>
      <Stack spacing={2}>
        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: "space-between", alignItems: "baseline" }}
        >
          <Button variant="contained" color="success" onClick={handleOpen}>
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
                    components="h6"
                    sx={{ minWidth: "150px", fontSize: "1rem" }}
                  >
                    Nama Alat
                  </Typography>
                  <Autocomplete
                    options={alat}
                    getOptionLabel={(option) => option.namaalat}
                    onChange={(event, newValue) => setAlat(newValue)}
                    renderInput={(params) => (
                      <TextField {...params} label="Klien" />
                    )}
                    sx={{ width: 300 }}
                  />
                  <Autocomplete
                    options={alat}
                    getOptionLabel={(option) => option.label}
                    value={alat.namalat}
                    onChange={(e, newValue) => setnamalat(newValue)}
                    inputValue={inputValue}
                    onInputChange={(e, newinputvalue) =>
                      setinputvalue(newinputvalue)
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
                    components="h6"
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
                    components="h6"
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
                    components="h6"
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
                    components="h6"
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
                    components="h6"
                    sx={{ minWidth: "150px", fontSize: "1rem" }}
                  >
                    Gambar
                  </Typography>

                  <Button
                    components="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
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
        </Stack>
        <Stack spacing={2}>
          {/* <TableContainer component={Paper}>
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
                {alat.map((user, index) => (
                  <TableRow
                    key={user.id_alat}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">{user.id_alat}</TableCell>
                    <TableCell align="center">{user.namaalat}</TableCell>
                    <TableCell align="center">{user.imei}</TableCell>
                    <TableCell align="center">{user.namaalat}</TableCell>
                    <TableCell align="center">{user.latitude}</TableCell>
                    <TableCell align="center">{user.statusalat}</TableCell>
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
          </TableContainer> */}
          <Paper sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rowsss}
              columns={columns}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              sx={{ border: 0 }}
            />
          </Paper>
        </Stack>
      </Stack>
    </Container>
  );
};
export default Kelola_Alat;
