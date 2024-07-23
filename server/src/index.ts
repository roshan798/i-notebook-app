import express, { Request, Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import config from './configs/config'
import authRouter from './routes/auth.route'
import notesRouter from './routes/notes.route'
import connectDB from './configs/database'

const PORT = config.server.port
const app = express()
const corsOptions = {
    origin: [config.client.url],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}
// middlewares
app.use(cors(corsOptions))
app.use(express.json({ limit: '4mb' }))
app.use(cookieParser())

//routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/notes', notesRouter)

app.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'Hello World 🌍, Welcome to i-notebook server',
        success: true,
    })
})

connectDB()
// start server
app.listen(PORT, () => {
    console.log(`Server is running on http://${config.server.host}:${PORT} 🚀`)
})
