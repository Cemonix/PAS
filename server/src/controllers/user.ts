import { Request, Response } from 'express';
import { deleteUserService, findUserById } from '../services/user';

export const deleteUser = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);

    try {
        // Check if the user exists
        const user = await findUserById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Call the service to delete the user
        await deleteUserService(userId);

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};
