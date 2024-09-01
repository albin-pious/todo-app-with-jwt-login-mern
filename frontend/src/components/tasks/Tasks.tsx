import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { FC } from "react";

const Tasks: FC = ()=>{
    return(
        <Box>
            <Link href='/tasks/create' passHref>
                <Typography variant="h6" color="primary" style={{ cursor: 'pointer' }}>
                    Create a new task
                </Typography>
            </Link>
        </Box>
    )
}

export default Tasks;
