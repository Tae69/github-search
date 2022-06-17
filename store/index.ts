import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import usersReducer from '../features/users';
import themeReducer from '../features/theme';


export function makeStore() {
	return configureStore({
		reducer: { users: usersReducer, theme: themeReducer },
	})
}

const store = makeStore()

store.subscribe(() => {
	localStorage.setItem('favorites', JSON.stringify(store.getState().users.favorites));
});

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	AppState,
	unknown,
	Action<string>
>

export default store