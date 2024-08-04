import * as dotenv from 'dotenv';
dotenv.config();

const config = {
    port: process.env.PORT,
    dbConnectionString: process.env.DB_CONNECTION_STRING,
    frontendURL: process.env.FRONTEND_URL,
    corsOptions: {
        origin: process.env.FRONTEND_URL,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true
    },
};

export default config;