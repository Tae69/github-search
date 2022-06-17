import { Card, CardContent, Typography, IconButton } from "@mui/material"
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';
import Image from "next/image";
import { GitHubUser } from "../utils/githubApi";
import styles from './PlaceholderUserCard.module.css';

export const PlaceholderUserCard = () => {
	return (
		<Card>
			<CardContent sx={{ padding: '4px !important' }} className={styles.animatedBackground}>
				<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<div style={{ width: 50, height: 50, backgroundColor: '#b0bcc9' }}></div>
					<div style={{ marginLeft: '0.5rem', minWidth: 0, flex: 1 }}>
						<div style={{ marginBottom: '4px', height: '1rem', backgroundColor: '#b3b3b3' }}>
						</div>
						<div style={{ marginBottom: '4px', height: '0.7rem', backgroundColor: 'lightgray', width: '40%' }}>
						</div>
						<div style={{ marginBottom: '4px', height: '0.7rem', backgroundColor: 'lightgray', width: '40%' }}>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>

	)
}