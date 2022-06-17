import { createAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { AppState, AppThunk } from '../store/index';
import { GitHubUser, searchUsers } from '../utils/githubApi'

export interface UsersState {
	favorites: GitHubUser[]
}

const initialState: UsersState = {
	favorites: [],
}

export const loadFromStorage = createAction('users/loadFromStorage');

export const counterSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		toggleFavorite: (state, action: PayloadAction<GitHubUser>) => {
			const index = state.favorites.findIndex(f => f.login === action.payload.login);

			if (index > -1) {
				state.favorites.splice(index, 1);
			} else {
				state.favorites.push(action.payload);
			}
		},
	},
	extraReducers(builder) {
		builder.addCase(loadFromStorage, (state) => {
			let favorites = [];
			if (typeof localStorage !== undefined) {
				favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
			}
			state.favorites = favorites;
		});
	},
})

export const { toggleFavorite } = counterSlice.actions

export const selectFavorites = (state: AppState) => state.users.favorites;

export default counterSlice.reducer