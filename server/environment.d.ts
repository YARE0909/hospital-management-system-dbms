declare global {
    namespace NodeJS {
        interface ProcessEnv {
            MYSQL_USER: string;
            MYSQL_HOST: string;
            MYSQL_PORT: number;
            MYSQL_DATABASE: string;
            MYSQL_PASSWORD: string;
            JWT_SECRET: string;
        }
    }
}

export { };

