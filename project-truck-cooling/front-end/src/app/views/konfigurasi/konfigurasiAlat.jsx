import { useState } from "react";
import {
  Autocomplete,
  Card,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  styled,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

//STYLE

const Container = styled("div")(({ theme }) => ({
  margin: "50px",
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

const data_alat = [
  { id: "1", nama: "TC-001", imei: "2401", seri_alat: "TCL 1- 2024" },
  { id: "2", nama: "TC-002", imei: "2402", seri_alat: "TCL 2- 2024" },
  { id: "3", nama: "TC-003", imei: "2403", seri_alat: "TCL 3- 2024" },
  { id: "4", nama: "TC-004", imei: "2404", seri_alat: "TCL 4- 2024" },
];

const KonfigurasiAlat = () => {
  const { palette } = useTheme();

  const [alat, setAlat] = useState("");
  const [dateAwal, setDateAwal] = useState("");
  const [alarmStatus, setAlarmStatus] = useState("tidak_aktif");
  const [noAlarm, setNoAlarm] = useState("");

  return (
    <Container>
      <H4>Informasi Alat</H4>
      <H4>Informasi Alat</H4>
      <H4>Informasi Alat</H4>

      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{ mb: "10px" }}
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          components="h6"
          sx={{ minWidth: "150px", fontSize: "1rem" }}
        >
          Nama_Alat
        </Typography>

        <Autocomplete
          sx={{ width: 500 }}
          options={data_alat}
          getOptionLabel={(option) => option.nama}
          value={alat}
          onChange={(e, newValue) => setAlat(newValue)}
          renderInput={(params) => (
            <TextField {...params} label="Nama Alat" variant="outlined" />
          )}
        />
      </Stack>

      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{ mb: "10px" }}
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          components="h6"
          sx={{ minWidth: "150px", fontSize: "1rem" }}
        >
          IMEI
        </Typography>

        <Autocomplete
          sx={{ width: 500 }}
          options={data_alat}
          getOptionLabel={(option) => option.imei}
          value={alat}
          onChange={(e, newValue) => setAlat(newValue)}
          renderInput={(params) => (
            <TextField {...params} label="IMEI" variant="outlined" />
          )}
        />
      </Stack>

      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{ mb: "15px" }}
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          components="h6"
          sx={{ minWidth: "150px", fontSize: "1rem" }}
        >
          Seri Alat
        </Typography>

        <Autocomplete
          sx={{ width: 500 }}
          options={data_alat}
          getOptionLabel={(option) => option.seri_alat}
          value={alat}
          onChange={(e, newValue) => setAlat(newValue)}
          renderInput={(params) => (
            <TextField {...params} label="Seri Alat" variant="outlined" />
          )}
        />
      </Stack>

      <Stack direction="row" spacing={3} sx={{ mb: "10px" }}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          components="h6"
          sx={{ minWidth: "140px", fontSize: "1rem" }}
        >
          Tanggal Sewa
        </Typography>

        <TextField
          label="Tanggal Awal"
          type="date"
          value={dateAwal}
          onChange={(e) => setDateAwal(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ width: 300 }}
        />

        <TextField
          label="Tanggal Akhir"
          type="date"
          value={dateAwal}
          onChange={(e) => setDateAwal(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ width: 300 }}
        />
      </Stack>

      <Stack direction="row" spacing={3} sx={{ mb: "10px" }}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          components="h6"
          sx={{ minWidth: "140px", fontSize: "1rem" }}
        >
          Lama Sewa
        </Typography>

        <TextField
          label="Tanggal Awal"
          type="date"
          value={dateAwal}
          onChange={(e) => setDateAwal(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ width: 300 }}
        />
      </Stack>

      <H4>Konfigurasi Alat</H4>

      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{ mb: "10px" }}
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          components="h6"
          sx={{ minWidth: "150px", fontSize: "1rem" }}
        >
          Label Alat
        </Typography>
        <TextField label="Label Alat" variant="outlined" sx={{ width: 500 }} />
      </Stack>

      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{ mb: "10px" }}
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          components="h6"
          sx={{ minWidth: "150px", fontSize: "1rem" }}
        >
          Pilih Icon.
        </Typography>
        <TextField label="Icon" variant="outlined" sx={{ width: 500 }} />
      </Stack>

      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{ mb: "10px" }}
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          components="h6"
          sx={{ minWidth: "150px", fontSize: "1rem" }}
        >
          Batas Atas Suhu
        </Typography>
        <TextField variant="outlined" sx={{ width: 100 }} />
        <Typography
          id="modal-modal-title"
          variant="h6"
          components="h6"
          sx={{ minWidth: "auto", fontSize: "13px" }}
        >
          Celcius
        </Typography>
      </Stack>

      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{ mb: "10px" }}
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          components="h6"
          sx={{ minWidth: "150px", fontSize: "1rem" }}
        >
          Batas Bawah Suhu
        </Typography>
        <TextField variant="outlined" sx={{ width: 100 }} />

        <Typography
          id="modal-modal-title"
          variant="h6"
          components="h6"
          sx={{ minWidth: "auto", fontSize: "13px" }}
        >
          Celcius
        </Typography>
      </Stack>

      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{ mb: "10px" }}
      >
        <Typography variant="h6" sx={{ minWidth: "150px", fontSize: "1rem" }}>
          Alarm
        </Typography>

        <RadioGroup
          row
          aria-labelledby="alarm-radio-group-label"
          name="alarm-radio-group"
          value={alarmStatus}
          onChange={(e) => setAlarmStatus(e.target.value)}
        >
          <FormControlLabel value="aktif" control={<Radio />} label="Aktif" />
          <FormControlLabel
            value="tidak_aktif"
            control={<Radio />}
            label="Tidak Aktif"
          />
        </RadioGroup>
      </Stack>

      {alarmStatus === "aktif" && (
        <Stack
          direction="row"
          spacing={2}
          alignItems="flex-start"
          sx={{ mb: "10px" }}
        >
          <Typography variant="h6" sx={{ minWidth: "150px", fontSize: "1rem" }}>
            Kirim Notif Alarm
          </Typography>

          <Stack
            direction="column"
            spacing={2}
            alignItems="flex-start"
            sx={{ mb: "10px" }}
          >
            <Stack
              direction="row"
              spacing={2}
              alignItems="flex-start"
              sx={{ mb: "10px" }}
            >
              <Typography
                variant="h6"
                sx={{ minWidth: "150px", fontSize: "1rem" }}
              >
                Nama Penerima
              </Typography>
              <TextField
                label="Nama Penerima"
                variant="outlined"
                sx={{ width: 500 }}
                value={noAlarm}
                onChange={(e) => setNoAlarm(e.target.value)}
              />
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              alignItems="flex-start"
              sx={{ mb: "10px" }}
            >
              <Typography
                variant="h6"
                sx={{ minWidth: "150px", fontSize: "1rem" }}
              >
                Nomor WhatsApp
              </Typography>
              <TextField
                label="Nomor WhatsApp"
                variant="outlined"
                sx={{ width: 500 }}
                value={noAlarm}
                onChange={(e) => setNoAlarm(e.target.value)}
              />
            </Stack>
          </Stack>
        </Stack>
      )}
    </Container>
  );
};

export default KonfigurasiAlat;
