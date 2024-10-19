import express from "express";
import cors from "cors"

import authRoutes from "./routes/auth";

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Only allow requests from this origin
}));

app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// TODO: User registration
