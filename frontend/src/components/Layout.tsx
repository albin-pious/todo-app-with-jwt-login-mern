import { LayoutProps } from "@/typescript/layoutTypes";
import { Box } from "@mui/material";
import { FC } from "react";
import Sidebar from "./Sidebar";

const Layout:FC<LayoutProps> = ({ children }) => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Box component='main' sx={{ flexGrow: 1, p: 3}}>
                {children}
            </Box>
        </Box>
    )
};

export default Layout;