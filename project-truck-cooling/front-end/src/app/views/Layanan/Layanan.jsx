import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Grid,
  styled,
  useTheme,
  Stack,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  ButtonGroup,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

function createData(no, no_transaksi, nama, nomor, email, tanggal, status) {
  return { no, no_transaksi, nama, nomor, email, tanggal, status };
}

const rows = [
  createData(
    1,
    "S-123456",
    "PT Huangcun",
    8123465737,
    "info@huangcun.co.id",
    "22 Aug 2024",
    "Disewa"
  ),
  createData(
    2,
    "S-1345678",
    "PT Eskrimku",
    8978798772,
    "eskrimku@gmail.com",
    "20 Aug 2024",
    "Tersedia"
  ),
  createData(
    3,
    "S-145678795",
    "CV Berkah Daging",
    1234567890,
    "berkah@dagingku.id",
    "22 Aug 2024",
    "Rusak"
  ),
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

export default function Layanan() {
  const { palette } = useTheme();
  const navigate = useNavigate();
  
  const handleTambahPenyewaan = () => {
    console.log("Navigasi ke Tambah Penyewaan");  // Debug log
    navigate('/Layanan/admin/tambah');
  };

  return (
    <Container>
      <H4>Layanan</H4>
      <Stack spacing={2}>
        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: "space-between", alignItems: "baseline" }}
        >
          <Button variant="contained" color="success" onClick={handleTambahPenyewaan}>
            Tambah
          </Button>
        </Stack>

        <Stack spacing={2}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">No</TableCell>
                  <TableCell align="center">Nomor Transaksi</TableCell>
                  <TableCell align="center">Nama Klien</TableCell>
                  <TableCell align="center">Nomor Kontak</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Tanggal Transaksi</TableCell>
                  <TableCell align="center">Aksi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.no}>
                    <TableCell align="center">{row.no}</TableCell>
                    <TableCell align="center">{row.no_transaksi}</TableCell>
                    <TableCell align="center">{row.nama}</TableCell>
                    <TableCell align="center">{row.nomor}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">{row.tanggal}</TableCell>
                    <TableCell align="center">
                      <ButtonGroup
                        variant="text"
                        aria-label="Basic button group"
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        <Button color="info">
                          <VisibilityIcon />
                        </Button>
                        <Button color="warning">
                          <EditIcon />
                        </Button>
                        <Button color="error">
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
