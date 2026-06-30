import { Box } from "@mui/material";
import { Header } from "../shared/header";

export const Layout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden",
        background: "url(ow_thumbnail.webp)",
        backgroundSize: "cover",  backgroundPosition: "center", backgroundRepeat: "no-repeat",  backgroundAttachment: "fixed",position:"relative",

      }}
    >
      <Header />

      <Box sx={{ height: "64px" }} />

      <Box
        sx={{
          flex: 1,
          width: "100%",
          maxWidth: "1600px",
          mx: "auto",
          overflowY: "auto",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};