import {Box, Container, LinearProgress, styled} from "@mui/material";

export default function LinearIndeterminate() {
    return (
        <Box sx={{width: '100%', position: "absolute", right: "0", top: "60px",}}>
            <LinearProgress/>
        </Box>
    );
}
