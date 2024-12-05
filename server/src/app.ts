import express from "express";
import cors from "cors"

import authRoutes from "./routes/auth";
import userRoutes from "./routes/profile";
import doctorRoutes from "./routes/doctor";
import appointmentRoutes from "./routes/appointment";

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Only allow requests from this origin
}));

app.use("/auth", authRoutes);
app.use("/profile", userRoutes);
app.use('/doctors', doctorRoutes);
app.use('/appointments', appointmentRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
