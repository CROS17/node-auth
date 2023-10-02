import {Sequelize} from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(
    'bd_auth',
    'root',
    'secret',
    {
        host: process.env.DB_HOST,
        port: 3306,
        dialect: 'mysql',
        pool: {
            acquire: 30000,
            idle: 10000,
        },
        dialectOptions: {
            options: {
                encrypt: true,
            }
        }
    });

export default sequelize;
