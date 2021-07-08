import { Box, CircularProgress } from "@material-ui/core";
import React from "react";
import Spinner from "../../components/spinner/Spinner";
import { firestore } from "../../firebase/firebase.utils";
import { useApiGet } from "../../utils/apiCalls";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import MoreVertIcon from "@material-ui/icons/MoreVert";

export default function DistrictTable() {
  const { data, isLoading } = useApiGet(
    {
      key: "districts",
      docRef: firestore.collection("Districts").doc("allDistricts"),
    },
    {
      refetchOnMount: false,
    }
  );

  console.log(data, 777);
  return (
    <Box mt="4rem">
      {isLoading ? (
        <CircularProgress size={40} />
      ) : data ? (
        <Box
          border="1px solid #C4C4C4"
          w="100%"
          bgcolor="white"
          borderWidth="1px"
          borderRadius="lg"
          // overflow="hidden"
          filter={isLoading ? "blur(3px)" : ""}
        >
          {data.districts.map((district) => (
            <DistrictData
              district={district}
              key={district}
              // setInventoryModalState={setInventoryModalState}
              // openModal={openModal}
            />
          ))}
        </Box>
      ) : (
        <Box>No District has been added yet, please add district</Box>
      )}
    </Box>
  );
}

const DistrictData = ({ district }) => {
  return (
    <Box
      p="1rem"
      borderBottom="1px solid #E2E8F0"
      m="1rem"
      display="flex"
      justifyContent="space-between"
    >
      <Box>
        <DragIndicatorIcon />
      </Box>
      <Box fontWeight="bold" color="rgba(40, 168, 70)">
        {district}
      </Box>
      <Box>
        <MoreVertIcon />
      </Box>
    </Box>
  );
};
