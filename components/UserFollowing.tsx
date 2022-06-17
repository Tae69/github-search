import React, { useState } from 'react';
import { Grid, Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { getUserFollowing, GetUserResponse, HttpError } from "../utils/githubApi";
import { UserCard } from './UserCard';

type Props = {
	user: GetUserResponse
}

export const UserFollowing = ({ user }: Props) => {
	const [following, setFollowing] = useState<GetUserResponse[]>([]);
	const [error, setError] = useState('');

	useEffect(() => {
		async function fetch() {
			try {
				const data = await getUserFollowing(user.login);
				setFollowing(data);
			}
			catch (err) {
				if (err instanceof HttpError) {
					setError(err.message);
				}
				else {
					setError('Unexpected error occurred, please try again')
				}
			}
		}

		fetch();
	}, []);

	if (error) {
		return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
			<Typography>{error}</Typography>
		</Box>
	}

	return (
		<Grid container spacing={2} sx={{ mt: 0 }}>
			{
				following.map(user => (
					<Grid item xs={6} key={user.login}>
						<UserCard user={user} />
					</Grid>
				))
			}
		</Grid>
	);
}