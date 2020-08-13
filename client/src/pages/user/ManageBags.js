import React from 'react'
import SideNav from '../../components/sidebar';
import QrCodeScanner from '../../components/qr-code-reader';
import { Box } from '@material-ui/core';

export default function ManageBags() {
    return (
        <div>
            <SideNav activeNav="Manage Bags">
                Barcode
                <Box>
                    <QrCodeScanner btnText="Register"/>
                </Box>
            </SideNav>
        </div>
    )
}
