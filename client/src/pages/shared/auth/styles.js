
import { makeStyles } from '@material-ui/core/styles';
import bck from '../../.././assets/signIn-bck.jpg'

export const useStyles = makeStyles((theme) => ({
    signContainer: {
        backgroundImage: `linear-gradient(to right bottom,${theme.palette.primary.light},rgba(0, 0, 0, 0.49)),url(${bck})`,
        maxHeight: '100vh',
        height: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: theme.palette.common.white,
        
    },
    pointerCursor: {
        cursor: 'pointer'
    },
}));

