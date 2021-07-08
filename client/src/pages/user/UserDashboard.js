import { Box } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import SideNav from "../.././components/sidebar";

export default function UserDashboard() {
  return (
    <div>
      <SideNav activeNav="Dashboard">
        <Box bgcolor="#fbc02d" py={1} px={0.5}>
          *Note, in order for you waste to be picked up, you must be registered
          under a district. click <Link to="settings"> settings </Link> to
          update
        </Box>
      </SideNav>
    </div>
  );
}
