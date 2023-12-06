import dotenv from 'dotenv';

dotenv.config();

const config: ConfigDefinition = {
    service: {
        port: Number(process.env.PORT)
    },
    shortener: {
        baseUrl: process.env.BASE_URL ?? `http://localhost:${process.env.PORT}/`,
    },
    environment: process.env.NODE_ENV ?? 'development',
    database: {
        host: process.env.DB_HOST ?? 'localhost',
        port: Number(process.env.DB_PORT ?? 5432),
        username: process.env.DB_USERNAME! ,
        password: process.env.DB_PASSWORD!,
        database: process.env.DB_DATABASE!,
        dialect: 'postgres',
        logging: false,
        force: false
    }
}

export default config;