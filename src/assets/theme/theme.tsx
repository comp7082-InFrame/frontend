import { BorderBottom, BorderColor, Height } from "@mui/icons-material";
import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#38393b",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#7d9198",
      contrastText: "#ffffff",
    },
    background: {
      default: "#38393b",
      paper: "#38393b",
    },
    text: {
      primary: "#ffffff",
      secondary: "#ffffff",
    },
  },
  typography: {
    fontFamily: "var(--main-font-family)",
    h1: {
      fontFamily: "var(--main-font-family)",
      fontSize: "24px",
      fontWeight: "normal",
      letterSpacing: "0",
      lineHeight: "normal",
    },
    h6: {
      fontFamily: "var(--main-font-family)",
      fontSize: "20px",
      fontWeight: "bold",
      lineHeight: "normal",
    },
    body1: {
      fontFamily: "var(--main-font-family)",
      fontSize: "14px",
      fontWeight: "normal",
      letterSpacing: "0",
      lineHeight: "normal",
    },
    body2: {
      fontFamily: "var(--main-font-family)",
      fontSize: "14px",
      fontWeight: "normal",
      letterSpacing: "0",
      lineHeight: "normal",
    },
    button: {
      fontFamily: "var(--main-font-family)",
      backgroundColor: "var(--primary-btn-bg-color)",
      color: "var(--primary-btn-text-color)",
      borderRadius: "5px",
      padding: "5px 10px",
      border: "none",
      textTransform: "none",
      fontSize: "14px",
      fontWeight: "normal",
      "&:hover": {
        backgroundColor: "var(--primary-btn-hover-bg-color)",
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "var(--primary-btn-bg-color)",
          color: "var(--primary-btn-text-color)",
          borderRadius: "5px",
          padding: "5px 10px",
          border: "none",
          textTransform: "none",
          fontSize: "14px",
          fontWeight: "normal",
          "&:hover": {
            boxShadow: "none",
            backgroundColor: "var(--primary-btn-hover-bg-color)",
          },
          "&:active": {
            backgroundColor: "var(--primary-btn-clicked-bg-color)",
            boxShadow: "none",
          },
          boxShadow: "none",
          minWidth: "unset"
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          width: "24px",
          height: "24px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          '.schedule-div &': {
            backgroundColor: "var(--paper-bg-color) !important",
            border: "1px solid var(--paper-border-color)",
            borderRadius: "3px",
            borderLeftWidth: "4px",
            backgroundImage: "none",
            width: "calc(100% - 3px) !important",
            boxShadow: "none",
          }
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "var(--tooltip-bg-color)",
          color: "var(--tooltip-text-color)",
          fontSize: "12px",
          borderRadius: "4px",
        }
      }
    },
    MuiInput: {
      styleOverrides: {
        root: {
          borderColor: "var(--primary-border-color)",
          '&:hover': {
            borderColor: "var(--primary-border-color)",
          },
          color: "var(--primary-text-color)",
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          color: "var(--primary-text-color)",
          '&:hover': {
            borderColor: "var(--primary-border-color)",
          },
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderColor: "var(--primary-border-color)",
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: "var(--primary-border-color)",
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: "var(--primary-border-color)",
          },
          color: "var(--primary-text-color)",
          width: "250px",
          height: "40px",
        }
      }
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          display: "none",
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: "var(--primary-bg-color)",
          color: "var(--primary-text-color)",
        }
      }
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: "20px 40px"
        }
      }
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: "20px 40px"
        }
      }
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: "#4D5D69",
          '&.Mui-expanded': {
            backgroundColor: "#7D9198",
          },
          boxShadow: "none",
          marginBottom: "20px",
          border: "none",
          '&::before': {
            backgroundColor: "transparent"
          },
          '&:first-of-type': {
            borderTopLeftRadius: "0",
            borderTopRightRadius: "0"
          },
          '&:last-of-type': {
            borderBottomLeftRadius: "0",
            borderBottomRightRadius: "0"
          }
        },
        heading: {
          minHeight: "45px",
          display: "inline-flex",
          alignItems: "center",
          width: "100%",
          '& button': {
            display: "flex",
            justifyContent: "space-between"
          }
        }
      }
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
          color: "var(--primary-text-color)",
          padding: "20px 0px 20px 20px"
        }
      }
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          minHeight: "45px",
          "&.Mui-expanded": {
            minHeight: "45px",
            margin: "0px"
          },
          "&.Mui-expanded span": {
            margin: "0px"
          }
        },
        expandIconWrapper: {
          color: "var(--primary-icon-color)"
        }
      }
    },
    MuiIcon: {
      styleOverrides: {
        root: {
          color: "var(--primary-icon-color)"
        }
      }
    },
    MuiTable: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
          color: "var(--primary-text-color)"
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: "var(--primary-text-color)",
          padding: "0px 0px 0px 10px",
          height: "40px",
          '&.MuiTablePagination-root': {
            width: "100%",
            borderBottom: "none"
          },
          paddingRight: "10px"

        }
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#E5E7EB"
        }
      }
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          color: "var(--primary-text-color)",
          minHeight: "30px",
          '&option': {
            color: "#fff"
          }
        }
      }
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          color: "var(--primary-text-color)",
          minHeight: "30px !important",
          border: "none"
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        "@keyframes spin": {
          to: {
            transform: "rotate(1turn)",
          },
        },
        "@keyframes fade-in": {
          "0%": {
            opacity: 0,
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: 1,
            transform: "none",
          },
        },
        "@keyframes fade-up": {
          "0%": {
            opacity: 0,
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: 1,
            transform: "none",
          },
        },
        "@keyframes shimmer": {
          "0%, 90%, 100%": {
            backgroundPosition: "calc(-100% - var(--shimmer-width)) 0",
          },
          "30%, 60%": {
            backgroundPosition: "calc(100% + var(--shimmer-width)) 0",
          },
        },
        "@keyframes marquee": {
          "0%": {
            transform: "translate(0)",
          },
          "100%": {
            transform: "translateX(calc(-100% - var(--gap)))",
          },
        },
        "@keyframes marquee-vertical": {
          "0%": {
            transform: "translateY(0)",
          },
          "100%": {
            transform: "translateY(calc(-100% - var(--gap)))",
          },
        },
        ":root": {
          "--animate-spin": "spin 1s linear infinite",
        },
      },
    },
  }
});

export default theme;