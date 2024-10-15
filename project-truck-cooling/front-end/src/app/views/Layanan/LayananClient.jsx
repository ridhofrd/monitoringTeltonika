import { Fragment } from "react";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
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
import SettingsIcon from "@mui/icons-material/Settings";

function createData(no, namaAlat, komoditas, tanggalAwal, tanggalAkhir) {
  return { no, namaAlat ,komoditas, tanggalAwal, tanggalAkhir };
}

const rows = [
  createData(
    1,
    "TEL-0001",
    "Daging segar",
    "22 Aug 2024",
    "22 Aug 2025",
  ),
  createData(
    2,
    "TEL-0002",
    "Es krim",
    "20 Aug 2024",
    "20 Aug 2025",
  ),
  createData(
    3,
    "TEL-0003",
    "Es balok",
    "22 Aug 2024",
    "24 Aug 2025",
  ),
];



const ContentBox = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" }
}));

const Title = styled("span")(() => ({
  fontSize: "1rem",
  fontWeight: "500",
  marginRight: ".5rem",
  textTransform: "capitalize"
}));

const SubTitle = styled("span")(({ theme }) => ({
  fontSize: "0.875rem",
  color: theme.palette.text.secondary
}));

const H4 = styled("h4")(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: "500",
  marginBottom: "16px",
  textTransform: "capitalize",
  color: theme.palette.text.secondary
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1)
}));

export default function LayananClient() {
  const { palette } = useTheme();
  return (
    <Fragment>
      
      <ContentBox className="analytics">
        <H4>Layanan</H4>
        <h3>List penyewaan alat</h3>
             <Stack spacing={2}>
        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: "space-between", alignItems: "baseline" }}
        >
        </Stack>

        <Stack spacing={2}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">No</TableCell>
                  <TableCell align="center">Nama Alat</TableCell>
                  <TableCell align="center">Komoditas</TableCell>
                  <TableCell align="center">Tanggal Awal Sewa</TableCell>
                  <TableCell align="center">Tanggal Akhir sewa</TableCell>
                  <TableCell align="center">Aksi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.no}>
                    <TableCell align="center">{row.no}</TableCell>
                    <TableCell align="center">{row.namaAlat}</TableCell>
                    <TableCell align="center">{row.komoditas}</TableCell>
                    <TableCell align="center">{row.tanggalAwal}</TableCell>
                    <TableCell align="center">{row.tanggalAkhir}</TableCell>
                    <TableCell align="center">
                      <ButtonGroup
                        variant="text"
                        aria-label="Basic button group"
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                       <StyledButton variant="contained" color="primary">
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
        </Stack>
        <StyledButton variant="contained" color="secondary">
              Bantuan
              </StyledButton>
      </ContentBox>
    </Fragment>
  );
}
