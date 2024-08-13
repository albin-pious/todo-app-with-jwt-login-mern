import { Box, Typography, Button, Container, Grid } from "@mui/material";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-6 ${inter.className}`}
    >
      {/* Hero Section */}
      <Container>
        <Box textAlign="center" mb={6}>
          <Typography variant="h2" gutterBottom>
            Welcome to TaskPulse
          </Typography>
          <Typography variant="h5" color="textSecondary" paragraph>
            Organize your tasks with ease and boost your productivity. TaskPulse helps you keep track of your goals and manage your daily tasks effectively.
          </Typography>
          <Link href="/register" passHref>
            <Button variant="contained" color="primary" size="large">
              Get Started
            </Button>
          </Link>
        </Box>

        {/* Features Section */}
        <Box my={6}>
          <Typography variant="h4" gutterBottom textAlign="center">
            Key Features
          </Typography>
          <Grid container spacing={4} justifyContent="center" className="cursor-pointer">
            <Grid item xs={12} sm={6} md={4}>
              <Box p={4} border={1} borderColor="divider" borderRadius={2}>
                <Typography variant="h6" gutterBottom>
                  Task Management
                </Typography>
                <Typography>
                  Keep track of your tasks with ease and prioritize what matters most.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} className="cursor-pointer">
              <Box p={4} border={1} borderColor="divider" borderRadius={2}>
                <Typography variant="h6" gutterBottom>
                  Timely Reminders
                </Typography>
                <Typography>
                  Never miss a deadline with our smart reminders and notifications.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} className="cursor-pointer">
              <Box p={4} border={1} borderColor="divider" borderRadius={2}>
                <Typography variant="h6" gutterBottom>
                  Insights & Reports
                </Typography>
                <Typography>
                  Gain insights into your productivity and track your progress over time.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* Footer Section */}
      <Box mt={6} py={3} bgcolor="background.paper" textAlign="center">
        <Typography variant="body2" color="textSecondary">
          &copy; {new Date().getFullYear()} TaskPulse. All rights reserved.
        </Typography>
      </Box>
    </main>
  );
}

