import Register from "@/components/Register";
import { Box, Typography, Container } from "@mui/material";
import { FC } from "react";

const RegisterPage: FC = () => {
    return (
        <Container maxWidth="xs" className="py-8">
            <Box className="text-center mb-8">
                <Typography variant="h3" component="h1" className="font-bold mb-4">
                    TaskPulse
                </Typography>
                <Typography variant="h5" component="h2" className="font-light">
                    Create your account
                </Typography>
            </Box>
            <Register />
        </Container>
    );
}

export default RegisterPage;