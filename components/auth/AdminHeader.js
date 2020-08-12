import { Box, Typography } from "@material-ui/core";

export default function AdminHeader({ children }) {
  return (
    <Typography component="div" variant="h3">
      <Box
        p={4}
        mb={4}
        boxShadow={2}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {children}
      </Box>
    </Typography>
  );
}
