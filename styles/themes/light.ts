import { createTheme } from "@mui/material";

const lightTheme = createTheme({
	palette: {
		mode: 'light',
		background: {
			default: '#efeeee'
		},
	},
	components: {
		MuiContainer: {
			styleOverrides: {
				root: {
					background: 'white'
				}
			}
		}
	}
});

export default lightTheme;