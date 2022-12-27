import {PaletteMode} from "@mui/material";

export const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
        mode,
        primary: { main: "#366eff" },
    },
    typography: {
        fontFamily: "Montserrat",
    },
    components: {
        MuiButton: {
            defaultProps: {
                sx: {
                    borderRadius: "100vh",
                    textTransform: "none",
                    fontSize: 16,
                },
            },
            styleOverrides: {
                root: {
                    backgroundColor: "var(--button-color1)",
                    "&:hover": {
                        backgroundColor: "var(--button-hover)",
                    },
                }
                // ({ ownerState }: any) => ({
                //     ...(ownerState.variant === "outlined" &&
                //         mode === "light" && { backgroundColor: "#F9F9FA" }),
                //     ...(ownerState.variant === "outlined" &&
                //         mode === "dark" && { color: "#ffffff"}),
                // }),
            },
        },
        MuiInputBase: {
            defaultProps: {
                sx: {
                    fontWeight: 500,
                },
            },
        },
        MuiOutlinedInput: {
            defaultProps: {
                sx: {
                    ...(mode === "light" && { backgroundColor: "#ffffff" }),
                },
            },
        },
        MuiMenuItem: {
            defaultProps: {
                sx: {
                    fontSize: 14,
                },
            },
        },
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    "&.Mui-selected": {
                        backgroundColor: "var(--toggle-button)",
                        color: "var(--text-color3)",
                        cursor: "default",
                        "&:hover": {
                            color: "var(--text-color3)",
                            backgroundColor: "var(--toggle-button-hover)",
                        },
                    },
                }
            },
        },
        MuiToolbar: {
            defaultProps: {
                sx: {
                    padding: "0px !important",
                    "& > div:first-of-type": {
                        flex: "none",
                    },
                    "& > .MuiInputBase-root": {
                        marginRight: 1,
                        ...(mode === "light" && {
                            backgroundColor: "#ffffff",
                            border: "1px solid #D9D9D9",
                            borderRadius: 1,
                        }),
                    },
                },
            },
        },
        MuiTablePagination: {
            defaultProps: {
                sx: {
                    overflow: "unset",
                },
            },
        },
        MuiPagination: {
            defaultProps: {
                sx: {
                    "& button": {
                        borderRadius: 1,
                    },
                },
            },
        },
        MuiTableHead: {
            defaultProps: {
                sx: {
                    backgroundColor: "var(--bg3)",
                    color: "var(--bg3)"
                },
            },
        },
        MuiDialogTitle: {
            styleOverrides: {
                root: { fontSize: 18 },
            },
        },
        MuiDialogContent: {
            styleOverrides: {
                root: { paddingTop: 36, paddingBottom: 36, minWidth: 395 },
            },
            defaultProps: {
                sx: {
                    wordBreak: "break-all",
                },
            },
        },
        MuiContainer: {
            defaultProps: {
                sx: {
                    backgroundColor: "var(--bg1)",
                },
            },
        }
    },
});

