import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Box from "@material-ui/core/Box";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    // alignItems: 'center',
    justifyContent: "center",
    alignItems: "start",
    marginTop: theme.spacing(10),
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 2,2),
    borderRadius: ".5em",
    outline: "none",
    width: "350px"
  },
}));

export default function TransitionsModal(props) {
  const classes = useStyles();
  const { isOpen, setOpen } = props;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {props.children}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen}>
          <div className={classes.paper}>
            <Box textAlign="right" onClick={handleClose} style={{ cursor: "pointer"}}>
              <CloseIcon />
            </Box>
	 	<Box>{props.content}</Box>

          </div>
        </Fade>
      </Modal>
    </div>
  );
}
