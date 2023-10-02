import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import sequelize from './dbconnection';
import { verifyAuthToken } from '../middlewares/verify-auth-token.middleware';

/* Rutas */
import routerUser from '../routes/user.route';
export class Server{
    public readonly  app: Application =  express();
    private readonly port: string;

    constructor() {
        this.app.use(cors());
        this.port = '4003';

        // parse requests of content-type - application/json
        this.app.use(express.json());

        // parse requests of content-type - application/x-www-form-urlencoded
        this.app.use(express.urlencoded({ extended: true }));
    }

    async start(){

        this.app.listen(this.port, () => {
            console.log(`Application running on the port ${this.port}`)
        })

        this.app.get('/api', (req: Request, res: Response) => {
            res.json({
                msg: 'API Working'
            });
        });

        this.app.use('/api/users', routerUser);

        sequelize.authenticate()
            .then(() => {
                console.log('Database connected');
                this.app.listen(this.port, () => {
                    console.log(`Application running on port ${this.port}`);
                });
            })
            .catch((error) => {
                console.log(error);
                console.log('Error connecting to database');
            });
    }
}