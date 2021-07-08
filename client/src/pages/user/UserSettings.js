import { Box, Button, CircularProgress, withStyles } from "@material-ui/core";
import React from "react";
import SideNav from "../.././components/sidebar";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { useQueryClient } from "react-query";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useApiEdit, useApiGet } from "../../utils/apiCalls";
import { firestore } from "../../firebase/firebase.utils";
import { yellow } from "@material-ui/core/colors";
import { useSelector } from "react-redux";
import { notify } from "../../utils/notify";

export default function UserSettings() {
const currentUser = useSelector(state => state.user.currentUser)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();
  const mutation = useApiEdit();


  const onSubmit = ({ phoneNo, selectedDistrict }) => {
    const requestDet = {
      docRef: firestore.collection("users").doc(currentUser.id),
      data: {
        districtName: selectedDistrict.value,
        phoneNo
      },
    };
    return mutation.mutate(requestDet, {
      onSuccess: (res) => {
        notify("user details updated successfully ", "success");
        queryClient.invalidateQueries("pickups")
      },
      onError: () => {
        notify("failed to set update user details", "error");
      }
    });
  };

  const { data, isLoading: isLoadingDistricts } = useApiGet({
    key: "districts",
    docRef: firestore.collection("Districts").doc("allDistricts"),
  });

  const options = [];
  if (data?.districts) {
    data.districts.forEach((district) => {
      options.push({ label: district, value: district });
    });
  }

  return (
    <SideNav activeNav="Settings">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginTop="2.5rem"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            border="1px solid #C4C4C4"
            w="100%"
            bgcolor="white"
            borderWidth="1px"
            borderRadius="4px"
            width="27rem"
            px="22px"
            py="17px"
          >
            <Box width="98%">
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
                      <Select
                        {...field}
                        options={options}
                        styles={customStyles(errors.selectedDistrict)}
                      />
                    )}
                  />
                </Box>
              )}
            </Box>
            <Box mt="2rem">
              <Controller
                name="phoneNo"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <PhoneInput
                    country={"ng"}
                    {...field}
                    // value={""}
                    // onChange={(phone) => this.setState({ phone })}
                  />
                )}
              />
            </Box>
            <Box display="flex" justifyContent="flex-end" mt="1.5rem">
              <ColorButton
                variant="contained"
                color="primary"
                type="submit"
              //   className={classes.margin}
              >
                     {mutation.isLoading ? <CircularProgress size={20} /> : "Save"}
                
              </ColorButton>
              {/* <Button type="submit">save</Button> */}
            </Box>
          </Box>
        </form>
      </Box>
    </SideNav>
  );
}

const customStyles = (isValid) => ({
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

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(yellow[700]),
    backgroundColor: yellow[700],
    "&:hover": {
      backgroundColor: yellow[900],
    },
  },
}))(Button);
