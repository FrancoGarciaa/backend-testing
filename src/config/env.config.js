import dotenv from 'dotenv';
dotenv.config();

export const config = {
port: process.env.PORT || 3131,
mongo_uri: process.env.MONGO_URI || process.env.MONGO_URL,
node_env: process.env.NODE_ENV || 'development',
};
