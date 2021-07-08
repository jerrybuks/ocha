import React from "react";
import Datetime from "react-datetime";
import SideNav from "../../components/sidebar";
import { Button, Box, CircularProgress } from "@material-ui/core";
import "react-datetime/css/react-datetime.css";
import Select from "react-select";
import { useApiGet, useApiPost } from "../../utils/apiCalls";
import { firestore } from "../../firebase/firebase.utils";
import { useForm, Controller } from "react-hook-form";
import moment from "moment";
import { useQueryClient } from "react-query";
import { notify } from "../../utils/notify";
import PickupTable from "./PickupTable";


export default function AdminDashboard(props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const queryClient = useQueryClient()
  const mutation = useApiPost();

  const onSubmit = ({ dateAndTime, selectedDistrict }) => {
	const requestDet = {
	  docRef: firestore.collection("Pickups"),
	  data: {
	    dateAndTime: moment(dateAndTime).format(),
	    districtName: selectedDistrict.value,
	    collected: false
	  },
	};
	return mutation.mutate(requestDet, {
	  onSuccess: (res) => {
	    notify("pickup date successfully set!", "success");
	    queryClient.invalidateQueries("pickups")
	  },
	  onError: () => {
	    notify("failed to set pickup date", "error");
	  }
	});
     };

  const { data, isLoading: isLoadingDistricts } = useApiGet(
    {
      key: "districts",
      docRef: firestore.collection("Districts").doc("allDistricts"),
    }
  );

  const { data: pickups, isLoading: isLoadingPickups } = useApiGet(
	{
	  key: "pickups",
	  docRef: firestore.collection("Pickups"),
	  isCollection: true
	}
     );

  const options = [];
  if (data?.districts) {
    data.districts.map((district) => {
      options.push({ label: district, value: district });
    });
  }

  console.log(pickups,7788099)
  const yesterday = moment().subtract(1, "day");
  const valid = function (current) {
    return current.isAfter(yesterday);
  };
  return (
    <SideNav activeNav="Dashboard">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" justifyContent="space-between">
          <Box width="30%">
            {isLoadingDistricts ? (
              <Box component="span">
                <CircularProgress size={20} /> "loading districts..."
              </Box>
            ) : (
              <Box>
                <Controller
                  name="selectedDistrict"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select {...field} options={options} styles={customStyles(errors.selectedDistrict)} />
                  )}
                />
                <Box color="red" mt={3} lineHeight="2rem" letterSpacing=".1rem">
                  *Note: setting a pickup time sends a text message and email to
                  everyone regitered under that district!{" "}
                </Box>
              </Box>
            )}
          </Box>

          <Box
            width="50%"
            style={{ border: errors.dateAndTime ? "1px solid red" : "none" }}
          >
            <Controller
              name="dateAndTime"
              rules={{ required: true }}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Datetime {...field} input={false} isValidDate={valid} />
              )}
            />
          </Box>
          <Box>
            <Button
              //   onClick={() => props.history.push("/scanBags")}
              color="primary"
              variant="outlined"
              type="submit"
            >
		     {mutation.isLoading ? <CircularProgress /> : " set pickup time"}
             
            </Button>
          </Box>
        </Box>
      </form>
      <PickupTable isGettingTableData={isLoadingPickups} rows={pickups || []} />
    </SideNav>
  );
}

const customStyles =(isValid) => ( {
  control: (base, state) => ({
    ...base,
    // state.isFocused can display different borderColor if you need it
    borderColor: state.isFocused ? "#ddd" : isValid ? "red" : "#ddd",
    // overwrittes hover style
    "&:hover": {
      borderColor: state.isFocused ? "#ddd" : isValid ? "red" : "#ddd",
    },
  }),
});
