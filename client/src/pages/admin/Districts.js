import { Button, Box, Card, Paper } from "@material-ui/core";
import React from "react";
import TransitionsModal from "../../components/modal";
import SideNav from "../../components/sidebar";
import { useForm } from "react-hook-form";
import { ValidationTextField } from "../../components/auth-form/styles";
import { useRef } from "react";
import { useStyles } from "./styles";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useApiEdit, useApiPost } from "../../utils/apiCalls";
import { firestore } from "../../firebase/firebase.utils";
import { notify } from "../../utils/notify";
import firebase from "firebase";
import DistrictTable from "./DistrictTable";

export default function Districts(props) {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <SideNav activeNav="Districts">
        <TransitionsModal
          isOpen={open}
          setOpen={setOpen}
          content={<ModalContent setOpen={setOpen} />}
        >
         
            <Box py={2} px={1} display="flex" justifyContent="flex-end">
              <Button
                onClick={() => setOpen(true)}
                variant="outlined"
                color="primary"
              >
                Add New District
              </Button>
            </Box>
        
        </TransitionsModal>
        <DistrictTable />
      </SideNav>
    </div>
  );
}

const ModalContent = ({ setOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const queryClient = useQueryClient()
  const classes = useStyles();
  const mutation = useApiEdit();
  const onSubmit = ({ districtName }) => {
    const requestDet = {
      docRef: firestore.collection("Districts").doc("allDistricts"),
      data: {
        districts: firebase.firestore.FieldValue.arrayUnion(districtName),
      },
    };
    return mutation.mutate(requestDet, {
      onSuccess: (res) => {
        //   close the modal if its succssful
        console.log(res, 111);
        notify("District successfully added", "success");
        queryClient.invalidateQueries("districts")
      },
      onError: () => {
        notify("failed to add district!", "error");
      },
      onSettled: () => {
        setOpen(false);
      }
    });
  };

  console.log(errors, "hiatus");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ValidationTextField
        className={classes.districtInput}
        type="text"
        placeholder="district name"
        variant="outlined"
        error={errors.districtName}
        inputProps={{
          "aria-label": "Description",
        }}
        {...register("districtName", { required: true, maxLength: 80 })}
      />
      <Box display="flex" justifyContent="flex-end" mr="5%" mt={1.5}>
        <Button type="submit" variant="outlined">
          add
        </Button>
      </Box>
      {/* <input type="submit" /> */}
    </form>
  );
};
