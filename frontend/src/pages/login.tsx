import Login from "@/components/Login";
import { Container, Box, Typography } from "@mui/material";
import { FC } from "react";

const LoginPage: FC = ()=>{
    return (
        <Container maxWidth='xs' className="py-8">
            <Box className='text-center mb-8'>
                <Typography variant="h3" component="h1" className="font-bold mb-4">
                    TaskPulse
                </Typography>
                <Typography variant="h5" component="h2" className="font-light">
                    Login to your account
                </Typography>
            </Box>
            <Login />
        </Container>
    )
}

export default LoginPage;