import { Request, Response } from "express";
import { getUserProfileService, updatePasswordService, deleteAccountService } from "../../services/userService";

export const getUserProfile = async (req: Request, res: Response) => {
    try {
        const result = await getUserProfileService(req.user!.guid);
        return res.status(200).json(result);
    } catch (error) {
        if (error instanceof Error) {
            switch (error.message) {
                case "User not found":
                    return res.status(403).json({ message: error.message });
                case "Invalid user role or missing profile data":
                    return res.status(401).json({ message: error.message });
                default:
                    console.error("Get user's profile error:", error);
                    return res.status(500).json({ message: "Internal server error" });
            }
        }

        console.error("Unexpected error during receiving user's profile:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const updatePassword = async (req: Request, res: Response) => {
    try {
        const result = await updatePasswordService(req.user!.guid, req.body);
        return res.status(200).json(result);
    } catch (error) {
        if (error instanceof Error) {
            switch (error.message) {
                case "User not found":
                    return res.status(403).json({ message: error.message });
                case "Current password is incorrect":
                    return res.status(403).json({ message: error.message });
                case "New password and confirmation do not match":
                    return res.status(403).json({ message: error.message })
                default:
                    console.error("Update password error:", error);
                    return res.status(500).json({ message: "Internal server error" });
            }
        }

        console.error("Unexpected error during password update:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteAccount = async (req: Request, res: Response) => {
    try {
        const result = await deleteAccountService(req.user!.guid);
        return res.status(200).json(result);
    } catch (error) {
        if (error instanceof Error) {
            switch (error.message) {
                case "User not found":
                    return res.status(403).json({ message: error.message });
                default:
                    console.error("Delete account error:", error);
                    return res.status(500).json({ message: "Internal server error" });
            }
        }

        console.error("Unexpected error during deleting account:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
