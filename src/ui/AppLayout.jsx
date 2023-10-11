import { Outlet } from "react-router-dom";

import { Box } from "@mui/material";

import NavBar from "./NavBar";

function AppLayout(){

    return(
        <Box>
            <NavBar />
            <Outlet />
        </Box>
    );
}

export default AppLayout;