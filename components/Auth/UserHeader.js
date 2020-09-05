import { Box, Typography } from "@material-ui/core";

export default function UserHeader(props) {
  const { headerMessage } = props;
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
        {headerMessage}
      </Box>
    </Typography>
  );
}
