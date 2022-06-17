import { createTheme } from "@mui/material";

const lightTheme = createTheme({
	palette: {
		mode: 'dark',
		background: {
			default: '#000000'
		},
	},
	components: {
		MuiContainer: {
			styleOverrides: {
				root: {
					background: '#1d1d1d'
				}
			}
		}
	}
});

export default lightTheme;