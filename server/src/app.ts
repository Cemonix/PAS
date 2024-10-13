import express from 'express';
import doctorRoutes from './routes/doctor'
import patientRoutes from './routes/patient'
import authRoutes from './routes/auth';

const app = express();

// Middlewares
app.use(express.json());

app.use('/doctors', doctorRoutes);
app.use('/patients', patientRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// TODO: User registration