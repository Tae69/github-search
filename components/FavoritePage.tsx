import { Box, Container, Grid, Typography } from "@mui/material";
import { UserCard } from "../components/UserCard";
import styles from '../styles/index.module.css';
import GroupIcon from '@mui/icons-material/Group';
import { GitHubUser } from "../utils/githubApi";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { loadFromStorage, selectFavorites, toggleFavorite } from "../features/users";
import { useEffect } from "react";

const Favorites = () => {
	const favorites = useAppSelector(selectFavorites);

	return (
		<>
			{favorites.length === 0 && (
				<Box className={`${styles.box} ${styles.boxDescription}`}>
					<div className={styles.description}>
						<GroupIcon />
						<Typography>
							Once you like people, you&apos;ll see them here.
						</Typography>
					</div>
				</Box>
			)}

			{favorites.length > 0 && (
				<Grid container spacing={2}>
					{
						favorites.map(user => (
							<Grid item xs={6} key={user.login}>
								<UserCard key={user.login} user={user} />
							</Grid>
						))
					}
				</Grid>
			)}
		</>
	);
};

export default Favorites;