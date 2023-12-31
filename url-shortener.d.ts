type ConfigDefinition = {
    environment: string;
    service: {
      port: number;  
    }
    shortener: {
        baseUrl: string;
    }
    database: {
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        dialect: string;
        logging: boolean;
        force: boolean;
    };
};

declare module 'config' {
    const config: ConfigDefinition;
    export default config;
}