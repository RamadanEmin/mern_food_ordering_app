import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import { v2 as cloudinary } from "cloudinary";
import myUserRoute from './routes/MyUserRoute';
import myRestaurantRoute from './routes/MyRestaurantRoure';

mongoose
    .connect(process.env.MONGO_CONNECTION_STRING as string)
    .then(() => console.log('Connected to database!'));

const app = express();
app.use(express.json());
app.use(cors());

app.use('/health', async (req: Request, res: Response) => {
    res.send({ message: 'health ok!!!' });
});

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use('/api/my/user', myUserRoute);
app.use('/api/my/restaurant', myRestaurantRoute);

app.listen(7000, () => {
    console.log('Server started on localhost:7000');
});