import LoopIcon from '@mui/icons-material/Loop';
import { SvgIconProps } from '@mui/material';
import styles from './Loading.module.css';

export const Loading = (props: SvgIconProps) => {
	return (
		<div className={styles.rotate}>
			<LoopIcon {...props} />
		</div>
	)
}