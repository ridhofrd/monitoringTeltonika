import { useEffect, useState } from "react";
import {
  Autocomplete,
  Button,
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
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

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
  {
    id: "1",
    nama: "TC-001",
    imei: "2401",
    seri_alat: "TCL 1- 2024",
    tgl_awal: "18/09/2004",
  },
  {
    id: "2",
    nama: "TC-002",
    imei: "2402",
    seri_alat: "TCL 2- 2024",
    tgl_awal: "18/09/2004",
  },
  {
    id: "3",
    nama: "TC-003",
    imei: "2403",
    seri_alat: "TCL 3- 2024",
    tgl_awal: "18/09/2004",
  },
  {
    id: "4",
    nama: "TC-004",
    imei: "2404",
    seri_alat: "TCL 4- 2024",
    tgl_awal: "18/09/2004",
  },
];

const KonfigurasiAlat = () => {
  const [alat, setAlat] = useState("");
  const [gambar, setGambar] = useState("");
  const [dateAwal, setDateAwal] = useState("");
  const [alarmStatus, setAlarmStatus] = useState("tidak_aktif");
  const [noAlarm, setNoAlarm] = useState("");
  const [targetPemasangan, setTargetPemasangan] = useState("");
  const [loading, setLoading] = useState(true);

  return (
    <Container>
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
      <Stack
        direction="row"
        spacing={2}
        alignItems="flex-start"
        sx={{ mb: "40px", mt: "40px" }}
      >
        <Typography variant="h6" sx={{ minWidth: "150px", fontSize: "1rem" }}>
          Target Pemasangan
        </Typography>

        <Stack
          direction="column"
          spacing={2}
          alignItems="flex-start"
          sx={{ mb: "10px" }}
        >
          <RadioGroup
            aria-labelledby="target-pemasangan-radio-group-label"
            name="target-pemasangan-radio-group"
            value={targetPemasangan}
            onChange={(e) => setTargetPemasangan(e.target.value)}
          >
            <FormControlLabel
              value="truck_cooling"
              control={<Radio />}
              label="Truck Cooling"
            />
            <FormControlLabel
              value="cold_storage"
              control={<Radio />}
              label="Cold Storage"
            />
          </RadioGroup>
        </Stack>
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        alignItems="flex-start"
        sx={{ mb: "10px" }}
      >
        <Typography variant="h6" sx={{ minWidth: "150px", fontSize: "1rem" }}>
          Tanggal Pemasangan
        </Typography>

        <TextField
          label="Tanggal Pemasangan"
          type="date"
          value={dateAwal}
          onChange={(e) => setDateAwal(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ width: 300 }}
        />
      </Stack>

      <Stack
        direction="row"
        spacing={2}
        alignItems="flex-start"
        sx={{ mb: "10px" }}
      >
        <Typography variant="h6" sx={{ minWidth: "155px", fontSize: "1rem" }}>
          Foto
        </Typography>
        <TextField
          label="URL Gambar atau Nama File (Jika Lokal)"
          variant="outlined"
          sx={{ width: 500 }}
          value={gambar}
          onChange={(e) => setGambar(e.target.value)}
          helperText={
            gambar.startsWith("http")
              ? "Masukkan URL gambar yang valid"
              : "Jika gambar disimpan secara lokal, masukkan nama file (misalnya: gambar1.jpg)"
          }
        />
      </Stack>

      {targetPemasangan === "truck_cooling" && (
        <Stack
          direction="column"
          spacing={2}
          alignItems="flex-start"
          sx={{ mb: "10px", mt: "40px" }}
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
              Nomor Kendaraan
            </Typography>
            <TextField
              label="No Kendaraan"
              variant="outlined"
              sx={{ width: 500 }}
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
              Jenis Kendaraan
            </Typography>
            <Autocomplete
              sx={{ width: 500 }}
              options={data_alat}
              getOptionLabel={(option) => option.seri_alat}
              value={alat}
              onChange={(e, newValue) => setAlat(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Jenis Kendaraan"
                  variant="outlined"
                />
              )}
            />
          </Stack>
        </Stack>
      )}
      {targetPemasangan === "cold_storage" && (
        <Stack
          direction="column"
          spacing={2}
          alignItems="flex-start"
          sx={{ mb: "10px", mt: "40px" }}
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
              Nama Pemilik
            </Typography>
            <TextField
              label="Nama Pemilik"
              variant="outlined"
              sx={{ width: 500 }}
            />
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            alignItems="flex-start"
            sx={{ mb: "10px", mt: "40px" }}
          >
            <Typography
              variant="h6"
              sx={{ minWidth: "150px", fontSize: "1rem" }}
            >
              Lokasi Pemasangan
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
                  Latitude
                </Typography>
                <TextField
                  label="Latitude"
                  variant="outlined"
                  sx={{ width: 500 }}
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
                  Longitude
                </Typography>
                <TextField
                  label="Longitude"
                  variant="outlined"
                  sx={{ width: 500 }}
                />
              </Stack>
            </Stack>
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
              Alamat
            </Typography>
            <TextField label="Alamat" variant="outlined" sx={{ width: 500 }} />
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
              Kapasitas(Kg)
            </Typography>
            <TextField
              label="Kapasitas (kg)"
              variant="outlined"
              sx={{ width: 500 }}
            />
          </Stack>
        </Stack>
      )}
      <Stack
        direction="row"
        spacing={20}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 5,
        }}
      >
        <Button variant="contained" color="error" onClick={null}>
          Reset
        </Button>
        <Button variant="contained" color="success" onClick={null}>
          Simpan
        </Button>
      </Stack>
    </Container>
  );
};

export default KonfigurasiAlat;
