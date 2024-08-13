import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '@/services/redux/store';

const useAuthRedirect = () => {
    const router = useRouter();
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

    useEffect(() => {
        // Function to handle redirection
        const handleRedirect = () => {
            if (isAuthenticated) {
                // Redirect authenticated users away from login page
                if (router.pathname === '/login') {
                    router.push('/dashboard');
                }
            } else {
                // Redirect unauthenticated users to login page
                if (router.pathname !== '/login') {
                    router.push('/login'); 
                }
            }
        };

        handleRedirect();
        
        // Optional: You could use router.events to listen to route changes
        // const handleRouteChange = (url: string) => handleRedirect();
        // router.events.on('routeChangeComplete', handleRouteChange);

        // Cleanup (if you use router.events)
        // return () => {
        //     router.events.off('routeChangeComplete', handleRouteChange);
        // };

    }, [isAuthenticated, router]);

};

export default useAuthRedirect;

