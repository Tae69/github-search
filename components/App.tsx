import { useEffect } from 'react';
import lightTheme from '../styles/themes/light';
import darkTheme from '../styles/themes/dark';
import { CssBaseline, ThemeProvider } from '@mui/material';
import NextNProgress from "nextjs-progressbar";

import { loadFromStorage as loadTheme, selectTheme, Theme } from '../features/theme';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { AppProps } from 'next/app';
import { loadFromStorage as loadFavorites } from '../features/users';

type Props = Pick<AppProps, 'Component' | 'pageProps'>;

export const App = ({ Component, pageProps }: Props) => {
	const selectedTheme = useAppSelector(selectTheme);

	const theme = selectedTheme === Theme.light ? lightTheme : darkTheme;

	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(loadFavorites());
		dispatch(loadTheme());
	}, [])

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline enableColorScheme />
			<NextNProgress options={{ showSpinner: false }} color={theme.palette.primary.main} />
			<Component {...pageProps} />
		</ThemeProvider>
	)
}