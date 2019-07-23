export default {
  palette: {
    common: {
      black: "#000",
      white: "#fff"
    },
    background: {
      paper: "#fff",
      default: "#f8fcfd"
    },
    secondary: {
      light: "#7986cb",
      main: "rgba(98, 0, 234, 1)",
      dark: "rgba(49, 1, 117, 1)",
      contrastText: "#fff"
    },
    primary: {
      light: "rgba(40, 255, 97, 1)",
      main: "rgba(40, 167, 69, 1)",
      dark: "rgba(2, 73, 19, 1)",
      contrastText: "#fff"
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fff"
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)"
    }
  },
  overrides: {
    MuiInputAdornment: {
      root: {
        marginBottom: "10px"
      }
    },

    MuiDivider: {
      root: {
        marginTop: 1
      }
    }
  }
};
