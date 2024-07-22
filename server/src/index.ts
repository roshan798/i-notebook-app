import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import config from './configs/config';
import authRouter from './routes/auth.route';
import notesRouter from './routes/notes.route';
import connectDB from './configs/database';

const PORT = config.server.port;
const app = express();
console.log("frontend url = >", config.client.url);
const corsOptions = {
    origin: [config.client.url],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
};
console.log(corsOptions);

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
//     res.header("Access-Control-Allow-Credentials", "true"); // Allow cookies and other credentials
//     next();
// });

// middlewares
app.use(cors(corsOptions));
app.use(express.json({ limit: '4mb' }));
app.use(cookieParser());

//routes
// will add the middleware to the route in future
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/notes', notesRouter);

app.get('/', (req: Request, res: Response) => {
    res.json({
        message: "Hello World 🌍, Welcome to i-notebook server",
        success: true
    });
});

connectDB();
// start server
app.listen(PORT, () => {
    console.log(`Server is running on http://${config.server.host}:${PORT} 🚀`);
});