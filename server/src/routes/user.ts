import { Router } from 'express';
import { deleteUser } from '../controllers/user';
import { validateId } from '../middlewares/validation'; 

const router = Router();

// Delete a user by ID
router.delete('/:id', validateId, deleteUser);

export default router;
