import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Card, Grid, TextField, Box, styled, useTheme, Checkbox } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Formik } from "formik";
import * as Yup from "yup";

import useAuth from "app/hooks/useAuth";
import { Paragraph } from "app/components/Typography";

// STYLED COMPONENTS
const FlexBox = styled(Box)(() => ({
  display: "flex"
}));

const ContentBox = styled("div")(() => ({
  height: "auto",
  minHeight: "300px",
  padding: "32px",
  position: "relative",
  background: "rgba(0, 0, 0, 0.01)",
}));

const StyledRoot = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#00A3D9",
  minHeight: "100vh",
  padding: "1rem",

  "& .card": {
    maxWidth: 800,
    height: "auto",
    minHeight: 400,
    margin: "1rem",
    display: "flex",
    flexDirection: "column",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  ".img-wrapper": {
    width: "100%",
    textAlign: "center",
    marginTop: "-1.5rem",
    marginBottom: "-7rem",
  }
}));

// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be 6 character length")
    .required("Password is required!"),
  email: Yup.string().email("Invalid Email address").required("Email is required!")
});

export default function JwtLogin() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
        await login(values.email, values.password);
        navigate("/dashboard/client"); // Arahkan ke halaman lain setelah login berhasil
    } catch (e) {
        setLoading(false);
        console.error("Login failed:", e); // Tampilkan kesalahan di konsol
        alert(e.message || "Login failed!"); // Tampilkan pesan kesalahan
    }
  };


  return (
    <StyledRoot>
      <Card className="card">
        <Grid container spacing={3} direction="column" alignItems="center">
          <Grid item xs={12} sm={6}>
            <div className="img-wrapper">
              <img src="/assets/images/illustrations/truck.svg" width="80%" alt="Truck Illustration" />
            </div>
          </Grid>

          <Grid item xs={12} sm={6}>
            <ContentBox>
              <Formik
                initialValues={{ email: "", password: "", remember: true }} // Inisialisasi dengan nilai kosong
                onSubmit={handleFormSubmit}
                validationSchema={validationSchema}>
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      size="small"
                      type="email"
                      name="email"
                      label="Email"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.email}
                      onChange={handleChange}
                      helperText={touched.email && errors.email}
                      error={Boolean(errors.email && touched.email)}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      name="password"
                      type="password"
                      label="Password"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.password}
                      onChange={handleChange}
                      helperText={touched.password && errors.password}
                      error={Boolean(errors.password && touched.password)}
                      sx={{ mb: 1.5 }}
                    />

                    <FlexBox justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                      <FlexBox alignItems="center" gap={1}>
                        <Checkbox
                          size="small"
                          name="remember"
                          onChange={handleChange}
                          checked={values.remember}
                          sx={{ padding: 0 }}
                        />
                        <Paragraph sx={{ color: "#70777E" }}>Remember Me</Paragraph>
                      </FlexBox>

                      <NavLink
                        to="/session/forgot-password"
                        style={{ color: theme.palette.primary.main }}>
                        Forgot password?
                      </NavLink>
                    </FlexBox>

                    <LoadingButton
                      type="submit"
                      color="primary"
                      loading={loading}
                      variant="contained"
                      fullWidth
                      sx={{ my: 2 }}>
                      Login
                    </LoadingButton>
                  </form>
                )}
              </Formik>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
    </StyledRoot>
  );
}
