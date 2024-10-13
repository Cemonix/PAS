import express from 'express';
import doctorRoutes from './routes/doctor'
import appointmentRoutes from './routes/appointment'
import patientRoutes from './routes/patient'
import authRoutes from './routes/auth';

const app = express();

// Middlewares
app.use(express.json());

app.use('/doctors', doctorRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/patients', patientRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// TODO: Run prisma migration
// TODO: User registration