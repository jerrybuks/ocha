
import { withStyles } from '@material-ui/core/styles';
import { Button} from '@material-ui/core';

export const PrimaryButton = withStyles((theme => ({
	root: {
	  backgroundColor: theme.palette.primary.main,
	  color: theme.palette.common.white,

	  '&:hover': {
		backgroundColor: theme.palette.primary.light,
	 },
	},
  })))(Button);