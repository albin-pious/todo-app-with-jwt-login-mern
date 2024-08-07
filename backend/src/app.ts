import express, { Request, Response, NextFunction} from 'express';
const cors = require('cors');
import routes from './routes';
import config from './config/config';
import * as dotenv from 'dotenv';
import connectToDatabase from './utils/db';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

connectToDatabase();

app.use(cors(config.corsOptions));
app.use(express.json());

app.use('/api', routes);

app.use((err: any, req: Request, res: Response, next: NextFunction)=>{
    console.error(err.stack);
    res.status(500).send('Internal Server Error!');
    
});

app.listen(PORT, ()=>{
    console.log(`Server running on port http//:127.0.0.1:${PORT}`);
    
})