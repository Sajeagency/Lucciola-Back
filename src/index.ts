import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import router from './routes';
import { configurePassport } from './services/passportService';


dotenv.config();

const prisma = new PrismaClient();


const app = express();

app.use(morgan('dev'));


app.use(express.json());

configurePassport();


app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
}));


app.use('/', router);


const PORT = process.env.PORT || 5432;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});