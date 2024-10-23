import { Fragment, useState } from "react";
import { Autocomplete, Card, Grid, Stack, styled, TextField, useTheme } from "@mui/material";

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

const clients = [
  { label: "PT Hangcun", id: "PT Hangcun" },
  { label: "PT Maju Mundur", id: "PT Maju Mundur" },
  { label: "PT Maju Bersama", id: "PT Maju Bersama" }
];

const data_alat = [
  { label: "ALT-0001 (Hangcun Cold Storage-01)", id: "ALT-0001" },
  { label: "ALC-0001 (Maju MundurTruck Cooling-01)", id: "ALC-0001" },
  { label: "ALT-0002 (Maju Bersama Cold Storage)", id: "ALT-0002" }
];

export default function Analytics() {
  const { palette } = useTheme();
  const [client, setClient] = useState(null);
  const [alat, setAlat] = useState(null);

  return (
    <Container>
      <H4>Laporan</H4>
      <Stack spacing={2}>
        <Stack direction="row" spacing={2}>
        <Autocomplete
            options={clients}
            getOptionLabel={(option) => option.label}
            value={client}
            onChange={(e, newValue) => setClient(newValue)}
            renderInput={(params) => <TextField {...params} label="Klien" variant="outlined" />}
            sx={{ width: 300 }}
          />
        <Autocomplete
            options={data_alat}
            getOptionLabel={(option) => option.label}
            value={alat}
            onChange={(e, newValue) => setAlat(newValue)}
            renderInput={(params) => <TextField {...params} label="Alat" variant="outlined" />}
            sx={{ width: 300 }}
          />
        </Stack>
      </Stack>
    </Container>
  );
}
