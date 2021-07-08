import React, { useMemo } from "react";
import { usePaystackPayment } from "react-paystack";
import Sidebar from "../../components/sidebar";

import { Box, Card, Button } from "@material-ui/core";
import formatDate from "../../utils/formatDate";
import QrCode from "../../components/qr-code";
import useFetchFirebaseDoc from "../../custom-hooks/useFetchFirebaseDoc";
import { firestore } from "../../firebase/firebase.utils";
import Spinner from "../../components/spinner/Spinner";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useSelector } from "react-redux";
import { useApiEdit } from "../../utils/apiCalls";
import moment from "moment";
import { notify } from "../../utils/notify";
import { useQueryClient } from "react-query";

export default function Bag(props) {
  const shouldExec = !props.location.data;
  const currentUser = useSelector((state) => state.user.currentUser);
  const memoizedRef = useMemo(
    () => firestore.collection("Bags").doc(props.match.params.id),
    [props.match.params.id]
  );
  const [state] = useFetchFirebaseDoc(
    memoizedRef,
    props.location.data,
    shouldExec
  );
  const queryClient = useQueryClient();
  const { loading, data } = state;

  const config = {
    reference: new Date().getTime(),
    email: currentUser.email,
    amount: 20000,
    publicKey: "pk_test_c39f5ad2afe5213b6bff17dc85d07cd94767f7ad",
  };
  const initializePayment = usePaystackPayment(config);
  const mutation = useApiEdit();
  // you can call this function anything
  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
    const requestDet = {
      docRef: firestore.collection("Bags").doc(props.match.params.id),
      data: {
        paymentStatus: "paid",
        reference
      },
    };
    return mutation.mutate(requestDet, {
      onSuccess: (res) => {
        notify("payment was successful", "success");
        queryClient.invalidateQueries("payments")
      },
      onError: () => {
        notify("failed to properly record payment", "error");
      }
    });
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  const goBack = () => {
    props.history.goBack();
  };
  console.log(data,data?.userId,currentUser.id,111222)
  return (
    <div>
      <Sidebar activeNav="Bags">
        <Box>
          <ArrowBackIcon onClick={goBack} style={{ cursor: "pointer" }} />
        </Box>
        {loading ? (
          <Spinner />
        ) : data ? (
          <Box display="flex" justifyContent="center">
            <Box>
              <Box mb="2rem">
                <QrCode id={data.BagId} />
              </Box>
              <Card>
                <Box p="3rem">
                  {data.Billed &&
                    data.assStatus === "assigned" &&
                    data.userId === currentUser.id && (
                      <Box textAlign="right">
                        <Button
                          color="secondary"
                          variant="contained"
                          onClick={() => {
                            initializePayment(onSuccess, onClose);
                          }}
                        >
                          Pay
                        </Button>
                      </Box>
                    )}
                  <Box mb={3}>
                    <Box component="span" mr={1} fontWeight="bold">
                      Bag owner:
                    </Box>
                    {data.BagOwner || "nil"}
                  </Box>
                  <Box mb={3}>
                    <Box component="span" mr={1} fontWeight="bold">
                      Ass status:
                    </Box>
                    {data.assStatus}
                  </Box>

                  <Box mb={3}>
                    <Box component="span" mr={1} fontWeight="bold">
                      Bag Id:
                    </Box>
                    {data.BagId}
                  </Box>
                  <Box mb={3}>
                    <Box component="span" mr={1} fontWeight="bold">
                      payment Status:
                    </Box>
                    {data.paymentStatus}
                  </Box>

                  <Box mb={3}>
                    <Box component="span" mr={1} fontWeight="bold">
                      Billed:
                    </Box>
                    {data.Billed}
                  </Box>
                  <Box mb={3}>
                    <Box component="span" mr={1} fontWeight="bold">
                      created At:
                    </Box>
                    {formatDate(data.createdAt.toDate())}
                  </Box>
                </Box>
              </Card>
            </Box>
          </Box>
        ) : (
          <Box>No Document Found</Box>
        )}
      </Sidebar>
    </div>
  );
}
