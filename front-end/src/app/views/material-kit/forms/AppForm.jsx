import { Stack } from "@mui/material";
import { Box, styled } from "@mui/material";
import { SimpleCard } from "app/components";
import SimpleForm from "./SimpleForm";
// import StepperForm from "./StepperForm";

// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));


const H4 = styled("h4")(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: "500",
  marginBottom: "16px",
  textTransform: "capitalize",
  color: theme.palette.text.primary
}));

export default function AppForm() {
  return (
    <Container>
      <Box className="breadcrumb">
        <H4>Riwayat</H4>
      </Box>

      <Stack spacing={3}>
        <SimpleCard>
          <SimpleForm />
        </SimpleCard>

        {/* <SimpleCard title="stepper form"> */}
          {/* <StepperForm /> */}
        {/* </SimpleCard> */}
      </Stack>
    </Container>
  );
}
