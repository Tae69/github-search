import { createAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { AppState, AppThunk } from '../store/index';

export enum Theme {
	light = 'LIGHT',
	dark = 'DARK'
}

type ThemeState = {
	theme: Theme
}

const initialState: ThemeState = {
	theme: Theme.light,
}

export const loadFromStorage = createAction('theme/loadFromStorage');

export const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		toggleTheme: (state) => {
			state.theme = state.theme === Theme.light ? Theme.dark : Theme.light;
			localStorage.setItem('theme', state.theme);
		},
	},
	extraReducers(builder) {
		builder.addCase(loadFromStorage, (state) => {
			let theme = Theme.light
			if (typeof localStorage !== undefined) {
				theme = localStorage.getItem('theme') === Theme.dark ? Theme.dark : Theme.light;
			}
			state.theme = theme;
		});
	},
})

export const { toggleTheme } = themeSlice.actions

export const selectTheme = (state: AppState) => state.theme.theme;

export default themeSlice.reducer