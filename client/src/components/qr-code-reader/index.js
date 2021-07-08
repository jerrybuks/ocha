import React, { useState } from "react";
import QrReader from "react-qr-reader";
import { Box, Button, makeStyles } from "@material-ui/core";
import TransitionsModal from "../modal";
import { useDispatch, useSelector } from "react-redux";
import { linkBagToUserStart } from "../../redux/bag/bag.actions";

function QrCodeScanner(props) {
  const [state, setState] = useState("No result");
  const [open, setOpen] = React.useState(false);

console.log("zaaaaaaaaaaaaaa")
  const handleScan = (data) => {
    if (data) {
      console.log(data,333444)
      setState(data);
    }
  };
  const handleError = (err) => {
    console.error(err);
  };

  return (
    <TransitionsModal
    
      isOpen={open}
          setOpen={setOpen}
          content={<ModalContent setOpen={setOpen} isBilling={props.isBilling} {...props} bagId={state}/>}
    >
      
        <Box width="20rem" height="25rem%" m="auto">
          <p>place over camera to scan</p>
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: "100%" }}
          />
          <Box my="5px">{state}</Box>
          <Box display="flex" justifyContent="flex-end">
            <Button
              onClick={() => setOpen(true)}
              color="primary"
              variant="outlined"
              disabled={state === "No result" ? true : false}
            >
              {/* Generate Bag {isGenerating && <CircularProgress color="primary" size={15} />}{' '} */}
              {props.btnText}
            </Button>
          </Box>
        </Box>
    </TransitionsModal>
  );
}

export default QrCodeScanner;

const useStyles = makeStyles((theme) => ({
  dangerButton: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(2),

    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },
}));

const ModalContent = ({setOpen, bagId, isBilling }) => {
  const classes = useStyles();
  const isRegisteringBag = useSelector(state => state.bag.isRegisteringBag);
  const dispatch = useDispatch();

  const closeModal = () => setOpen(false)

  const registerBag = () => {
	console.log(bagId,999)
  dispatch(linkBagToUserStart({bagId, isBilling}));
  closeModal()
}
  return (
    <Box>
      <Box my="1rem">
        Are you sure you want to Register this Bag, once registered under your
        name, only an Admin can undo it
      </Box>
      <Box display="flex" justifyContent="center">
        <Button
          // onClick={openModal}
          color="primary"
          variant="contained"
		  onClick={registerBag}
        >
          {/* Generate Bag {isGenerating && <CircularProgress color="primary" size={15} />}{' '} */}
          Yes
        </Button>
        <Button
          onClick={closeModal}
          variant="contained"
          className={classes.dangerButton}
        >
          {/* Generate Bag {isGenerating && <CircularProgress color="primary" size={15} />}{' '} */}
          NO
        </Button>
      </Box>
    </Box>
  );
};
