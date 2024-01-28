import 'express-async-errors'
import * as dotenv from 'dotenv';
dotenv.config();
import express, { response } from 'express'
import morgan from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';


const app = express()

//routers
import jobRouter from './routes/jobRouter.js'
import authRouter from "./routes/authRouter.js"
import userRouter from './routes/userRouter.js'
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//middleware
import erroHandlemiddleware from './middleware/errorHandlemiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';

app.use(cookieParser());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World')
})




// //Get All jobs
// app.get('/api/v1/jobs' )

// //Create job
// app.post('/api/v1/jobs' );


// //find single job
// app.get('/api/v1/jobs/:id' )


// //Edit job

// app.patch('/api/v1/jobs/:id' )

// //Delete job

// app.delete('/api/v1/jobs/:id')

app.get('/api/v1/test', (req, res) => {
    res.json({ msg: 'test route' });
});

app.use('/api/v1/users', authenticateUser, userRouter);
app.use('/api/v1/jobs/', authenticateUser, jobRouter)
app.use('/api/v1/auth', authRouter);

app.use('*', (req, res) => {
    res.status(404).json({ msg: "not found" })
})


app.use(erroHandlemiddleware)

const port = process.env.PORT || 5100
const Mongo_URL = process.env.MONGO_URL

try {
    mongoose.connect(Mongo_URL)
    app.listen(port, () => {
        console.log(`server running on PORT ${port}....`);
    });
} catch (error) {
    console.log(error);
    process.exit(1);
}

// app.listen(port, () => {
//     console.log(`server is running on ${port}....Nilesh`)
// });
