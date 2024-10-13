import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { comparePasswords, hashPassword } from '../utils/passwordUtils';
import { createUserService, findUserByEmail } from '../services/user';
import { Role } from '@prisma/client';

export const registerUser = async (req: Request, res: Response) => {
    const { } = req.body
    
    try {
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Check if user exists
    const user = await findUserByEmail(email);
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if the password matches
    const isPasswordValid = await comparePasswords(password, user.passwordHash);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    try {
        // For now, just send a success response (you can add JWT later)
        res.status(200).json({ message: 'Login successful', userId: user.id });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};
