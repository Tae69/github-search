
import { Switch } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useDispatch } from 'react-redux';
import { selectTheme, Theme, toggleTheme } from '../features/theme';
import { useAppSelector } from '../utils/hooks';

export const ThemeToggler = () => {
	const dispatch = useDispatch();
	const theme = useAppSelector(selectTheme);

	function onThemeChange(event: React.ChangeEvent<HTMLInputElement>) {
		dispatch(toggleTheme());
	}

	return (
		<div style={{ display: 'flex', alignItems: 'center' }}>
			<LightModeIcon />
			<Switch onChange={onThemeChange} checked={theme === Theme.dark} />
			<DarkModeIcon />
		</div>
	)
}