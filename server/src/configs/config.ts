import dotenv from 'dotenv'
dotenv.config()

const config = {
    server: {
        port: process.env.PORT || 8000,
        host: process.env.HOST || 'localhost',
    },
    client: {
        url: process.env.CLIENT_URL || 'http://localhost:5173',
    },
    database: {
        uri:
            process.env.DATABASE_URL ||
            '  mongodb://localhost:27017/i-notebook-app',
    },
    jwt: {
        access_secret: process.env.ACCESS_JWT_SECRET || 'a_secret',
        refresh_secret: process.env.REFRESH_JWT_SECRET || 'r_secret',
    },
}

export default config
