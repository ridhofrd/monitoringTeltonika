import { Fragment } from "react";
import { Card, Grid, styled, useTheme } from "@mui/material";
import RowCards from "./shared/RowCards";
import StatCards from "./shared/StatCards";
import Campaigns from "./shared/Campaigns";
import StatCards2 from "./shared/StatCards2";
import DoughnutChart from "./shared/Doughnut";
import UpgradeCard from "./shared/UpgradeCard";
import TopSellingTable from "./shared/TopSellingTable";

// STYLED COMPONENTS
const ContentBox = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

const Title = styled("span")(() => ({
  fontSize: "1rem",
  fontWeight: "500",
  marginRight: ".5rem",
  textTransform: "capitalize",
}));

const SubTitle = styled("span")(({ theme }) => ({
  fontSize: "0.875rem",
  color: theme.palette.text.secondary,
}));

const H4 = styled("h4")(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: "500",
  marginBottom: "16px",
  textTransform: "capitalize",
  color: theme.palette.text.secondary,
}));

export default function Analytics() {
  const { palette } = useTheme();

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
                    options={nama_alat}
                    getOptionLabel={(option) => option.label}
                    value={namalat}
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
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Stack>
    </Container>
  );
}
