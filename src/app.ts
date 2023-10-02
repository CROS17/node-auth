import express, { Application, Request, Response } from 'express';
import cors from 'cors';

import sequelize from './settings/dbconnection';


/* Rutas */
import routerUser from './routes/user.route';

const app: Application = express();
const port: number = 4003;

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get('/api', (req: Request, res: Response) => {
    res.json({
        msg: 'API Working'
    });
});

// Resto de las rutas sin autenticación
app.use('/api/users', routerUser);

sequelize.authenticate()
    .then(() => {
        console.log('Database connected');
        app.listen(port, () => {
            console.log(`Application running on port ${port}`);
        });
    })
    .catch((error) => {
        console.log(error);
        console.log('Error connecting to database');
    });