import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import QRCode from 'qrcode.react';
import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'center',
      textDecoration: 'underline',
      color: theme.palette.primary.main,
      cursor: 'pointer'
    },
}));

export default function QrCode({ id }) {
    const classes = useStyles()
	const componentRef = useRef();
	const handlePrint = useReactToPrint({
		content: () => componentRef.current
	});
    
	return (
		<div>
			<div ref={componentRef}>
				<ComponentToPrint id={id} />
			</div>
			<Box className={classes.root} onClick={handlePrint}>Print!</Box>
		</div>
	);
}

function ComponentToPrint({ id }) {
	return (
		<Box mt="4rem" textAlign="center">
			<QRCode value={id} size={200} />
		</Box>
	);
}
