import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Container, Paper } from "@mui/material";
import { SyntheticEvent } from "react";

export enum Route {
	Home = 'HOME',
	Liked = 'LIKED'
}

type Props = {
	activeRoute: Route,
	onChange: (selectedRoute: Route) => void,
}
export const BottomBar = (props: Props) => {
	function onChange(_: SyntheticEvent<Element, Event>, value: Route) {
		props.onChange(value);
	}

	return (
		<Container sx={{ position: 'fixed', left: 0, right: 0, bottom: 0 }} disableGutters maxWidth="sm">
			<BottomNavigation showLabels value={props.activeRoute} onChange={onChange}>
				<BottomNavigationAction value={Route.Home} sx={{ maxWidth: '100%' }} label="Search" icon={<SearchIcon />}></BottomNavigationAction>
				<BottomNavigationAction value={Route.Liked} sx={{ maxWidth: '100%' }} label="Favorites" icon={<FavoriteIcon />}></BottomNavigationAction>
			</BottomNavigation>
		</Container>
	);
};