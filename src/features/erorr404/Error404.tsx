import React from 'react';
import {Box} from "@mui/material";

export const Error404 = () => {
    return (
        <Box sx={{
            margin: "60px auto 0 auto",
            textAlign: "center",
            fontSize: "26px",
            fontWeight: "600",
            color: "var(--text-color1)"
        }}>
            Error404 - Content not found!
        </Box>
    );
};
