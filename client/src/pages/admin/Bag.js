import React from 'react'
import PropTypes from "prop-types";
import Sidebar from '../../components/sidebar'

import { Box, Card } from '@material-ui/core';
import formatDate from '../../utils/formatDate';
import QrCode from '../../components/qr-code';
import useFetchFirebaseDoc from '../../custom-hooks/useFetchFirebaseDoc';
import { firestore } from '../../firebase/firebase.utils';
import Spinner from '../../components/spinner/Spinner';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


export default function Bag(props) {
    const ref = firestore.collection('Bags').doc(props.match.params.id)
    const shouldExec = !props.location.data;

    const [state, setState] = useFetchFirebaseDoc(ref,props.location.data,shouldExec)
    const { loading, data } = state;
    
    const goBack = () => {
        props.history.push('/bags')
    }
    return (
        <div>
            <Sidebar activeNav="Bags">
                <Box>
                    <ArrowBackIcon onClick={goBack} style={{ cursor: 'pointer' }}/>
                </Box>
                { loading ? <Spinner /> : (data ?
                    <Box display="flex" justifyContent="center">
                        <Box >
                            <Box mb="2rem">
                                <QrCode id={data.BagId} />
                            </Box>
                            <Card >
                                <Box p="3rem" >
                                    <Box mb={3}><Box component="span" mr={1} fontWeight="bold">Bag owner:</Box>{data.BagOwner || "nil"}</Box>
                                    <Box mb={3}><Box component="span" mr={1} fontWeight="bold">Ass status:</Box>{data.assStatus}</Box>

                                    <Box mb={3}><Box component="span" mr={1} fontWeight="bold">Bag Id:</Box>{data.BagId}</Box>
                                    <Box mb={3}><Box component="span" mr={1} fontWeight="bold">payment Status:</Box>{data.paymentStatus}</Box>


                                    <Box mb={3}><Box component="span" mr={1} fontWeight="bold">Billed:</Box>{data.Billed}</Box>
                                    <Box mb={3}><Box component="span" mr={1} fontWeight="bold">created At:</Box>{formatDate(data.createdAt.toDate())}</Box>
                                </Box>
                            </Card>
                        </Box>
                    </Box>
                    : <Box>No Document Found</Box>)}

            </Sidebar>
        </div>
    )
}

