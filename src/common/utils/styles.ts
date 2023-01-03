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
                    fontSize: 16,
                    textTransform: "none",
                },
            },
            styleOverrides: {
                root: {
                    backgroundColor: "var(--button-color1)",
                    borderRadius: "100vh",
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
            styleOverrides: {
                root: {
                    "&.Mui-focused": {
                    },
                    "&.MuiInput-root:after": {
                        borderBottomColor: "var(--text-color3)"
                    },
                }
            },
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    "&.MuiInputLabel-root.Mui-focused": {
                        color: "var(--text-color3)",
                    }
                }
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                   "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                    //    () => ({
                    //     ...(mode === "light" && { borderColor: "#858585" }),
                    //     ...(mode === "dark" && { borderColor: "#858585" }),
                    // }),
                       {
                           borderColor: "var(--button-color1)",
                       }
                }
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
        MuiDialog: {
            styleOverrides: {
                root: {
                    ".MuiDialog-paper": {
                        minHeight: 50,
                    }
                }

            },
        },
        MuiDialogTitle: {
            styleOverrides: {
                root: { fontSize: 18 },
            },
        },
        MuiDialogContent: {
            styleOverrides: {
                root: {
                    paddingTop: 36,
                    paddingBottom: 36,
                    minWidth: 395,
                    minHeight: 50,
                },
            },
            defaultProps: {
                sx: {
                    wordBreak: "break-all",
                },
            },
        },
        MuiDialogActions: {
            styleOverrides: {
                root: {
                    display: "flex",
                    justifyContent: "space-between",

                    padding: "10px 0",
                },
            },
        },
        MuiContainer: {
            defaultProps: {
                sx: {
                    backgroundColor: "var(--bg2)",
                },
            },
        },
        MuiDialogContentText: {
            styleOverrides: {
                root: {
                    display: "flex",
                    justifyContent: "space-between",

                    margin: "0 0 20px 0",
                },
            },
        },
    },
});

