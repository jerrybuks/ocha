
import { withStyles } from '@material-ui/core/styles';
import { Button} from '@material-ui/core';

export const PrimaryButton = withStyles((theme => ({
	root: {
	  backgroundColor: theme.palette.primary.main,
	  color: theme.palette.common.white,
	  height: "inherit",
	  maxHeight: "3rem",
	  minWidth: "6rem",

	  '&:hover': {
		backgroundColor: theme.palette.primary.light,
	 },
	 '&:disabled': {
		backgroundColor: theme.palette.primary.light,
		 color: theme.palette.common.white,

	 },
	},
  })))(Button);