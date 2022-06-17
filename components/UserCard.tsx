import { Card, CardContent, Typography, IconButton } from "@mui/material"
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIconFilled from '@mui/icons-material/Favorite';
import Image from "next/image";
import { getUser, GitHubUser } from "../utils/githubApi";
import { useEffect, useState } from "react";
import { abbreviateNumber } from "../utils/formatter";
import Link from "./Link";
import { useRouter } from "next/router";
import { selectFavorites, toggleFavorite } from "../features/users";
import { useAppDispatch, useAppSelector } from "../utils/hooks";

type Props = {
	keyword?: string;
	user: GitHubUser;
}
export const UserCard = ({ user, keyword }: Props) => {
	const router = useRouter();
	const rule = new RegExp(`(${keyword})`, 'i');
	const [followers, setFollowers] = useState('');
	const [following, setFollowing] = useState('');

	useEffect(() => {
		function fetchFollowers() {
			getUser(user.login).then(user => {
				setFollowers(abbreviateNumber(user.followers));
				setFollowing(abbreviateNumber(user.following));
			}).catch(() => { });
		}

		fetchFollowers();
	}, [user])

	const name = user.login.split(rule).map((value, i) => {
		if (value && value.toLowerCase() !== keyword?.toLowerCase()) {
			return <Typography key={i} sx={{ display: 'inline' }}>
				{value}
			</Typography>
		}

		if (value && value.toLowerCase() === keyword?.toLowerCase()) {
			return <Typography key={i} sx={{ fontWeight: 'bold', display: 'inline' }}>
				{value}
			</Typography>
		}

		return null;
	});

	const dispatch = useAppDispatch();
	const favorites = useAppSelector(selectFavorites);

	function onFavClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, user: GitHubUser) {
		event.stopPropagation();
		dispatch(toggleFavorite(user));
	}

	const isFavorite = favorites.some(f => f.login === user.login);

	return (
		<Card onClick={() => router.push(`/users/${user.login}`)}>
			<CardContent sx={{ padding: '4px !important' }}>
				<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<Image alt={user.login} src={user.avatar_url} loading="lazy" width="50" height="50" />
					<div style={{ marginLeft: '0.5rem', minWidth: 0 }}>
						<div style={{ marginBottom: '4px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
							{name}
						</div>
						<Typography sx={{ fontSize: '0.7rem', lineHeight: '1rem' }}>
							{(followers ? followers : '-') + ' followers'}
						</Typography>
						<Typography sx={{ fontSize: '0.7rem', lineHeight: '1rem' }}>
							{(following ? following : '-') + ' following'}
						</Typography>
					</div>
					<div style={{ alignSelf: 'flex-start', marginLeft: 'auto' }} >
						<IconButton sx={{ padding: '2px' }} onClick={event => onFavClick(event, user)}>
							{!isFavorite
								? <FavoriteIcon fontSize="small" htmlColor='#ea7e91' />
								: <FavoriteIconFilled fontSize="small" htmlColor='#ea7e91' />
							}
						</IconButton>
					</div>

				</div>
			</CardContent>
		</Card>
	)
}