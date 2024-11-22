import { Request, Response } from "express";
import {loginService} from "../../services/loginService";

export const login = async (req: Request, res: Response) => {
    try {
        const result = await loginService(req.body);
        return res.status(200).json(result);
    } catch (error) {
        if (error instanceof Error) {
            switch (error.message) {
                case "Invalid credentials":
                    return res.status(401).json({ message: error.message });
                default:
                    console.error("Login error:", error);
                    return res.status(500).json({ message: "Internal server error" });
            }
        }

        console.error("Unexpected error during login:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
